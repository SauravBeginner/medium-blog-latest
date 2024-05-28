import { Hono } from "hono";

export const authRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
    HONO_R2_UPLOAD: any;
    R2_URL: string;
  };
  Variables: {
    userId: string;
    prisma: any;
  };
}>();

// middleware

authRouter.get("/userProfile/:id", async (c) => {
  // const prisma = new PrismaClient({
  //   datasourceUrl: c.env.DATABASE_URL,
  // }).$extends(withAccelerate());
  const prisma = c.get("prisma");
  const id = c.req.param("id");

  //  const userId = c.get("userId");
  try {
    const userDetails = await prisma.user.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        name: true,
        email: true,
        tagLine: true,
        portfolioUrl: true,
        profileImg: true,
        following: true,
        followers: true,
        _count: {
          select: {
            following: true,
            followers: true,
          },
        },
      },
    });

    if (userDetails && userDetails._count) {
      userDetails.followingCount = userDetails._count.following;
      userDetails.followersCount = userDetails._count.followers;

      delete userDetails._count; // Optional: remove the _count object if you don't need it
    }

    return c.json({ userDetails });
  } catch (e) {
    c.status(411);
    console.log(e);
    return c.json({ err: " Error while getting single blog post!" });
  }
});

authRouter.get("/myprofile", async (c) => {
  // const prisma = new PrismaClient({
  //   datasourceUrl: c.env.DATABASE_URL,
  // }).$extends(withAccelerate());
  const prisma = c.get("prisma");

  const userId = c.get("userId");
  try {
    const myDetails = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        name: true,
        tagLine: true,
        portfolioUrl: true,
        profileImg: true,
        email: true,
        followers: true,
        following: true,
        _count: {
          select: {
            following: true,
            followers: true,
          },
        },
      },
    });
    if (myDetails && myDetails._count) {
      myDetails.followingCount = myDetails._count.following;
      myDetails.followersCount = myDetails._count.followers;

      delete myDetails._count; // Optional: remove the _count object if you don't need it
    }
    return c.json({ myDetails });
  } catch (e) {
    c.status(411);
    console.log(e);
    return c.json({ err: " Error while getting single blog post!" });
  }
});

authRouter.put("/follow", async (c) => {
  // const prisma = new PrismaClient({
  //   datasourceUrl: c.env.DATABASE_URL,
  // }).$extends(withAccelerate());
  const prisma = c.get("prisma");
  const followerId = c.get("userId");
  // const followingId = c.req.param("id");
  const body = await c.req.json();
  const followingId = body.id;

  //  const userId = c.get("userId");

  try {
    if (followerId === followingId) {
      c.status(400);
      return c.json({ err: "You cannot follow yourself!" });
    }

    const result = await prisma.$transaction(async (prisma: any) => {
      const existingFollow = await prisma.follow.findUnique({
        where: {
          followerId_followingId: {
            followerId,
            followingId,
          },
        },
      });

      let response;

      if (!existingFollow) {
        const newFollowing = await prisma.follow.create({
          data: {
            follower: {
              connect: {
                id: followerId,
              },
            },
            following: {
              connect: {
                id: followingId,
              },
            },
          },
        });
        response = { message: "Followed", newFollowing: newFollowing };

        //  return c.json({ msg: "Followed!", newFollowing });
      } else {
        const deleteFollowing = await prisma.follow.delete({
          where: {
            followerId_followingId: {
              followerId,
              followingId,
            },
          },
        });

        response = { message: "Unfollowed", deleteFollowing: deleteFollowing };
      }
      return response;
    });

    return c.json(result);
  } catch (e) {
    c.status(411);
    console.log(e);
    return c.json({ err: " Error while Follow/Unfollow!" });
  }
});

authRouter.get("/allUsers", async (c) => {
  // const prisma = new PrismaClient({
  //   datasourceUrl: c.env.DATABASE_URL,
  // }).$extends(withAccelerate());
  const prisma = c.get("prisma");

  const userId = c.get("userId");

  const page = Number(c.req.query("page")) || 1;
  const limit = Number(c.req.query("limit")) || 5;
  try {
    const allUsers = await prisma.user.findMany({
      skip: (page - 1) * limit,
      take: limit,
      select: {
        id: true,
        name: true,
        profileImg: true,

        // email: true,
        // followers: true,
        // following: true,
      },
      where: {
        // NOT: {
        followers: {
          some: {
            followerId: userId,
          },
          // },
        },
      },
    });
    return c.json({ allUsers });
  } catch (e) {
    c.status(411);
    console.log(e);
    return c.json({ err: " Error while finding all Users!" });
  }
});

authRouter.get("/suggestions", async (c) => {
  const prisma = c.get("prisma");

  const id = String(c.get("userId"));
  // const id = c.req.param("id");

  const page = Number(c.req.query("page")) || 1;
  const limit = Number(c.req.query("limit")) || 1;

  try {
    const user = await prisma.user.findUnique({
      where: {
        // id: userId,
        id: id,
      },

      include: {
        following: true,
      },
    });
    if (!user) {
      return c.json({ error: "User not found" }, 404);
    }
    const followingList = user.following.slice(
      (page - 1) * limit,
      page * limit
    );
    console.log("followingList", user.following.length);

    const followingUserIds = user.following.map(
      (followingUser: any) => followingUser.followingId
    );

    console.log(followingUserIds);
    const suggestions = await prisma.user.findMany({
      where: {
        NOT: {
          OR: [
            {
              id: {
                in: followingUserIds,
              },
            },
            {
              id: id,
            },
          ],
        },
      },
      skip: (page - 1) * limit,
      take: page * limit,
      select: {
        id: true,
        name: true,
        profileImg: true,
      },
    });
    const count = user.following.length;
    console.log(suggestions);
    const followingPosts = await prisma.post.findMany({
      where: {
        authorId: {
          in: user.following.forEach((followingUser: any) => followingUser.id),
        },
      },
      skip: (page - 1) * limit,
      take: limit,
    });
    return c.json({
      // followingList,
      suggestions,
      page,
      limit,
      count,
      totalPages: Math.ceil(count / limit),
    });
  } catch (e) {
    c.status(411);
    console.log(e);
    return c.json({ err: " Error while getting single blog post!" });
  }
});
authRouter.get("/followings/:id", async (c) => {
  const prisma = c.get("prisma");

  // const id = String(c.get("userId"));
  const id = c.req.param("id");

  const page = Number(c.req.query("page")) || 1;
  const limit = Number(c.req.query("limit")) || 1;

  try {
    const user = await prisma.user.findUnique({
      where: {
        // id: userId,
        id: id,
      },

      include: {
        following: true,
      },
    });
    if (!user) {
      return c.json({ error: "User not found" }, 404);
    }
    const followingList = user.following.slice(
      (page - 1) * limit,
      page * limit
    );
    console.log("followingList", user.following.length);

    const followingUserIds = user.following.map(
      (followingUser: any) => followingUser.followingId
    );
    const folllowingUsers = await prisma.user.findMany({
      where: {
        id: {
          in: followingUserIds,
        },
      },
      skip: (page - 1) * limit,
      take: page * limit,
      select: {
        id: true,
        name: true,
        profileImg: true,
      },
    });
    const count = user.following.length;

    const followingPosts = await prisma.post.findMany({
      where: {
        authorId: {
          in: user.following.forEach((followingUser: any) => followingUser.id),
        },
      },
      skip: (page - 1) * limit,
      take: limit,
    });
    return c.json({
      // followingList,
      folllowingUsers,
      page,
      limit,
      count,
      totalPages: Math.ceil(count / limit),
    });
  } catch (e) {
    c.status(411);
    console.log(e);
    return c.json({ err: " Error while getting single blog post!" });
  }
});

authRouter.get("/followers/:id", async (c) => {
  const prisma = c.get("prisma");

  const userId = c.get("userId");
  const id = c.req.param("id");

  const page = Number(c.req.query("page")) || 1;
  const limit = Number(c.req.query("limit")) || 1;

  try {
    const user = await prisma.user.findUnique({
      where: {
        // id: userId,
        id: id,
      },

      include: {
        followers: true,
      },
    });
    if (!user) {
      return c.json({ error: "User not found" }, 404);
    }
    const followerList = user.followers.slice((page - 1) * limit, page * limit);
    console.log("followerList", user.followers.length);

    const followerUserIds = user.followers.map(
      (followerUser: any) => followerUser.followerId
    );
    const followerUsers = await prisma.user.findMany({
      where: {
        id: {
          in: followerUserIds,
        },
      },
      skip: (page - 1) * limit,
      take: page * limit,
      select: {
        id: true,
        name: true,
        profileImg: true,
      },
    });
    const count = user.followers.length;

    return c.json({
      // followingList,
      followerUsers,
      page,
      limit,
      count,
      totalPages: Math.ceil(count / limit),
    });
  } catch (e) {
    c.status(411);
    console.log(e);
    return c.json({ err: " Error while getting single blog post!" });
  }
});

authRouter.get("/myfollowings", async (c) => {
  const prisma = c.get("prisma");

  const id = String(c.get("userId"));

  const page = Number(c.req.query("page")) || 1;
  const limit = Number(c.req.query("limit")) || 1;

  try {
    const user = await prisma.user.findUnique({
      where: {
        // id: userId,
        id: id,
      },

      include: {
        following: true,
      },
    });
    if (!user) {
      return c.json({ error: "User not found" }, 404);
    }
    const followingList = user.following.slice(
      (page - 1) * limit,
      page * limit
    );
    console.log("followingList", user.following.length);

    const followingUserIds = user.following.map(
      (followingUser: any) => followingUser.followingId
    );
    const folllowingUsers = await prisma.user.findMany({
      where: {
        id: {
          in: followingUserIds,
        },
      },
      skip: (page - 1) * limit,
      take: page * limit,
      select: {
        id: true,
        name: true,
        profileImg: true,
      },
    });
    const count = user.following.length;

    const followingPosts = await prisma.post.findMany({
      where: {
        authorId: {
          in: user.following.forEach((followingUser: any) => followingUser.id),
        },
      },
      skip: (page - 1) * limit,
      take: limit,
    });
    return c.json({
      // followingList,
      folllowingUsers,
      page,
      limit,
      count,
      totalPages: Math.ceil(count / limit),
    });
  } catch (e) {
    c.status(411);
    console.log(e);
    return c.json({ err: " Error while getting single blog post!" });
  }
});

authRouter.get("/myfollowers", async (c) => {
  const prisma = c.get("prisma");

  const id = String(c.get("userId"));

  const page = Number(c.req.query("page")) || 1;
  const limit = Number(c.req.query("limit")) || 1;

  try {
    const user = await prisma.user.findUnique({
      where: {
        // id: userId,
        id: id,
      },

      include: {
        followers: true,
      },
    });
    if (!user) {
      return c.json({ error: "User not found" }, 404);
    }
    const followerList = user.followers.slice((page - 1) * limit, page * limit);
    console.log("followerList", user.followers.length);

    const followerUserIds = user.followers.map(
      (followerUser: any) => followerUser.followerId
    );
    const followerUsers = await prisma.user.findMany({
      where: {
        id: {
          in: followerUserIds,
        },
      },
      skip: (page - 1) * limit,
      take: page * limit,
      select: {
        id: true,
        name: true,
        profileImg: true,
      },
    });
    const count = user.followers.length;

    return c.json({
      // followingList,
      followerUsers,
      page,
      limit,
      count,
      totalPages: Math.ceil(count / limit),
    });
  } catch (e) {
    c.status(411);
    console.log(e);
    return c.json({ err: " Error while getting single blog post!" });
  }
});

authRouter.delete("/delete", async (c) => {
  const prisma = c.get("prisma");
  const userId = c.get("userId");
  // const { success } = deleteBlogInput.safeParse(body);
  // if (!success) {
  //   c.status(400);
  //   return c.json({ error: "Invalid Input!" });
  // }
  // const authorId = c.get("userId");

  try {
    await prisma.user.delete({
      where: {
        id: userId,
      },
    });
    // return c.json({ id: post.id });
    return c.json({ msg: "User Deleted Successfully!" });
  } catch (e) {
    c.status(411);
    console.log(e);
    return c.json({ err: "Error while deleting user!" });
  }
});

authRouter.put("/edit-profile", async (c) => {
  const prisma = c.get("prisma");
  const body = await c.req.parseBody();

  // const body = await c.req.json();
  const userId = c.get("userId");
  // const { success } = updateBlogInput.safeParse({
  //   id,
  //   ...body,
  // });
  // if (!success) {
  //   c.status(400);
  //   return c.json({ error: "Invalid Input!" });
  // }
  const file = body["file"];
  const oldUser = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
  let profilePicURL = oldUser?.profileImg;
  if (file && file instanceof File) {
    //  console.log("Uploading File to R2!");

    const prevFileName = oldUser?.profileImg?.split("/").pop();

    console.log(prevFileName);
    await c.env.HONO_R2_UPLOAD.delete(prevFileName);

    const fileName = file.lastModified + file.name;
    await c.env.HONO_R2_UPLOAD.put(fileName, file);

    console.log("fileName", fileName);
    profilePicURL = `${c.env.R2_URL}/${fileName}`;

    console.log("profilePicURL", profilePicURL);
  }
  try {
    const updatedProfile = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        name: body.name,
        tagLine: body.tagLine,
        shortBio: body.shortBio,
        profileImg: profilePicURL,
        portfolioUrl: body.portfolioUrl,
      },
    });

    return c.json({ updatedProfile });
  } catch (e) {
    c.status(411);
    console.log(e);
    return c.json({ err: "Error while updating blog posts!" });
  }
});

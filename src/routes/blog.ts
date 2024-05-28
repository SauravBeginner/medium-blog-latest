import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { verify } from "hono/jwt";
import {
  createBlogInput,
  updateBlogInput,
  deleteBlogInput,
} from "@10xcoder/medium-blog-common";
import { connect } from "mongoose";

export const blogRouter = new Hono<{
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
// blogRouter.use("/*", async (c, next) => {
//   const authHeader = c.req.header("authorization") || "";

//   try {
//     if (!authHeader) {
//       c.status(403);
//       return c.json({ err: "Unauthorized" });
//     }

//     const token = authHeader.split(" ")[1];
//     const user = await verify(token, c.env.JWT_SECRET);
//     if (user) {
//       c.set("userId", user.id);
//       await next();
//     } else {
//       c.status(403);
//       return c.json({ err: "Unauthorized" });
//     }
//   } catch (error) {
//     c.status(411);
//     return c.json({ err: "You are not logged in!" });
//   }
// });

blogRouter.post("/create", async (c) => {
  const prisma = c.get("prisma");

  // const body = await c.req.json();

  const body = await c.req.parseBody();

  // console.log(body["file"]); // File | string
  // await c.env.HONO_R2_UPLOAD.put(`medium.png`, file);
  const { success } = createBlogInput.safeParse(body);
  if (!success) {
    c.status(400);
    return c.json({ error: "Invalid Input!" });
  }
  const file = body["file"];
  console.log("file", file);

  let thumbNailURL = "";
  if (file && file instanceof File) {
    //  console.log("Uploading File to R2!");

    const fileName = file.lastModified + file.name;
    await c.env.HONO_R2_UPLOAD.put(fileName, file);

    // console.log("fileName", fileName);
    thumbNailURL = `${c.env.R2_URL}/${fileName}`;

    // console.log("thumbNailURL", thumbNailURL);
  }
  const authorId = c.get("userId");
  try {
    const post = await prisma.post.create({
      data: {
        title: body.title,
        content: body.content,
        slug: body.slug,
        authorId: authorId,
        thumbNail: thumbNailURL,
      },
    });
    return c.json({ id: post.id });
  } catch (e) {
    c.status(411);
    console.log(e);
    return c.json({ err: "Error while creating blog posts!" });
  }
});

blogRouter.put("/update/:id", async (c) => {
  const prisma = c.get("prisma");
  const body = await c.req.parseBody();

  // const body = await c.req.json();
  const authorId = c.get("userId");
  const id = String(c.req.param("id"));
  const { success } = updateBlogInput.safeParse({
    id,
    ...body,
  });
  if (!success) {
    c.status(400);
    return c.json({ error: "Invalid Input!" });
  }
  const file = body["file"];

  const oldPost = await prisma.post.findUnique({
    where: {
      id: id,
    },
  });
  let thumbNailURL = oldPost?.thumbNail;
  if (file && file instanceof File) {
    //  console.log("Uploading File to R2!");

    const prevFileName = oldPost?.thumbNail.split("/").pop();
    console.log(prevFileName);
    await c.env.HONO_R2_UPLOAD.delete(prevFileName);

    const fileName = file.lastModified + file.name;
    await c.env.HONO_R2_UPLOAD.put(fileName, file);

    console.log("fileName", fileName);
    thumbNailURL = `${c.env.R2_URL}/${fileName}`;

    console.log("thumbNailURL", thumbNailURL);
  }
  try {
    const post = await prisma.post.update({
      where: {
        id: id,
        authorId: authorId,
      },
      data: {
        title: body.title,
        content: body.content,
        slug: body.slug,
        thumbNail: thumbNailURL,
      },
    });

    return c.json({ post });
  } catch (e) {
    c.status(411);
    console.log(e);
    return c.json({ err: "Error while updating blog posts!" });
  }
});

blogRouter.delete("/delete", async (c) => {
  const prisma = c.get("prisma");

  const body = await c.req.json();
  const { success } = deleteBlogInput.safeParse(body);
  if (!success) {
    c.status(400);
    return c.json({ error: "Invalid Input!" });
  }
  const authorId = c.get("userId");

  try {
    await prisma.post.delete({
      where: {
        id: body.id,
        authorId: authorId,
      },
    });
    // return c.json({ id: post.id });
    return c.json({ msg: "Post Deleted Successfully!" });
  } catch (e) {
    c.status(411);
    console.log(e);
    return c.json({ err: "Error while updating blog posts!" });
  }
});
blogRouter.delete("/delete/all", async (c) => {
  const prisma = c.get("prisma");

  const body = await c.req.json();
  const { success } = deleteBlogInput.safeParse(body);
  if (!success) {
    c.status(400);
    return c.json({ error: "Invalid Input!" });
  }
  // const authorId = c.get("userId");

  try {
    await prisma.post.deleteMany();
    // return c.json({ id: post.id });
    return c.json({ msg: "Post Deleted Successfully!" });
  } catch (e) {
    c.status(411);
    console.log(e);
    return c.json({ err: "Error while updating blog posts!" });
  }
});
blogRouter.get("/post/:id", async (c) => {
  const prisma = c.get("prisma");
  const userId = c.get("userId");

  const id = c.req.param("id");
  // console.log(prisma);
  //   const body = await c.req.json();
  try {
    const post = await prisma.post.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        title: true,
        content: true,
        slug: true,
        thumbNail: true,
        createdAt: true,
        author: {
          select: {
            name: true,
            id: true,
            profileImg: true,
            _count: {
              select: {
                following: true,
                followers: true,
              },
            },
          },
        },
        _count: {
          select: {
            likes: true,
          },
        },
        likes: {
          where: {
            userId: userId,
          },
          select: {
            id: true,
          },
        },
      },
    });
    if (post && post._count) {
      post.likeCount = post._count.likes;
      delete post._count; // Optional: remove the _count object if you don't need it
    }
    post.hasLiked = post.likes?.length > 0;
    delete post.likes;

    if (post && post.author._count) {
      post.author.followingCount = post.author._count.following;
      post.author.followersCount = post.author._count.followers;

      delete post.author._count; // Optional: remove the _count object if you don't need it
    }

    if (!post) {
      c.status(411);
      return c.json({ err: "Invalid Post!" });
    }
    return c.json({ post });
  } catch (e) {
    c.status(411);
    console.log(e);
    return c.json({ err: " Error while getting single blog post!" });
  }
});
blogRouter.get("/bulk", async (c) => {
  const prisma = c.get("prisma");
  const userId = c.get("userId");
  const page = Number(c.req.query("page")) || 1;
  const limit = Number(c.req.query("limit")) || 5;

  try {
    const totalPosts = await prisma.post.count();
    const posts = await prisma.post.findMany({
      skip: (page - 1) * limit,
      take: limit,
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        title: true,
        content: true,
        thumbNail: true,
        createdAt: true,
        author: {
          select: {
            id: true,
            name: true,
            profileImg: true,
          },
        },
        _count: {
          select: {
            likes: true,
          },
        },
        likes: {
          where: {
            userId: userId,
          },
          select: {
            id: true,
          },
        },
      },
    });
    // .skip((page - 1) * limit)
    // .limit(limit);

    if (posts && posts.length > 0) {
      posts.forEach((post: any) => {
        if (post && post._count) {
          post.likeCount = post._count.likes;
          delete post._count;
        }
        // Check if the current user has liked the post
        post.hasLiked = post.likes?.length > 0;
        delete post.likes;
      });
    }

    return c.json({
      posts,
      page,
      limit,
      totalPosts,
      totalPages: Math.ceil(totalPosts / limit),
    });
  } catch (e) {
    c.status(411);
    console.log(e);
    return c.json({ err: " Error while getting single blog post!" });
  }
});

blogRouter.get("/myposts", async (c) => {
  const prisma = c.get("prisma");

  const userId = c.get("userId");
  const page = Number(c.req.query("page")) || 1;
  const limit = Number(c.req.query("limit")) || 5;

  try {
    const totalMyPosts = await prisma.post.count({
      where: {
        authorId: userId,
      },
    });
    const posts = await prisma.post.findMany({
      where: {
        authorId: userId,
      },

      skip: (page - 1) * limit,
      take: limit,
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        title: true,
        content: true,
        thumbNail: true,
        createdAt: true,
        author: {
          select: {
            name: true,
            id: true,
            profileImg: true,
          },
        },
        _count: {
          select: {
            likes: true,
          },
        },
        likes: {
          where: {
            userId: userId,
          },
          select: {
            id: true,
          },
        },
      },
    });

    if (posts && posts.length > 0) {
      posts.forEach((post: any) => {
        if (post && post._count) {
          post.likeCount = post._count.likes;
          delete post._count;
        }
        post.hasLiked = post.likes?.length > 0;
        delete post.likes;
      });
    }
    return c.json({
      posts,
      page,
      limit,
      totalMyPosts,
      totalPages: Math.ceil(totalMyPosts / limit),
    });
  } catch (e) {
    c.status(411);
    console.log(e);
    return c.json({ err: " Error while getting single blog post!" });
  }
});
blogRouter.get("/followingPosts", async (c) => {
  const prisma = c.get("prisma");

  const userId = c.get("userId");
  const page = Number(c.req.query("page")) || 1;
  const limit = Number(c.req.query("limit")) || 5;

  try {
    const totalFollowingPosts = await prisma.post.count({
      where: {
        author: {
          followers: {
            some: {
              followerId: userId,
            },
          },
        },
      },
    });

    const posts = await prisma.post.findMany({
      where: {
        author: {
          followers: {
            some: {
              followerId: userId,
            },
          },
        },
      },
      skip: (page - 1) * limit,
      take: limit,
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        title: true,
        content: true,
        thumbNail: true,
        createdAt: true,
        author: {
          select: {
            name: true,
            id: true,
            profileImg: true,
          },
        },
        _count: {
          select: {
            likes: true,
          },
        },
        likes: {
          where: {
            userId: userId,
          },
          select: {
            id: true,
          },
        },
      },
    });
    if (posts && posts.length > 0) {
      posts.forEach((post: any) => {
        if (post && post._count) {
          post.likeCount = post._count.likes;
          delete post._count;
        }
        post.hasLiked = post.likes?.length > 0;
        delete post.likes;
      });
    }
    return c.json({
      posts,
      page,
      limit,
      totalFollowingPosts,
      totalPages: Math.ceil(totalFollowingPosts / limit),
    });
  } catch (e) {
    c.status(411);
    console.log(e);
    return c.json({ err: " Error while getting single blog post!" });
  }
});
blogRouter.get("/userposts/:id", async (c) => {
  const prisma = c.get("prisma");

  const userId = c.get("userId");
  const id = c.req.param("id");

  const page = Number(c.req.query("page")) || 1;
  const limit = Number(c.req.query("limit")) || 5;

  try {
    const totalMyPosts = await prisma.post.count();
    const posts = await prisma.post.findMany({
      where: {
        authorId: id,
      },

      skip: (page - 1) * limit,
      take: limit,
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        title: true,
        content: true,
        thumbNail: true,
        createdAt: true,
        author: {
          select: {
            name: true,
            id: true,
            profileImg: true,
          },
        },
        _count: {
          select: {
            likes: true,
          },
        },
        likes: {
          where: {
            userId: userId,
          },
          select: {
            id: true,
          },
        },
      },
    });

    if (posts && posts.length > 0) {
      posts.forEach((post: any) => {
        if (post && post._count) {
          post.likeCount = post._count.likes;
          delete post._count;
        }
        post.hasLiked = post.likes?.length > 0;
        delete post.likes;
      });
    }
    return c.json({
      posts,
      page,
      limit,
      totalMyPosts,
      totalPages: Math.ceil(totalMyPosts / limit),
    });
  } catch (e) {
    c.status(411);
    console.log(e);
    return c.json({ err: " Error while getting single blog post!" });
  }
});
blogRouter.put("/like", async (c) => {
  const prisma = c.get("prisma");
  const userId = c.get("userId");
  const body = await c.req.json();
  try {
    const result = await prisma.$transaction(async (prisma: any) => {
      // Check if the user has already liked the post
      const existingLike = await prisma.like.findUnique({
        where: {
          postId_userId: {
            postId: body.id,
            userId: userId,
          },
        },
      });

      let response;

      if (existingLike) {
        // If the user has already liked the post, unlike it
        await prisma.like.delete({
          where: {
            id: existingLike.id,
          },
        });
        // console.log(likepost.id);
        response = { message: "unliked", hasLiked: false };

        // return c.json({ likepost, message: "unliked" });
      } else {
        // If no like exists, create a new like
        await prisma.like.create({
          data: {
            post: {
              connect: {
                id: body.id,
              },
            },
            user: {
              connect: {
                id: userId,
              },
            },
          },
        });
        // console.log("likepost", likepost);
        response = { message: "liked", hasLiked: true };

        // return c.json({ likepost, message: "liked" });
      } // Fetch the updated like count for the post
      const updatedLikeCount = await prisma.like.count({
        where: {
          postId: body.id,
        },
      });

      // Include the updated like count in the response
      //  @ts-ignore
      response.likeCount = updatedLikeCount;

      return response;
    });

    return c.json(result);
  } catch (e) {
    c.status(500);
    console.log(e);
    return c.json({ err: "Error while processing like action!" });
  }
});

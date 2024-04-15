import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { verify } from "hono/jwt";
import { createBlogInput, updateBlogInput } from "@10xcoder/medium-blog-common";

export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
  };
}>();

// middleware
blogRouter.use("/*", async (c, next) => {
  const authHeader = c.req.header("authorization") || "";

  try {
    if (!authHeader) {
      c.status(403);
      return c.json({ err: "Unauthorized" });
    }

    const token = authHeader.split(" ")[1];
    const user = await verify(token, c.env.JWT_SECRET);
    if (user) {
      c.set("userId", user.id);
      await next();
    } else {
      c.status(403);
      return c.json({ err: "Unauthorized" });
    }
  } catch (error) {
    c.status(411);
    return c.json({ err: "You are not logged in!" });
  }
});

blogRouter.post("/create", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const { success } = createBlogInput.safeParse(body);
  if (!success) {
    c.status(400);
    return c.json({ error: "Invalid Input!" });
  }
  const authorId = c.get("userId");
  try {
    const post = await prisma.post.create({
      data: {
        title: body.title,
        content: body.content,
        authorId: authorId,
      },
    });
    return c.json({ id: post.id });
  } catch (e) {
    c.status(411);
    console.log(e);
    return c.json({ err: "Error while creating blog posts!" });
  }
});

blogRouter.put("/update", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const { success } = updateBlogInput.safeParse(body);
  if (!success) {
    c.status(400);
    return c.json({ error: "Invalid Input!" });
  }
  const authorId = c.get("userId");

  try {
    const post = await prisma.post.update({
      where: {
        id: body.id,
        authorId: authorId,
      },
      data: {
        title: body.title,
        content: body.content,
      },
    });
    return c.json({ id: post.id });
  } catch (e) {
    c.status(411);
    console.log(e);
    return c.json({ err: "Error while updating blog posts!" });
  }
});
blogRouter.get("/post/:id", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const id = c.req.param("id");
  //   const body = await c.req.json();
  try {
    const post = await prisma.post.findUnique({
      where: {
        id: id,
      },
    });
    if (!post) {
      c.status(411);
      return c.json({ err: "Invalid Post!" });
    }
    return c.json({ id: post });
  } catch (e) {
    c.status(411);
    console.log(e);
    return c.json({ err: " Error while getting single blog post!" });
  }
});
blogRouter.get("/bulk", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    const posts = await prisma.post.findMany();
    return c.json({ posts });
  } catch (e) {
    c.status(411);
    console.log(e);
    return c.json({ err: " Error while getting single blog post!" });
  }
});

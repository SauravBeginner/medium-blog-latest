import { Hono } from "hono";
import { blogRouter } from "./blog";
import { verify } from "hono/jwt";
import { authRouter } from "./auth";

export const rootAuthRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
    prisma: any;
  };
}>();

// middleware
rootAuthRouter.use("/*", async (c, next) => {
  const authHeader = c.req.header("authorization") || "";

  try {
    if (!authHeader) {
      c.status(401);
      return c.json({ err: "Unauthorized" });
    }

    const token = authHeader.split(" ")[1];
    const user = await verify(token, c.env.JWT_SECRET);
    if (user) {
      c.set("userId", user.id);
      await next();
    } else {
      c.status(401);
      return c.json({ err: "Unauthorized" });
    }
  } catch (error) {
    c.status(401);
    return c.json({ err: "You are not logged in!" });
  }
});

rootAuthRouter.route("/blog", blogRouter);
rootAuthRouter.route("/user", authRouter);

import { Hono } from "hono";
import { userRouter } from "./routes/user";
import { blogRouter } from "./routes/blog";
import { signupInput } from "@10xcoder/medium-blog-common";
const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

app.get("/", async (c) => {
  return c.text("Hello Hono!");
});

app.route("/api/v1/user/", userRouter);
app.route("/api/v1/blog/", blogRouter);

export default app;

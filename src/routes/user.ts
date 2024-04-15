import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { sign } from "hono/jwt";
import { signinInput, signupInput } from "@10xcoder/medium-blog-common";

export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();
const hashedPassword = async (password: any) => {
  const myText = new TextEncoder().encode(password);

  const myPasswordEncryption = await crypto.subtle.digest(
    {
      name: "SHA-256",
    },
    myText // The data you want to hash as an ArrayBuffer
  );
  const pwd = new Uint8Array(myPasswordEncryption);

  const hashAsString = Array.from(pwd)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  return hashAsString;
};

userRouter.post("/signup", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();

  const { success } = signupInput.safeParse(body);
  if (!success) {
    c.status(400);
    return c.json({ error: "Invalid Input!" });
  }
  try {
    const pwd = await hashedPassword(body.password);

    // console.log("----password-----", pwd);

    const user = await prisma.user.create({
      data: {
        email: body.email,
        password: pwd,
        name: body.name,
      },
    });

    const token = await sign({ id: user.id }, c.env.JWT_SECRET);
    console.log(user, token);
    return c.json({ jwt: token, user });
  } catch (error) {
    console.log(error);
    c.status(403);
    return c.json({ error: "Error While Signing up!" });
  }
});

userRouter.post("/signin", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const body = await c.req.json();
  const { success } = signinInput.safeParse(body);
  if (!success) {
    c.status(400);
    return c.json({ error: "Invalid Input!" });
  }
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: body.email,
        // password: body.password,
      },
    });

    if (!user) {
      c.status(403);
      return c.json({ error: "User Not Found!" });
    }
    const pwd = await hashedPassword(body.password);

    const isPasswordValid = pwd.toString() === user?.password;

    if (isPasswordValid) {
      const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
      return c.json({ jwt, user });
    } else {
      c.status(403);
      return c.json({ error: "Password is Invalid!" });
    }
  } catch (error) {
    console.log(error);
    c.status(403);
    return c.json({ error: "Error While Logging in!" });
  }
});

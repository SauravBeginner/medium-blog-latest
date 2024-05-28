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
  Variables: {
    prisma: any;
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
  // const prisma = new PrismaClient({
  //   datasourceUrl: c.env.DATABASE_URL,
  // }).$extends(withAccelerate());

  const prisma = c.get("prisma");
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
    return c.json({ error: "User Already Exisit!" });
  }
});

userRouter.post("/signin", async (c) => {
  // const prisma = new PrismaClient({
  //   datasourceUrl: c.env.DATABASE_URL,
  // }).$extends(withAccelerate());

  const prisma = c.get("prisma");

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
    const expiresIn = 60 * 60 * 24; // Token expires in 1 hour (3600 seconds)
    const expirationTime = Math.floor(Date.now() / 1000) + expiresIn;

    if (isPasswordValid) {
      const jwtPayload = {
        id: user.id,
        exp: expirationTime,
      };
      console.log("expiration", expirationTime);
      const jwt = await sign(jwtPayload, c.env.JWT_SECRET);
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

const users = [
  { email: "user1@example.com", password: "password1", name: "User 1" },
  { email: "user2@example.com", password: "password2", name: "User 2" },
  // add more users as needed
];
userRouter.post("/register", async (c) => {
  const prisma = c.get("prisma");
  const bodies = await c.req.json(); // Assuming the request body is an array of user objects

  // Validate each user object in the array
  const validUsers = [];
  const invalidUsers = [];
  for (const body of bodies) {
    const { success } = signupInput.safeParse(body);
    if (!success) {
      invalidUsers.push({ error: "Invalid Input!", user: body });
    } else {
      validUsers.push(body);
    }
  }

  try {
    const pwdPromises = validUsers.map(async (body) => {
      const pwd = await hashedPassword(body.password);
      return pwd;
    });

    const hashedPasswords = await Promise.all(pwdPromises);

    const createUsersPromises = validUsers.map(async (body, index) => {
      const user = await prisma.user.create({
        data: {
          email: body.email,
          password: hashedPasswords[index],
          name: body.name,
        },
      });
      return user;
    });

    const createdUsers = await Promise.all(createUsersPromises);

    // Return the created users along with tokens if needed
    const tokens = await Promise.all(
      createdUsers.map((user) => sign({ id: user.id }, c.env.JWT_SECRET))
    );

    const userTokenPairs = createdUsers.map((user, index) => ({
      user,
      jwt: tokens[index],
    }));

    console.log(userTokenPairs);
    return c.json({ users: userTokenPairs });
  } catch (error) {
    console.log(error);
    c.status(403);
    return c.json({ error: "Error While Signing up!" });
  }
});

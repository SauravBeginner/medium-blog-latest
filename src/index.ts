import { Hono } from "hono";
import { userRouter } from "./routes/user";
import { blogRouter } from "./routes/blog";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { cors } from "hono/cors";
import { rootAuthRouter } from "./routes/rootAuth";
import { upgradeWebSocket } from "hono/cloudflare-workers";
import { v4 as uuid4 } from "uuid";
// type Bindings = {
//   HONO_R2_UPLOAD: Bindings;
// };

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
    HONO_R2_UPLOAD: any;
  };
  Variables: {
    prisma: any;
  };
}>();

app.use(
  "/*",
  cors({
    origin: [
      "http://localhost:5173",
      "https://blog.tech10x.online",
      "http://localhost:5174",
      "https://medium.tech10x.online",
    ],
    credentials: true,
  })
);

app.get("/", async (c) => {
  return c.text("Hello Hono!");
});
app.post("/api/v1/upload", async (c) => {
  const body = await c.req.parseBody();

  const file = body["file"];
  if (file && file instanceof File) {
    console.log("Uploading File to R2!");
  }

  console.log(body["file"]); // File | string
  await c.env.HONO_R2_UPLOAD.put(`medium.png`, file);
  console.log("Uploading file to R2 completeed!");
  return c.text("File uploaded!");
});

// app.get("/api/v1/download", async (c) => {
//   //  const filename = c.req.param("filename");
//   const file = await c.env.HONO_R2_UPLOAD.get("mediumblog.png");
//   const headers = new Headers();
//   file.writeHttpMetadata(headers);

//   console.log(file.writeHttpMetadata(headers));
//   headers.set("etag", JSON.parse(file.httpEtag));
//   console.log(headers);
//   return c.json(file);
// });
// app.get("/api/v1/getFile", async (c) => {
//   //  const filename = c.req.param("filename");

//   const header = c.req.header("etag");

//   if (!header) {
//     return c.json({
//       error: "etag is required",
//     });
//   }
//   const file = await c.env.HONO_R2_UPLOAD.get("medium.png");

//   return c.json(file);
// });
const activeConnections = new Map();

app.get(
  "/ws",
  upgradeWebSocket((c) => {
    return {
      onMessage(event, ws) {
        const connectionId = uuid4();
        activeConnections.set(connectionId, ws);
        // console.log(`Message from client: ${event.data}`);

        try {
          const message = event.data;
          console.log(`Message from client: ${message}`);
          console.log(activeConnections);
          ws.send(
            JSON.stringify({ status: "success", message: "Like registered" })
          );
        } catch (err) {
          console.error("Error processing message", err);
          ws.send(
            JSON.stringify({
              status: "error",
              message: "Invalid message format",
            })
          );
        }

        ws.send("Hello from server!");
      },
      onClose: () => {
        console.log("Connection closed");
      },
      onError: (err) => {
        console.error("WebSocket error", err);
      },
    };
  })
);

app.use("/*", async (c, next) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  c.set("prisma", prisma);
  await next();
});

app.route("/api/v1", userRouter);
app.route("/api/v1/auth", rootAuthRouter);
// app.route("/api/v1/blog", blogRouter);

export default app;

import "dotenv/config"

import Fastify from "fastify"
import jwt from "@fastify/jwt"
import { resolve } from "path"
import cors from "@fastify/cors"
import multipart from "@fastify/multipart"

import { authRoutes } from "./routes/auth"
import { uploadRoutes } from "./routes/upload"
import { memoriesRoutes } from "./routes/memories"

const app = Fastify()

app.register(multipart)

app.register(require("@fastify/static"), {
  root: resolve(__dirname, "../uploads"),
  prefix: "/uploads",
})

app.register(cors, {
  origin: true,
})

app.register(jwt, {
  secret: "spacetime",
})

app.register(authRoutes)
app.register(uploadRoutes)
app.register(memoriesRoutes)

app
  .listen({
    port: 3333,
    host: "0.0.0.0",
  })
  .then(() => {
    console.log("🚀 HTTP server running on http://localhost:3333")
  })

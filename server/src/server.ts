import "dotenv/config"

import Fastify from "fastify"
import jwt from "@fastify/jwt"
import cors from "@fastify/cors"
import { memoriesRoutes } from "./routes/memories"
import { authRoutes } from "./routes/auth"

const app = Fastify()

app.register(cors, {
  origin: true,
})

app.register(jwt, {
  secret: "spacetime",
})

app.register(memoriesRoutes)
app.register(authRoutes)

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log("🚀 HTTP server running on http://localhost:3333")
  })

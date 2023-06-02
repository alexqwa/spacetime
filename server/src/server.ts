import Fastify from "fastify"
import cors from "@fastify/cors"
import { memoriesRoutes } from "./routes/memories"

const app = Fastify()

app.register(memoriesRoutes)
app.register(cors, {
  origin: true,
})

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log("🚀 HTTP server running on http://localhost:3333")
  })

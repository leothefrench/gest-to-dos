import type { FastifyInstance } from "fastify";
import  { getUsers } from "../controllers/userController.js";

export default async function userRoutes(fastify: FastifyInstance) {
    fastify.get("/users", getUsers)
}
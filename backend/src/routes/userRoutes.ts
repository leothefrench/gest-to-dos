import type { FastifyInstance } from "fastify";
import  { postUser, getUsers, getUserById, updateUserById, deleteUserById } from "../controllers/userController.js";

export default async function userRoutes(fastify: FastifyInstance) {
    fastify.post("/users", postUser)
    fastify.get("/users", getUsers) 
    fastify.get("/users/:id", getUserById)
    fastify.patch("/users/:id", updateUserById)
    fastify.delete("/users/:id", deleteUserById)
}

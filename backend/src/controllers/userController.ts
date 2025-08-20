import type { FastifyReply, FastifyRequest } from "fastify";
import { fetchAllUsers } from "../services/userService.js";

export async function getUsers(request: FastifyRequest, reply: FastifyReply) {
    const users = await fetchAllUsers()
    reply.send(users)
}
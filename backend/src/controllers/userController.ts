import type { FastifyReply, FastifyRequest } from "fastify";
import { createUser, fetchAllUsers } from "../services/userService.js";
import { createUserSchema } from "../utils/userSchemas.js";
import type { CreateUserBody } from "../utils/userSchemas.js";

export async function postUser(request: FastifyRequest<{ Body: CreateUserBody }>, reply: FastifyReply) {
  try {
    // Zod valide dynamiquement le body de la requête
    const validatedBody = createUserSchema.parse(request.body);

    const user = await createUser(validatedBody);

    return reply.status(201).send(user);
  } catch (error: any) {
    if (error.name === "ZodError") {
      return reply.status(400).send({ errors: error.errors });
    }

    // Check is email already exists
    if (error.message === "Un utilisateur avec cet email existe déjà") {
      return reply.status(409).send({ error: error.message }); // 409 = Conflict
    }
    return reply.status(500).send({ error: "Failed to create user" });
  }
}

export async function getUsers(request: FastifyRequest, reply: FastifyReply) {
    const users = await fetchAllUsers()
    reply.send(users)
}

 /* export async function getUserById(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.params as { id: string };
    const user = await fetchUser(id)
} */
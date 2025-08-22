import { prisma } from "../lib/prisma.js";
import bcrypt from "bcrypt";
import type { CreateUserBody } from "../utils/userSchemas.js";

export async function createUser(data: CreateUserBody) {
    // Check if the User already exists
    const existingUser = await prisma.user.findUnique({
        where: { email: data.email },
    })

    if (existingUser) throw new Error("User already exists")

    // Hasch du password
    const hashPasword = await bcrypt.hash(data.password, 10)

    return prisma.user.create({
        data: {
            email: data.email,
            name: data.name,
            password: hashPasword,
        }
    })
}

export async function fetchAllUsers() {
    return await prisma.user.findMany()
}
import { prisma } from "../lib/prisma.js";

export async function fetchAllUsers() {
    return await prisma.user.findMany()
}
import { z } from "zod";

export const createUserSchema = z.object({
    email: z.email({ message: "Email invalide" }),
    name: z.string().min(3, { message: "Le nom doit avoir au moins 3 caractères" }),
    password: z.string().min(8, { message: "Le mot de passe doit avoir au moins 8 caractères" }).regex(
        /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/,
        { message: "Le mot de passe doit contenir majuscule, minuscule, chiffre et caractère spécial" }
    )
});

// On génère automatiquement le type TS à partir du schéma
export type CreateUserBody = z.infer<typeof createUserSchema>;
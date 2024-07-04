import {PrismaClient} from '@prisma/client'

// usara el archivo .env para saber donde esta la bd
export const prisma = new PrismaClient() 

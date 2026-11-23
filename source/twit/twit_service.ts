import { PrismaClient } from "../../generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";
import { CreateTwit } from "./twit_props.js";

const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({ adapter });

export class TwistService {
    async createTwit(twit: CreateTwit) {
        return await prisma.twit.create({
            data: twit
        });
    }
}
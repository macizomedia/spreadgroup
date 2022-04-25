import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

import helpers from "./helpers";

const server = express();
server.use(cors({ origin: "*" }));

server.use(express.json());
server.use(express.urlencoded({ extended: true }));

const prisma = new PrismaClient();

async function isUserExist(payload: any) {
	const { email } = payload;
	const user = await prisma.user.findUnique({
		where: {
			email
		}
	});
	if (user) {
		throw new Error("User already exist");
	} else {
		return false;
	}
}

export async function addUser(payload: any) {
	if (await isUserExist(payload)) {
		throw new Error("User already exist");
	} else {
		try {
			const user = await prisma.user.create({
				data: {
					...payload
				}
			});
			return user;
		} catch (error) {
			throw error;
		}
	}
}

export async function getAllUsers() {
	const users = await prisma.user.findMany();
	return users;
}

server.post("/signup", async (req, res) => {
	let user = await addUser(req.body);
	console.log("from_db", user);
	res.json({ message: "success", token: "token" });
});

server.listen(4000, () => {
	console.log(`Server running on http://localhost:4000`);
});

import express from 'express'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export async function addUser(payload: any) {
  await prisma.user.create({
    data: {
      name: payload.name,
    }

  })
}

async function getAllUsers() {
  const users = await prisma.user.findMany()
  return users
}
const server = express()

server.get('/', async (req, res) => {
  let users = await getAllUsers()
  res.json(users)
})

server.listen(3000, () => {
  console.log(`Server running on http://localhost:3000`)
})
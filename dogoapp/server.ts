import express from 'express'
import cors from 'cors'
import { PrismaClient } from '@prisma/client'


import helpers from './helpers'

const server = express()
server.use(cors({ origin: '*' }))

server.use(express.json())
server.use(express.urlencoded({ extended: true }))

const prisma = new PrismaClient()

export async function addUser(payload: any) {
  const alreadyUser = await prisma.user.findUnique({
    where: {
      email: payload.email,
    },
    select: {
      email: true,
      name: true,
    },
  })
  let password = helpers.hash(payload.password)
  if (!alreadyUser) {
    const user = await prisma.user.create({

      data: {
        name: payload.name,
        email: payload.email,
        password: password,
      }

    })
    return user
  } else {
    return { message: 'User already exists' }
  }
}

export async function getAllUsers() {
  const users = await prisma.user.findMany()
  return users
}

server.post('/signup', async (req, res) => {
  let user = await addUser(req.body)
  console.log(user)
  res.json({ message: 'success', token: 'token' })
})

server.listen(4000, () => {
  console.log(`Server running on http://localhost:4000`)
})


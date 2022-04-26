import express from 'express'
import cors from 'cors'
import { PrismaClient, User } from '@prisma/client'

import helpers from './helpers'

const server = express()
server.use(cors({ origin: '*' }))

server.use(express.json())
server.use(express.urlencoded({ extended: true }))

const prisma = new PrismaClient()

/**
 *
 * @param payload
 * @param res
 * @param next
 **/

/** Request Handlers */

const getUsers = async (
    id: User['id'],
    callback: (number: number, User: User | null) => void
) => {
    const users = await prisma.user.findUnique({
        where: {
            id,
        },
    })
    callback(200, users)
}

async function isUserExist(email: User['email']) {
    const user = await prisma.user.findUnique({
        where: {
            email,
        },
    })
    if (user) {
        return true
    } else {
        return false
    }
}

export async function addUser(payload: User) {
    const { name, email, password } = payload
    if (await isUserExist(payload.email)) {
        return
    } else {
        const hashedPassword = await helpers.hashPassword(password)
        try {
            const user = await prisma.user.create({
                data: {
                    name,
                    email,
                    password: hashedPassword,
                },
            })
            return user
        } catch (error) {
            throw error
        }
    }
}

export async function getAllUsers() {
    const users = await prisma.user.findMany()
    return users
}

server.get('/users', async (req, res) => {
    const users = await getAllUsers()
    res.status(200).send(users)
})

server.get('/users/:id', async (req, res) => {
    const { id } = req.params
    await getUsers(+id, (status, data) => {
        res.status(status).send(data)
    })
})

server.post('/signup', async (req, res) => {
    let user = await addUser(req.body)
    if (user) {
        res.status(200).send(user)
    } else {
        res.status(400).send({
            message: 'User already exist',
        })
    }
})

server.listen(4000, () => {
    console.log(`Server running on http://localhost:4000`)
})

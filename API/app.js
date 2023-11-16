
const { Prisma, PrismaClient } = require('@prisma/client')
const express = require('express')
var cors = require('cors')
const app = express()
const port = 3600


let prisma = new PrismaClient()

app.use(cors())

app.get('/feed', async (req, res) => {// fetch no localcost na porta 3500/feed
  const posts = await prisma.UsuarisHotelaria.findMany()
  console.log(posts);
  if (posts) {
    res.status(200).json(posts);
  }
})

// app.post('/post', async (req, res) => {
//   const { nome, email, cpf, cnpj, senha } = req.body
//   const post = await prisma.usuarisHotelaria.create({
//     data: {
//       nome,
//       email,
//       cpf,
//       cnpj,
//       senha,
//       published: false,
//       author: { connect: { email: email } },
//     },
//   })
//   res.json(post)
// })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
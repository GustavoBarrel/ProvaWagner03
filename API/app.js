const { PrismaClient } = require('@prisma/client');
const express = require('express');
const jwt = require('jsonwebtoken');
const Cookies = require('js-cookie');
const cors = require('cors');
const app = express();
const port = 3600;

const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());


function generateToken(user) {
  const payload = {
    userId: user.id,
    email: user.email,
    admin: user.admin,
  };

  const token = jwt.sign(payload, 'secreto', { expiresIn: '1h' });

  return token;
}

function verificarAdmin(req, res, next) {
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Token não fornecido' });
  }

  jwt.verify(token, 'secreto', (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: 'Token inválido' });
    }

    // Verifica se o usuário tem permissão de administrador
    if (!decoded.admin) {
      return res.status(403).json({ error: 'Permissão de administrador necessária' });
    }

    req.userId = decoded.userId; // Adiciona o ID do usuário ao objeto de requisição para uso posterior
    next();
  });
}

// Usuarios
//Login
app.post('/login', async (req, res) => {
  const { email, senha } = req.body;

  try {
    const user = await prisma.usuarioshotel1.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      throw new NotFoundException(`No user found for email: ${email}`);
    }

    const isPasswordValid = user.senha === senha;

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }
    const token = generateToken(user);


    const redirectUrl = user.admin ? '/Dashboard' : '/Principal';

    return res.status(200).json({ message: 'Login bem-sucedido', redirectUrl, message: token });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'Erro interno do servidor', error });
  }
});

// feed

app.get('/feedusuarios', async (req, res) => {
  const posts = await prisma.usuarioshotel1.findMany();
  if (posts) {
    res.status(200).json(posts);
  }
});
// delete
app.delete('/ExcluirUsuario/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedUser = await prisma.usuarioshotel1.delete({
      where: {
        id: parseInt(id, 10), // Certifique-se de converter o ID para o tipo apropriado, se necessário
      },
    });

    res.status(200).json({ message: 'Usuário excluído com sucesso', deletedUser });
  } catch (error) {
    console.error('Erro ao excluir usuário:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

//Cadastro 
app.post('/CadastroUsuario', async (req, res) => {
  const { nome, cpf, cnpj, email, senha } = req.body;

  try {
    const post = await prisma.usuarioshotel1.create({
      data: {
        nome,
        cpf,
        cnpj,
        email,
        senha,
        admin: false,
      },
    });

    res.status(201).json(post);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
//admin
app.post('/CadastroUsuarioAdmin', async (req, res) => {
  const { nome, cpf, cnpj, email, senha } = req.body;

  try {
    const post = await prisma.usuarioshotel1.create({
      data: {
        nome,
        cpf,
        cnpj,
        email,
        senha,
        admin: true,
      },
    });

    res.status(201).json(post);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Fim Usuarios

//Inicio Produtos
//delete
app.delete('/ExcluirProduto/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedUser = await prisma.quartoshotel1.delete({
      where: {
        id_produto: parseInt(id, 10), // Certifique-se de converter o ID para o tipo apropriado, se necessário
      },
    });

    res.status(200).json({ message: 'Usuário excluído com sucesso', deletedUser });
  } catch (error) {
    console.error('Erro ao excluir usuário:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

//feed
app.get('/FeedProdutos', async (req, res) => {
  const posts = await prisma.quartoshotel1.findMany();
  console.log(posts);
  if (posts) {
    res.status(200).json(posts);
  }
});
app.get('/FeedProdutosativos', async (req, res) => {
  const posts = await prisma.quartoshotel1.findMany({
    where: {
      status: true,
    }
  });
  console.log(posts);
  if (posts) {
    res.status(200).json(posts);
  }
});
//feeed produtos ativos
app.get('/feedprodutosativos', async (req, res) => {
  const posts = await prisma.quartoshotel1.findMany({
    where: {
      status: true,
    },

  });
  console.log(posts);
  if (posts) {
    res.status(200).json(posts);
  }
});


//cadastro
app.post('/CadastroProduto', async (req, res) => {
  const { titulo, descricao, valor } = req.body;

  try {
    const post = await prisma.quartoshotel1.create({
      data: {
        titulo,
        descricao,
        valor,
        status: true,
      },
    });

    res.status(201).json(post);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//Fim Produtos

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

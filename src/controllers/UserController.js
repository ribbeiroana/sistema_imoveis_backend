import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();
import { hash } from 'bcrypt';
export default {
  async createUser(req, res){
    const { name, email, password } = req.body;

    try {
    const users = await prisma.users.findUnique({ where: {email} }); 

    if (users){
      return res.json({message: 'Usuário já existe'})
    }

    const HashPassword = await hash(password, 8)

    users = await prisma.users.create({
      data: {
        name,
        email,
        password: HashPassword
      }
    });

    return res.json(users);

    }catch(error){
      return res.json({ message: error.message })
    }

  },

  async findAllUser(req, res){
    try {
      const users = await prisma.users.findMany();
      return res.json(users);

    }catch(error){
      return res.json({ message: error.message })
    }
  }
} 
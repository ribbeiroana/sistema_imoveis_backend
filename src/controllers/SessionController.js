import { PrismaClient } from "@prisma/client";
import { compare } from "bcrypt";
import jwt from "jsonwebtoken";
const prisma = new PrismaClient();

export default {
  async createSession(request, response) {
    try {
      const { email, password } = request.body;
      const users = await prisma.users.findUnique({ where: { email } });

      if (!users) {
        return response.json({ 
          error: false,
          message: "usuário ou senha incorretos EMAIL" 
        })
      }

      const checkPassword = await compare(password, users.password);

      if (!checkPassword) {
        return response.json({ 
          error: false,
          message: "usuário ou senha incorretos SENHA" 
        })
      }

      const token = jwt.sign({ id: users.id }, "698dc19d489c4e4db73e28a713eab07b", {
        expiresIn: '1d'
      });

      delete users.password;

      return response.json({ 
        error: true,
        message: "Login efetuado com sucesso. Aguarde...!",
        users, 
        token 
      })

    } catch (error) {
      return response.json({ message: error.message })
    }
  }
}
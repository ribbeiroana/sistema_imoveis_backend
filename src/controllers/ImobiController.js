import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default {
  async createImobi(req, res){
    try {
      const { id, tipo, endereço, cidade, uf, valor, descricao } = req.body;

      const users = await prisma.users.findUnique({ where: { id: Number(id) } });

      if(!users){
        return res.json({ message: 'Usuário não encontrado!' });
      }

      const imobi = await prisma.imobi.create({
        data:{
          tipo,
          endereço,
          cidade,
          uf,
          valor,
          descricao,
          userId: users.id,
        }
      });
      return res.json(imobi);
    }catch (error) {
      return res.json({ message: error.message })
    }

  }
}
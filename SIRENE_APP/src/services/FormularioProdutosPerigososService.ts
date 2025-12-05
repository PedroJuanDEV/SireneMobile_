import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class FormularioProdutosPerigososService {
  static async criarFormulario(data: any) {
    return prisma.formularioProdutosPerigosos.create({ data });
  }

  static async listarFormularios() {
    return prisma.formularioProdutosPerigosos.findMany();
  }

  static async buscarPorId(id: string) {
    return prisma.formularioProdutosPerigosos.findUnique({ where: { id } });
  }

  static async atualizarFormulario(id: string, data: any) {
    return prisma.formularioProdutosPerigosos.update({ where: { id }, data });
  }

  static async removerFormulario(id: string) {
    return prisma.formularioProdutosPerigosos.delete({ where: { id } });
  }
}

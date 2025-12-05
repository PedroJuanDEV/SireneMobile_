import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class FormularioIncendioService {
  static async criarFormulario(data: any) {
    return prisma.formularioIncendio.create({ data });
  }

  static async listarFormularios() {
    return prisma.formularioIncendio.findMany();
  }

  static async buscarPorId(id: string) {
    return prisma.formularioIncendio.findUnique({ where: { id } });
  }

  static async atualizarFormulario(id: string, data: any) {
    return prisma.formularioIncendio.update({ where: { id }, data });
  }

  static async removerFormulario(id: string) {
    return prisma.formularioIncendio.delete({ where: { id } });
  }
}

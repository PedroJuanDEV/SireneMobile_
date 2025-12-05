import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class FormularioBasicoService {
  static async criarFormulario(data: any) {
    return prisma.formularioBasico.create({ data });
  }

  static async listarFormularios() {
    return prisma.formularioBasico.findMany();
  }

  static async buscarPorId(id: string) {
    return prisma.formularioBasico.findUnique({ where: { id } });
  }

  static async atualizarFormulario(id: string, data: any) {
    return prisma.formularioBasico.update({ where: { id }, data });
  }

  static async removerFormulario(id: string) {
    return prisma.formularioBasico.delete({ where: { id } });
  }
}

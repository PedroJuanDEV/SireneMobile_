import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class FormularioSalvamentoService {
  static async criarFormulario(data: any) {
    return prisma.formularioSalvamento.create({ data });
  }

  static async listarFormularios() {
    return prisma.formularioSalvamento.findMany();
  }

  static async buscarPorId(id: string) {
    return prisma.formularioSalvamento.findUnique({ where: { id } });
  }

  static async atualizarFormulario(id: string, data: any) {
    return prisma.formularioSalvamento.update({ where: { id }, data });
  }

  static async removerFormulario(id: string) {
    return prisma.formularioSalvamento.delete({ where: { id } });
  }
}

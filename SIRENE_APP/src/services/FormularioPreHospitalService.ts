import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class FormularioPreHospitalService {
  static async criarFormulario(data: any) {
    return prisma.formularioPreHospital.create({ data });
  }

  static async listarFormularios() {
    return prisma.formularioPreHospital.findMany();
  }

  static async buscarPorId(id: string) {
    return prisma.formularioPreHospital.findUnique({ where: { id } });
  }

  static async atualizarFormulario(id: string, data: any) {
    return prisma.formularioPreHospital.update({ where: { id }, data });
  }

  static async removerFormulario(id: string) {
    return prisma.formularioPreHospital.delete({ where: { id } });
  }
}

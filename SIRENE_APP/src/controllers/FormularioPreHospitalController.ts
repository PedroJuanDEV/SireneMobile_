import { Request, Response } from 'express';
import { FormularioPreHospitalService } from '../services/FormularioPreHospitalService';

export class FormularioPreHospitalController {
  static async criarFormulario(req: Request, res: Response): Promise<void> {
    try {
      const formulario = await FormularioPreHospitalService.criarFormulario(req.body);
      res.status(201).json(formulario);
    } catch (error) {
      res.status(400).json({ error: 'Erro ao criar formulário pré-hospitalar', details: error });
    }
  }

  static async listarFormularios(req: Request, res: Response): Promise<void> {
    try {
      const formularios = await FormularioPreHospitalService.listarFormularios();
      res.json(formularios);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao listar formulários', details: error });
    }
  }

  static async buscarPorId(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      if (!id || typeof id !== 'string') {
        res.status(400).json({ error: 'ID inválido' });
        return;
      }
      const formulario = await FormularioPreHospitalService.buscarPorId(id);
      if (!formulario) {
        res.status(404).json({ error: 'Formulário não encontrado' });
        return;
      }
      res.json(formulario);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar formulário', details: error });
    }
  }

  static async atualizarFormulario(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      if (!id || typeof id !== 'string') {
        res.status(400).json({ error: 'ID inválido' });
        return;
      }
      const formulario = await FormularioPreHospitalService.atualizarFormulario(id, req.body);
      res.json(formulario);
    } catch (error) {
      res.status(400).json({ error: 'Erro ao atualizar formulário', details: error });
    }
  }

  static async removerFormulario(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      if (!id || typeof id !== 'string') {
        res.status(400).json({ error: 'ID inválido' });
        return;
      }
      await FormularioPreHospitalService.removerFormulario(id);
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ error: 'Erro ao remover formulário', details: error });
    }
  }
}

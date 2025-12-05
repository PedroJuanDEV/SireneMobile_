import { Router } from 'express';
import { FormularioIncendioController } from '../controllers/FormularioIncendioController';
import { authenticateToken } from '../middleware/auth';

const router = Router();

router.get('/', authenticateToken, FormularioIncendioController.listarFormularios);
router.post('/', authenticateToken, FormularioIncendioController.criarFormulario);
router.get('/:id', authenticateToken, FormularioIncendioController.buscarPorId);
router.put('/:id', authenticateToken, FormularioIncendioController.atualizarFormulario);
router.delete('/:id', authenticateToken, FormularioIncendioController.removerFormulario);

export default router;

import { Router } from 'express';
import { FormularioBasicoController } from '../controllers/FormularioBasicoController';
import { authenticateToken } from '../middleware/auth';

const router = Router();

router.get('/', authenticateToken, FormularioBasicoController.listarFormularios);
router.post('/', authenticateToken, FormularioBasicoController.criarFormulario);
router.get('/:id', authenticateToken, FormularioBasicoController.buscarPorId);
router.put('/:id', authenticateToken, FormularioBasicoController.atualizarFormulario);
router.delete('/:id', authenticateToken, FormularioBasicoController.removerFormulario);

export default router;

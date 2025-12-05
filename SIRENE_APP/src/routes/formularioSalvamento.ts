import { Router } from 'express';
import { FormularioSalvamentoController } from '../controllers/FormularioSalvamentoController';
import { authenticateToken } from '../middleware/auth';

const router = Router();

router.get('/', authenticateToken, FormularioSalvamentoController.listarFormularios);
router.post('/', authenticateToken, FormularioSalvamentoController.criarFormulario);
router.get('/:id', authenticateToken, FormularioSalvamentoController.buscarPorId);
router.put('/:id', authenticateToken, FormularioSalvamentoController.atualizarFormulario);
router.delete('/:id', authenticateToken, FormularioSalvamentoController.removerFormulario);

export default router;

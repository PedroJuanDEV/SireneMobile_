import { Router } from 'express';
import { FormularioProdutosPerigososController } from '../controllers/FormularioProdutosPerigososController';
import { authenticateToken } from '../middleware/auth';

const router = Router();

router.get('/', authenticateToken, FormularioProdutosPerigososController.listarFormularios);
router.post('/', authenticateToken, FormularioProdutosPerigososController.criarFormulario);
router.get('/:id', authenticateToken, FormularioProdutosPerigososController.buscarPorId);
router.put('/:id', authenticateToken, FormularioProdutosPerigososController.atualizarFormulario);
router.delete('/:id', authenticateToken, FormularioProdutosPerigososController.removerFormulario);

export default router;

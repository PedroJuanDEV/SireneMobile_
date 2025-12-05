import { Router } from 'express';
import { FormularioPreHospitalController } from '../controllers/FormularioPreHospitalController';
import { authenticateToken } from '../middleware/auth';

const router = Router();

router.get('/', authenticateToken, FormularioPreHospitalController.listarFormularios);
router.post('/', authenticateToken, FormularioPreHospitalController.criarFormulario);
router.get('/:id', authenticateToken, FormularioPreHospitalController.buscarPorId);
router.put('/:id', authenticateToken, FormularioPreHospitalController.atualizarFormulario);
router.delete('/:id', authenticateToken, FormularioPreHospitalController.removerFormulario);

export default router;

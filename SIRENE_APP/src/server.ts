import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import helmet from 'helmet';

// Importar middlewares
import { errorHandler, rateLimiter, requestLogger } from './middleware/general';

// Importar rotas
import authRoutes from './routes/auth';
import equipeRoutes from './routes/equipe';
import formularioBasicoRoutes from './routes/formularioBasico';
import formularioIncendioRoutes from './routes/formularioIncendio';
import formularioPreHospitalRoutes from './routes/formularioPreHospital';
import formularioPrevencaoRoutes from './routes/formularioPrevencao';
import formularioProdutosPerigososRoutes from './routes/formularioProdutosPerigosos';
import formularioSalvamentoRoutes from './routes/formularioSalvamento';
import logAuditoriaRoutes from './routes/logAuditoria';
import militarEquipeRoutes from './routes/militarEquipe';
import ocorrenciaRoutes from './routes/ocorrencia';
import registroOcorrenciaRoutes from './routes/registroOcorrencia';
import relatorioRoutes from './routes/relatorio';

// Carregar variáveis de ambiente
dotenv.config();

const app = express();
app.set('trust proxy', 'loopback'); // Mais seguro para ambiente local
const PORT = process.env.PORT || 3000;

// Middleware de segurança
app.use(helmet());

// CORS
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
  credentials: true,
}));

// Rate limiting global
app.use(rateLimiter);

// Log de requisições
app.use(requestLogger);

// Parser JSON
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Servir arquivos estáticos (uploads)
app.use('/uploads', express.static('uploads'));

// Rotas
app.use('/api/auth', authRoutes);
app.use('/api/ocorrencia', ocorrenciaRoutes);
app.use('/api/relatorio', relatorioRoutes);
app.use('/api/equipe', equipeRoutes);
app.use('/api/registro-ocorrencia', registroOcorrenciaRoutes);
app.use('/api/log-auditoria', logAuditoriaRoutes);
app.use('/api/militar-equipe', militarEquipeRoutes);
// Formulários de atendimento
app.use('/api/formulario-basico', formularioBasicoRoutes);
app.use('/api/formulario-pre-hospital', formularioPreHospitalRoutes);
app.use('/api/formulario-incendio', formularioIncendioRoutes);
app.use('/api/formulario-salvamento', formularioSalvamentoRoutes);
app.use('/api/formulario-produtos-perigosos', formularioProdutosPerigososRoutes);
app.use('/api/formulario-prevencao', formularioPrevencaoRoutes);

// Rota de health check
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Sistema Corpo de Bombeiros - API Online',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
  });
});

// Rota 404 - deve vir após todas as outras rotas
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint não encontrado',
    path: req.url,
  });
});

// Middleware de tratamento de erros (deve vir por último)
app.use(errorHandler);



export default app;
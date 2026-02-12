import { config } from 'dotenv';
config();

// Import des dépendances
import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';


// Import des routes
import authRoutes from './routes/auth.js';
import dashboardRoutes from './routes/dashboard.js';
import appointmentsRoutes from './routes/appointments.js';
import medicalRecordsRoutes from './routes/medicalRecords.js';
import testResultsRoutes from './routes/testResults.js';
import prescriptionsRoutes from './routes/prescriptions.js';
import messagesRoutes from './routes/messages.js';
import contactRoutes from './routes/contact.js';



const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Log des requêtes
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/appointments', appointmentsRoutes);
app.use('/api/medical-records', medicalRecordsRoutes);
app.use('/api/test-results', testResultsRoutes);
app.use('/api/prescriptions', prescriptionsRoutes);
app.use('/api/messages', messagesRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/ai-chat', aiChatRoutes);


// Route de santé
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Serveur en ligne' });
});

// Gestion des erreurs 404
app.use((req, res) => {
  res.status(404).json({ error: 'Route non trouvée' });
});

// Gestion globale des erreurs
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Erreur serveur' });
});

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`🚀 Serveur démarré sur le port ${PORT}`);
  console.log(`📡 API disponible sur http://localhost:${PORT}`);
  console.log(`🏥 Patient Portal Backend - Prêt à recevoir des requêtes`);
});

// Gestion de la fermeture propre
process.on('SIGINT', async () => {
  await prisma.$disconnect();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  await prisma.$disconnect();
  process.exit(0);
});
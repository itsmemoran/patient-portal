const express = require('express');
const { PrismaClient } = require('@prisma/client');
const authenticateToken = require('../middleware/auth');

const router = express.Router();
const prisma = new PrismaClient();

// Obtenir toutes les ordonnances
router.get('/', authenticateToken, async (req, res) => {
  try {
    const prescriptions = await prisma.prescription.findMany({
      where: { userId: req.user.userId },
      orderBy: { prescribedDate: 'desc' }
    });
    res.json(prescriptions);
  } catch (error) {
    console.error('Erreur:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération des ordonnances' });
  }
});

// Obtenir les ordonnances actives
router.get('/active', authenticateToken, async (req, res) => {
  try {
    const prescriptions = await prisma.prescription.findMany({
      where: {
        userId: req.user.userId,
        status: 'active',
        expiryDate: { gte: new Date() }
      },
      orderBy: { expiryDate: 'asc' }
    });
    res.json(prescriptions);
  } catch (error) {
    console.error('Erreur:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération des ordonnances actives' });
  }
});

// Obtenir les ordonnances expirées
router.get('/expired', authenticateToken, async (req, res) => {
  try {
    const prescriptions = await prisma.prescription.findMany({
      where: {
        userId: req.user.userId,
        OR: [
          { status: { in: ['expired', 'completed'] } },
          { expiryDate: { lt: new Date() } }
        ]
      },
      orderBy: { expiryDate: 'desc' }
    });
    res.json(prescriptions);
  } catch (error) {
    console.error('Erreur:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération des ordonnances expirées' });
  }
});

// Demander un renouvellement
router.post('/:id/renew', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;

    const prescription = await prisma.prescription.findFirst({
      where: {
        id,
        userId: req.user.userId
      }
    });

    if (!prescription) {
      return res.status(404).json({ error: 'Ordonnance non trouvée' });
    }

    // Créer une notification pour le renouvellement
    await prisma.notification.create({
      data: {
        userId: req.user.userId,
        title: 'Demande de renouvellement',
        message: `Demande de renouvellement pour ${prescription.medication}`,
        type: 'prescription',
        priority: 'normal'
      }
    });

    res.json({ message: 'Demande de renouvellement envoyée avec succès' });
  } catch (error) {
    console.error('Erreur:', error);
    res.status(500).json({ error: 'Erreur lors de la demande de renouvellement' });
  }
});

module.exports = router;
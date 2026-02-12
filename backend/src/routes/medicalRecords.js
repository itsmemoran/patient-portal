const express = require('express');
const { PrismaClient } = require('@prisma/client');
const authenticateToken = require('../middleware/auth');

const router = express.Router();
const prisma = new PrismaClient();

// Obtenir tous les dossiers médicaux
router.get('/', authenticateToken, async (req, res) => {
  try {
    const records = await prisma.medicalRecord.findMany({
      where: { userId: req.user.userId },
      orderBy: { date: 'desc' }
    });
    res.json(records);
  } catch (error) {
    console.error('Erreur:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération des dossiers' });
  }
});

// Obtenir un dossier médical spécifique
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const record = await prisma.medicalRecord.findFirst({
      where: {
        id: req.params.id,
        userId: req.user.userId
      }
    });

    if (!record) {
      return res.status(404).json({ error: 'Dossier non trouvé' });
    }

    res.json(record);
  } catch (error) {
    console.error('Erreur:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération du dossier' });
  }
});

// Obtenir les informations personnelles
router.get('/personal/info', authenticateToken, async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.userId },
      select: {
        firstName: true,
        lastName: true,
        dateOfBirth: true,
        bloodType: true,
        height: true,
        weight: true,
        allergies: true,
        chronicConditions: true,
        emergencyContactName: true,
        emergencyContactRelation: true,
        emergencyContactPhone: true
      }
    });
    res.json(user);
  } catch (error) {
    console.error('Erreur:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération des informations' });
  }
});

// Obtenir les documents
router.get('/documents/all', authenticateToken, async (req, res) => {
  try {
    const documents = await prisma.document.findMany({
      where: { userId: req.user.userId },
      orderBy: { date: 'desc' }
    });
    res.json(documents);
  } catch (error) {
    console.error('Erreur:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération des documents' });
  }
});

// Obtenir les vaccinations
router.get('/vaccinations/all', authenticateToken, async (req, res) => {
  try {
    const vaccinations = await prisma.vaccination.findMany({
      where: { userId: req.user.userId },
      orderBy: { date: 'desc' }
    });
    res.json(vaccinations);
  } catch (error) {
    console.error('Erreur:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération des vaccinations' });
  }
});

module.exports = router;
const express = require('express');
const { PrismaClient } = require('@prisma/client');
const authenticateToken = require('../middleware/auth');

const router = express.Router();
const prisma = new PrismaClient();

// Obtenir tous les résultats
router.get('/', authenticateToken, async (req, res) => {
  try {
    const results = await prisma.testResult.findMany({
      where: { userId: req.user.userId },
      orderBy: { date: 'desc' }
    });
    res.json(results);
  } catch (error) {
    console.error('Erreur:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération des résultats' });
  }
});

// Obtenir un résultat spécifique
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const result = await prisma.testResult.findFirst({
      where: {
        id: req.params.id,
        userId: req.user.userId
      }
    });

    if (!result) {
      return res.status(404).json({ error: 'Résultat non trouvé' });
    }

    res.json(result);
  } catch (error) {
    console.error('Erreur:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération du résultat' });
  }
});

// Obtenir les données de graphique
router.get('/chart/data', authenticateToken, async (req, res) => {
  try {
    const results = await prisma.testResult.findMany({
      where: {
        userId: req.user.userId,
        chartData: { not: null }
      },
      orderBy: { date: 'asc' },
      take: 1
    });

    if (results.length > 0 && results[0].chartData) {
      res.json(results[0].chartData);
    } else {
      res.json([]);
    }
  } catch (error) {
    console.error('Erreur:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération des données' });
  }
});

module.exports = router;
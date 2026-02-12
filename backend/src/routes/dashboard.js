const express = require('express');
const { PrismaClient } = require('@prisma/client');
const authenticateToken = require('../middleware/auth');

const router = express.Router();
const prisma = new PrismaClient();

// Obtenir toutes les données du dashboard
router.get('/', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;

    const [
      upcomingAppointments,
      recentResults,
      prescriptions,
      stats,
      notifications
    ] = await Promise.all([
      // Prochains rendez-vous
      prisma.appointment.findMany({
        where: {
          userId,
          date: { gte: new Date() },
          status: { in: ['scheduled', 'confirmed', 'pending'] }
        },
        orderBy: { date: 'asc' },
        take: 5
      }),

      // Résultats récents
      prisma.testResult.findMany({
        where: { userId },
        orderBy: { date: 'desc' },
        take: 5
      }),

      // Ordonnances actives
      prisma.prescription.findMany({
        where: {
          userId,
          status: 'active',
          expiryDate: { gte: new Date() }
        },
        orderBy: { expiryDate: 'asc' },
        take: 5
      }),

      // Statistiques
      prisma.$transaction([
        prisma.appointment.count({ where: { userId } }),
        prisma.testResult.count({ where: { userId } }),
        prisma.prescription.count({ where: { userId, status: 'active' } }),
        prisma.payment.aggregate({
          where: { userId, status: { in: ['pending', 'overdue'] } },
          _sum: { amount: true }
        })
      ]),

      // Notifications non lues
      prisma.notification.findMany({
        where: { userId, read: false },
        orderBy: { createdAt: 'desc' },
        take: 5
      })
    ]);

    res.json({
      upcomingAppointments,
      recentResults,
      prescriptions,
      stats: {
        totalAppointments: stats[0],
        totalTestResults: stats[1],
        activePrescriptions: stats[2],
        pendingPayments: stats[3]._sum.amount || 0
      },
      notifications
    });
  } catch (error) {
    console.error('Erreur dashboard:', error);
    res.status(500).json({ error: 'Erreur lors du chargement du dashboard' });
  }
});

module.exports = router;
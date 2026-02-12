const express = require('express');
const { PrismaClient } = require('@prisma/client');
const authenticateToken = require('../middleware/auth');

const router = express.Router();
const prisma = new PrismaClient();

// Obtenir tous les rendez-vous
router.get('/', authenticateToken, async (req, res) => {
  try {
    const appointments = await prisma.appointment.findMany({
      where: { userId: req.user.userId },
      orderBy: { date: 'desc' }
    });
    res.json(appointments);
  } catch (error) {
    console.error('Erreur:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération des rendez-vous' });
  }
});

// Obtenir les rendez-vous à venir
router.get('/upcoming', authenticateToken, async (req, res) => {
  try {
    const appointments = await prisma.appointment.findMany({
      where: {
        userId: req.user.userId,
        date: { gte: new Date() },
        status: { not: 'completed' }
      },
      orderBy: { date: 'asc' }
    });
    res.json(appointments);
  } catch (error) {
    console.error('Erreur:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération des rendez-vous' });
  }
});

// Obtenir les rendez-vous passés
router.get('/past', authenticateToken, async (req, res) => {
  try {
    const appointments = await prisma.appointment.findMany({
      where: {
        userId: req.user.userId,
        OR: [
          { date: { lt: new Date() } },
          { status: 'completed' }
        ]
      },
      orderBy: { date: 'desc' }
    });
    res.json(appointments);
  } catch (error) {
    console.error('Erreur:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération des rendez-vous' });
  }
});

// Créer un rendez-vous
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { doctorName, specialty, date, time, type, reason, location } = req.body;

    const appointment = await prisma.appointment.create({
      data: {
        userId: req.user.userId,
        doctorName,
        specialty,
        date: new Date(date),
        time,
        type,
        reason,
        location,
        status: 'pending'
      }
    });

    res.status(201).json(appointment);
  } catch (error) {
    console.error('Erreur:', error);
    res.status(500).json({ error: 'Erreur lors de la création du rendez-vous' });
  }
});

// Modifier un rendez-vous
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { date, time, status, notes } = req.body;

    const appointment = await prisma.appointment.update({
      where: { id, userId: req.user.userId },
      data: {
        ...(date && { date: new Date(date) }),
        ...(time && { time }),
        ...(status && { status }),
        ...(notes && { notes })
      }
    });

    res.json(appointment);
  } catch (error) {
    console.error('Erreur:', error);
    res.status(500).json({ error: 'Erreur lors de la modification du rendez-vous' });
  }
});

// Annuler un rendez-vous
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.appointment.update({
      where: { id, userId: req.user.userId },
      data: { status: 'cancelled' }
    });

    res.json({ message: 'Rendez-vous annulé avec succès' });
  } catch (error) {
    console.error('Erreur:', error);
    res.status(500).json({ error: 'Erreur lors de l\'annulation du rendez-vous' });
  }
});

// Obtenir les créneaux disponibles
router.get('/slots', authenticateToken, async (req, res) => {
  try {
    const timeSlots = [
      '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
      '14:00', '14:30', '15:00', '15:30', '16:00', '16:30'
    ];
    res.json(timeSlots);
  } catch (error) {
    console.error('Erreur:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération des créneaux' });
  }
});

// Obtenir la liste des médecins
router.get('/doctors', authenticateToken, async (req, res) => {
  try {
    const doctors = await prisma.doctor.findMany({
      select: {
        id: true,
        firstName: true,
        lastName: true,
        specialty: true,
        consultationDays: true
      }
    });
    res.json(doctors);
  } catch (error) {
    console.error('Erreur:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération des médecins' });
  }
});

module.exports = router;
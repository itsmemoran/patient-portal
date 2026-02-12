const express = require('express');
const { PrismaClient } = require('@prisma/client');
const authenticateToken = require('../middleware/auth');

const router = express.Router();
const prisma = new PrismaClient();

// Obtenir les informations de la clinique
router.get('/clinic-info', async (req, res) => {
  try {
    const clinicInfo = await prisma.clinicInfo.findFirst();
    
    if (!clinicInfo) {
      return res.status(404).json({ error: 'Informations de la clinique non trouvées' });
    }

    res.json({
      name: clinicInfo.name,
      address: clinicInfo.address,
      phone: clinicInfo.phone,
      emergencyPhone: clinicInfo.emergencyPhone,
      email: clinicInfo.email,
      website: clinicInfo.website,
      hours: {
        weekdays: clinicInfo.weekdaysHours,
        saturday: clinicInfo.saturdayHours,
        sunday: clinicInfo.sundayHours
      }
    });
  } catch (error) {
    console.error('Erreur:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération des informations' });
  }
});

// Obtenir la liste des médecins
router.get('/doctors', async (req, res) => {
  try {
    const doctors = await prisma.doctor.findMany({
      select: {
        id: true,
        firstName: true,
        lastName: true,
        specialty: true,
        phone: true,
        email: true,
        consultationDays: true
      }
    });

    const formattedDoctors = doctors.map(doctor => ({
      name: `Dr. ${doctor.lastName}`,
      specialty: doctor.specialty,
      phone: doctor.phone,
      email: doctor.email,
      consultationDays: doctor.consultationDays
    }));

    res.json(formattedDoctors);
  } catch (error) {
    console.error('Erreur:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération des médecins' });
  }
});

// Obtenir les informations d'urgence
router.get('/emergency-info', async (req, res) => {
  try {
    const emergencyInfo = await prisma.emergencyInfo.findMany({
      orderBy: { priority: 'asc' }
    });

    res.json(emergencyInfo);
  } catch (error) {
    console.error('Erreur:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération des informations d\'urgence' });
  }
});

module.exports = router;
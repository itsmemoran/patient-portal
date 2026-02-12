const express = require('express');
const { PrismaClient } = require('@prisma/client');
const authenticateToken = require('../middleware/auth');

const router = express.Router();
const prisma = new PrismaClient();

// Obtenir ou créer la conversation AI
router.get('/', authenticateToken, async (req, res) => {
  try {
    let chat = await prisma.aIChat.findFirst({
      where: { userId: req.user.userId },
      orderBy: { updatedAt: 'desc' }
    });

    if (!chat) {
      // Créer un nouveau chat avec un message de bienvenue
      const user = await prisma.user.findUnique({
        where: { id: req.user.userId },
        select: { firstName: true }
      });

      chat = await prisma.aIChat.create({
        data: {
          userId: req.user.userId,
          messages: [
            {
              id: 1,
              text: `Bonjour ${user.firstName}! Je suis Danan AI, votre assistant médical virtuel. Comment puis-je vous aider aujourd'hui?`,
              sender: 'bot',
              timestamp: new Date().toISOString(),
              type: 'text'
            }
          ]
        }
      });
    }

    res.json(chat);
  } catch (error) {
    console.error('Erreur:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération du chat' });
  }
});

// Envoyer un message au bot
router.post('/message', authenticateToken, async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Le message est requis' });
    }

    // Récupérer le chat existant
    let chat = await prisma.aIChat.findFirst({
      where: { userId: req.user.userId },
      orderBy: { updatedAt: 'desc' }
    });

    if (!chat) {
      return res.status(404).json({ error: 'Chat non trouvé' });
    }

    // Récupérer les données du patient pour le contexte
    const [user, appointments, prescriptions] = await Promise.all([
      prisma.user.findUnique({
        where: { id: req.user.userId },
        select: {
          firstName: true,
          lastName: true,
          allergies: true,
          chronicConditions: true
        }
      }),
      prisma.appointment.findMany({
        where: {
          userId: req.user.userId,
          date: { gte: new Date() }
        },
        orderBy: { date: 'asc' },
        take: 3
      }),
      prisma.prescription.findMany({
        where: {
          userId: req.user.userId,
          status: 'active'
        },
        take: 5
      })
    ]);

    // Créer le nouveau message utilisateur
    const userMessage = {
      id: chat.messages.length + 1,
      text: message,
      sender: 'user',
      timestamp: new Date().toISOString(),
      type: 'text'
    };

    // Générer une réponse simple (vous pouvez intégrer l'API Claude ici)
    const botResponse = generateBotResponse(message, {
      user,
      appointments,
      prescriptions
    });

    const botMessage = {
      id: chat.messages.length + 2,
      text: botResponse,
      sender: 'bot',
      timestamp: new Date().toISOString(),
      type: 'text'
    };

    // Mettre à jour le chat avec les nouveaux messages
    const updatedChat = await prisma.aIChat.update({
      where: { id: chat.id },
      data: {
        messages: [...chat.messages, userMessage, botMessage],
        patientData: {
          name: `${user.firstName} ${user.lastName}`,
          appointments: appointments.map(apt => ({
            date: apt.date.toISOString().split('T')[0],
            doctor: apt.doctorName,
            type: apt.type
          })),
          medications: prescriptions.map(presc => ({
            name: presc.medication,
            dosage: presc.dosage
          })),
          allergies: user.allergies,
          conditions: user.chronicConditions
        }
      }
    });

    res.json(updatedChat);
  } catch (error) {
    console.error('Erreur:', error);
    res.status(500).json({ error: 'Erreur lors de l\'envoi du message' });
  }
});

// Fonction pour générer une réponse simple du bot
function generateBotResponse(message, context) {
  const lowerMessage = message.toLowerCase();

  // Réponses pour les rendez-vous
  if (lowerMessage.includes('rendez-vous') || lowerMessage.includes('appointment')) {
    if (context.appointments.length > 0) {
      const next = context.appointments[0];
      return `Votre prochain rendez-vous est le ${new Date(next.date).toLocaleDateString('fr-FR')} à ${next.time} avec ${next.doctorName} pour ${next.type}.`;
    }
    return "Vous n'avez pas de rendez-vous prévu pour le moment. Souhaitez-vous en prendre un ?";
  }

  // Réponses pour les médicaments
  if (lowerMessage.includes('médicament') || lowerMessage.includes('ordonnance') || lowerMessage.includes('medication')) {
    if (context.prescriptions.length > 0) {
      const meds = context.prescriptions.map(p => `${p.medication} (${p.dosage})`).join(', ');
      return `Vos médicaments actuels sont : ${meds}. N'oubliez pas de les prendre selon les instructions de votre médecin.`;
    }
    return "Vous n'avez pas d'ordonnances actives actuellement.";
  }

  // Réponses pour les allergies
  if (lowerMessage.includes('allergie') || lowerMessage.includes('allergy')) {
    if (context.user.allergies.length > 0) {
      return `Selon votre dossier, vous êtes allergique à : ${context.user.allergies.join(', ')}. Assurez-vous d'en informer tout professionnel de santé que vous consultez.`;
    }
    return "Aucune allergie n'est enregistrée dans votre dossier médical.";
  }

  // Réponse par défaut
  return "Je suis là pour vous aider avec vos rendez-vous, ordonnances et questions médicales générales. Que puis-je faire pour vous ?";
}

// Réinitialiser le chat
router.delete('/reset', authenticateToken, async (req, res) => {
  try {
    await prisma.aIChat.deleteMany({
      where: { userId: req.user.userId }
    });

    res.json({ message: 'Chat réinitialisé avec succès' });
  } catch (error) {
    console.error('Erreur:', error);
    res.status(500).json({ error: 'Erreur lors de la réinitialisation du chat' });
  }
});

module.exports = router;
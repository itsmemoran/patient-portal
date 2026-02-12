const express = require('express');
const { PrismaClient } = require('@prisma/client');
const authenticateToken = require('../middleware/auth');

const router = express.Router();
const prisma = new PrismaClient();

// Obtenir tous les messages
router.get('/', authenticateToken, async (req, res) => {
  try {
    const messages = await prisma.message.findMany({
      where: { userId: req.user.userId },
      orderBy: { createdAt: 'desc' }
    });
    res.json(messages);
  } catch (error) {
    console.error('Erreur:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération des messages' });
  }
});

// Obtenir un message spécifique
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const message = await prisma.message.findFirst({
      where: {
        id: req.params.id,
        userId: req.user.userId
      }
    });

    if (!message) {
      return res.status(404).json({ error: 'Message non trouvé' });
    }

    res.json(message);
  } catch (error) {
    console.error('Erreur:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération du message' });
  }
});

// Envoyer un message
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { subject, message, messageType, priority } = req.body;

    if (!subject || !message) {
      return res.status(400).json({ error: 'Le sujet et le message sont requis' });
    }

    const newMessage = await prisma.message.create({
      data: {
        userId: req.user.userId,
        subject,
        message,
        messageType: messageType || 'general',
        priority: priority || 'normal',
        status: 'pending'
      }
    });

    res.status(201).json(newMessage);
  } catch (error) {
    console.error('Erreur:', error);
    res.status(500).json({ error: 'Erreur lors de l\'envoi du message' });
  }
});

// Marquer un message comme lu
router.patch('/:id/read', authenticateToken, async (req, res) => {
  try {
    const message = await prisma.message.update({
      where: {
        id: req.params.id,
        userId: req.user.userId
      },
      data: {
        status: 'read'
      }
    });

    res.json(message);
  } catch (error) {
    console.error('Erreur:', error);
    res.status(500).json({ error: 'Erreur lors de la mise à jour du message' });
  }
});

module.exports = router;
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function main() {
  console.log('🧹 Nettoyage de la base de données...');
  
  // Nettoyer dans l'ordre inverse des dépendances
  await prisma.emergencyInfo.deleteMany();
  await prisma.clinicInfo.deleteMany();
  await prisma.privacySetting.deleteMany();
  await prisma.notificationSetting.deleteMany();
  await prisma.notification.deleteMany();
  await prisma.aIChat.deleteMany();
  await prisma.message.deleteMany();
  await prisma.prescription.deleteMany();
  await prisma.testResult.deleteMany();
  await prisma.vaccination.deleteMany();
  await prisma.document.deleteMany();
  await prisma.medicalRecord.deleteMany();
  await prisma.appointment.deleteMany();
  await prisma.doctor.deleteMany();
  await prisma.user.deleteMany();

  console.log('✅ Base de données nettoyée');

  // ==================== CLINIC INFO ====================
  console.log('📍 Création des informations de la clinique...');
  
  const clinicInfo = await prisma.clinicInfo.create({
    data: {
      name: 'Centre Medical Danan',
      address: '123 Rue de la Santé, 75014 Paris',
      phone: '+33 1 42 34 56 78',
      emergencyPhone: '+33 1 42 34 56 79',
      email: 'contact@centremedicaldanan.fr',
      website: 'www.centremedicaldanan.fr',
      weekdaysHours: '8h00 - 18h00',
      saturdayHours: '9h00 - 13h00',
      sundayHours: 'Fermé'
    }
  });

  console.log('✅ Informations clinique créées');

  // ==================== EMERGENCY INFO ====================
  console.log('🚨 Création des informations d\'urgence...');
  
  const emergencyInfos = await Promise.all([
    prisma.emergencyInfo.create({
      data: {
        situation: 'Urgence ophtalmologique',
        action: 'Contactez immédiatement le centre',
        phone: '+33 1 42 34 56 79',
        available: '24h/24, 7j/7',
        priority: 1
      }
    }),
    prisma.emergencyInfo.create({
      data: {
        situation: 'Douleur oculaire sévère',
        action: 'Rendez-vous aux urgences + contactez le centre',
        phone: '15 (SAMU)',
        available: 'Immédiat',
        priority: 2
      }
    }),
    prisma.emergencyInfo.create({
      data: {
        situation: 'Perte de vision soudaine',
        action: 'Urgences hospitalières',
        phone: '15 (SAMU)',
        available: 'Immédiat',
        priority: 3
      }
    })
  ]);

  console.log('✅ Informations d\'urgence créées');

  // ==================== DOCTORS ====================
  console.log('👨‍⚕️ Création des médecins...');
  
  const doctors = await Promise.all([
    prisma.doctor.create({
      data: {
        firstName: 'Jean',
        lastName: 'Martin',
        name: 'Dr. Martin',
        specialty: 'Ophtalmologue',
        email: 'dr.martin@centremedicaldanan.fr',
        phone: '+33 1 42 34 56 80',
        officeAddress: '123 Rue de la Santé, 75014 Paris',
        consultationDays: 'Lundi, Mercredi, Vendredi',
        bio: 'Ophtalmologue avec 15 ans d\'expérience',
        education: ['Université Paris Descartes', 'CHU Cochin'],
        languages: ['Français', 'Anglais'],
        rating: 4.8
      }
    }),
    prisma.doctor.create({
      data: {
        firstName: 'Marie',
        lastName: 'Dubois',
        name: 'Dr. Dubois',
        specialty: 'Ophtalmologue',
        email: 'dr.dubois@centremedicaldanan.fr',
        phone: '+33 1 42 34 56 81',
        officeAddress: '123 Rue de la Santé, 75014 Paris',
        consultationDays: 'Mardi, Jeudi, Samedi',
        bio: 'Spécialiste en chirurgie réfractive',
        education: ['Université Sorbonne', 'Hôpital des Quinze-Vingts'],
        languages: ['Français', 'Anglais', 'Espagnol'],
        rating: 4.9
      }
    }),
    prisma.doctor.create({
      data: {
        firstName: 'Paul',
        lastName: 'Bernard',
        name: 'Dr. Bernard',
        specialty: 'Optométriste',
        email: 'dr.bernard@centremedicaldanan.fr',
        phone: '+33 1 42 34 56 82',
        officeAddress: '123 Rue de la Santé, 75014 Paris',
        consultationDays: 'Lundi à Vendredi',
        bio: 'Optométriste diplômé',
        education: ['École d\'Optométrie de Paris'],
        languages: ['Français'],
        rating: 4.7
      }
    })
  ]);

  console.log('✅ Médecins créés');

  // ==================== USER ====================
  console.log('👤 Création de l\'utilisateur...');
  
  const hashedPassword = await bcrypt.hash('password123', 10);
  
  const user = await prisma.user.create({
    data: {
      email: 'jean.dupont@email.com',
      password: hashedPassword,
      fullName: 'Jean Dupont',
      firstName: 'Jean',
      lastName: 'Dupont',
      contact: '+33 6 12 34 56 78',
      dateOfBirth: new Date('1985-03-15'),
      address: '45 Rue de la République, 75011 Paris',
      bloodType: 'A+',
      height: '175 cm',
      weight: '70 kg',
      allergies: ['Pénicilline', 'Pollen'],
      chronicConditions: ['Myopie légère'],
      emergencyContactName: 'Marie Dupont',
      emergencyContactRelation: 'Épouse',
      emergencyContactPhone: '+33 6 12 34 56 78',
      nationality: 'Française',
      profession: 'Ingénieur',
      socialSecurity: '1 85 03 75 123 456 78',
      theme: 'system',
      language: 'fr',
      fontSize: 'medium',
      notificationSound: true,
      lastLogin: new Date()
    }
  });

  console.log('✅ Utilisateur créé');

  // ==================== NOTIFICATION SETTINGS ====================
  console.log('🔔 Création des paramètres de notification...');
  
  const notificationSettings = await prisma.notificationSetting.create({
    data: {
      userId: user.id,
      appointments: true,
      results: true,
      prescriptions: true,
      general: false,
      reminders: true,
      newsletter: false,
      email: true,
      sms: true,
      push: true,
      inApp: true
    }
  });

  console.log('✅ Paramètres de notification créés');

  // ==================== PRIVACY SETTINGS ====================
  console.log('🔒 Création des paramètres de confidentialité...');
  
  const privacySettings = await prisma.privacySetting.create({
    data: {
      userId: user.id,
      dataSharing: false,
      analytics: true,
      marketing: false,
      profileVisibility: 'private',
      activityTracking: true,
      locationServices: false
    }
  });

  console.log('✅ Paramètres de confidentialité créés');

  // ==================== APPOINTMENTS ====================
  console.log('📅 Création des rendez-vous...');
  
  const appointments = await Promise.all([
    prisma.appointment.create({
      data: {
        userId: user.id,
        doctorName: 'Dr. Martin',
        doctorId: doctors[0].id,
        specialty: 'Ophtalmologue',
        date: new Date('2024-12-15'),
        time: '14:30',
        type: 'Contrôle de routine',
        status: 'confirmed',
        location: 'Cabinet 2',
        duration: 30
      }
    }),
    prisma.appointment.create({
      data: {
        userId: user.id,
        doctorName: 'Dr. Dubois',
        doctorId: doctors[1].id,
        specialty: 'Ophtalmologue',
        date: new Date('2024-12-20'),
        time: '10:00',
        type: 'Examen de la vue',
        status: 'pending',
        location: 'Cabinet 1',
        duration: 45
      }
    }),
    prisma.appointment.create({
      data: {
        userId: user.id,
        doctorName: 'Dr. Martin',
        doctorId: doctors[0].id,
        specialty: 'Ophtalmologue',
        date: new Date('2024-11-30'),
        time: '16:00',
        type: 'Consultation',
        status: 'completed',
        location: 'Cabinet 2',
        duration: 30
      }
    })
  ]);

  console.log('✅ Rendez-vous créés');

  // ==================== MEDICAL RECORDS ====================
  console.log('📋 Création des dossiers médicaux...');
  
  const medicalRecords = await Promise.all([
    prisma.medicalRecord.create({
      data: {
        userId: user.id,
        date: new Date('2024-12-01'),
        type: 'Consultation',
        doctor: 'Dr. Martin',
        doctorId: doctors[0].id,
        diagnosis: 'Contrôle de routine - RAS',
        treatment: 'Aucun traitement nécessaire',
        notes: 'Vision stable, pas de changement par rapport au dernier examen'
      }
    }),
    prisma.medicalRecord.create({
      data: {
        userId: user.id,
        date: new Date('2024-06-15'),
        type: 'Examen complet',
        doctor: 'Dr. Dubois',
        doctorId: doctors[1].id,
        diagnosis: 'Myopie légère stable',
        treatment: 'Correction optique maintenue',
        notes: 'Recommandation: contrôle dans 6 mois'
      }
    }),
    prisma.medicalRecord.create({
      data: {
        userId: user.id,
        date: new Date('2024-01-20'),
        type: 'Urgence',
        doctor: 'Dr. Bernard',
        doctorId: doctors[2].id,
        diagnosis: 'Conjonctivite allergique',
        treatment: 'Gouttes anti-allergiques',
        notes: 'Amélioration rapide sous traitement'
      }
    })
  ]);

  console.log('✅ Dossiers médicaux créés');

  // ==================== DOCUMENTS ====================
  console.log('📄 Création des documents...');
  
  const documents = await Promise.all([
    prisma.document.create({
      data: {
        userId: user.id,
        name: 'Ordonnance du 01/12/2024',
        type: 'Prescription',
        date: new Date('2024-12-01'),
        doctor: 'Dr. Martin',
        size: '245 KB'
      }
    }),
    prisma.document.create({
      data: {
        userId: user.id,
        name: 'Résultats examen visuel',
        type: 'Résultats',
        date: new Date('2024-12-01'),
        doctor: 'Dr. Martin',
        size: '1.2 MB'
      }
    }),
    prisma.document.create({
      data: {
        userId: user.id,
        name: 'Compte-rendu consultation',
        type: 'Rapport',
        date: new Date('2024-06-15'),
        doctor: 'Dr. Dubois',
        size: '890 KB'
      }
    })
  ]);

  console.log('✅ Documents créés');

  // ==================== VACCINATIONS ====================
  console.log('💉 Création des vaccinations...');
  
  const vaccinations = await Promise.all([
    prisma.vaccination.create({
      data: {
        userId: user.id,
        vaccine: 'Tétanos-Diphtérie-Polio',
        date: new Date('2023-03-15'),
        nextDue: new Date('2033-03-15'),
        status: 'à jour'
      }
    }),
    prisma.vaccination.create({
      data: {
        userId: user.id,
        vaccine: 'Grippe saisonnière',
        date: new Date('2024-10-15'),
        nextDue: new Date('2025-10-15'),
        status: 'à jour'
      }
    })
  ]);

  console.log('✅ Vaccinations créées');

  // ==================== TEST RESULTS ====================
  console.log('🔬 Création des résultats de tests...');
  
  const testResults = await Promise.all([
    prisma.testResult.create({
      data: {
        userId: user.id,
        testName: 'Acuité visuelle',
        date: new Date('2024-12-01'),
        doctor: 'Dr. Martin',
        status: 'normal',
        results: {
          oeilDroit: '10/10',
          oeilGauche: '10/10',
          vision: 'Excellente'
        },
        trend: 'stable',
        notes: 'Vision stable, aucune correction nécessaire'
      }
    }),
    prisma.testResult.create({
      data: {
        userId: user.id,
        testName: 'Tension oculaire',
        date: new Date('2024-12-01'),
        doctor: 'Dr. Martin',
        status: 'normal',
        results: {
          oeilDroit: '14 mmHg',
          oeilGauche: '13 mmHg',
          normal: '10-21 mmHg'
        },
        trend: 'down',
        notes: 'Légère diminution, dans les valeurs normales'
      }
    }),
    prisma.testResult.create({
      data: {
        userId: user.id,
        testName: "Examen du fond d'œil",
        date: new Date('2024-12-01'),
        doctor: 'Dr. Martin',
        status: 'normal',
        results: {
          retine: 'Normale',
          maculaire: 'Normale',
          vaisseaux: 'Normaux'
        },
        trend: 'stable',
        notes: 'Aucune anomalie détectée'
      }
    }),
    prisma.testResult.create({
      data: {
        userId: user.id,
        testName: 'Test de vision des couleurs',
        date: new Date('2024-06-15'),
        doctor: 'Dr. Dubois',
        status: 'attention',
        results: {
          score: '85%',
          deficience: 'Légère deutéranomalie',
          severity: 'Mineure'
        },
        trend: 'stable',
        notes: 'Déficience légère de la vision des couleurs rouge-vert'
      }
    })
  ]);

  console.log('✅ Résultats de tests créés');

  // ==================== PRESCRIPTIONS ====================
  console.log('💊 Création des ordonnances...');
  
  const prescriptions = await Promise.all([
    prisma.prescription.create({
      data: {
        userId: user.id,
        medication: 'Latanoprost 0.005%',
        type: 'Gouttes oculaires',
        dosage: '1 goutte dans chaque œil',
        frequency: 'Une fois par jour le soir',
        duration: '6 mois',
        prescribedBy: 'Dr. Martin',
        prescribedDate: new Date('2024-12-01'),
        expiryDate: new Date('2025-06-01'),
        refillsRemaining: 3,
        totalRefills: 5,
        instructions: 'Instiller le soir avant le coucher. Attendre 5 minutes entre les gouttes si plusieurs médicaments.',
        sideEffects: ['Rougeur temporaire', 'Légère irritation'],
        status: 'active'
      }
    }),
    prisma.prescription.create({
      data: {
        userId: user.id,
        medication: 'Hyabak 0.15%',
        type: 'Larmes artificielles',
        dosage: '1-2 gouttes',
        frequency: '3-4 fois par jour',
        duration: 'Usage prolongé',
        prescribedBy: 'Dr. Dubois',
        prescribedDate: new Date('2024-11-15'),
        expiryDate: new Date('2025-11-15'),
        refillsRemaining: 2,
        totalRefills: 3,
        instructions: 'Utiliser selon les besoins pour la sécheresse oculaire.',
        sideEffects: ['Aucun effet secondaire connu'],
        status: 'active'
      }
    }),
    prisma.prescription.create({
      data: {
        userId: user.id,
        medication: 'Tobramycine 0.3%',
        type: 'Antibiotique oculaire',
        dosage: '1 goutte',
        frequency: '4 fois par jour',
        duration: '7 jours',
        prescribedBy: 'Dr. Bernard',
        prescribedDate: new Date('2024-01-20'),
        expiryDate: new Date('2024-01-27'),
        refillsRemaining: 0,
        totalRefills: 0,
        instructions: 'Traitement court pour infection.',
        sideEffects: ['Irritation locale possible'],
        status: 'completed'
      }
    }),
    prisma.prescription.create({
      data: {
        userId: user.id,
        medication: 'Gouttes oculaires Latanoprost',
        type: 'Gouttes oculaires',
        dosage: '1 goutte le soir',
        frequency: 'Une fois par jour',
        duration: '3 mois',
        prescribedBy: 'Dr. Martin',
        prescribedDate: new Date('2024-11-01'),
        expiryDate: new Date('2025-01-15'),
        refillsRemaining: 2,
        totalRefills: 3,
        instructions: 'Appliquer chaque soir',
        sideEffects: [],
        status: 'active'
      }
    }),
    prisma.prescription.create({
      data: {
        userId: user.id,
        medication: 'Vitamines pour les yeux',
        type: 'Complément alimentaire',
        dosage: '1 comprimé/jour',
        frequency: 'Une fois par jour',
        duration: '6 mois',
        prescribedBy: 'Dr. Martin',
        prescribedDate: new Date('2024-10-01'),
        expiryDate: new Date('2025-02-01'),
        refillsRemaining: 1,
        totalRefills: 2,
        instructions: 'Prendre avec un repas',
        sideEffects: [],
        status: 'active'
      }
    })
  ]);

  console.log('✅ Ordonnances créées');

  // ==================== MESSAGES ====================
  console.log('✉️ Création des messages...');
  
  const messages = await Promise.all([
    prisma.message.create({
      data: {
        userId: user.id,
        subject: 'Question sur mon ordonnance',
        message: 'Bonjour, je voudrais savoir si je peux prendre mes gouttes le matin plutôt que le soir ?',
        messageType: 'question',
        status: 'responded',
        response: 'Bonjour, il est préférable de continuer le soir comme prescrit pour une efficacité optimale.',
        respondedAt: new Date('2024-12-02')
      }
    }),
    prisma.message.create({
      data: {
        userId: user.id,
        subject: 'Demande de rendez-vous urgent',
        message: 'J\'ai une gêne importante à l\'œil gauche depuis ce matin',
        messageType: 'appointment',
        priority: 'high',
        status: 'pending'
      }
    })
  ]);

  console.log('✅ Messages créés');

  // ==================== AI CHAT ====================
  console.log('🤖 Création du chat AI...');
  
  const aiChat = await prisma.aIChat.create({
    data: {
      userId: user.id,
      messages: [
        {
          id: 1,
          text: "Bonjour Jean! Je suis Danan AI, votre assistant médical virtuel. Comment puis-je vous aider aujourd'hui?",
          sender: 'bot',
          timestamp: new Date().toISOString(),
          type: 'text'
        }
      ],
      patientData: {
        name: 'Jean Dupont',
        appointments: [
          { date: '2024-12-15', doctor: 'Dr. Martin', type: 'Contrôle de routine' },
          { date: '2024-12-20', doctor: 'Dr. Dubois', type: 'Examen de la vue' }
        ],
        medications: [
          { name: 'Latanoprost', dosage: '1 goutte le soir' },
          { name: 'Hyabak', dosage: '3-4 fois par jour' }
        ],
        lastVisit: '2024-12-01',
        nextAppointment: '2024-12-15',
        allergies: ['Pénicilline', 'Pollen'],
        conditions: ['Myopie légère']
      }
    }
  });

  console.log('✅ Chat AI créé');

  // ==================== NOTIFICATIONS ====================
  console.log('🔔 Création des notifications...');
  
  const notifications = await Promise.all([
    prisma.notification.create({
      data: {
        userId: user.id,
        title: 'Rappel de rendez-vous',
        message: 'Votre rendez-vous avec Dr. Martin est demain à 14h30',
        type: 'appointment',
        priority: 'high',
        read: false
      }
    }),
    prisma.notification.create({
      data: {
        userId: user.id,
        title: 'Nouveaux résultats disponibles',
        message: 'Vos résultats d\'examen ophtalmologique sont disponibles',
        type: 'result',
        priority: 'normal',
        read: true,
        readAt: new Date()
      }
    }),
    prisma.notification.create({
      data: {
        userId: user.id,
        title: 'Renouvellement d\'ordonnance',
        message: 'Votre ordonnance pour Latanoprost arrive à expiration',
        type: 'prescription',
        priority: 'normal',
        read: false
      }
    }),
  ]);

  console.log('✅ Notifications créées');

  // ==================== SUMMARY ====================
  console.log('\n' + '='.repeat(60));
  console.log('🎉 SEED TERMINÉ AVEC SUCCÈS!');
  console.log('='.repeat(60));
  console.log('\n📊 RÉSUMÉ:');
  console.log(`👤 Utilisateurs: 1`);
  console.log(`👨‍⚕️ Médecins: ${doctors.length}`);
  console.log(`📅 Rendez-vous: ${appointments.length}`);
  console.log(`📋 Dossiers médicaux: ${medicalRecords.length}`);
  console.log(`📄 Documents: ${documents.length}`);
  console.log(`💉 Vaccinations: ${vaccinations.length}`);
  console.log(`🔬 Résultats de tests: ${testResults.length}`);
  console.log(`💊 Ordonnances: ${prescriptions.length}`);
  console.log(`✉️ Messages: ${messages.length}`);
  console.log(`🔔 Notifications: ${notifications.length}`);
  console.log(`🚨 Infos urgence: ${emergencyInfos.length}`);
  console.log('\n🔐 IDENTIFIANTS DE CONNEXION:');
  console.log('📧 Email: jean.dupont@email.com');
  console.log('🔑 Mot de passe: password123');
  console.log('\n👤 User ID:', user.id);
  console.log('='.repeat(60) + '\n');
}

main()
  .catch((e) => {
    console.error('❌ Erreur lors du seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
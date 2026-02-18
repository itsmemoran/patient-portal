import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card.jsx';
import { Badge } from '../components/ui/badge.jsx';
import { Button } from '../components/ui/button.jsx';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs.jsx';
import { FileText, Download, Eye, Calendar, User, AlertTriangle } from 'lucide-react';

export default function MedicalRecords() {
  
  const personalInfo = {
    name: 'Jean Koffi',
    birthDate: '1985-03-15',
    bloodType: 'A+',
    height: '175 cm',
    weight: '70 kg',
    allergies: ['Pénicilline', 'Pollen'],
    chronicConditions: ['Myopie légère'],
    emergencyContact: {
      name: 'Marie Koffi',
      relation: 'Épouse',
      phone: '+225 0102030405'
    }
  };

  const medicalHistory = [
    {
      id: 1,
      date: '2025-12-01',
      type: 'Consultation',
      doctor: 'Dr. Martin',
      diagnosis: 'Contrôle de routine - RAS',
      treatment: 'Aucun traitement nécessaire',
      notes: 'Vision stable, pas de changement par rapport au dernier examen'
    },
    {
      id: 2,
      date: '2025-06-15',
      type: 'Examen complet',
      doctor: 'Dr. olivier',
      diagnosis: 'Myopie légère stable',
      treatment: 'Correction optique maintenue',
      notes: 'Recommandation: contrôle dans 6 mois'
    },
    {
      id: 3,
      date: '2025-01-20',
      type: 'Urgence',
      doctor: 'Dr. Bernard',
      diagnosis: 'Conjonctivite allergique',
      treatment: 'Gouttes anti-allergiques',
      notes: 'Amélioration rapide sous traitement'
    }
  ];

  const documents = [
    {
      id: 1,
      name: 'Ordonnance du 01/12/2025',
      type: 'Prescription',
      date: '2025-12-01',
      doctor: 'Dr. Martin',
      size: '245 KB'
    },
    {
      id: 2,
      name: 'Résultats examen visuel',
      type: 'Résultats',
      date: '2025-12-01',
      doctor: 'Dr. Martin',
      size: '1.2 MB'
    },
    {
      id: 3,
      name: 'Compte-rendu consultation',
      type: 'Rapport',
      date: '2025-06-15',
      doctor: 'Dr. Olivier',
      size: '890 KB'
    }
  ];

  const vaccinations = [
    {
      id: 1,
      vaccine: 'Tétanos-Diphtérie-Polio',
      date: '2024-03-15',
      nextDue: '2033-03-15',
      status: 'à jour'
    },
    {
      id: 2,
      vaccine: 'Grippe saisonnière',
      date: '2025-10-15',
      nextDue: '2025-10-15',
      status: 'à jour'
    }
  ];

  return (
    <div className="space-y-6 ml-2 mr-2 ">
    <div className="space-y-6  m-6 pb-6 border-b border-border">
      <div>
        <h1 className='text-2xl'>Dossier médical</h1>
        <p className="text-muted-foreground">Consultez votre historique médical complet</p>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Aperçu</TabsTrigger>
          <TabsTrigger value="history">Historique</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="vaccinations">Vaccins</TabsTrigger>
          <TabsTrigger value="emergency">Urgence</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Personal Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User className="h-5 w-5 text-primary" />
                  <span>Informations personnelles</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-muted-foreground">Nom complet</label>
                    <p>{personalInfo.name}</p>
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground">Date de naissance</label>
                    <p>{new Date(personalInfo.birthDate).toLocaleDateString('fr-FR')}</p>
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground">Groupe sanguin</label>
                    <p>{personalInfo.bloodType}</p>
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground">Taille</label>
                    <p>{personalInfo.height}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Health Alerts */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <AlertTriangle className="h-5 w-5 text-yellow-500" />
                  <span>Alertes médicales</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm text-muted-foreground">Allergies</label>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {personalInfo.allergies.map((allergy, index) => (
                      <Badge key={index} variant="destructive">{allergy}</Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">Conditions chroniques</label>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {personalInfo.chronicConditions.map((condition, index) => (
                      <Badge key={index} variant="secondary">{condition}</Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Medical History */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="h-5 w-5 text-secondary" />
                <span>Historique récent</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {medicalHistory.slice(0, 3).map((record) => (
                  <div key={record.id} className="p-4 border rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4>{record.type}</h4>
                        <p className="text-sm text-muted-foreground">{record.doctor}</p>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {new Date(record.date).toLocaleDateString('fr-FR')}
                      </span>
                    </div>
                    <p className="text-sm mb-1"><strong>Diagnostic:</strong> {record.diagnosis}</p>
                    <p className="text-sm">{record.notes}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Historique médical complet</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {medicalHistory.map((record) => (
                  <div key={record.id} className="p-4 border rounded-lg">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4>{record.type}</h4>
                        <div className="flex items-center space-x-4 mt-1 text-sm text-muted-foreground">
                          <div className="flex items-center space-x-1">
                            <User className="h-4 w-4" />
                            <span>{record.doctor}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-4 w-4" />
                            <span>{new Date(record.date).toLocaleDateString('fr-FR')}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm"><strong>Diagnostic:</strong> {record.diagnosis}</p>
                      <p className="text-sm"><strong>Traitement:</strong> {record.treatment}</p>
                      <p className="text-sm"><strong>Notes:</strong> {record.notes}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documents" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Documents médicaux</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {documents.map((doc) => (
                  <div key={doc.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <FileText className="h-8 w-8 text-primary" />
                      <div>
                        <h4>{doc.name}</h4>
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                          <span>{doc.doctor}</span>
                          <span>•</span>
                          <span>{new Date(doc.date).toLocaleDateString('fr-FR')}</span>
                          <span>•</span>
                          <span>{doc.size}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-1" />
                        Voir
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-1" />
                        Télécharger
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="vaccinations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Carnet de vaccination</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {vaccinations.map((vaccination) => (
                  <div key={vaccination.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4>{vaccination.vaccine}</h4>
                      <p className="text-sm text-muted-foreground">
                        Dernière dose: {new Date(vaccination.date).toLocaleDateString('fr-FR')}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Prochaine dose: {new Date(vaccination.nextDue).toLocaleDateString('fr-FR')}
                      </p>
                    </div>
                    <Badge className="bg-green-100 text-green-800">
                      {vaccination.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="emergency" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-red-600">
                <AlertTriangle className="h-5 w-5" />
                <span>Informations d'urgence</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <h4 className="text-red-800 mb-2">Contact d'urgence</h4>
                <p><strong>Nom:</strong> {personalInfo.emergencyContact.name}</p>
                <p><strong>Relation:</strong> {personalInfo.emergencyContact.relation}</p>
                <p><strong>Téléphone:</strong> {personalInfo.emergencyContact.phone}</p>
              </div>
              
              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <h4 className="text-yellow-800 mb-2">Allergies importantes</h4>
                <div className="space-y-1">
                  {personalInfo.allergies.map((allergy, index) => (
                    <p key={index} className="text-yellow-700">• {allergy}</p>
                  ))}
                </div>
              </div>

              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h4 className="text-blue-800 mb-2">Groupe sanguin</h4>
                <p className="text-2xl text-blue-700">{personalInfo.bloodType}</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
    </div>
  );
}


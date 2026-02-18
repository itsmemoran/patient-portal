import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { MapPin, Phone, Mail, Clock, MessageCircle, Calendar, AlertTriangle, LogOutIcon, HomeIcon } from 'lucide-react';
import { toast } from 'sonner';
import { useState } from 'react';


export default function Contact() {
  const [messageType, setMessageType] = useState('');
  const [message, setMessage] = useState('');
  const [subject, setSubject] = useState('');

  const clinicInfo = {
    name: 'Centre Medical Danan',
    address: '123 Rue de la Santé, Angre, Abidjan, Côte d\'Ivoire',
    phone: '+225 21 23 45 67 89',
    emergencyPhone: '+225 21 23 45 67 89',
    email: 'contact@centremedicaldanan.fr',
    website: 'www.centremedicaldanan.fr',
    hours: {
      weekdays: '8h00 - 18h00',
      saturday: '9h00 - 13h00',
      sunday: 'Fermé'
    }
  };

  const doctors = [
    {
      name: 'Dr. Kouassi Martin',
      specialty: 'Ophtalmologue',
      phone: '+225 21 23 45 67 80',
      email: 'dr.martin@centremedicaldanan.fr',
      consultationDays: 'Lundi, Mercredi, Vendredi'
    },
    {
      name: 'Dr. Kouadio Olivier',
      specialty: 'Ophtalmologue',
      phone: '+225 21 23 45 67 81',
      email: 'dr.kouadio@centremedicaldanan.fr',
      consultationDays: 'Mardi, Jeudi, Samedi'
    },
    {
      name: 'Dr. Coulibaly Amina',
      specialty: 'Optométriste',
      phone: '+225 21 23 45 67 82',
      email: 'dr.coulibalyamina@centremedicaldanan.fr',
      consultationDays: 'Lundi à Vendredi'
    }
  ];

  const emergencyInfo = [
    {
      situation: 'Urgence ophtalmologique',
      action: 'Contactez immédiatement le centre',
      phone: '+225 21 23 45 67 89',
      available: '24h/24, 7j/7'
    },
    {
      situation: 'Douleur oculaire sévère',
      action: 'Rendez-vous aux urgences + contactez le centre',
      phone: 'SAMU: 185',
      available: 'Immédiat'
    },
    {
      situation: 'Perte de vision soudaine',
      action: 'Urgences hospitalières',
      phone: 'SAMU: 185',
      available: 'Immédiat'
    }
  ];

  const handleSendMessage = () => {
    if (!messageType || !subject || !message) {
      toast.error('Veuillez remplir tous les champs');
      return;
    }

    toast.success('Message envoyé avec succès! Nous vous répondrons dans les plus brefs délais.');
    setMessageType('');
    setSubject('');
    setMessage('');
  };

  return (
    <div className="space-y-6 ml-2 mr-2">
    <div className="space-y-6 ">
      <div className="flex items-center space-x-4  m-6 pb-6 border-b border-border">
        <div>
          <h1 className='text-2xl'>Contact & Informations</h1>
          <p className="text-muted-foreground">Centre Medical Danan - Notre passion, préserver votre vue</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Contact Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <MessageCircle className="h-5 w-5 text-primary" />
              <span>Nous contacter</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block mb-2">Type de demande</label>
              <Select value={messageType} onValueChange={setMessageType}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionnez le type de demande" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="appointment">Demande de rendez-vous</SelectItem>
                  <SelectItem value="question">Question médicale</SelectItem>
                  <SelectItem value="prescription">Renouvellement d'ordonnance</SelectItem>
                  <SelectItem value="results">Résultats d'examens</SelectItem>
                  <SelectItem value="emergency">Urgence</SelectItem>
                  <SelectItem value="other">Autre</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block mb-2">Sujet</label>
              <Input
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Objet de votre message"
              />
            </div>

            <div>
              <label className="block mb-2">Message</label>
              <Textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Décrivez votre demande en détail..."
                rows={5}
              />
            </div>

            <Button 
              className="w-full bg-primary hover:bg-primary/90"
              onClick={handleSendMessage}
            >
              Envoyer le message
            </Button>
          </CardContent>
        </Card>

        {/* Clinic Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <MapPin className="h-5 w-5 text-secondary" />
              <span>Informations du centre</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="font-medium">Adresse</p>
                  <p className="text-sm text-muted-foreground">{clinicInfo.address}</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Phone className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="font-medium">Téléphone</p>
                  <p className="text-sm text-muted-foreground">{clinicInfo.phone}</p>
                  <p className="text-sm text-red-600">Urgences: {clinicInfo.emergencyPhone}</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Mail className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="font-medium">Email</p>
                  <p className="text-sm text-muted-foreground">{clinicInfo.email}</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Clock className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="font-medium">Horaires d'ouverture</p>
                  <div className="text-sm text-muted-foreground space-y-1">
                    <p>Lundi - Vendredi: {clinicInfo.hours.weekdays}</p>
                    <p>Samedi: {clinicInfo.hours.saturday}</p>
                    <p>Dimanche: {clinicInfo.hours.sunday}</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Medical Team */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calendar className="h-5 w-5 text-primary" />
            <span>Notre équipe médicale</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {doctors.map((doctor, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <h4 className="font-medium">{doctor.name}</h4>
                <Badge variant="secondary" className="mb-3">{doctor.specialty}</Badge>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span>{doctor.phone}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span className="text-xs">{doctor.email}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-xs">{doctor.consultationDays}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Emergency Information */}
      <Card className="border-red-200 bg-red-50">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-red-700">
            <AlertTriangle className="h-5 w-5" />
            <span>Informations d'urgence</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {emergencyInfo.map((info, index) => (
              <div key={index} className="p-4 bg-white border border-red-200 rounded-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium text-red-800">{info.situation}</h4>
                    <p className="text-sm text-red-700 mb-2">{info.action}</p>
                    <div className="flex items-center space-x-4 text-sm">
                      <div className="flex items-center space-x-1">
                        <Phone className="h-4 w-4" />
                        <span className="font-bold">{info.phone}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{info.available}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <h4 className="font-medium text-yellow-800 mb-2">En cas d'urgence vitale</h4>
            <p className="text-yellow-700 text-sm mb-2">
              Pour toute urgence vitale, appelez immédiatement le SAMU (185) ou les pompiers (180).
            </p>
            <div className="flex space-x-2">
              <Button variant="destructive" size="sm">185 - SAMU</Button>
              <Button variant="destructive" size="sm">180 - Pompiers</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
    </div>
  );
}

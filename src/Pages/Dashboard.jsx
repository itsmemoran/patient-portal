import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, FileText, Pill, Clock, AlertCircle, CheckCircle, Bot, LayoutDashboard } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { PageHeader } from './PageHeader';
import {data} from "@/lib/consts/navigation"


export default function Dashboard({ onNavigate }) {

  const upcomingAppointments = [
    {
      id: 1,
      date: '2026-02-15',
      time: '14:30',
      doctor: 'Dr. Martin',
      type: 'Contrôle de routine'
    },
    {
      id: 2,
      date: '2026-02-20',
      time: '10:00',
      doctor: 'Dr. Olivier',
      type: 'Examen de la vue'
    }
  ];

  const recentResults = [
    {
      id: 1,
      date: '2026-02-01',
      test: 'Examen ophtalmologique',
      status: 'normal',
      doctor: 'Dr. Martin'
    },
    {
      id: 2,
      date: '2026-01-15',
      test: 'Test de tension oculaire',
      status: 'attention',
      doctor: 'Dr. Olivier'
    }
  ];

  const prescriptions = [
    {
      id: 1,
      medication: 'Gouttes oculaires Latanoprost',
      dosage: '1 goutte le soir',
      expires: '2026-01-15'
    },
    {
      id: 2,
      medication: 'Vitamines pour les yeux',
      dosage: '1 comprimé/jour',
      expires: '2026-02-01'
    }
  ];

  return (
    <div className="space-y-6 ml-2 mr-2">

      <PageHeader 
        title= {`Bonjour ${data.user.name}`}
        description="Voici un aperçu de votre dossier médical"
        icon={<LayoutDashboard className="h-6 w-6" />}
      />

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4">
        <Button 
            onClick={() => {
              window.location.href = "/appointments";
            }}
          variant="outline"
          className="h-auto p-4 flex flex-col items-center space-y-2 bg-primary hover:bg-primary/80">
          <Calendar className="h-6 w-6 text-white" />
          <span className='text-slate-50'>Prendre RDV</span>
        </Button>
        <Button 
         onClick={() => {
         window.location.href = "/TestResults";
          }}
          variant="outline"
          className="h-auto p-4 flex flex-col items-center space-y-2"
        >
          <FileText className="h-6 w-6" />
          <span>Mes résultats</span>
        </Button>
        <Button 
          onClick={() => {
          window.location.href = "/prescriptions";
          }}
          variant="outline"
          className="h-auto p-4 flex flex-col items-center space-y-2"
        >
          <Pill className="h-6 w-6" />
          <span>Ordonnances</span>
        </Button>
        <Button 
          onClick={() => {
            window.location.href = "/chatbot";
            }}         
          variant="outline"
          className="h-auto p-4 flex flex-col items-center space-y-2"
        >
          <Bot className="h-6 w-6" />
          <span>Assistant IA</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Appointments */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-primary" />
              <span>Prochains rendez-vous</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingAppointments.map((appointment) => (
              <div key={appointment.id} className="flex items-center justify-between p-3 bg-background rounded-lg">
                <div>
                  <p className="font-medium">{appointment.type}</p>
                  <p className="text-sm text-muted-foreground">{appointment.doctor}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">{new Date(appointment.date).toLocaleDateString('fr-FR')}</p>
                  <p className="text-sm text-muted-foreground">{appointment.time}</p>
                </div>
              </div>
            ))}
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => {
                window.location.href = "/appointments";
                }}
            >
              Voir tous les rendez-vous
            </Button>
          </CardContent>
        </Card>

        {/* Recent Results */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <FileText className="h-5 w-5 text-secondary" />
              <span>Résultats récents</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentResults.map((result) => (
              <div key={result.id} className="flex items-center justify-between p-3 bg-background rounded-lg">
                <div className="flex-1">
                  <p className="font-medium">{result.test}</p>
                  <p className="text-sm text-muted-foreground">{result.doctor}</p>
                </div>
                <div className="flex items-center space-x-2">
                  {result.status === 'normal' ? (
                    <Badge variant="default" className="bg-green-100 text-green-800">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Normal
                    </Badge>
                  ) : (
                    <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                      <AlertCircle className="h-3 w-3 mr-1" />
                      À surveiller
                    </Badge>
                  )}
                </div>
              </div>
            ))}
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => {
                window.location.href = "/TestResults";
                }}
            >
              Voir tous les résultats
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Active Prescriptions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Pill className="h-5 w-5 text-primary" />
            <span>Ordonnances actives</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {prescriptions.map((prescription) => (
              <div key={prescription.id} className="p-4 border rounded-lg">
                <h4 className="font-medium">{prescription.medication}</h4>
                <p className="text-sm text-muted-foreground mb-2">{prescription.dosage}</p>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-muted-foreground">
                    Expire le {new Date(prescription.expires).toLocaleDateString('fr-FR')}
                  </span>
                  <Badge variant="outline">Active</Badge>
                </div>
              </div>
            ))}
          </div>
          <Button 
            variant="outline" 
            className="w-full mt-4"
            onClick={() => {
              window.location.href = "/prescriptions";
              }}
          >
            Voir toutes les ordonnances
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

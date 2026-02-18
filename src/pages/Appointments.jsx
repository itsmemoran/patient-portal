import React from 'react'
import '../Styles/index.css'
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Calendar } from '../components/ui/calendar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { Badge } from '../components/ui/badge';
import { CalendarDays, Clock, MapPin, User, Plus } from 'lucide-react';
import { toast } from 'sonner';

export default function Appointments() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const appointments = [
    {
      id: 1,
      date: '2025-12-15',
      time: '14:30',
      doctor: 'Dr. Martin',
      specialty: 'Ophtalmologue',
      type: 'Contrôle de routine',
      status: 'confirmed',
      location: 'Cabinet 2'
    },
    {
      id: 2,
      date: '2025-12-20',
      time: '10:00',
      doctor: 'Dr. Olivier',
      specialty: 'Ophtalmologue',
      type: 'Examen de la vue',
      status: 'pending',
      location: 'Cabinet 1'
    },
    {
      id: 3,
      date: '2025-11-30',
      time: '16:00',
      doctor: 'Dr. Martin',
      specialty: 'Ophtalmologue',
      type: 'Consultation',
      status: 'completed',
      location: 'Cabinet 2'
    }
  ];

  const doctors = [
    { id: 'martin', name: 'Dr. Kouassi Martin', specialty: 'Ophtalmologue' },
    { id: 'olivier', name: 'Dr. Kouadio Olivier', specialty: 'Ophtalmologue' },
    { id: 'amina', name: 'Dr. Coulibaly Amina', specialty: 'Optométriste' }
  ];

  const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '14:00', '14:30', '15:00', '15:30', '16:00', '16:30'
  ];

  const handleBookAppointment = () => {
    if (!selectedDate || !selectedDoctor || !selectedTime) {
      toast.error('Veuillez remplir tous les champs');
      return;
    }

    toast.success('Rendez-vous réservé avec succès!');
    setIsDialogOpen(false);
    setSelectedDate(undefined);
    setSelectedDoctor('');
    setSelectedTime('');
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'confirmed':
        return <Badge className="bg-green-100 text-green-800">Confirmé</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800">En attente</Badge>;
      case 'completed':
        return <Badge className="bg-blue-100 text-blue-800">Terminé</Badge>;
      default:
        return <Badge variant="outline">Inconnu</Badge>;
    }
  };

  const upcomingAppointments = appointments.filter(apt => 
    new Date(apt.date) >= new Date() && apt.status !== 'completed'
  );

  const pastAppointments = appointments.filter(apt => 
    new Date(apt.date) < new Date() || apt.status === 'completed'
  );

  return (
    <div className="space-y-6 ml-2 mr-2">
    <div className="space-y-6">
    <div className="flex justify-between items-center m-6 pb-6 border-b border-border">
      <div className=''>
        <h1 className='text-2xl'>Mes rendez-vous</h1>
        <p className="text-muted-foreground">Gérez vos rendez-vous médicaux</p>
      </div>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button className="bg-primary hover:bg-primary/90">
            <Plus className="h-4 w-4 mr-2" />
            Nouveau rendez-vous
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Prendre un rendez-vous</DialogTitle>
            <DialogDescription>
              Choisissez une date, un médecin et un créneau horaire
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="block mb-2">Sélectionner une date</label>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                disabled={(date) => date < new Date()}
                className="rounded-md border"
              />
            </div>
            <div>
              <label className="block mb-2">Médecin</label>
              <Select value={selectedDoctor} onValueChange={setSelectedDoctor}>
                <SelectTrigger>
                  <SelectValue placeholder="Choisir un médecin" />
                </SelectTrigger>
                <SelectContent>
                  {doctors.map((doctor) => (
                    <SelectItem key={doctor.id} value={doctor.id}>
                      {doctor.name} - {doctor.specialty}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block mb-2">Heure</label>
              <Select value={selectedTime} onValueChange={setSelectedTime}>
                <SelectTrigger>
                  <SelectValue placeholder="Choisir un créneau" />
                </SelectTrigger>
                <SelectContent>
                  {timeSlots.map((time) => (
                    <SelectItem key={time} value={time}>
                      {time}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" className="flex-1" onClick={() => setIsDialogOpen(false)}>
                Annuler
              </Button>
              <Button className="flex-1 bg-primary hover:bg-primary/90" onClick={handleBookAppointment}>
                Confirmer
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>

    {/* Upcoming Appointments */}
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <CalendarDays className="h-5 w-5 text-primary" />
          <span>Rendez-vous à venir</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {upcomingAppointments.length === 0 ? (
          <p className="text-muted-foreground text-center py-8">Aucun rendez-vous à venir</p>
        ) : (
          <div className="space-y-4">
            {upcomingAppointments.map((appointment) => (
              <div key={appointment.id} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-medium">{appointment.type}</h3>
                    <div className="flex items-center space-x-4 mt-2 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <User className="h-4 w-4" />
                        <span>{appointment.doctor}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <CalendarDays className="h-4 w-4" />
                        <span>{new Date(appointment.date).toLocaleDateString('fr-FR')}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{appointment.time}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MapPin className="h-4 w-4" />
                        <span>{appointment.location}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end space-y-2">
                    {getStatusBadge(appointment.status)}
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">Modifier</Button>
                      <Button variant="destructive" size="sm">Annuler</Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>

    {/* Past Appointments */}
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Clock className="h-5 w-5 text-secondary" />
          <span>Historique des rendez-vous</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {pastAppointments.map((appointment) => (
            <div key={appointment.id} className="p-4 border rounded-lg opacity-75">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">{appointment.type}</h3>
                  <div className="flex items-center space-x-4 mt-2 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <User className="h-4 w-4" />
                      <span>{appointment.doctor}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <CalendarDays className="h-4 w-4" />
                      <span>{new Date(appointment.date).toLocaleDateString('fr-FR')}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{appointment.time}</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end space-y-2">
                  {getStatusBadge(appointment.status)}
                  <Button variant="outline" size="sm">Voir détails</Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  </div>
  </div>
  )

}




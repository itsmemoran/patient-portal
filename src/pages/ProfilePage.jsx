import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { Button } from '@/components/ui/button.jsx';
import { Input } from '@/components/ui/input.jsx';
import { Label } from '@/components/ui/label.jsx';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar.jsx';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx';
import { Switch } from '@/components/ui/switch.jsx';
import { User, Mail, Phone, MapPin, Calendar, Shield, Bell, Eye, Download, Camera } from 'lucide-react';
import { toast } from 'sonner';

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: 'Jean',
    lastName: 'Koffi',
    email: 'jean.koffi@email.com',
    phone: '+225 06 12 34 56 78',
    birthDate: '1985-03-15',
    address: ' riviera II, Abidjan, Côte d\'Ivoire',
    emergencyContact: 'Marie Koffi',
    emergencyPhone: '+225 06 12 34 56 78',
    nationality: 'Ivoirienne',
    profession: 'Ingénieur',
  });

  const [notifications, setNotifications] = useState({
    appointments: true,
    results: true,
    prescriptions: true,
    general: false,
    sms: true,
    email: true
  });

  const [privacy, setPrivacy] = useState({
    dataSharing: false,
    analytics: true,
    marketing: false
  });

  const [profileImage, setProfileImage] = useState(null);

  const handleSaveProfile = () => {
    // Validate required fields
    if (!profileData.firstName || !profileData.lastName || !profileData.email) {
      toast.error('Veuillez remplir tous les champs obligatoires');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(profileData.email)) {
      toast.error('Veuillez saisir une adresse email valide');
      return;
    }

    // Phone validation
    const phoneRegex = /^(\+33|0)[1-9](?:[0-9]{8})$/;
    if (profileData.phone && !phoneRegex.test(profileData.phone.replace(/\s/g, ''))) {
      toast.error('Veuillez saisir un numéro de téléphone valide');
      return;
    }

    // Simulate API call
    setTimeout(() => {
      toast.success('Profil mis à jour avec succès');
      setIsEditing(false);
    }, 1000);
  };

  const handleNotificationChange = (key, value) => {
    setNotifications(prev => ({ ...prev, [key]: value }));
    toast.success(`Préférences de notification mises à jour`);
  };

  const handlePrivacyChange = (key, value) => {
    setPrivacy(prev => ({ ...prev, [key]: value }));
    toast.success(`Paramètres de confidentialité mis à jour`);
  };

  const handlePasswordChange = () => {
    // In a real app, this would open a secure password change dialog
    toast.info('Fonctionnalité de changement de mot de passe - Redirection vers page sécurisée');
  };

  const handle2FASetup = () => {
    toast.info('Configuration de l\'authentification à deux facteurs - Redirection vers paramètres de sécurité');
  };

  const handleDataDownload = () => {
    // Simulate data download
    toast.success('Téléchargement de vos données en cours...');
    // In a real app, this would trigger a backend API call to generate and download user data
  };

  const handleAccountDeletion = () => {
    // Show confirmation dialog
    if (confirm('Êtes-vous sûr de vouloir supprimer votre compte? Cette action est irréversible.')) {
      toast.error('Suppression de compte - Contactez le support pour confirmer cette action');
    }
  };

  const handleProfilePhotoChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast.error('Veuillez sélectionner une image valide');
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error('La taille de l\'image ne doit pas dépasser 5MB');
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        setProfileImage(event.target.result);
        toast.success('Photo de profil mise à jour!');
        // In a real app, you would upload this to your backend
      };
      reader.readAsDataURL(file);
    }
  };

  const accountStats = {
    accountCreated: '2024-01-15',
    lastLogin: '2025-12-10',
    appointmentsTotal: 12,
    appointmentsYear: 8
  };

  return (
    <div className="space-y-6 ml-2 mr-2">
    <div className="space-y-6 ">
      <div className="flex items-center justify-between  m-6 pb-6 border-b border-border">
        <div>
          <h1 className="text-2xl">Mon profil</h1>
          <p className="text-muted-foreground">Gérez vos informations personnelles et préférences</p>
        </div>
        <Button 
          onClick={() => setIsEditing(!isEditing)}
          variant={isEditing ? "outline" : "default"}
        >
          {isEditing ? 'Annuler' : 'Modifier'}
        </Button>
      </div>

      <Tabs defaultValue="personal" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="personal">Personnel</TabsTrigger>
          <TabsTrigger value="medical">Médical</TabsTrigger>
          <TabsTrigger value="privacy">Confidentialité</TabsTrigger>
        </TabsList>

        <TabsContent value="personal" className="space-y-6">
          {/* Profile Header */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-6">
                <div className="relative group">
                  <Avatar className="h-24 w-24 cursor-pointer transition-all duration-200 group-hover:ring-4 group-hover:ring-primary/20">
                    <AvatarImage src={profileImage || "/placeholder-user.jpg"} alt="Photo de profil" />
                    <AvatarFallback className="text-xl">
                      {profileData.firstName[0]}{profileData.lastName[0]}
                    </AvatarFallback>
                  </Avatar>
                  <Button
                    variant="outline"
                    size="sm"
                    className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full p-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    onClick={() => document.getElementById('profile-photo-input')?.click()}
                  >
                    <Camera className="h-4 w-4" />
                  </Button>
                  <input
                    id="profile-photo-input"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleProfilePhotoChange}
                  />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl">{profileData.firstName} {profileData.lastName}</h2>
                  <p className="text-muted-foreground">{profileData.email}</p>
                  <div className="flex items-center space-x-4 mt-2 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>Né le {new Date(profileData.birthDate).toLocaleDateString('fr-FR')}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MapPin className="h-4 w-4" />
                      <span>Abidjan, Côte d'Ivoire</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col space-y-2">
                  <Button 
                    onClick={() => setIsEditing(!isEditing)}
                    variant={isEditing ? "outline" : "default"}
                    className="bg-primary hover:bg-primary/90"
                  >
                    {isEditing ? 'Annuler modifications' : 'Modifier le profil'}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => document.getElementById('profile-photo-input')?.click()}
                  >
                    <Camera className="h-4 w-4 mr-2" />
                    Changer la photo
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Personal Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="h-5 w-5 text-primary" />
                <span>Informations personnelles</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">Prénom</Label>
                  <Input
                    id="firstName"
                    value={profileData.firstName}
                    onChange={(e) => setProfileData(prev => ({ ...prev, firstName: e.target.value }))}
                    disabled={!isEditing}
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">Nom</Label>
                  <Input
                    id="lastName"
                    value={profileData.lastName}
                    onChange={(e) => setProfileData(prev => ({ ...prev, lastName: e.target.value }))}
                    disabled={!isEditing}
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                    disabled={!isEditing}
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Téléphone</Label>
                  <Input
                    id="phone"
                    value={profileData.phone}
                    onChange={(e) => setProfileData(prev => ({ ...prev, phone: e.target.value }))}
                    disabled={!isEditing}
                  />
                </div>
                <div>
                  <Label htmlFor="birthDate">Date de naissance</Label>
                  <Input
                    id="birthDate"
                    type="date"
                    value={profileData.birthDate}
                    onChange={(e) => setProfileData(prev => ({ ...prev, birthDate: e.target.value }))}
                    disabled={!isEditing}
                  />
                </div>
                <div>
                  <Label htmlFor="nationality">Nationalité</Label>
                  <Input
                    id="nationality"
                    value={profileData.nationality}
                    onChange={(e) => setProfileData(prev => ({ ...prev, nationality: e.target.value }))}
                    disabled={!isEditing}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="address">Adresse complète</Label>
                <Input
                  id="address"
                  value={profileData.address}
                  onChange={(e) => setProfileData(prev => ({ ...prev, address: e.target.value }))}
                  disabled={!isEditing}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="profession">Profession</Label>
                  <Input
                    id="profession"
                    value={profileData.profession}
                    onChange={(e) => setProfileData(prev => ({ ...prev, profession: e.target.value }))}
                    disabled={!isEditing}
                  />
                </div>
                <div>
                  <Label htmlFor="socialSecurity">Numéro de sécurité sociale</Label>
                  <Input
                    id="socialSecurity"
                    value={profileData.socialSecurity}
                    onChange={(e) => setProfileData(prev => ({ ...prev, socialSecurity: e.target.value }))}
                    disabled={!isEditing}
                  />
                </div>
              </div>

              {isEditing && (
                <div className="flex space-x-2 pt-4">
                  <Button onClick={handleSaveProfile} className="bg-primary hover:bg-primary/90">
                    Enregistrer les modifications
                  </Button>
                  <Button variant="outline" onClick={() => setIsEditing(false)}>
                    Annuler
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Emergency Contact */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Phone className="h-5 w-5 text-red-500" />
                <span>Contact d'urgence</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="emergencyContact">Nom du contact</Label>
                  <Input
                    id="emergencyContact"
                    value={profileData.emergencyContact}
                    onChange={(e) => setProfileData(prev => ({ ...prev, emergencyContact: e.target.value }))}
                    disabled={!isEditing}
                  />
                </div>
                <div>
                  <Label htmlFor="emergencyPhone">Téléphone d'urgence</Label>
                  <Input
                    id="emergencyPhone"
                    value={profileData.emergencyPhone}
                    onChange={(e) => setProfileData(prev => ({ ...prev, emergencyPhone: e.target.value }))}
                    disabled={!isEditing}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="medical" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Eye className="h-5 w-5 text-secondary" />
                <span>Informations médicales</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4>Informations générales</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Groupe sanguin:</span>
                      <span>A+</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Taille:</span>
                      <span>175 cm</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Poids:</span>
                      <span>70 kg</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4>Allergies connues</h4>
                  <div className="space-y-2">
                    <div className="p-2 bg-red-50 border border-red-200 rounded">
                      <span className="text-red-800">Pénicilline</span>
                    </div>
                    <div className="p-2 bg-red-50 border border-red-200 rounded">
                      <span className="text-red-800">Pollen</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t">
                <h4 className="mb-4">Historique médical</h4>
                <div className="space-y-2">
                  <div className="p-3 bg-gray-50 rounded">
                    <span className="text-sm">Myopie légère diagnostiquée en 2020</span>
                  </div>
                  <div className="p-3 bg-gray-50 rounded">
                    <span className="text-sm">Conjonctivite allergique - Episodes récurrents</span>
                  </div>
                </div>
              </div>

              <Button variant="outline" className="w-full">
                <Download className="h-4 w-4 mr-2" />
                Télécharger le dossier médical complet
              </Button>
            </CardContent>
          </Card>

          {/* Account Statistics */}
          <Card>
            <CardHeader>
              <CardTitle>Statistiques du compte</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <p className="text-2xl text-primary">{accountStats.appointmentsTotal}</p>
                  <p className="text-sm text-muted-foreground">Rendez-vous total</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl text-secondary">{accountStats.appointmentsYear}</p>
                  <p className="text-sm text-muted-foreground">Cette année</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl text-green-600">356</p>
                  <p className="text-sm text-muted-foreground">Jours suivi</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl text-blue-600">98%</p>
                  <p className="text-sm text-muted-foreground">Assiduité</p>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Compte créé le:</span>
                  <span className="ml-2">{new Date(accountStats.accountCreated).toLocaleDateString('fr-FR')}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Dernière connexion:</span>
                  <span className="ml-2">{new Date(accountStats.lastLogin).toLocaleDateString('fr-FR')}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="privacy" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="h-5 w-5 text-primary" />
                <span>Confidentialité et sécurité</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h4>Gestion des données</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p>Partage de données</p>
                      <p className="text-sm text-muted-foreground">Autoriser le partage avec des partenaires médicaux</p>
                    </div>
                    <Switch
                      checked={privacy.dataSharing}
                      onCheckedChange={(checked) => handlePrivacyChange('dataSharing', checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p>Analyses statistiques</p>
                      <p className="text-sm text-muted-foreground">Participer aux études anonymisées</p>
                    </div>
                    <Switch
                      checked={privacy.analytics}
                      onCheckedChange={(checked) => handlePrivacyChange('analytics', checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p>Communications marketing</p>
                      <p className="text-sm text-muted-foreground">Recevoir des offres et promotions</p>
                    </div>
                    <Switch
                      checked={privacy.marketing}
                      onCheckedChange={(checked) => handlePrivacyChange('marketing', checked)}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4 border-t pt-6">
                <h4>Sécurité du compte</h4>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full" onClick={handlePasswordChange}>
                    Changer le mot de passe
                  </Button>
                  <Button variant="outline" className="w-full" onClick={() => toast.info('Dernières connexions: Aujourd\'hui 14:32, Hier 09:15')}>
                    Voir les connexions récentes
                  </Button>
                </div>
              </div>

              <div className="space-y-4 border-t pt-6">
                <h4>Gestion du compte</h4>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full" onClick={handleDataDownload}>
                    <Download className="h-4 w-4 mr-2" />
                    Télécharger mes données
                  </Button>
                  <Button variant="destructive" className="w-full" onClick={handleAccountDeletion}>
                    Supprimer mon compte
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
    </div>
  );
}

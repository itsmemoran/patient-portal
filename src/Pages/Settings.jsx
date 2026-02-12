
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card.jsx';
import { Button } from '@/components/ui/button.jsx';
import { Switch } from '@/components/ui/switch.jsx';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.jsx';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx';
import { 
  Settings as SettingsIcon, 
  Bell, 
  Moon, 
  Sun, 
  Monitor,
  Trash2,
  Lock,
  Key,
  Smartphone,
  Mail,
  Palette,
} from 'lucide-react';
import { toast } from 'sonner';

export default function Settings() {
  // Appearance Settings
  const [theme, setTheme] = useState('system');
  const [language, setLanguage] = useState('fr');
  const [fontSize, setFontSize] = useState('medium');


  // Notification Settings
  const [notifications, setNotifications] = useState({
    appointments: true,
    results: true,
    prescriptions: true,
    general: false,
    reminders: true,
    newsletter: false
  });

  const [notificationChannels, setNotificationChannels] = useState({
    email: true,
    sms: true,
    push: true,
    inApp: true
  });

  const [notificationSound, setNotificationSound] = useState(true);
  const [notificationTime, setNotificationTime] = useState('08:00');

  // Privacy Settings
  const [privacy, setPrivacy] = useState({
    dataSharing: false,
    analytics: true,
    marketing: false,
    profileVisibility: 'private',
    activityTracking: true,
    locationServices: false
  });

  // Security Settings
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [biometricEnabled, setBiometricEnabled] = useState(false);
  const [sessionTimeout, setSessionTimeout] = useState('30');
  const [showPassword, setShowPassword] = useState(false);

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    toast.success(`Thème changé en ${newTheme === 'light' ? 'clair' : newTheme === 'dark' ? 'sombre' : 'système'}`);
  };

  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage);
    toast.success('Langue mise à jour');
  };

  const handleFontSizeChange = (newSize) => {
    setFontSize(newSize);
    toast.success('Taille de police mise à jour');
  };

  const handleNotificationChange = (key, value) => {
    setNotifications(prev => ({ ...prev, [key]: value }));
    toast.success('Préférences de notification mises à jour');
  };

  const handleNotificationChannelChange = (key, value) => {
    setNotificationChannels(prev => ({ ...prev, [key]: value }));
    toast.success('Canaux de notification mis à jour');
  };

  const handlePrivacyChange = (key, value) => {
    setPrivacy(prev => ({ ...prev, [key]: value }));
    toast.success('Paramètres de confidentialité mis à jour');
  };

  const handlePasswordChange = () => {
    toast.info('Redirection vers la page de changement de mot de passe sécurisée');
  };

  const handleEnable2FA = () => {
    setTwoFactorEnabled(!twoFactorEnabled);
    toast.success(twoFactorEnabled ? 'Authentification à deux facteurs désactivée' : 'Authentification à deux facteurs activée');
  };

  const handleEnableBiometric = () => {
    setBiometricEnabled(!biometricEnabled);
    toast.success(biometricEnabled ? 'Authentification biométrique désactivée' : 'Authentification biométrique activée');
  };

  const handleDataExport = () => {
    toast.success('Génération de votre export de données en cours...');
    setTimeout(() => {
      toast.success('Vos données ont été téléchargées');
    }, 2000);
  };

  const handleClearCache = () => {
    toast.success('Cache effacé avec succès');
  };

  const handleResetSettings = () => {
    if (confirm('Êtes-vous sûr de vouloir réinitialiser tous les paramètres ?')) {
      toast.success('Paramètres réinitialisés aux valeurs par défaut');
    }
  };

  return (
    <div className="space-y-6 ml-2 mr-2">
    <div className="space-y-6 ">
      <div className="flex items-center justify-between  m-6 pb-6 border-b border-border">
        <div>
          <h1 className="text-2xl">Paramètres</h1>
          <p className="text-muted-foreground">Gérez vos préférences et paramètres de l'application</p>
        </div>
        <Button variant="outline" onClick={handleResetSettings}>
          Réinitialiser
        </Button>
      </div>

      <Tabs defaultValue="appearance" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="appearance">Apparence</TabsTrigger>
          <TabsTrigger value="security">Sécurité</TabsTrigger>
          <TabsTrigger value="advanced">Avancé</TabsTrigger>
        </TabsList>

        {/* Appearance Settings */}
        <TabsContent value="appearance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Palette className="h-5 w-5 text-primary" />
                <span>Thème et apparence</span>
              </CardTitle>
              <CardDescription>
                Personnalisez l'apparence de l'application
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h4>Thème</h4>
                <div className="grid grid-cols-3 gap-4">
                  <Button
                    variant={theme === 'light' ? 'default' : 'outline'}
                    className="flex flex-col items-center py-6"
                    onClick={() => handleThemeChange('light')}
                  >
                    <Sun className="h-6 w-6" />
                    <span>Clair</span>
                  </Button>
                  <Button
                    variant={theme === 'dark' ? 'default' : 'outline'}
                    className="flex flex-col items-center py-6"
                    onClick={() => handleThemeChange('dark')}
                  >
                    <Moon className="h-6 w-6" />
                    <span>Sombre</span>
                  </Button>
                  <Button
                    variant={theme === 'system' ? 'default' : 'outline'}
                    className="flex flex-col items-center py-6"
                    onClick={() => handleThemeChange('system')}
                  >
                    <Monitor className="h-6 w-6" />
                    <span>Système</span>
                  </Button>
                </div>
              </div>

              <div className="space-y-4 border-t pt-6">
                <h4>Langue</h4>
                <Select value={language} onValueChange={handleLanguageChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner une langue" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fr">🇫🇷 Français</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Settings */}
        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Lock className="h-5 w-5 text-primary" />
                <span>Sécurité du compte</span>
              </CardTitle>
              <CardDescription>
                Protégez votre compte avec des mesures de sécurité avancées
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h4>Authentification</h4>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start" onClick={handlePasswordChange}>
                    <Key className="h-4 w-4 mr-2" />
                    Changer le mot de passe
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Advanced Settings */}
        <TabsContent value="advanced" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <SettingsIcon className="h-5 w-5 text-primary" />
                <span>Paramètres avancés</span>
              </CardTitle>
              <CardDescription>
                Options techniques et gestion avancée
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h4>Stockage et cache</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div>
                      <p className="text-sm">Cache de l'application</p>
                      <p className="text-xs text-muted-foreground">~45 MB</p>
                    </div>
                    <Button variant="outline" size="sm" onClick={handleClearCache}>
                      Effacer
                    </Button>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div>
                      <p className="text-sm">Documents téléchargés</p>
                      <p className="text-xs text-muted-foreground">~128 MB</p>
                    </div>
                    <Button variant="outline" size="sm" onClick={() => toast.info('Gestion des téléchargements')}>
                      Gérer
                    </Button>
                  </div>
                </div>
              </div>

              <div className="space-y-4 border-t pt-6">
                <h4>Zone dangereuse</h4>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full" onClick={handleResetSettings}>
                    Réinitialiser tous les paramètres
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

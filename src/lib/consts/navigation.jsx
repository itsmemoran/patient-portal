import {
    LayoutDashboardIcon,
    Calendar,
    FileIcon,
    TestTubeIcon,
    PillIcon,
    CreditCardIcon,
    BotIcon,
    PhoneIcon,
    Settings2Icon,
  } from "lucide-react";

  
  export const data = {
    user: {
      name: "Jean Koffi",
      email: "JeanKoffi@example.com",
      avatar: "/avatars/shadcn.jpg",
    },
    
    navMain: [
      { title: "Dashboard", url: "/", icon: LayoutDashboardIcon },
      { title: "Rendez-vous", url: "/appointments", icon: Calendar },
      { title: "Dossier Medical", url: "/MedicalRecords", icon: FileIcon },
      { title: "Résultats d'examens", url: "/TestResults", icon: TestTubeIcon },
      { title: "Ordonnances", url: "/prescriptions", icon: PillIcon },
      { title: "Assistant IA", url: "/chatbot", icon: BotIcon },
      { title: "Contacts", url: "/Contacts", icon: PhoneIcon },
    ],
    navSecondary: [
      { title: "Settings", url: "/settings", icon: Settings2Icon },
    ],
  };

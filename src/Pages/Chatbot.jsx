import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { MessageCircle, Mic, MicOff, Send, Bot, User, Volume2, VolumeX } from 'lucide-react';
import { toast } from 'sonner';

export default function Chatbot() {
  
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Bonjour Jean! Je suis Danan AI, votre assistant médical virtuel. Comment puis-je vous aider aujourd'hui?",
      sender: 'bot',
      timestamp: new Date(),
      type: 'text'
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  
  const messagesEndRef = useRef(null);
  const recognitionRef = useRef(null);
  const synthesisRef = useRef(null);

  // Mock patient data - in real app, this would come from backend
  const patientData = {
    name: "Jean Dupont",
    appointments: [
      { date: "2024-12-15", doctor: "Dr. Martin", type: "Contrôle de routine" },
      { date: "2024-12-20", doctor: "Dr. Dubois", type: "Examen de la vue" }
    ],
    medications: [
      { name: "Latanoprost", dosage: "1 goutte le soir" },
      { name: "Hyabak", dosage: "3-4 fois par jour" }
    ],
    lastVisit: "2024-12-01",
    nextAppointment: "2024-12-15",
    allergies: ["Pénicilline", "Pollen"],
    conditions: ["Myopie légère"]
  };

  // Initialize speech recognition and synthesis
  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
          const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
          recognitionRef.current = new SpeechRecognition();
          recognitionRef.current.continuous = false;
          recognitionRef.current.interimResults = false;
          recognitionRef.current.lang = 'fr-FR';

          recognitionRef.current.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            setInputMessage(transcript);
            setIsListening(false);
          };

          recognitionRef.current.onerror = () => {
            setIsListening(false);
            toast.error('Erreur de reconnaissance vocale');
          };

          recognitionRef.current.onend = () => {
            setIsListening(false);
          };
        }

        if ('speechSynthesis' in window) {
          synthesisRef.current = window.speechSynthesis;
        }
      }
    } catch (error) {
      console.log('Speech APIs not available:', error);
    }

    return () => {
      try {
        if (recognitionRef.current) {
          recognitionRef.current.stop();
        }
        if (synthesisRef.current) {
          synthesisRef.current.cancel();
        }
      } catch (error) {
        console.log('Error cleaning up speech APIs:', error);
      }
    };
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // AI Response Generator
  const generateAIResponse = (userMessage) => {
    const message = userMessage.toLowerCase();
    
    // Greeting responses
    if (message.includes('bonjour') || message.includes('salut') || message.includes('hello')) {
      return `Bonjour ${patientData.name}! Comment vous sentez-vous aujourd'hui?`;
    }
    
    // Appointment related
    if (message.includes('rendez-vous') || message.includes('rdv') || message.includes('appointment')) {
      const nextAppt = patientData.appointments[0];
      return `Votre prochain rendez-vous est le ${new Date(nextAppt.date).toLocaleDateString('fr-FR')} avec ${nextAppt.doctor} pour ${nextAppt.type}. Souhaitez-vous le modifier ou en prendre un nouveau?`;
    }
    
    // Medication related
    if (message.includes('médicament') || message.includes('ordonnance') || message.includes('traitement')) {
      return `Vous prenez actuellement ${patientData.medications.map(med => med.name).join(' et ')}. Avez-vous des questions sur votre traitement ou souhaitez-vous un rappel de prise?`;
    }
    
    // Results related
    if (message.includes('résultat') || message.includes('examen') || message.includes('analyse')) {
      return `Vos derniers résultats du ${new Date(patientData.lastVisit).toLocaleDateString('fr-FR')} montrent des valeurs normales. Souhaitez-vous consulter le détail ou prendre rendez-vous pour de nouveaux examens?`;
    }
    
    // Symptoms or pain
    if (message.includes('douleur') || message.includes('mal') || message.includes('symptôme')) {
      return `Je comprends votre préoccupation. Pouvez-vous me décrire plus précisément vos symptômes? Si c'est urgent, n'hésitez pas à contacter directement le centre au +33 1 42 34 56 79.`;
    }
    
    // Emergency
    if (message.includes('urgence') || message.includes('urgent') || message.includes('grave')) {
      return `⚠️ Pour toute urgence médicale, contactez immédiatement:\n🚨 SAMU: 15\n🏥 Centre Medical Danan: +33 1 42 34 56 79\n\nSi ce n'est pas urgent, je peux vous aider à prendre rendez-vous.`;
    }
    
    // Payment related
    if (message.includes('paiement') || message.includes('facture') || message.includes('payer')) {
      return `Vous avez une facture en attente de 45€ pour votre dernière consultation. Souhaitez-vous procéder au paiement en ligne ou avez-vous des questions sur votre facturation?`;
    }
    
    // General health advice
    if (message.includes('conseil') || message.includes('recommandation') || message.includes('santé')) {
      return `Basé sur votre profil médical, je recommande:\n• Porter des lunettes de soleil\n• Faire des pauses écran régulières\n• Prendre vos gouttes oculaires comme prescrit\n\nAvez-vous des questions spécifiques?`;
    }
    
    // Default response with quick actions
    return `Je ne suis pas sûr de comprendre votre demande. Voici comment je peux vous aider:\n• Prendre un rendez-vous\n• Vérifier vos médicaments\n• Consulter vos résultats\n• Informations d'urgence\n\nQue souhaitez-vous faire?`;
  };

  const speakMessage = (text) => {
    try {
      if (synthesisRef.current && !isSpeaking && typeof window !== 'undefined') {
        // Clean text for speech synthesis
        const cleanText = text.replace(/[⚠️🚨🏥]/g, '').replace(/\n/g, ' ');
        
        const utterance = new SpeechSynthesisUtterance(cleanText);
        utterance.lang = 'fr-FR';
        utterance.rate = 0.9;
        utterance.pitch = 1;
        
        utterance.onstart = () => setIsSpeaking(true);
        utterance.onend = () => setIsSpeaking(false);
        utterance.onerror = () => setIsSpeaking(false);
        
        synthesisRef.current.speak(utterance);
      }
    } catch (error) {
      console.log('Error with speech synthesis:', error);
      setIsSpeaking(false);
    }
  };

  const stopSpeaking = () => {
    if (synthesisRef.current) {
      synthesisRef.current.cancel();
      setIsSpeaking(false);
    }
  };

  const startListening = () => {
    try {
      if (recognitionRef.current && !isListening) {
        setIsListening(true);
        recognitionRef.current.start();
      } else {
        toast.error('La reconnaissance vocale n\'est pas supportée par votre navigateur');
      }
    } catch (error) {
      setIsListening(false);
      toast.error('Erreur lors du démarrage de la reconnaissance vocale');
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  const sendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponse = {
        id: Date.now() + 1,
        text: generateAIResponse(inputMessage),
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
      
      // Auto-speak AI response
      speakMessage(aiResponse.text);
    }, 1000 + Math.random() * 2000);
  };

  const quickReplies = [
    "Prendre un rendez-vous",
    "Mes médicaments",
    "Mes résultats",
    "Contact d'urgence",
    "Mes factures"
  ];

  const handleQuickReply = (reply) => {
    setInputMessage(reply);
  };

  return (
    <div className="flex flex-col h-[600px] max-w-4xl mx-auto my-8">
      <Card className="flex-1 flex flex-col">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center space-x-2">
            <div className="relative">
              <Bot className="h-6 w-6 text-primary" />
              <div className="absolute -bottom-1 -right-1 h-3 w-3 bg-green-500 rounded-full border-2 border-white"></div>
            </div>
            <span>Danan AI Assistant</span>
            <Badge variant="secondary" className="ml-2">
              IA Médicale
            </Badge>
          </CardTitle>
        </CardHeader>
        
        <CardContent className="flex-1 flex flex-col">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-2">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex max-w-[80%] ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'} items-start space-x-2`}>
                  <Avatar className="w-8 h-8 flex-shrink-0">
                    {message.sender === 'bot' ? (
                      <>
                        <AvatarImage src="/bot-avatar.png" />
                        <AvatarFallback className="bg-primary text-primary-foreground">
                          <Bot className="h-4 w-4" />
                        </AvatarFallback>
                      </>
                    ) : (
                      <>
                        <AvatarImage src="/user-avatar.png" />
                        <AvatarFallback className="bg-secondary text-secondary-foreground">
                          <User className="h-4 w-4" />
                        </AvatarFallback>
                      </>
                    )}
                  </Avatar>
                  
                  <div
                    className={`rounded-lg px-4 py-2 ${
                      message.sender === 'user'
                        ? 'bg-primary text-primary-foreground ml-2'
                        : 'bg-gray-100 text-gray-900 mr-2'
                    }`}
                  >
                    <p className="whitespace-pre-line">{message.text}</p>
                    <p className="text-xs opacity-70 mt-1">
                      {message.timestamp.toLocaleTimeString('fr-FR', { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </p>
                    {message.sender === 'bot' && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0 mt-1 opacity-70 hover:opacity-100"
                        onClick={() => speakMessage(message.text)}
                      >
                        <Volume2 className="h-3 w-3" />
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="flex items-start space-x-2">
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      <Bot className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="bg-gray-100 rounded-lg px-4 py-2">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Replies */}
          <div className="mb-4">
            <p className="text-sm text-muted-foreground mb-2">Réponses rapides:</p>
            <div className="flex flex-wrap gap-2">
              {quickReplies.map((reply, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => handleQuickReply(reply)}
                  className="text-xs"
                >
                  {reply}
                </Button>
              ))}
            </div>
          </div>

          {/* Input Area */}
          <div className="flex items-center space-x-2">
            <div className="flex-1 relative">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Tapez votre message ou utilisez le micro..."
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                className="pr-12"
              />
            </div>
            
            {/* Voice Controls */}
            <div className="flex space-x-1">
              {isSpeaking ? (
                <Button
                  variant="outline"
                  size="icon"
                  onClick={stopSpeaking}
                  className="text-red-600"
                >
                  <VolumeX className="h-4 w-4" />
                </Button>
              ) : (
                <Button
                  variant="outline"
                  size="icon"
                  onClick={isListening ? stopListening : startListening}
                  className={isListening ? 'text-red-600 animate-pulse' : 'text-primary'}
                >
                  {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                </Button>
              )}
              
              <Button onClick={sendMessage} size="icon" className="bg-primary hover:bg-primary/90">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Status indicators */}
          <div className="flex justify-between items-center mt-2 text-xs text-muted-foreground">
            <div className="flex items-center space-x-4">
              {isListening && (
                <div className="flex items-center space-x-1 text-red-600">
                  <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></div>
                  <span>Écoute en cours...</span>
                </div>
              )}
              {isSpeaking && (
                <div className="flex items-center space-x-1 text-blue-600">
                  <Volume2 className="h-3 w-3" />
                  <span>Lecture en cours...</span>
                </div>
              )}
            </div>
            <span>Danan AI - Sécurisé et confidentiel</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}


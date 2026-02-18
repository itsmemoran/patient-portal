import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import { Button } from "../components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "../components/ui/dialog"
import { Pill, Download, Clock, AlertTriangle, CheckCircle } from "lucide-react"
import { toast } from "sonner"

export default function Prescriptions() {
  const [selectedPrescription, setSelectedPrescription] = useState(null)

  const activePrescriptions = [
    {
      id: 1,
      medication: "Latanoprost 0.005%",
      type: "Gouttes oculaires",
      dosage: "1 goutte dans chaque œil",
      frequency: "Une fois par jour le soir",
      duration: "6 mois",
      prescribedBy: "Dr. Martin",
      prescribedDate: "2025-11-01",
      expiryDate: "2025-12-01",
      refillsRemaining: 3,
      totalRefills: 5,
      instructions:
        "Instiller le soir avant le coucher. Attendre 5 minutes entre les gouttes si plusieurs médicaments.",
      sideEffects: ["Rougeur temporaire", "Légère irritation"],
      status: "active"
    },
    {
      id: 2,
      medication: "Hyabak 0.15%",
      type: "Larmes artificielles",
      dosage: "1-2 gouttes",
      frequency: "3-4 fois par jour",
      duration: "Usage prolongé",
      prescribedBy: "Dr. Olivier",
      prescribedDate: "2025-11-15",
      expiryDate: "2026-11-15",
      refillsRemaining: 2,
      totalRefills: 3,
      instructions: "Utiliser selon les besoins pour la sécheresse oculaire.",
      sideEffects: ["Aucun effet secondaire connu"],
      status: "active"
    }
  ]

  const expiredPrescriptions = [
    {
      id: 3,
      medication: "Tobramycine 0.3%",
      type: "Antibiotique oculaire",
      dosage: "1 goutte",
      frequency: "4 fois par jour",
      duration: "7 jours",
      prescribedBy: "Dr. Bernard",
      prescribedDate: "2025-01-20",
      expiryDate: "2026-01-27",
      refillsRemaining: 0,
      totalRefills: 0,
      instructions: "Traitement court pour infection.",
      sideEffects: ["Irritation locale possible"],
      status: "completed"
    }
  ]

  const renewalRequests = [
    {
      id: 1,
      medication: "Latanoprost 0.005%",
      requestDate: "2025-12-10",
      status: "pending",
      estimatedApproval: "2026-12-12"
    }
  ]

  const getStatusBadge = status => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800">Active</Badge>
      case "expired":
        return <Badge className="bg-red-100 text-red-800">Expirée</Badge>
      case "completed":
        return <Badge className="bg-gray-100 text-gray-800">Terminée</Badge>
      case "pending":
        return (
          <Badge className="bg-yellow-100 text-yellow-800">En attente</Badge>
        )
      default:
        return <Badge variant="outline">Inconnu</Badge>
    }
  }

  const handleRenewRequest = prescriptionId => {
    toast.success("Demande de renouvellement envoyée")
  }

  const getDaysUntilExpiry = expiryDate => {
    const today = new Date()
    const expiry = new Date(expiryDate)
    const diffTime = expiry.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  return (
    <div className="space-y-6 ml-2 mr-2">
    <div className="space-y-6 m-6 pb-6 border-b border-border">
      <div>
        <h1 className="text-2xl">Mes ordonnances</h1>
        <p className="text-muted-foreground">
          Gérez vos prescriptions et médicaments
        </p>
      </div>

      <Tabs defaultValue="active" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="active">Actives</TabsTrigger>
          <TabsTrigger value="history">Historique</TabsTrigger>
          <TabsTrigger value="renewals">Renouvellements</TabsTrigger>
          <TabsTrigger value="reminders">Rappels</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4">
          {/* Alerts for expiring prescriptions */}
          <Card className="border-yellow-200 bg-yellow-50">
            <CardContent className="pt-6">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="h-5 w-5 text-yellow-600" />
                <p className="text-yellow-800 font-medium">
                  1 ordonnance expire dans moins de 30 jours
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-4">
            {activePrescriptions.map(prescription => {
              const daysUntilExpiry = getDaysUntilExpiry(
                prescription.expiryDate
              )
              return (
                <Card
                  key={prescription.id}
                  className={daysUntilExpiry <= 30 ? "border-yellow-200" : ""}
                >
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="flex items-center space-x-2">
                          <Pill className="h-5 w-5 text-primary" />
                          <span>{prescription.medication}</span>
                        </CardTitle>
                        <p className="text-muted-foreground">
                          {prescription.type}
                        </p>
                      </div>
                      <div className="flex space-x-2">
                        {getStatusBadge(prescription.status)}
                        {daysUntilExpiry <= 30 && (
                          <Badge
                            variant="secondary"
                            className="bg-yellow-100 text-yellow-800"
                          >
                            Expire dans {daysUntilExpiry} jours
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">
                          Posologie
                        </label>
                        <p>{prescription.dosage}</p>
                        <p className="text-sm text-muted-foreground">
                          {prescription.frequency}
                        </p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">
                          Prescrit par
                        </label>
                        <p>{prescription.prescribedBy}</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(
                            prescription.prescribedDate
                          ).toLocaleDateString("fr-FR")}
                        </p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">
                          Renouvellements
                        </label>
                        <p>
                          {prescription.refillsRemaining}/
                          {prescription.totalRefills} restants
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Expire le{" "}
                          {new Date(prescription.expiryDate).toLocaleDateString(
                            "fr-FR"
                          )}
                        </p>
                      </div>
                    </div>

                    <div className="p-4 bg-blue-50 rounded-lg">
                      <p className="text-sm text-blue-800">
                        <strong>Instructions:</strong>{" "}
                        {prescription.instructions}
                      </p>
                    </div>

                    <div className="flex justify-between items-center">
                      <Button
                        variant="outline"
                        onClick={() => setSelectedPrescription(prescription)}
                      >
                        Voir détails
                      </Button>
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleRenewRequest(prescription.id)}
                        >
                          Demander renouvellement
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-1" />
                          Télécharger
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <div className="space-y-4">
            {expiredPrescriptions.map(prescription => (
              <Card key={prescription.id} className="opacity-75">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="flex items-center space-x-2">
                        <Pill className="h-5 w-5 text-gray-500" />
                        <span>{prescription.medication}</span>
                      </CardTitle>
                      <p className="text-muted-foreground">
                        {prescription.type}
                      </p>
                    </div>
                    {getStatusBadge(prescription.status)}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">
                        Posologie
                      </label>
                      <p>{prescription.dosage}</p>
                      <p className="text-sm text-muted-foreground">
                        {prescription.frequency}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">
                        Prescrit par
                      </label>
                      <p>{prescription.prescribedBy}</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(
                          prescription.prescribedDate
                        ).toLocaleDateString("fr-FR")}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">
                        Durée
                      </label>
                      <p>{prescription.duration}</p>
                      <p className="text-sm text-muted-foreground">
                        Terminé le{" "}
                        {new Date(prescription.expiryDate).toLocaleDateString(
                          "fr-FR"
                        )}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="renewals" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Demandes de renouvellement</CardTitle>
            </CardHeader>
            <CardContent>
              {renewalRequests.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">
                  Aucune demande de renouvellement en cours
                </p>
              ) : (
                <div className="space-y-4">
                  {renewalRequests.map(request => (
                    <div
                      key={request.id}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div>
                        <h4 className="font-medium">{request.medication}</h4>
                        <p className="text-sm text-muted-foreground">
                          Demandé le{" "}
                          {new Date(request.requestDate).toLocaleDateString(
                            "fr-FR"
                          )}
                        </p>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <p className="text-sm text-muted-foreground">
                            Approbation estimée
                          </p>
                          <p className="font-medium">
                            {new Date(
                              request.estimatedApproval
                            ).toLocaleDateString("fr-FR")}
                          </p>
                        </div>
                        {getStatusBadge(request.status)}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reminders" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-primary" />
                <span>Rappels de prise</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-medium">Latanoprost</h4>
                      <p className="text-sm text-muted-foreground">
                        Prochaine prise: 22:00
                      </p>
                    </div>
                    <Badge className="bg-green-100 text-green-800">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Prise à jour
                    </Badge>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      Marquer comme pris
                    </Button>
                    <Button variant="outline" size="sm">
                      Reporter
                    </Button>
                  </div>
                </div>

                <div className="p-4 border rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-medium">Hyabak</h4>
                      <p className="text-sm text-muted-foreground">
                        Prochaine prise: 14:00
                      </p>
                    </div>
                    <Badge className="bg-yellow-100 text-yellow-800">
                      En retard
                    </Badge>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      Marquer comme pris
                    </Button>
                    <Button variant="outline" size="sm">
                      Reporter
                    </Button>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium mb-2">Paramètres des rappels</h4>
                <div className="space-y-2">
                  <Button variant="outline" size="sm" className="w-full">
                    Configurer les notifications
                  </Button>
                  <Button variant="outline" size="sm" className="w-full">
                    Modifier les horaires
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Prescription Details Dialog */}
      {selectedPrescription && (
        <Dialog
          open={!!selectedPrescription}
          onOpenChange={() => setSelectedPrescription(null)}
        >
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>{selectedPrescription.medication}</DialogTitle>
              <DialogDescription>Détails de l'ordonnance</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Type
                  </label>
                  <p>{selectedPrescription.type}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Durée
                  </label>
                  <p>{selectedPrescription.duration}</p>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Instructions complètes
                </label>
                <p className="mt-1 p-3 bg-blue-50 rounded">
                  {selectedPrescription.instructions}
                </p>
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Effets secondaires possibles
                </label>
                <ul className="mt-1 list-disc list-inside text-sm">
                  {selectedPrescription.sideEffects.map((effect, index) => (
                    <li key={index}>{effect}</li>
                  ))}
                </ul>
              </div>

              <div className="flex justify-end space-x-2">
                <Button
                  variant="outline"
                  onClick={() => setSelectedPrescription(null)}
                >
                  Fermer
                </Button>
                <Button>
                  <Download className="h-4 w-4 mr-1" />
                  Télécharger
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
    </div>
  )
}

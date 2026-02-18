import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  FileText,
  Download,
  TrendingUp,
  TrendingDown,
  Minus,
  Eye
} from "lucide-react"

export default function TestResults() {
  const testResults = [
    {
      id: 1,
      testName: "Acuité visuelle",
      date: "2025-12-01",
      doctor: "Dr. Martin",
      status: "normal",
      results: {
        oeilDroit: "10/10",
        oeilGauche: "10/10",
        vision: "Excellente"
      },
      trend: "stable",
      notes: "Vision stable, aucune correction nécessaire"
    },
    {
      id: 2,
      testName: "Tension oculaire",
      date: "2025-12-01",
      doctor: "Dr. Martin",
      status: "normal",
      results: {
        oeilDroit: "14 mmHg",
        oeilGauche: "13 mmHg",
        normal: "10-21 mmHg"
      },
      trend: "down",
      notes: "Légère diminution, dans les valeurs normales"
    },
    {
      id: 3,
      testName: "Examen du fond d'œil",
      date: "2025-12-01",
      doctor: "Dr. Martin",
      status: "normal",
      results: {
        retine: "Normale",
        maculaire: "Normale",
        vaisseaux: "Normaux"
      },
      trend: "stable",
      notes: "Aucune anomalie détectée"
    },
    {
      id: 4,
      testName: "Test de vision des couleurs",
      date: "2025-06-15",
      doctor: "Dr. Olivier",
      status: "attention",
      results: {
        score: "85%",
        deficience: "Légère deutéranomalie",
        severity: "Mineure"
      },
      trend: "stable",
      notes: "Déficience légère de la vision des couleurs rouge-vert"
    }
  ]

  const chartData = [
    {
      date: "2025-01",
      acuiteOD: 10,
      acuiteOG: 10,
      tensionOD: 15,
      tensionOG: 14
    },
    {
      date: "2025-06",
      acuiteOD: 10,
      acuiteOG: 10,
      tensionOD: 14,
      tensionOG: 13
    },
    {
      date: "2025-12",
      acuiteOD: 10,
      acuiteOG: 10,
      tensionOD: 14,
      tensionOG: 13
    }
  ]

  const getStatusBadge = status => {
    switch (status) {
      case "normal":
        return <Badge className="bg-green-100 text-green-800">Normal</Badge>
      case "attention":
        return (
          <Badge className="bg-yellow-100 text-yellow-800">À surveiller</Badge>
        )
      case "abnormal":
        return <Badge className="bg-red-100 text-red-800">Anormal</Badge>
      default:
        return <Badge variant="outline">Inconnu</Badge>
    }
  }

  const getTrendIcon = trend => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-4 w-4 text-green-600" />
      case "down":
        return <TrendingDown className="h-4 w-4 text-red-600" />
      case "stable":
        return <Minus className="h-4 w-4 text-gray-600" />
      default:
        return null
    }
  }

  return (
    <div className="space-y-6 ml-2 mr-2">
    <div className="space-y-6  m-6 pb-6 border-b border-border">
      <div>
        <h1 className="text-2xl">Résultats d'examens</h1>
        <p className="text-muted-foreground">
          Consultez vos résultats d'examens médicaux
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Dernière visite
                </p>
                <p className="text-2xl font-bold">01/12/2025</p>
              </div>
              <Eye className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Examens normaux
                </p>
                <p className="text-2xl font-bold text-green-600">3/4</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  À surveiller
                </p>
                <p className="text-2xl font-bold text-yellow-600">1</p>
              </div>
              <TrendingDown className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Results */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileText className="h-5 w-5 text-primary" />
            <span>Résultats récents</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {testResults.map(result => (
              <div key={result.id} className="p-6 border rounded-lg">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-medium text-lg">{result.testName}</h3>
                    <div className="flex items-center space-x-4 mt-1">
                      <span className="text-sm text-muted-foreground">
                        {new Date(result.date).toLocaleDateString("fr-FR")} •{" "}
                        {result.doctor}
                      </span>
                      {getTrendIcon(result.trend)}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {getStatusBadge(result.status)}
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-1" />
                      PDF
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  {Object.entries(result.results).map(([key, value]) => (
                    <div key={key} className="bg-gray-50 p-3 rounded">
                      <p className="text-sm font-medium text-muted-foreground capitalize">
                        {key.replace(/([A-Z])/g, " $1").trim()}
                      </p>
                      <p className="text-lg font-bold">{value}</p>
                    </div>
                  ))}
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <strong>Notes du médecin:</strong> {result.notes}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Trends Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Évolution des paramètres</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <h4 className="font-medium mb-4">
                Acuité visuelle (derniers 12 mois)
              </h4>
              <div className="space-y-3">
                {chartData.map((data, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <span className="text-sm w-16">{data.date}</span>
                    <div className="flex-1 space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>Œil droit: {data.acuiteOD}/10</span>
                        <span>Œil gauche: {data.acuiteOG}/10</span>
                      </div>
                      <Progress
                        value={(data.acuiteOD / 10) * 100}
                        className="h-2"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-4">Tension oculaire (mmHg)</h4>
              <div className="space-y-3">
                {chartData.map((data, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <span className="text-sm w-16">{data.date}</span>
                    <div className="flex-1 space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>Œil droit: {data.tensionOD} mmHg</span>
                        <span>Œil gauche: {data.tensionOG} mmHg</span>
                      </div>
                      <Progress
                        value={(data.tensionOD / 25) * 100}
                        className="h-2"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle>Recommandations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <h4 className="font-medium text-green-800 mb-2">
                Globalement satisfaisant
              </h4>
              <p className="text-green-700 text-sm">
                Vos résultats d'examens sont dans l'ensemble très satisfaisants.
                Continuez vos bonnes habitudes de soins oculaires.
              </p>
            </div>

            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <h4 className="font-medium text-yellow-800 mb-2">
                Points d'attention
              </h4>
              <ul className="text-yellow-700 text-sm space-y-1">
                <li>• Surveillance de la vision des couleurs recommandée</li>
                <li>• Prochain contrôle dans 6 mois</li>
              </ul>
            </div>

            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h4 className="font-medium text-blue-800 mb-2">
                Conseils généraux
              </h4>
              <ul className="text-blue-700 text-sm space-y-1">
                <li>• Portez des lunettes de soleil en extérieur</li>
                <li>
                  • Faites des pauses régulières lors du travail sur écran
                </li>
                <li>• Maintenez une alimentation riche en vitamines A et E</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
    </div>
  )
}


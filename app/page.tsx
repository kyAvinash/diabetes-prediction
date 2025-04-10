"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { toast } from "@/components/ui/use-toast"
import { AlertCircle, Activity, Database, Home, Info, LineChart } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function DiabetesApp() {
  const router = useRouter()

  return (
    <div className="container mx-auto py-10">
      <header className="flex items-center justify-between mb-10">
        <div className="flex items-center gap-2">
          <Activity className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold">Diabetes Prediction App</h1>
        </div>
        <nav className="flex gap-4">
          <Link href="/" className="flex items-center gap-1 hover:text-primary transition-colors">
            <Home className="h-4 w-4" />
            Home
          </Link>
          <Link href="/about" className="flex items-center gap-1 hover:text-primary transition-colors">
            <Info className="h-4 w-4" />
            About
          </Link>
          <Link href="/data" className="flex items-center gap-1 hover:text-primary transition-colors">
            <Database className="h-4 w-4" />
            Data
          </Link>
        </nav>
      </header>

      <Tabs defaultValue="predict" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="predict">Predict Diabetes</TabsTrigger>
          <TabsTrigger value="bmi">BMI Calculator</TabsTrigger>
          <TabsTrigger value="glucose">Glucose Calculator</TabsTrigger>
          <TabsTrigger value="results">Results</TabsTrigger>
        </TabsList>

        <TabsContent value="predict">
          <PredictionForm />
        </TabsContent>

        <TabsContent value="bmi">
          <BMICalculator />
        </TabsContent>

        <TabsContent value="glucose">
          <GlucoseCalculator />
        </TabsContent>

        <TabsContent value="results">
          <Results />
        </TabsContent>
      </Tabs>
    </div>
  )
}

function PredictionForm() {
  const [formData, setFormData] = useState({
    pregnancies: 0,
    glucose: 0,
    bloodPressure: 0,
    skinThickness: 0,
    insulin: 0,
    bmi: 0,
    diabetesPedigreeFunction: 0,
    age: 0,
  })
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const router = useRouter()

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch("/api/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error("Failed to get prediction")
      }

      const data = await response.json()
      setResult(data)

      // Save to local storage for results tab
      const savedResults = JSON.parse(localStorage.getItem("diabetesPredictions") || "[]")
      const newResult = {
        id: Date.now(),
        date: new Date().toISOString(),
        ...formData,
        prediction: data.prediction,
        probability: data.probability,
      }
      localStorage.setItem("diabetesPredictions", JSON.stringify([newResult, ...savedResults]))

      toast({
        title: "Prediction Complete",
        description: `Your diabetes prediction: ${data.prediction ? "Positive" : "Negative"}`,
      })
    } catch (error) {
      console.error("Error:", error)
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to get prediction. Please try again.",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Diabetes Prediction</CardTitle>
        <CardDescription>Enter your health metrics to predict diabetes risk</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="pregnancies">Pregnancies</Label>
              <Input
                id="pregnancies"
                type="number"
                value={formData.pregnancies}
                onChange={(e) => handleChange("pregnancies", Number(e.target.value))}
                min="0"
                max="20"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="glucose">Glucose (mg/dL)</Label>
              <Input
                id="glucose"
                type="number"
                value={formData.glucose}
                onChange={(e) => handleChange("glucose", Number(e.target.value))}
                min="0"
                max="500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="bloodPressure">Blood Pressure (mm Hg)</Label>
              <Input
                id="bloodPressure"
                type="number"
                value={formData.bloodPressure}
                onChange={(e) => handleChange("bloodPressure", Number(e.target.value))}
                min="0"
                max="200"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="skinThickness">Skin Thickness (mm)</Label>
              <Input
                id="skinThickness"
                type="number"
                value={formData.skinThickness}
                onChange={(e) => handleChange("skinThickness", Number(e.target.value))}
                min="0"
                max="100"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="insulin">Insulin (mu U/ml)</Label>
              <Input
                id="insulin"
                type="number"
                value={formData.insulin}
                onChange={(e) => handleChange("insulin", Number(e.target.value))}
                min="0"
                max="1000"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="bmi">BMI</Label>
              <Input
                id="bmi"
                type="number"
                value={formData.bmi}
                onChange={(e) => handleChange("bmi", Number(e.target.value))}
                min="0"
                max="100"
                step="0.1"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="diabetesPedigreeFunction">Diabetes Pedigree Function</Label>
              <Input
                id="diabetesPedigreeFunction"
                type="number"
                value={formData.diabetesPedigreeFunction}
                onChange={(e) => handleChange("diabetesPedigreeFunction", Number(e.target.value))}
                min="0"
                max="3"
                step="0.01"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="age">Age</Label>
              <Input
                id="age"
                type="number"
                value={formData.age}
                onChange={(e) => handleChange("age", Number(e.target.value))}
                min="0"
                max="120"
              />
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Processing..." : "Predict Diabetes Risk"}
          </Button>

          {result && (
            <Alert className={result.prediction ? "bg-red-50 border-red-200" : "bg-green-50 border-green-200"}>
              <AlertCircle className={result.prediction ? "text-red-500" : "text-green-500"} />
              <AlertTitle>{result.prediction ? "Positive Diabetes Risk" : "Negative Diabetes Risk"}</AlertTitle>
              <AlertDescription>Probability: {(result.probability * 100).toFixed(2)}%</AlertDescription>
            </Alert>
          )}
        </form>
      </CardContent>
    </Card>
  )
}

function BMICalculator() {
  const [height, setHeight] = useState(170)
  const [weight, setWeight] = useState(70)
  const [bmi, setBmi] = useState(null)
  const [category, setCategory] = useState("")

  const calculateBMI = () => {
    const heightInMeters = height / 100
    const bmiValue = weight / (heightInMeters * heightInMeters)
    setBmi(bmiValue.toFixed(2))

    // Determine BMI category
    if (bmiValue < 18.5) {
      setCategory("Underweight")
    } else if (bmiValue >= 18.5 && bmiValue < 25) {
      setCategory("Normal weight")
    } else if (bmiValue >= 25 && bmiValue < 30) {
      setCategory("Overweight")
    } else {
      setCategory("Obese")
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>BMI Calculator</CardTitle>
        <CardDescription>Calculate your Body Mass Index (BMI)</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="height">Height (cm): {height}</Label>
            </div>
            <Slider
              id="height"
              min={100}
              max={250}
              step={1}
              value={[height]}
              onValueChange={(value) => setHeight(value[0])}
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="weight">Weight (kg): {weight}</Label>
            </div>
            <Slider
              id="weight"
              min={30}
              max={200}
              step={1}
              value={[weight]}
              onValueChange={(value) => setWeight(value[0])}
            />
          </div>
        </div>

        <Button onClick={calculateBMI} className="w-full">
          Calculate BMI
        </Button>

        {bmi && (
          <div className="mt-4 p-4 border rounded-md">
            <div className="text-lg font-medium">Your BMI: {bmi}</div>
            <div className="text-sm text-muted-foreground">Category: {category}</div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

function GlucoseCalculator() {
  const [glucoseLevel, setGlucoseLevel] = useState(100)
  const [measurementType, setMeasurementType] = useState("fasting")
  const [result, setResult] = useState(null)

  const interpretGlucose = () => {
    let interpretation = ""
    let status = "normal"

    if (measurementType === "fasting") {
      if (glucoseLevel < 70) {
        interpretation = "Low blood sugar (hypoglycemia)"
        status = "low"
      } else if (glucoseLevel >= 70 && glucoseLevel < 100) {
        interpretation = "Normal fasting glucose level"
        status = "normal"
      } else if (glucoseLevel >= 100 && glucoseLevel < 126) {
        interpretation = "Prediabetes (Impaired Fasting Glucose)"
        status = "warning"
      } else {
        interpretation = "Diabetes range"
        status = "high"
      }
    } else if (measurementType === "postMeal") {
      if (glucoseLevel < 140) {
        interpretation = "Normal post-meal glucose level"
        status = "normal"
      } else if (glucoseLevel >= 140 && glucoseLevel < 200) {
        interpretation = "Prediabetes (Impaired Glucose Tolerance)"
        status = "warning"
      } else {
        interpretation = "Diabetes range"
        status = "high"
      }
    } else if (measurementType === "random") {
      if (glucoseLevel < 200) {
        interpretation = "Potentially normal, but context matters"
        status = "normal"
      } else {
        interpretation = "Possible diabetes, further testing needed"
        status = "high"
      }
    }

    setResult({ interpretation, status })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Glucose Level Interpreter</CardTitle>
        <CardDescription>Understand what your glucose readings mean</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="measurementType">Measurement Type</Label>
            <Select value={measurementType} onValueChange={setMeasurementType}>
              <SelectTrigger>
                <SelectValue placeholder="Select measurement type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="fasting">Fasting (before eating)</SelectItem>
                <SelectItem value="postMeal">Post-meal (2 hours after eating)</SelectItem>
                <SelectItem value="random">Random (any time)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="glucoseLevel">Glucose Level (mg/dL): {glucoseLevel}</Label>
            </div>
            <Slider
              id="glucoseLevel"
              min={40}
              max={400}
              step={1}
              value={[glucoseLevel]}
              onValueChange={(value) => setGlucoseLevel(value[0])}
            />
          </div>
        </div>

        <Button onClick={interpretGlucose} className="w-full">
          Interpret Glucose Level
        </Button>

        {result && (
          <Alert
            className={
              result.status === "normal"
                ? "bg-green-50 border-green-200"
                : result.status === "warning"
                  ? "bg-yellow-50 border-yellow-200"
                  : result.status === "high"
                    ? "bg-red-50 border-red-200"
                    : "bg-blue-50 border-blue-200"
            }
          >
            <AlertCircle
              className={
                result.status === "normal"
                  ? "text-green-500"
                  : result.status === "warning"
                    ? "text-yellow-500"
                    : result.status === "high"
                      ? "text-red-500"
                      : "text-blue-500"
              }
            />
            <AlertTitle>
              {result.status === "normal"
                ? "Normal Range"
                : result.status === "warning"
                  ? "Warning Range"
                  : result.status === "high"
                    ? "High Range"
                    : "Low Range"}
            </AlertTitle>
            <AlertDescription>{result.interpretation}</AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  )
}

function Results() {
  const [results, setResults] = useState([])

  // Load results from localStorage on component mount
  useState(() => {
    const savedResults = JSON.parse(localStorage.getItem("diabetesPredictions") || "[]")
    setResults(savedResults)
  })

  if (results.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Your Prediction Results</CardTitle>
          <CardDescription>View your previous diabetes prediction results</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <LineChart className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium">No results yet</h3>
            <p className="text-sm text-muted-foreground mt-2">Complete a prediction to see your results here</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Prediction Results</CardTitle>
        <CardDescription>View your previous diabetes prediction results</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {results.map((result) => (
            <div
              key={result.id}
              className={`p-4 border rounded-md ${
                result.prediction ? "bg-red-50 border-red-200" : "bg-green-50 border-green-200"
              }`}
            >
              <div className="flex justify-between items-start mb-2">
                <div className="font-medium">{result.prediction ? "Positive" : "Negative"} Diabetes Risk</div>
                <div className="text-sm text-muted-foreground">{new Date(result.date).toLocaleString()}</div>
              </div>
              <div className="text-sm mb-2">Probability: {(result.probability * 100).toFixed(2)}%</div>
              <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                <div>Age: {result.age}</div>
                <div>BMI: {result.bmi}</div>
                <div>Glucose: {result.glucose} mg/dL</div>
                <div>Blood Pressure: {result.bloodPressure} mm Hg</div>
                <div>Insulin: {result.insulin} mu U/ml</div>
                <div>Pregnancies: {result.pregnancies}</div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

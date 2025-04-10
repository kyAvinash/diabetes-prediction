"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

const Predict = () => {
  const navigate = useNavigate()

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
  const [error, setError] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: Number(value),
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

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
    } catch (error) {
      console.error("Error:", error)
      setError("Failed to get prediction. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Diabetes Prediction</h1>

      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Diabetes Prediction</CardTitle>
          <CardDescription>Enter your health metrics to predict diabetes risk</CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="pregnancies">Pregnancies</Label>
                <Input
                  id="pregnancies"
                  name="pregnancies"
                  type="number"
                  value={formData.pregnancies}
                  onChange={handleChange}
                  min="0"
                  max="20"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="glucose">Glucose (mg/dL)</Label>
                <Input
                  id="glucose"
                  name="glucose"
                  type="number"
                  value={formData.glucose}
                  onChange={handleChange}
                  min="0"
                  max="500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bloodPressure">Blood Pressure (mm Hg)</Label>
                <Input
                  id="bloodPressure"
                  name="bloodPressure"
                  type="number"
                  value={formData.bloodPressure}
                  onChange={handleChange}
                  min="0"
                  max="200"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="skinThickness">Skin Thickness (mm)</Label>
                <Input
                  id="skinThickness"
                  name="skinThickness"
                  type="number"
                  value={formData.skinThickness}
                  onChange={handleChange}
                  min="0"
                  max="100"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="insulin">Insulin (mu U/ml)</Label>
                <Input
                  id="insulin"
                  name="insulin"
                  type="number"
                  value={formData.insulin}
                  onChange={handleChange}
                  min="0"
                  max="1000"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bmi">BMI</Label>
                <Input
                  id="bmi"
                  name="bmi"
                  type="number"
                  value={formData.bmi}
                  onChange={handleChange}
                  min="0"
                  max="100"
                  step="0.1"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="diabetesPedigreeFunction">Diabetes Pedigree Function</Label>
                <Input
                  id="diabetesPedigreeFunction"
                  name="diabetesPedigreeFunction"
                  type="number"
                  value={formData.diabetesPedigreeFunction}
                  onChange={handleChange}
                  min="0"
                  max="3"
                  step="0.01"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="age">Age</Label>
                <Input
                  id="age"
                  name="age"
                  type="number"
                  value={formData.age}
                  onChange={handleChange}
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
    </div>
  )
}

export default Predict

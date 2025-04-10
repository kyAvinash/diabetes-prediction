"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart } from "lucide-react"

const Results = () => {
  const [results, setResults] = useState([])

  // Load results from localStorage on component mount
  useEffect(() => {
    const savedResults = JSON.parse(localStorage.getItem("diabetesPredictions") || "[]")
    setResults(savedResults)
  }, [])

  if (results.length === 0) {
    return (
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-8 text-center">Your Prediction Results</h1>

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
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Your Prediction Results</h1>

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
    </div>
  )
}

export default Results

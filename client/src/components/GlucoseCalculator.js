"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

const GlucoseCalculator = () => {
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
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Glucose Level Interpreter</h1>

      <Card className="max-w-md mx-auto">
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

          <div className="mt-4 text-sm space-y-2">
            <h4 className="font-medium">Reference Ranges:</h4>
            <p>
              <strong>Fasting Glucose:</strong>
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Below 70 mg/dL: Low (Hypoglycemia)</li>
              <li>70-99 mg/dL: Normal</li>
              <li>100-125 mg/dL: Prediabetes</li>
              <li>126 mg/dL or higher: Diabetes range</li>
            </ul>

            <p>
              <strong>2 Hours After Eating:</strong>
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Below 140 mg/dL: Normal</li>
              <li>140-199 mg/dL: Prediabetes</li>
              <li>200 mg/dL or higher: Diabetes range</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default GlucoseCalculator

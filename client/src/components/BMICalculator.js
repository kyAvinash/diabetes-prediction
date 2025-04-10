"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"

const BMICalculator = () => {
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
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">BMI Calculator</h1>

      <Card className="max-w-md mx-auto">
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

              <div className="mt-4">
                <h4 className="font-medium mb-2">What does this mean?</h4>
                <ul className="text-sm space-y-1">
                  <li>
                    <strong>Underweight:</strong> BMI less than 18.5
                  </li>
                  <li>
                    <strong>Normal weight:</strong> BMI between 18.5 and 24.9
                  </li>
                  <li>
                    <strong>Overweight:</strong> BMI between 25 and 29.9
                  </li>
                  <li>
                    <strong>Obesity:</strong> BMI of 30 or greater
                  </li>
                </ul>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default BMICalculator

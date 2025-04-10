import { NextResponse } from "next/server"

// Mock data based on the Pima Indians Diabetes Dataset
const mockData = Array.from({ length: 20 }, (_, i) => ({
  _id: `${i + 1}`,
  pregnancies: Math.floor(Math.random() * 15),
  glucose: Math.floor(Math.random() * 150) + 70,
  bloodPressure: Math.floor(Math.random() * 40) + 60,
  skinThickness: Math.floor(Math.random() * 50) + 10,
  insulin: Math.floor(Math.random() * 300),
  bmi: (Math.random() * 20 + 20).toFixed(1),
  diabetesPedigreeFunction: (Math.random() * 1.5 + 0.1).toFixed(3),
  age: Math.floor(Math.random() * 50) + 20,
  outcome: Math.random() > 0.7,
}))

export async function GET() {
  try {
    // In a real application, this would fetch data from MongoDB
    // For now, we'll return mock data
    return NextResponse.json({
      success: true,
      data: mockData,
    })
  } catch (error) {
    console.error("Error fetching data:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch data" }, { status: 500 })
  }
}

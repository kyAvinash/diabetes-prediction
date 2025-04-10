import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Activity, Heart, Info } from "lucide-react"
import Link from "next/link"

export default function About() {
  return (
    <div className="container mx-auto py-10">
      <header className="flex items-center justify-between mb-10">
        <div className="flex items-center gap-2">
          <Activity className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold">Diabetes Prediction App</h1>
        </div>
        <nav className="flex gap-4">
          <Link href="/" className="flex items-center gap-1 hover:text-primary transition-colors">
            Home
          </Link>
          <Link href="/about" className="flex items-center gap-1 text-primary font-medium">
            <Info className="h-4 w-4" />
            About
          </Link>
          <Link href="/data" className="flex items-center gap-1 hover:text-primary transition-colors">
            Data
          </Link>
        </nav>
      </header>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>About This Application</CardTitle>
            <CardDescription>Understanding the diabetes prediction model and its purpose</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              The Diabetes Prediction App is designed to help individuals assess their risk of developing diabetes based
              on various health metrics. This application uses a machine learning model trained on the Pima Indians
              Diabetes Dataset to provide predictions.
            </p>

            <h3 className="text-lg font-medium mt-4">How It Works</h3>
            <p>
              Our prediction model uses a Random Forest algorithm that analyzes several key health indicators to
              determine the likelihood of diabetes:
            </p>

            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li>
                <strong>Pregnancies:</strong> Number of times pregnant
              </li>
              <li>
                <strong>Glucose:</strong> Plasma glucose concentration (mg/dL)
              </li>
              <li>
                <strong>Blood Pressure:</strong> Diastolic blood pressure (mm Hg)
              </li>
              <li>
                <strong>Skin Thickness:</strong> Triceps skin fold thickness (mm)
              </li>
              <li>
                <strong>Insulin:</strong> 2-Hour serum insulin (mu U/ml)
              </li>
              <li>
                <strong>BMI:</strong> Body mass index (weight in kg/(height in m)²)
              </li>
              <li>
                <strong>Diabetes Pedigree Function:</strong> A function that scores likelihood of diabetes based on
                family history
              </li>
              <li>
                <strong>Age:</strong> Age in years
              </li>
            </ul>

            <h3 className="text-lg font-medium mt-4">Important Disclaimer</h3>
            <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 mt-2">
              <div className="flex items-start">
                <Info className="h-5 w-5 text-yellow-500 mt-0.5 mr-2" />
                <div>
                  <p className="font-medium">This tool is for educational purposes only</p>
                  <p className="text-sm mt-1">
                    The predictions provided by this application should not be considered medical advice. Always consult
                    with a healthcare professional for proper diagnosis and treatment of medical conditions.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Understanding Diabetes</CardTitle>
            <CardDescription>Key information about diabetes and its risk factors</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              Diabetes is a chronic health condition that affects how your body turns food into energy. There are
              several types of diabetes, with Type 2 being the most common.
            </p>

            <h3 className="text-lg font-medium mt-4">Risk Factors</h3>
            <p>Several factors can increase your risk of developing Type 2 diabetes:</p>

            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li>Being overweight or obese</li>
              <li>Being 45 years or older</li>
              <li>Having a parent or sibling with diabetes</li>
              <li>Being physically active less than 3 times a week</li>
              <li>Having gestational diabetes during pregnancy</li>
              <li>Having prediabetes</li>
              <li>Having high blood pressure or high cholesterol</li>
            </ul>

            <h3 className="text-lg font-medium mt-4">Prevention Tips</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
              <div className="bg-green-50 border border-green-200 rounded-md p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Heart className="h-5 w-5 text-green-500" />
                  <h4 className="font-medium">Maintain a Healthy Weight</h4>
                </div>
                <p className="text-sm">
                  Losing even 5-7% of your body weight can significantly reduce your risk of diabetes.
                </p>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-md p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Heart className="h-5 w-5 text-green-500" />
                  <h4 className="font-medium">Regular Physical Activity</h4>
                </div>
                <p className="text-sm">Aim for at least 150 minutes of moderate exercise per week.</p>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-md p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Heart className="h-5 w-5 text-green-500" />
                  <h4 className="font-medium">Healthy Diet</h4>
                </div>
                <p className="text-sm">
                  Focus on fruits, vegetables, whole grains, and lean proteins. Limit processed foods and added sugars.
                </p>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-md p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Heart className="h-5 w-5 text-green-500" />
                  <h4 className="font-medium">Regular Check-ups</h4>
                </div>
                <p className="text-sm">Monitor your blood glucose, blood pressure, and cholesterol levels regularly.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

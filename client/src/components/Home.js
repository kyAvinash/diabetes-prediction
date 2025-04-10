import { Link } from "react-router-dom"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Activity, Calculator, FileText, LineChart, Info } from "lucide-react"

const Home = () => {
  return (
    <div className="container mx-auto py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Welcome to Diabetes Prediction App</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          A comprehensive tool to assess your risk of diabetes using machine learning and track your health metrics.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="h-5 w-5 text-primary" />
              Predict Diabetes Risk
            </CardTitle>
            <CardDescription>Use our machine learning model to assess your risk of diabetes</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <p className="mb-4 text-center">
              Enter your health metrics and get an instant prediction of your diabetes risk based on our trained model.
            </p>
            <Link to="/predict">
              <Button>Start Prediction</Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="h-5 w-5 text-primary" />
              BMI Calculator
            </CardTitle>
            <CardDescription>Calculate your Body Mass Index</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <p className="mb-4 text-center">
              BMI is an important indicator of health. Use our calculator to determine your BMI and understand what it
              means.
            </p>
            <Link to="/bmi-calculator">
              <Button>Calculate BMI</Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              Glucose Calculator
            </CardTitle>
            <CardDescription>Interpret your glucose readings</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <p className="mb-4 text-center">
              Understand what your glucose readings mean and how they relate to diabetes risk.
            </p>
            <Link to="/glucose-calculator">
              <Button>Check Glucose</Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LineChart className="h-5 w-5 text-primary" />
              View Results
            </CardTitle>
            <CardDescription>Track your prediction history</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <p className="mb-4 text-center">
              Review your previous prediction results and track changes in your diabetes risk over time.
            </p>
            <Link to="/results">
              <Button>View Results</Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-primary" />
              Explore Dataset
            </CardTitle>
            <CardDescription>Browse the diabetes dataset</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <p className="mb-4 text-center">
              Explore the dataset used to train our prediction model and understand the factors that influence diabetes
              risk.
            </p>
            <Link to="/data">
              <Button>View Data</Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Info className="h-5 w-5 text-primary" />
              About Diabetes
            </CardTitle>
            <CardDescription>Learn about diabetes and risk factors</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <p className="mb-4 text-center">
              Understand what diabetes is, its risk factors, and how you can prevent or manage it.
            </p>
            <Link to="/about">
              <Button>Learn More</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Home

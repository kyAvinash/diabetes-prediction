import { Link, useLocation } from "react-router-dom"
import { Activity, Home, Info, Database, Calculator, LineChart, FileText } from "lucide-react"

const Navbar = () => {
  const location = useLocation()

  const isActive = (path) => {
    return location.pathname === path ? "text-primary font-medium" : "hover:text-primary transition-colors"
  }

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto py-4 px-4">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <Activity className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold">Diabetes Prediction App</h1>
          </div>

          <nav className="flex flex-wrap gap-4 justify-center">
            <Link to="/" className={`flex items-center gap-1 ${isActive("/")}`}>
              <Home className="h-4 w-4" />
              Home
            </Link>

            <Link to="/about" className={`flex items-center gap-1 ${isActive("/about")}`}>
              <Info className="h-4 w-4" />
              About
            </Link>

            <Link to="/predict" className={`flex items-center gap-1 ${isActive("/predict")}`}>
              <Calculator className="h-4 w-4" />
              Predict
            </Link>

            <Link to="/results" className={`flex items-center gap-1 ${isActive("/results")}`}>
              <LineChart className="h-4 w-4" />
              Results
            </Link>

            <Link to="/data" className={`flex items-center gap-1 ${isActive("/data")}`}>
              <Database className="h-4 w-4" />
              Data
            </Link>

            <Link to="/bmi-calculator" className={`flex items-center gap-1 ${isActive("/bmi-calculator")}`}>
              <Calculator className="h-4 w-4" />
              BMI
            </Link>

            <Link to="/glucose-calculator" className={`flex items-center gap-1 ${isActive("/glucose-calculator")}`}>
              <FileText className="h-4 w-4" />
              Glucose
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Navbar

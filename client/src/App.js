import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Navbar from "./components/Navbar"
import Home from "./components/Home"
import About from "./components/About"
import Predict from "./components/Predict"
import Results from "./components/Results"
import AllData from "./components/AllData"
import BMICalculator from "./components/BMICalculator"
import GlucoseCalculator from "./components/GlucoseCalculator"
import "./App.css"

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="container mx-auto py-4 px-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/predict" element={<Predict />} />
            <Route path="/results" element={<Results />} />
            <Route path="/data" element={<AllData />} />
            <Route path="/bmi-calculator" element={<BMICalculator />} />
            <Route path="/glucose-calculator" element={<GlucoseCalculator />} />
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App

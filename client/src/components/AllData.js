"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Download, Search } from "lucide-react"

const AllData = () => {
  const [data, setData] = useState([])
  const [filteredData, setFilteredData] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const response = await fetch("/api/data")
        if (!response.ok) {
          throw new Error("Failed to fetch data")
        }
        const result = await response.json()
        setData(result.data)
        setFilteredData(result.data)
      } catch (err) {
        console.error("Error fetching data:", err)
        setError("Failed to load data. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredData(data)
    } else {
      const filtered = data.filter((item) =>
        Object.values(item).some((value) => String(value).toLowerCase().includes(searchTerm.toLowerCase())),
      )
      setFilteredData(filtered)
    }
  }, [searchTerm, data])

  const handleExportCSV = () => {
    // Create CSV content
    const headers = data.length > 0 ? Object.keys(data[0]).join(",") : ""
    const csvRows = data.map((row) => Object.values(row).join(","))
    const csvContent = [headers, ...csvRows].join("\n")

    // Create download link
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.setAttribute("href", url)
    link.setAttribute("download", "diabetes_data.csv")
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Diabetes Dataset</h1>

      <Card>
        <CardHeader>
          <CardTitle>Diabetes Dataset</CardTitle>
          <CardDescription>
            View and search through the diabetes dataset used for training the prediction model
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6 justify-between">
            <div className="relative w-full md:w-1/3">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search data..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline" className="flex items-center gap-2" onClick={handleExportCSV}>
              <Download className="h-4 w-4" />
              Export CSV
            </Button>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-10">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : error ? (
            <div className="text-center py-10 text-red-500">{error}</div>
          ) : (
            <div className="border rounded-md overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Pregnancies</TableHead>
                    <TableHead>Glucose</TableHead>
                    <TableHead>Blood Pressure</TableHead>
                    <TableHead>Skin Thickness</TableHead>
                    <TableHead>Insulin</TableHead>
                    <TableHead>BMI</TableHead>
                    <TableHead>Diabetes Pedigree</TableHead>
                    <TableHead>Age</TableHead>
                    <TableHead>Outcome</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredData.length > 0 ? (
                    filteredData.map((item) => (
                      <TableRow key={item._id}>
                        <TableCell>{item._id}</TableCell>
                        <TableCell>{item.pregnancies}</TableCell>
                        <TableCell>{item.glucose}</TableCell>
                        <TableCell>{item.bloodPressure}</TableCell>
                        <TableCell>{item.skinThickness}</TableCell>
                        <TableCell>{item.insulin}</TableCell>
                        <TableCell>{item.bmi}</TableCell>
                        <TableCell>{item.diabetesPedigreeFunction}</TableCell>
                        <TableCell>{item.age}</TableCell>
                        <TableCell>
                          <span className={item.outcome ? "text-red-500" : "text-green-500"}>
                            {item.outcome ? "Positive" : "Negative"}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={10} className="text-center py-4">
                        No data found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default AllData

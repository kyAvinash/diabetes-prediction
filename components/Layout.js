import Head from "next/head"
import Navbar from "./Navbar"

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Head>
        <title>Diabetes Prediction App</title>
        <meta name="description" content="A comprehensive tool to assess your risk of diabetes" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />

      <main className="flex-grow">{children}</main>

      <footer className="bg-gray-100 py-6 text-center text-gray-600 text-sm">
        <div className="container mx-auto">
          <p>© {new Date().getFullYear()} Diabetes Prediction App. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

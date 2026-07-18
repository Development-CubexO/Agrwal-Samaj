import { LanguageProvider } from './context/LanguageContext'
import Navbar from './components/Navbar'
import Banner from './components/Banner'
import About from './components/About'
import Candidates from './components/Candidates'
import Members from './components/Members'
import Footer from './components/Footer'

export default function App() {
  return (
    <LanguageProvider>
      <div className="royal-pattern min-h-screen">
        <Navbar />
        <main>
          <Banner />
          <About />
          <Candidates />
          <Members />
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  )
}

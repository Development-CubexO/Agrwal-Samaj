import { useCallback, useState } from 'react'
import { LanguageProvider } from './context/LanguageContext'
import SplashScreen from './components/SplashScreen'
import Navbar from './components/Navbar'
import Banner from './components/Banner'
import About from './components/About'
import Candidates from './components/Candidates'
import ElectionDetails from './components/ElectionDetails'
import Vision from './components/Vision'
import Members from './components/Members'
import Footer from './components/Footer'
import mandala from './assets/background-mandala.png'

export default function App() {
  const [showSplash, setShowSplash] = useState(true)
  const handleSplashDone = useCallback(() => setShowSplash(false), [])

  return (
    <LanguageProvider>
      {showSplash && <SplashScreen onDone={handleSplashDone} />}

      <div className="royal-pattern relative min-h-screen overflow-x-hidden">
        <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden>
          {/* Full-page royal mandala backdrop */}
          <img
            src={mandala}
            alt=""
            className="absolute left-1/2 top-1/2 h-[min(140vw,900px)] w-[min(140vw,900px)] max-w-none -translate-x-1/2 -translate-y-1/2 opacity-[0.12]"
          />
          <img
            src={mandala}
            alt=""
            className="mandala-spin absolute left-[-18%] top-[-5%] h-[min(85vw,620px)] w-[min(85vw,620px)] max-w-none opacity-[0.18] sm:left-[-10%] sm:opacity-[0.22]"
          />
          <img
            src={mandala}
            alt=""
            className="mandala-spin-reverse absolute right-[-18%] bottom-[-8%] h-[min(85vw,620px)] w-[min(85vw,620px)] max-w-none opacity-[0.18] sm:right-[-10%] sm:opacity-[0.22]"
          />
          <div className="absolute inset-0 bg-ivory/55" />
        </div>

        <div className="relative z-10">
          <Navbar />
          <main>
            <Banner />
            <About />
            <Candidates />
            <ElectionDetails />
            <Vision />
            <Members />
          </main>
          <Footer />
        </div>
      </div>
    </LanguageProvider>
  )
}

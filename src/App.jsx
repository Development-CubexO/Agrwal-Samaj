import { LanguageProvider } from './context/LanguageContext'
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
  return (
    <LanguageProvider>
      <div className="royal-pattern relative min-h-screen overflow-x-hidden">
        <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden>
          <img
            src={mandala}
            alt=""
            className="mandala-spin absolute left-[-12%] top-[18%] h-[min(70vw,560px)] w-[min(70vw,560px)] max-w-none opacity-[0.2] sm:left-[-8%] sm:opacity-[0.24] lg:left-[-4%]"
          />
          <img
            src={mandala}
            alt=""
            className="mandala-spin-reverse absolute right-[-12%] top-[52%] h-[min(70vw,560px)] w-[min(70vw,560px)] max-w-none opacity-[0.2] sm:right-[-8%] sm:opacity-[0.24] lg:right-[-4%]"
          />
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

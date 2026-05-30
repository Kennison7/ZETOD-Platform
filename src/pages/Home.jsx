import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import HeroSection from '../components/sections/HeroSection'
import StatsSection from '../components/sections/StatsSection'
import FeaturesSection from '../components/sections/FeaturesSection'
import HowItWorks from '../components/sections/HowItWorks'
import Testimonials from '../components/sections/Testimonials'
import FAQ from '../components/sections/FAQ'

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <StatsSection />
        <FeaturesSection />
        <HowItWorks />
        <Testimonials />
        <FAQ />
      </main>
      <Footer />
    </div>
  )
}

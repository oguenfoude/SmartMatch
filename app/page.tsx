import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { VisualDemo } from "@/components/visual-demo"
import { FeaturesGrid } from "@/components/features-grid"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <VisualDemo />
        <FeaturesGrid />
      </main>
      <Footer />
    </div>
  )
}

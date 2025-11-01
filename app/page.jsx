import { Hero } from "@/components/hero"
import { Features } from "@/components/features"
import { FleetSection } from "@/components/fleet"
import { HowItWorks } from "@/components/howitworks"
import { Footer } from "@/components/common/footer"
import { Header } from "@/components/common/header"
import LoadingTransition from "@/components/loader"


export default function Home() {
  return (
    <main className="min-h-screen">
      <LoadingTransition />
      <Header />
      <Hero />
      <HowItWorks />
      <FleetSection />
      <Features />
      <Footer />
    </main>
  )
}

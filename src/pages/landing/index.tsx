import { Benefits } from "./components/benefits";
import { Dashboard } from "./components/dashboard";
import { FinalCTA } from "./components/final-cta";
import { Footer } from "./components/footer";
import { Hero } from "./components/here";
import { HowItWorks } from "./components/how-its-works";
import { Pricing } from "./components/pricing";
import { ShameReport } from "./components/shame-report";
import { Testimonials } from "./components/testimonials";

export function Landing() {
  return (
    <div className="min-h-screen">
      <Hero />
      <HowItWorks />
      <Benefits />
      <ShameReport />
      <Dashboard />
      <Pricing />
      <Testimonials />
      <FinalCTA />
      <Footer />
    </div>
  );
}
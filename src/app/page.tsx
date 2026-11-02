import Header from "@/components/Header";
import Hero from "@/components/Hero";
import TrustBand from "@/components/TrustBand";
import Services from "@/components/Services";
import Strengths from "@/components/Strengths";
import ContactCta from "@/components/ContactCta";
import Footer from "@/components/Footer";
import InquiryProvider from "@/components/InquiryProvider";

export default function Home() {
  return (
    <InquiryProvider>
      <Header />
      <main className="flex-1">
        <Hero />
        <TrustBand />
        <Services />
        <Strengths />
        <ContactCta />
      </main>
      <Footer />
    </InquiryProvider>
  );
}

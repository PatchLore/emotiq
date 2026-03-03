import AnimatedBackground from '@/components/AnimatedBackground';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import StatsRow from '@/components/StatsRow';
import HowItWorks from '@/components/HowItWorks';
import ProductsGrid from '@/components/ProductsGrid';
import PersonaliseForm from '@/components/PersonaliseForm';
import Testimonials from '@/components/Testimonials';
import Pricing from '@/components/Pricing';
import Newsletter from '@/components/Newsletter';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <AnimatedBackground />
      <Navbar />
      <HeroSection />
      <StatsRow />
      <HowItWorks />
      <ProductsGrid />
      <PersonaliseForm />
      <Testimonials />
      <Pricing />
      <Newsletter />
      <Footer />
    </>
  );
}



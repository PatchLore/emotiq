import AnimatedBackground from '@/components/AnimatedBackground';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import DailyStorySection from '@/components/DailyStorySection';
import StatsRow from '@/components/StatsRow';
import HowItWorks from '@/components/HowItWorks';
import EmotionStorySection from '@/components/EmotionStorySection';
import ProblemStorySection from '@/components/ProblemStorySection';
import EmotionCheckinSection from '@/components/EmotionCheckinSection';
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
      <DailyStorySection />
      <StatsRow />
      <HowItWorks />
      <EmotionStorySection />
      <ProblemStorySection />
      <EmotionCheckinSection />
      <ProductsGrid />
      <PersonaliseForm />
      <Testimonials />
      <Pricing />
      <Newsletter />
      <Footer />
    </>
  );
}



import Hero from "@/components/ui/Hero";
import Footer from "@/components/ui/Footer";
import Header from "@/components/ui/Header";
import SubHeader from "@/components/ui/SubHeader";
import GoUp from "@/components/ui/GoUp";
import About from "@/components/ui/About";
import Discover from "@/components/ui/Discover";
import Intro from "@/components/ui/Intro";


export default function Home() {
  return (
    <div>
      <Header />
      <SubHeader />
      <Hero />
      <Intro />
      <Discover />
      <About />
      <GoUp />
      <Footer />
    </div>
  );
}

import Hero from "@/app/Hero";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import SubHeader from "@/components/SubHeader";
import GoUp from "@/components/GoUp";
import About from "@/app/About";
import Discover from "@/app/Discover";
import Intro from "@/app/Intro";
import './styles.css'
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

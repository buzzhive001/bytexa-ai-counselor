import './index.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import NepBand from './components/NepBand';
import Pillars from './components/Pillars';
import Stages from './components/Stages';
import ChatDemo from './components/ChatDemo';
import Features from './components/Features';
import Stats from './components/Stats';
import Footer from './components/Footer';

export default function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <NepBand />
      <Pillars />
      <Stages />
      <ChatDemo />
      <Features />
      <Stats />
      <Footer />
    </>
  );
}

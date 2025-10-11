import { useEffect } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import LaOrden from '@/components/LaOrden';
import Historia from '@/components/Historia';
import Autoridades from '@/components/Autoridades';
import Galeria from '@/components/Galeria';
import InfoSections from '@/components/InfoSections';
import Preguntas from '@/components/Preguntas';
import Contacto from '@/components/Contacto';
import Footer from '@/components/Footer';

const Index = () => {
  useEffect(() => {
    // Smooth scroll behavior for the entire document
    document.documentElement.style.scrollBehavior = 'smooth';
    
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <Header />
      <main>
        <Hero />
        <LaOrden />
        <Historia />
        <Autoridades />
        <Galeria />
        <InfoSections />
        <Preguntas />
        <Contacto />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import hero1 from "./assets/hero-1.jpg";
import hero2 from "./assets/hero-2.jpg";
import hero3 from "./assets/hero-3.jpg";

const slides = [
  { image: hero1, title: "Craft Your Perfect Resume", subtitle: "Stand out with professionally designed templates" },
  { image: hero2, title: "AI-Powered Suggestions", subtitle: "Get intelligent recommendations for your content" },
  { image: hero3, title: "Export & Share Instantly", subtitle: "Download in multiple formats with one click" },
];

const features = [
  { title: "Choose a Template", desc: "Pick from curated professional designs" },
  { title: "Fill Your Details", desc: "Add experience, skills & achievements" },
  { title: "Download Resume", desc: "Export as PDF ready to share" },
];

const Landing = () => {
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => setCurrent((c) => (c + 1) % slides.length), 10000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Carousel */}
      <section className="relative h-[85vh] overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-foreground/60 via-foreground/40 to-background z-10" />
            <img src={slides[current].image} alt="" className="w-full h-full object-cover" />
          </motion.div>
        </AnimatePresence>

        <div className="relative z-20 flex flex-col items-center justify-center h-full text-center px-4">
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-accent text-sm font-semibold tracking-[0.3em] uppercase mb-4"
          >
            Resume Builder
          </motion.p>
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl md:text-7xl font-bold font-display text-primary-foreground mb-4 max-w-4xl">
                {slides[current].title}
              </h1>
              <p className="text-lg md:text-xl text-primary-foreground/70 max-w-2xl mx-auto">
                {slides[current].subtitle}
              </p>
            </motion.div>
          </AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-10"
          >
            <button
              onClick={() => navigate("/editor")}
              className="gradient-accent text-accent-foreground font-display text-lg px-8 py-4 rounded-full shadow-elevated hover:scale-105 transition-transform inline-flex items-center gap-2"
            >
              Get Started
            </button>
          </motion.div>
          {/* Dots */}
          <div className="flex gap-2 mt-8">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`h-2 rounded-full transition-all duration-300 ${i === current ? "w-8 bg-accent" : "w-2 bg-primary-foreground/30"}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-16">
            Three Simple Steps
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="bg-card rounded-2xl p-8 shadow-card text-center group hover:shadow-elevated transition-shadow"
              >
                <div className="w-14 h-14 rounded-xl gradient-accent flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform">
                </div>
                <h3 className="font-display font-semibold text-lg mb-2">{f.title}</h3>
                <p className="text-muted-foreground text-sm">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;

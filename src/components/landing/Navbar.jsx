import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Hexagon } from "lucide-react";

const navLinks = ["Home", "About", "Features", "How It Works", "Contact"];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id.toLowerCase().replace(/ /g, "-"))?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? "bg-[#0a0a0f]/90 backdrop-blur-md border-b border-white/10" : "bg-transparent"}`}>
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 text-white font-bold text-xl">
          <Hexagon className="text-violet-500" size={28} fill="currentColor" />
          <span>Chain<span className="text-violet-400">Circle</span></span>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link}>
              <button onClick={() => scrollTo(link)} className="text-white/70 hover:text-white text-sm transition-colors cursor-pointer">
                {link}
              </button>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Link to="/login" className="text-white/80 hover:text-white text-sm px-4 py-2 rounded-lg border border-white/20 hover:border-white/40 transition-all">
            Login
          </Link>
          <Link to="/signup" className="text-white text-sm px-4 py-2 rounded-lg bg-violet-600 hover:bg-violet-500 transition-all">
            Get Started
          </Link>
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden text-white" onClick={() => setOpen(!open)}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-[#0d0d14] border-t border-white/10 px-6 py-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <button key={link} onClick={() => scrollTo(link)} className="text-white/70 hover:text-white text-sm text-left transition-colors">
              {link}
            </button>
          ))}
          <div className="flex gap-3 pt-2">
            <Link to="/login" onClick={() => setOpen(false)} className="flex-1 text-center text-white/80 text-sm px-4 py-2 rounded-lg border border-white/20">Login</Link>
            <Link to="/signup" onClick={() => setOpen(false)} className="flex-1 text-center text-white text-sm px-4 py-2 rounded-lg bg-violet-600">Get Started</Link>
          </div>
        </div>
      )}
    </nav>
  );
}

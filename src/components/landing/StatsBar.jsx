import { useEffect, useRef, useState } from "react";
import { stats } from "../../data/mockData";

function useCountUp(target, duration = 2000, started) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!started) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration, started]);
  return count;
}

function StatItem({ label, value, suffix }) {
  const ref = useRef(null);
  const [started, setStarted] = useState(false);
  const count = useCountUp(value, 2000, started);

  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => { if (e.isIntersecting) setStarted(true); }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const display = value % 1 !== 0 ? count.toFixed(1) : count.toLocaleString();

  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">
        {display}{suffix}
      </div>
      <div className="text-white/50 text-sm mt-2">{label}</div>
    </div>
  );
}

export default function StatsBar() {
  return (
    <section className="bg-[#0d0d14] border-y border-white/10 py-16">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-10">
        {stats.map((s) => <StatItem key={s.label} {...s} />)}
      </div>
    </section>
  );
}

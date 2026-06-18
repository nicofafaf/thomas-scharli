"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * Cinematische Partikel-/Lichtstrahl-Szene als Hero-Hintergrund-Overlay.
 * Wirkt wie Scheinwerfer eines fahrenden Fahrzeugs bei Nacht – ein
 * hochwertiger Platzhalter, bis ein echtes Hero-Video vorliegt.
 */
export function HeroVideoCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (prefersReduced) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId = 0;
    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    const beams = Array.from({ length: 12 }, () => ({
      x: Math.random() * w,
      y: h * 0.3 + Math.random() * h * 0.4,
      angle: -0.3 + Math.random() * 0.6,
      length: 200 + Math.random() * 400,
      speed: 0.4 + Math.random() * 0.8,
      alpha: 0.04 + Math.random() * 0.08,
      width: 20 + Math.random() * 60,
    }));

    const particles = Array.from({ length: 60 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: -0.3 - Math.random() * 0.4,
      vy: -0.1 + Math.random() * 0.2,
      alpha: 0.1 + Math.random() * 0.3,
      size: 1 + Math.random() * 2,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = "rgba(8, 8, 14, 1)";
      ctx.fillRect(0, 0, w, h);

      beams.forEach((b) => {
        b.x -= b.speed;
        if (b.x < -b.length) b.x = w + b.length;
        ctx.save();
        ctx.translate(b.x, b.y);
        ctx.rotate(b.angle);
        const grad = ctx.createLinearGradient(0, 0, b.length, 0);
        grad.addColorStop(0, "rgba(200, 146, 42, 0)");
        grad.addColorStop(0.3, `rgba(200, 146, 42, ${b.alpha})`);
        grad.addColorStop(0.7, `rgba(232, 184, 75, ${b.alpha * 0.6})`);
        grad.addColorStop(1, "rgba(200, 146, 42, 0)");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.moveTo(0, -b.width / 2);
        ctx.lineTo(b.length, -b.width * 0.1);
        ctx.lineTo(b.length, b.width * 0.1);
        ctx.lineTo(0, b.width / 2);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
      });

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = w;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200, 146, 42, ${p.alpha})`;
        ctx.fill();
      });

      const groundGrad = ctx.createLinearGradient(0, h * 0.75, 0, h);
      groundGrad.addColorStop(0, "rgba(200, 146, 42, 0)");
      groundGrad.addColorStop(1, "rgba(200, 146, 42, 0.04)");
      ctx.fillStyle = groundGrad;
      ctx.fillRect(0, h * 0.75, w, h * 0.25);

      animId = requestAnimationFrame(draw);
    };

    draw();

    const onResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", onResize);
    };
  }, [prefersReduced]);

  if (prefersReduced) return null;

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full mix-blend-screen"
      style={{ opacity: 0.7 }}
      aria-hidden="true"
    />
  );
}

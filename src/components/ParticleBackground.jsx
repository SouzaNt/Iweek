import React, { useEffect, useRef } from 'react';

/**
 * Antigravity Particle Constellation & Cosmic Warp Field
 * Reacts to mouse cursor, scrolling velocity, and zero-G floating physics.
 */
export default function ParticleBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Mouse coordinates
    const mouse = { x: -1000, y: -1000, radius: 140 };

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    // Track scroll velocity for Antigravity Warp effect
    let lastScrollY = window.scrollY || window.pageYOffset;
    let scrollVelocity = 0;
    let scrollTimeout = null;

    const handleScroll = () => {
      const currentScrollY = window.scrollY || window.pageYOffset;
      const delta = currentScrollY - lastScrollY;
      lastScrollY = currentScrollY;
      // Dampened scroll velocity boost
      scrollVelocity = Math.max(Math.min(delta * 0.35, 15), -15);

      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        scrollVelocity = 0;
      }, 120);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Create particles
    const particleCount = Math.min(Math.floor(window.innerWidth / 16), 85);
    const particles = [];

    const colors = [
      { r: 192, g: 132, b: 252 }, // Neon Violet (#C084FC)
      { r: 168, g: 85, b: 247 },  // Neon Purple (#A855F7)
      { r: 16, g: 185, b: 129 },   // Neon Mint (#10B981)
      { r: 56, g: 189, b: 248 },   // Electric Cyan (#38BDF8)
      { r: 244, g: 114, b: 182 },  // Cosmic Pink (#F472B6)
    ];

    for (let i = 0; i < particleCount; i++) {
      const colorObj = colors[Math.floor(Math.random() * colors.length)];
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        baseRadius: Math.random() * 2.2 + 0.8,
        color: colorObj,
        alpha: Math.random() * 0.55 + 0.25,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        pulseSpeed: Math.random() * 0.02 + 0.008,
        pulseVal: Math.random() * Math.PI * 2,
        zDepth: Math.random() * 0.8 + 0.4, // Depth layer
      });
    }

    // Render loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Smoothly decay scroll velocity
      scrollVelocity *= 0.92;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Move with velocity + scroll velocity warp based on depth
        p.x += p.vx;
        p.y += p.vy - scrollVelocity * p.zDepth;

        // Wrap around boundaries
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;
        if (p.y < -20) p.y = height + 20;
        if (p.y > height + 20) p.y = -20;

        // Pulse alpha and radius
        p.pulseVal += p.pulseSpeed;
        const currentAlpha = Math.max(0.1, p.alpha + Math.sin(p.pulseVal) * 0.2);
        const currentRadius = p.baseRadius + Math.sin(p.pulseVal * 0.5) * 0.4;

        // Star streak if scrolling fast (Antigravity Liftoff Warp)
        const isWarping = Math.abs(scrollVelocity) > 1.5;

        ctx.beginPath();
        if (isWarping) {
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p.x, p.y + scrollVelocity * p.zDepth * 3);
          ctx.strokeStyle = `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${currentAlpha * 0.75})`;
          ctx.lineWidth = currentRadius * 0.8;
          ctx.stroke();
        } else {
          ctx.arc(p.x, p.y, currentRadius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${currentAlpha})`;
          ctx.shadowBlur = 10;
          ctx.shadowColor = `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, 0.85)`;
          ctx.fill();
          ctx.shadowBlur = 0;
        }

        // Connect with nearby particles (Constellation mesh)
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 115) {
            const lineAlpha = (1 - dist / 115) * 0.16;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(168, 85, 247, ${lineAlpha})`;
            ctx.lineWidth = 0.65;
            ctx.stroke();
          }
        }

        // Mouse gravity interaction
        const mdx = p.x - mouse.x;
        const mdy = p.y - mouse.y;
        const mdist = Math.sqrt(mdx * mdx + mdy * mdy);

        if (mdist < mouse.radius) {
          const mAlpha = (1 - mdist / mouse.radius) * 0.4;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(16, 185, 129, ${mAlpha})`;
          ctx.lineWidth = 1;
          ctx.stroke();

          // Repulsion
          p.x += (mdx / mdist) * 0.8;
          p.y += (mdy / mdist) * 0.8;
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-85"
    />
  );
}

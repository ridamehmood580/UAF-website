'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Award, Landmark, Sparkles, Compass } from 'lucide-react';

interface CampusScene {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  badge: string;
}

const SCENES: CampusScene[] = [
  {
    id: 'main-gate',
    title: 'Historic Main Gate',
    subtitle: 'Iconic 1906 Heritage Entrance',
    image: '/7c9f8fcd-b428-46b3-bdb7-bc94c961cac9.jpg',
    badge: 'Heritage Landmark'
  },
  {
    id: 'aerial-campus',
    title: 'Central Academic Quadrangle',
    subtitle: 'South Asia’s Premier Agricultural Center',
    image: '/5089a7e8-c073-497e-a07b-5ff64398d871.jpg',
    badge: 'Academic Core'
  },
  {
    id: 'circular-garden',
    title: 'Sprawling Research Grounds',
    subtitle: '1,950+ Acres of Agronomy & Experimental Farms',
    image: '/46441194-6b77-4bb9-810f-ffdaf6ed53d5.jpg',
    badge: 'Research Station'
  }
];

const AUTO_CYCLE_MS = 6000;

export const Hero3DVisual: React.FC = () => {
  const [activeSceneIndex, setActiveSceneIndex] = useState(0);
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});
  const containerRef = useRef<HTMLDivElement>(null);
  const [rotX, setRotX] = useState(0);
  const [rotY, setRotY] = useState(0);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50, opacity: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    SCENES.forEach((scene) => {
      const img = new Image();
      img.src = scene.image;
      img.onerror = () => {
        console.error('Image load nahi hui:', scene.image);
        setFailedImages((prev) => ({ ...prev, [scene.id]: true }));
      };
    });
  }, []);

  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      setActiveSceneIndex((prev) => (prev + 1) % SCENES.length);
    }, AUTO_CYCLE_MS);
    return () => clearInterval(timer);
  }, [isHovered]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    setRotX(-((y - centerY) / centerY) * 8);
    setRotY(((x - centerX) / centerX) * 10);

    setGlarePos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.3
    });
  };

  const handleMouseEnter = () => setIsHovered(true);

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotX(0);
    setRotY(0);
    setGlarePos((prev) => ({ ...prev, opacity: 0 }));
  };

  const currentScene = SCENES[activeSceneIndex];

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative isolate w-full max-w-[540px] mx-auto lg:max-w-none min-h-[430px] flex items-center justify-center select-none py-4"
    >
      {/* Ambient background rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none -z-10">
        <div className="w-[340px] h-[340px] sm:w-[460px] sm:h-[460px] rounded-full border border-blue-500/20 animate-spin [animation-duration:35s]" />
        <div className="absolute w-[280px] h-[280px] sm:w-[380px] sm:h-[380px] rounded-full border border-amber-400/25 border-dashed animate-spin [animation-duration:25s] [animation-direction:reverse]" />
        <div className="absolute w-72 h-72 rounded-full bg-blue-600/15 blur-3xl" />
        <div className="absolute w-56 h-56 rounded-full bg-amber-500/15 blur-2xl translate-x-12 translate-y-12" />
      </div>

      {/* Main stage card: no preserve-3d and no overflow-hidden on the 3D parent */}
      <div
        className="relative w-full rounded-3xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)] border-2 border-white/20 bg-[#071b2d] will-change-transform"
        style={{
          transform: `perspective(1200px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) scale(${isHovered ? 1.02 : 1})`,
          transition: isHovered
            ? 'transform 0.08s ease-out'
            : 'transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1)'
        }}
      >
        {/* Clipping wrapper for images and rounded corners */}
        <div className="relative overflow-hidden rounded-3xl">
          {/* Glare */}
          <div
            className="pointer-events-none absolute inset-0 z-40 transition-opacity duration-300"
            style={{
              opacity: glarePos.opacity,
              background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.1) 35%, transparent 65%)`
            }}
          />

          {/* Viewport */}
          <div className="relative h-[340px] sm:h-[400px] lg:h-[430px] bg-[#071b2d]">
            {SCENES.map((scene, idx) => {
              const isActive = idx === activeSceneIndex;
              const failed = failedImages[scene.id];

              return (
                <div
                  key={scene.id}
                  className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                    isActive ? 'opacity-100 z-10' : 'opacity-0 z-0'
                  }`}
                >
                  {failed ? (
                    <div className="w-full h-full bg-gradient-to-br from-[#163887] via-[#1d4e89] to-[#071b2d] flex items-center justify-center">
                      <Landmark className="w-16 h-16 text-white/30" />
                    </div>
                  ) : (
                    <img
                      src={scene.image}
                      alt={scene.title}
                      onError={() =>
                        setFailedImages((prev) => ({ ...prev, [scene.id]: true }))
                      }
                      className="absolute inset-0 w-full h-full object-cover object-center"
                    />
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-[#071b2d] via-[#071b2d]/30 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#071b2d]/50 via-transparent to-transparent" />
                </div>
              );
            })}

            {/* Badge top right */}
            <div
              className="absolute top-4 right-4 z-30"
              style={{
                transform: `translate3d(${(-rotY * 0.8).toFixed(1)}px, ${(rotX * 0.8).toFixed(1)}px, 0)`
              }}
            >
              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#071b2d]/85 backdrop-blur-md border border-amber-400/40 text-amber-300 text-xs font-bold shadow-xl">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-400"></span>
                </span>
                <Award className="w-3.5 h-3.5 text-amber-300" />
                <span>Ranked #1 in Agriculture</span>
              </div>
            </div>

            {/* Badge top left */}
            <div
              className="absolute top-4 left-4 z-30"
              style={{
                transform: `translate3d(${(-rotY * 0.6).toFixed(1)}px, ${(rotX * 0.6).toFixed(1)}px, 0)`
              }}
            >
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-950/80 backdrop-blur-md border border-blue-400/30 text-blue-200 text-[11px] font-semibold shadow-lg">
                <Compass className="w-3 h-3 text-blue-400" />
                <span>{currentScene.badge}</span>
              </div>
            </div>

            {/* Info card bottom */}
            <div
              className="absolute bottom-4 left-4 right-4 z-30"
              style={{
                transform: `translate3d(${(-rotY * 0.9).toFixed(1)}px, ${(rotX * 0.9).toFixed(1)}px, 0)`
              }}
            >
              <div className="p-4 rounded-2xl bg-[#071b2d]/90 backdrop-blur-lg border border-white/20 shadow-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-1.5 text-amber-400 text-xs font-extrabold uppercase tracking-wider">
                    <Landmark className="w-3.5 h-3.5" />
                    <span>Interactive 3D Showcase</span>
                  </div>
                  <h3 className="font-serif-heading font-bold text-base sm:text-lg text-white">
                    {currentScene.title}
                  </h3>
                  <p className="text-white/70 text-xs truncate max-w-xs">
                    {currentScene.subtitle}
                  </p>
                </div>

                <div className="flex items-center gap-1.5 shrink-0 bg-white/10 p-1 rounded-xl border border-white/10">
                  {SCENES.map((sc, idx) => (
                    <button
                      key={sc.id}
                      onClick={() => setActiveSceneIndex(idx)}
                      title={sc.title}
                      className={`px-2.5 py-1 text-[11px] font-bold rounded-lg transition-all flex items-center gap-1 cursor-pointer ${
                        idx === activeSceneIndex
                          ? 'bg-[#e8a62a] text-[#071b2d] shadow-md scale-105'
                          : 'text-white/80 hover:text-white hover:bg-white/15'
                      }`}
                    >
                      <span>0{idx + 1}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Stats footbar */}
          <div className="px-5 py-3.5 bg-gradient-to-r from-[#163887] via-[#1d4e89] to-[#071b2d] border-t border-white/15 flex items-center justify-around text-center">
            <div className="space-y-0.5">
              <span className="text-sm sm:text-base font-extrabold text-amber-300 block">1906</span>
              <span className="text-[10px] text-white/80 uppercase font-semibold">119 Yrs Heritage</span>
            </div>
            <div className="w-px h-7 bg-white/20" />
            <div className="space-y-0.5">
              <span className="text-sm sm:text-base font-extrabold text-blue-300 block">1,950+</span>
              <span className="text-[10px] text-white/80 uppercase font-semibold">Acres Campus</span>
            </div>
            <div className="w-px h-7 bg-white/20" />
            <div className="space-y-0.5">
              <span className="text-sm sm:text-base font-extrabold text-amber-300 block">33,500+</span>
              <span className="text-[10px] text-white/80 uppercase font-semibold">Students</span>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute -bottom-2 left-0 right-0 flex items-center justify-center gap-2 text-white/60 text-xs">
        <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
        <span>Hover or move cursor over the card to experience live 3D perspective physics</span>
      </div>
    </div>
  );
};
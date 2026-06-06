"use client";

import { useState, useEffect } from 'react';
import { Sun, Moon, Flame, Target, Package, Check, MapPin, X } from 'lucide-react';

const basePrices = {
  classic: 5.99,
  rava: 7.49,
  ragi: 7.99
};

const stuffingPrices = {
  masala: 1.50,
  cheese: 2.00,
  podi: 1.00
};

export default function Home() {
  // Theme & Navigation State
  const [theme, setTheme] = useState('dark');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Builder Configurator State
  const [dosaBase, setDosaBase] = useState('classic');
  const [stuffings, setStuffings] = useState({
    masala: false,
    cheese: false,
    podi: false
  });
  const [chutneys, setChutneys] = useState({
    coconut: true,
    tomato: true,
    mint: true
  });

  // Drawer / Checkout State
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [activePlan, setActivePlan] = useState(null);
  const [coords, setCoords] = useState('');
  const [isCoordsLocked, setIsCoordsLocked] = useState(false);
  const [coordinateBtnLabel, setCoordinateBtnLabel] = useState('Lock Current Balcony GPS');

  // Simulation State
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationProgress, setSimulationProgress] = useState(0);
  const [simulationStatus, setSimulationStatus] = useState('Readying Launchpad...');
  const [simulationSubText, setSimulationSubText] = useState('');
  const [showSimClose, setShowSimClose] = useState(false);

  // 1. Initialise theme preferences & Intersection Observer
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);
    if (savedTheme === 'light') {
      document.body.classList.add('light-theme');
    } else {
      document.body.classList.remove('light-theme');
    }

    // Scroll reveal observer
    const timelineItems = document.querySelectorAll('.timeline-item');
    const observerOptions = {
      root: null,
      threshold: 0.15,
      rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    timelineItems.forEach(item => {
      observer.observe(item);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  // Theme Toggler
  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    localStorage.setItem('theme', nextTheme);
    if (nextTheme === 'light') {
      document.body.classList.add('light-theme');
    } else {
      document.body.classList.remove('light-theme');
    }
  };

  // Configurator Calculation
  const calculatePrice = () => {
    let price = basePrices[dosaBase];
    if (stuffings.masala) price += stuffingPrices.masala;
    if (stuffings.cheese) price += stuffingPrices.cheese;
    if (stuffings.podi) price += stuffingPrices.podi;
    return price.toFixed(2);
  };

  const currentPrice = calculatePrice();

  // Handler for opening checkout
  const handleOpenDrawer = (plan = null) => {
    setActivePlan(plan);
    setIsDrawerOpen(true);
  };

  // Handler for closing checkout
  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
    setTimeout(resetSimulation, 400); // Reset drawer simulation states after slide transitions
  };

  // Lock simulated GPS balcony coordinates
  const lockCoordinates = () => {
    setCoordinateBtnLabel("Scanning Balcony Lidar...");
    setTimeout(() => {
      const lat = (12.97 + Math.random() * 0.05).toFixed(4);
      const lng = (77.59 + Math.random() * 0.05).toFixed(4);
      setCoords(`${lat}° N, ${lng}° E (LIDAR LOCKED)`);
      setCoordinateBtnLabel("Coordinates Locked ✓");
      setIsCoordsLocked(true);
    }, 1200);
  };

  // Drone Launch Simulator Progress Bar
  const startDroneLaunch = () => {
    if (!coords.trim()) {
      alert("Please specify or lock your balcony Lidar Dropoff Coordinates to establish a target path!");
      return;
    }
    setIsSimulating(true);
    setSimulationProgress(0);
    setSimulationStatus("Readying Launchpad...");
    setSimulationSubText("");
    setShowSimClose(false);

    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setSimulationProgress(progress);

      if (progress === 20) {
        setSimulationStatus("HIVE ENGINE STARTUP...");
        setSimulationSubText("Induction cooking griddles starting up. Dosa batter loaded.");
      } else if (progress === 50) {
        setSimulationStatus("IN-FLIGHT BAKING EN-ROUTE...");
        setSimulationSubText("Quadcopter engines operating at 12,000 RPM. Griddles cooking dosa mid-air at 200°C.");
      } else if (progress === 80) {
        setSimulationStatus("BALCONY LIDAR TARGETING...");
        setSimulationSubText("Supersonic sonar locked on coordinate landing pads. Lowering thermal food cages.");
      } else if (progress === 100) {
        clearInterval(interval);
        setSimulationStatus("DELIVERY SUCCESSFUL!");
        setSimulationSubText("Your crispy piping hot Air Dosa has landed safely on your target plate. Bon Appétit!");
        setShowSimClose(true);
      }
    }, 600);
  };

  const resetSimulation = () => {
    setIsSimulating(false);
    setSimulationProgress(0);
    setSimulationStatus("Readying Launchpad...");
    setSimulationSubText('');
    setShowSimClose(false);
    setCoords('');
    setIsCoordsLocked(false);
    setCoordinateBtnLabel("Lock Current Balcony GPS");
  };

  return (
    <>
      {/* -------------------------------------------------------------
           HEADER & NAVIGATION
           ------------------------------------------------------------- */}
      <header id="main-header">
        <div class="container nav-container">
          <a href="#" class="logo" id="header-logo">
            {/* Custom Drone SVG Logo */}
            <svg class="logo-icon" viewBox="0 0 24 24" width="30" height="30" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 2v20M2 12h20" />
              <circle cx="12" cy="12" r="3" />
              <circle cx="12" cy="4" r="2" fill="currentColor"/>
              <circle cx="12" cy="20" r="2" fill="currentColor"/>
              <circle cx="2" cy="12" r="2" fill="currentColor"/>
              <circle cx="22" cy="12" r="2" fill="currentColor"/>
            </svg>
            <span>Air Dosa</span>
          </a>

          <nav>
            <ul class={`nav-links ${isMenuOpen ? 'mobile-active' : ''}`} id="nav-links-menu">
              <li><a href="#" id="nav-link-home" onClick={() => setIsMenuOpen(false)}>Home</a></li>
              <li><a href="#features" id="nav-link-tech" onClick={() => setIsMenuOpen(false)}>Tech Features</a></li>
              <li><a href="#builder" id="nav-link-builder" onClick={() => setIsMenuOpen(false)}>Dosa Configurator</a></li>
              <li><a href="#timeline" id="nav-link-timeline" onClick={() => setIsMenuOpen(false)}>Flight Path</a></li>
              <li><a href="#pricing" id="nav-link-pricing" onClick={() => setIsMenuOpen(false)}>Hive Subscriptions</a></li>
            </ul>
          </nav>

          <div class="nav-actions">
            <div class="status-badge" id="hive-status-badge">
              <span class="status-dot"></span>
              <span>HIVE-01: ONLINE</span>
            </div>

            <button class="theme-toggle-btn" id="theme-toggle-btn" onClick={toggleTheme} aria-label="Toggle visual interface mode">
              {theme === 'light' ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            <button class={`hamburger ${isMenuOpen ? 'active' : ''}`} id="hamburger-menu" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle navigation links menu">
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </header>

      {/* -------------------------------------------------------------
           HERO SECTION
           ------------------------------------------------------------- */}
      <section class="hero" id="home">
        <div class="container hero-grid">
          <div class="hero-content">
            <div class="hero-subtitle" id="hero-mini-tag">Balcony Precision Landing</div>
            <h1 class="hero-title" id="hero-headline">
              Crispy Dosas.<br />
              <span class="gradient-text">Delivered from the Clouds.</span>
            </h1>
            <p class="hero-description" id="hero-tagline">
              The world's first autonomous food pod service cooking your food at 3,000 feet. Griddled mid-air, delivered via lidar-precision drones, and dropped hot directly on your plate.
            </p>
            <div class="hero-actions">
              <button class="btn btn-primary" id="hero-cta-order" onClick={() => handleOpenDrawer()}>Deploy Dosa Now</button>
              <a href="#features" class="btn btn-secondary" id="hero-cta-tech">Explore Airspace</a>
            </div>
          </div>

          <div class="hero-visual" id="hero-interactive-visual">
            <svg class="drone-svg" viewBox="0 0 400 380" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="200" cy="340" r="35" stroke="var(--tech-cyan)" stroke-width="1" stroke-dasharray="4 4" opacity="0.4" />
              <circle cx="200" cy="340" r="60" stroke="var(--tech-cyan)" stroke-width="1" stroke-dasharray="8 8" opacity="0.2" />
              
              <text x="260" y="350" fill="var(--tech-cyan)" font-size="8" font-family="monospace" opacity="0.5">ALT: 12.4m</text>
              <text x="260" y="365" fill="var(--tech-cyan)" font-size="8" font-family="monospace" opacity="0.5">LIDAR: LOCK</text>
              
              <ellipse cx="200" cy="340" rx="90" ry="15" stroke="var(--tech-cyan)" stroke-width="1.5" opacity="0.3" />
              <ellipse cx="200" cy="340" rx="110" ry="20" stroke="var(--tech-cyan)" stroke-width="1" stroke-dasharray="3 3" opacity="0.2" />

              <polygon class="laser-beam" points="100,105 200,340 100,105" fill="url(#cyan-glow-gradient)" opacity="0.25" />
              <polygon class="laser-beam" points="300,105 200,340 300,105" fill="url(#cyan-glow-gradient)" opacity="0.25" />
              <line x1="200" y1="120" x2="200" y2="340" stroke="var(--tech-cyan)" stroke-width="1" opacity="0.3" stroke-dasharray="5 5"/>

              <g class="drone-group">
                <line x1="200" y1="120" x2="100" y2="105" stroke="var(--text-secondary)" stroke-width="6" opacity="0.8"/>
                <line x1="200" y1="120" x2="300" y2="105" stroke="var(--text-secondary)" stroke-width="6" opacity="0.8"/>
                <line x1="200" y1="120" x2="140" y2="160" stroke="var(--text-secondary)" stroke-width="5" opacity="0.8"/>
                <line x1="200" y1="120" x2="260" y2="160" stroke="var(--text-secondary)" stroke-width="5" opacity="0.8"/>

                <rect x="90" y="90" width="20" height="20" rx="4" fill="#1E1E24" stroke="var(--tech-cyan)" stroke-width="1"/>
                <rect x="290" y="90" width="20" height="20" rx="4" fill="#1E1E24" stroke="var(--tech-cyan)" stroke-width="1"/>
                <rect x="130" y="150" width="20" height="20" rx="4" fill="#1E1E24" stroke="var(--tech-cyan)" stroke-width="1"/>
                <rect x="250" y="150" width="20" height="20" rx="4" fill="#1E1E24" stroke="var(--tech-cyan)" stroke-width="1"/>

                {/* Animated prop rotors */}
                <g transform="translate(100, 100)">
                  <ellipse class="rotor" cx="0" cy="0" rx="40" ry="6" stroke="var(--tech-cyan)" stroke-width="1.5" fill="rgba(0, 229, 255, 0.1)"/>
                  <line class="rotor" x1="-40" y1="0" x2="40" y2="0" stroke="var(--text-primary)" stroke-width="2"/>
                </g>
                <g transform="translate(300, 100)">
                  <ellipse class="rotor-slow" cx="0" cy="0" rx="40" ry="6" stroke="var(--tech-cyan)" stroke-width="1.5" fill="rgba(0, 229, 255, 0.1)"/>
                  <line class="rotor-slow" x1="-40" y1="0" x2="40" y2="0" stroke="var(--text-primary)" stroke-width="2"/>
                </g>
                <g transform="translate(140, 160)">
                  <ellipse class="rotor-slow" cx="0" cy="0" rx="36" ry="5" stroke="var(--tech-cyan)" stroke-width="1.5" fill="rgba(0, 229, 255, 0.1)"/>
                  <line class="rotor-slow" x1="-36" y1="0" x2="36" y2="0" stroke="var(--text-primary)" stroke-width="2"/>
                </g>
                <g transform="translate(260, 160)">
                  <ellipse class="rotor" cx="0" cy="0" rx="36" ry="5" stroke="var(--tech-cyan)" stroke-width="1.5" fill="rgba(0, 229, 255, 0.1)"/>
                  <line class="rotor" x1="-36" y1="0" x2="36" y2="0" stroke="var(--text-primary)" stroke-width="2"/>
                </g>

                <path d="M150 110 L250 110 L270 135 L250 150 L150 150 L130 135 Z" fill="#121216" stroke="var(--tech-cyan)" stroke-width="2" />
                <circle cx="200" cy="130" r="14" fill="url(#cyan-glow-core)" stroke="var(--tech-cyan)" stroke-width="1"/>
                <path d="M185 130 H215" stroke="var(--tech-cyan)" stroke-width="2" opacity="0.7"/>

                <path d="M170 150 L170 200 L230 200 L230 150" stroke="var(--text-secondary)" stroke-width="3" fill="none" />
                <line x1="200" y1="150" x2="200" y2="200" stroke="var(--text-secondary)" stroke-width="1.5" stroke-dasharray="3 3"/>

                <g transform="translate(200, 190) scale(0.9)">
                  <polygon points="-35,0 35,0 0,-50" fill="url(#dosa-crispy-gradient)" stroke="var(--primary-gold)" stroke-width="2" filter="drop-shadow(0 0 8px rgba(255,159,28,0.7))" />
                  <path d="M-15,-60 Q-10,-70 -15,-80" stroke="var(--text-primary)" stroke-width="1.5" opacity="0.6" stroke-linecap="round" />
                  <path d="M0,-65 Q5,-75 0,-85" stroke="var(--text-primary)" stroke-width="1.5" opacity="0.8" stroke-linecap="round" />
                  <path d="M15,-60 Q20,-70 15,-80" stroke="var(--text-primary)" stroke-width="1.5" opacity="0.6" stroke-linecap="round" />
                </g>
              </g>

              <defs>
                <radialGradient id="cyan-glow-core" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stop-color="#00E5FF" />
                  <stop offset="100%" stop-color="#0052FF" stop-opacity="0" />
                </radialGradient>
                <linearGradient id="cyan-glow-gradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stop-color="#00E5FF" stop-opacity="0.8" />
                  <stop offset="100%" stop-color="#00E5FF" stop-opacity="0" />
                </linearGradient>
                <linearGradient id="dosa-crispy-gradient" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stop-color="#FF5722" />
                  <stop offset="40%" stop-color="#FF9F1C" />
                  <stop offset="100%" stop-color="#FFD166" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------
           TECH FEATURES SECTION
           ------------------------------------------------------------- */}
      <section class="features" id="features">
        <div class="container">
          <div class="section-header">
            <div class="section-subtitle" id="features-mini-tag">Autopilot Kitchen Network</div>
            <h2 class="section-title" id="features-main-title">Futuristic Drone Baking Technology</h2>
          </div>

          <div class="features-grid" id="tech-features-container">
            <div class="feature-card" id="feat-griddle">
              <div class="feature-icon-box" id="feat-griddle-icon">
                <Flame size={28} />
              </div>
              <h3>On-The-Fly Griddling</h3>
              <p>Dosa batter is spread onto specialized copper induction griddles suspended inside the drone core. Your dosa is baked, rolled, and crisped dynamically mid-flight.</p>
            </div>

            <div class="feature-card" id="feat-lidar">
              <div class="feature-icon-box" id="feat-lidar-icon">
                <Target size={28} />
              </div>
              <h3>Lidar Plate Landing</h3>
              <p>Equipped with millimeter-precision lidar and ultrasound tracking. The drone identifies your balcony-mounted Air-Dosa target plate for a safe, precision hover-drop.</p>
            </div>

            <div class="feature-card" id="feat-chutney">
              <div class="feature-icon-box" id="feat-chutney-icon">
                <Package size={28} />
              </div>
              <h3>Triple-Chutney Pods</h3>
              <p>Delivered with pressurized warm sambar capsules and a modular trio of fresh, chilled coconut, tomato, and mint chutneys stored in hermetically-sealed chambers.</p>
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------
           INTERACTIVE DOSA BUILDER
           ------------------------------------------------------------- */}
      <section class="builder" id="builder">
        <div class="container">
          <div class="section-header">
            <div class="section-subtitle" id="builder-mini-tag">Lidar Food Configurator</div>
            <h2 class="section-title" id="builder-main-title">Build Your Space Dosa</h2>
          </div>

          <div class="builder-grid">
            <div class="builder-panel" id="dosa-builder-panel">
              {/* Base */}
              <div class="builder-group">
                <div class="builder-group-title">
                  <span>Select Dosa Base</span>
                  <span id="base-selected-badge" style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                    {dosaBase.charAt(0).toUpperCase() + dosaBase.slice(1)}
                  </span>
                </div>
                <div class="option-grid">
                  <label class="builder-option">
                    <input type="radio" name="dosa-base" value="classic" checked={dosaBase === 'classic'} onChange={(e) => setDosaBase(e.target.value)} />
                    <div class="option-card">
                      <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none"><path d="M12 2L2 22h20L12 2z"></path></svg>
                      <span class="option-title">Classic</span>
                      <span class="option-price">+$0.00</span>
                    </div>
                  </label>
                  <label class="builder-option">
                    <input type="radio" name="dosa-base" value="rava" checked={dosaBase === 'rava'} onChange={(e) => setDosaBase(e.target.value)} />
                    <div class="option-card">
                      <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none"><path d="M3 3h18v18H3z"></path><path d="M9 3v18M15 3v18M3 9h18M3 15h18"></path></svg>
                      <span class="option-title">Crispy Rava</span>
                      <span class="option-price">+$1.50</span>
                    </div>
                  </label>
                  <label class="builder-option">
                    <input type="radio" name="dosa-base" value="ragi" checked={dosaBase === 'ragi'} onChange={(e) => setDosaBase(e.target.value)} />
                    <div class="option-card">
                      <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none"><circle cx="12" cy="12" r="10"></circle><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
                      <span class="option-title">Pro-Ragi</span>
                      <span class="option-price">+$2.00</span>
                    </div>
                  </label>
                </div>
              </div>

              {/* Stuffings */}
              <div class="builder-group">
                <div class="builder-group-title">Select Stuffings</div>
                <div class="option-grid">
                  <label class="builder-option">
                    <input type="checkbox" name="stuffing" value="masala" checked={stuffings.masala} onChange={(e) => setStuffings({ ...stuffings, masala: e.target.checked })} />
                    <div class="option-card">
                      <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none"><circle cx="12" cy="12" r="8"></circle><path d="M12 2v20M2 12h20"></path></svg>
                      <span class="option-title">Classic Masala</span>
                      <span class="option-price">+$1.50</span>
                    </div>
                  </label>
                  <label class="builder-option">
                    <input type="checkbox" name="stuffing" value="cheese" checked={stuffings.cheese} onChange={(e) => setStuffings({ ...stuffings, cheese: e.target.checked })} />
                    <div class="option-card">
                      <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path><path d="M7 11.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM17 15.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM12 10a1 1 0 1 0 0-2 1 1 0 0 0 0 2zM12 17a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"></path></svg>
                      <span class="option-title">Chilli Cheese</span>
                      <span class="option-price">+$2.00</span>
                    </div>
                  </label>
                  <label class="builder-option">
                    <input type="checkbox" name="stuffing" value="podi" checked={stuffings.podi} onChange={(e) => setStuffings({ ...stuffings, podi: e.target.checked })} />
                    <div class="option-card">
                      <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"></path></svg>
                      <span class="option-title">Gunpowder Podi</span>
                      <span class="option-price">+$1.00</span>
                    </div>
                  </label>
                </div>
              </div>

              {/* Chutneys */}
              <div class="builder-group">
                <div class="builder-group-title">Free Chutney Pods</div>
                <div class="option-grid">
                  <label class="builder-option">
                    <input type="checkbox" name="chutney" value="coconut" checked={chutneys.coconut} onChange={(e) => setChutneys({ ...chutneys, coconut: e.target.checked })} />
                    <div class="option-card">
                      <span class="option-title">Coconut White</span>
                      <span class="option-price">Included</span>
                    </div>
                  </label>
                  <label class="builder-option">
                    <input type="checkbox" name="chutney" value="tomato" checked={chutneys.tomato} onChange={(e) => setChutneys({ ...chutneys, tomato: e.target.checked })} />
                    <div class="option-card">
                      <span class="option-title">Spicy Tomato</span>
                      <span class="option-price">Included</span>
                    </div>
                  </label>
                  <label class="builder-option">
                    <input type="checkbox" name="chutney" value="mint" checked={chutneys.mint} onChange={(e) => setChutneys({ ...chutneys, mint: e.target.checked })} />
                    <div class="option-card">
                      <span class="option-title">Mint Coriander</span>
                      <span class="option-price">Included</span>
                    </div>
                  </label>
                </div>
              </div>

              <div class="price-bar">
                <div>
                  <div class="price-label">Estimated Price</div>
                  <div class="price-value" id="dynamic-price-tag">${currentPrice}</div>
                </div>
                <button class="btn btn-primary" id="builder-add-btn" onClick={() => handleOpenDrawer()}>Configure Launch</button>
              </div>
            </div>

            {/* Dosa visual config mapping */}
            <div class="builder-visualizer" id="dosa-visualizer-container">
              <svg class="visualizer-svg" viewBox="0 0 320 320" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="160" cy="160" r="140" fill="var(--bg-deep)" stroke="var(--tech-cyan)" stroke-width="1.5" stroke-dasharray="6 6" opacity="0.3"/>
                <circle cx="160" cy="160" r="100" stroke="var(--tech-cyan)" stroke-width="1" opacity="0.2"/>
                
                <g class={`visual-chutney visual-chutney-coconut ${chutneys.coconut ? 'active' : ''}`} transform="translate(60, 60)">
                  <circle cx="0" cy="0" r="22" fill="#1E1E24" stroke="var(--text-secondary)" stroke-width="1.5"/>
                  <circle cx="0" cy="0" r="18" fill="#F8F9FA" opacity="0.9"/>
                  <text x="-16" y="32" fill="var(--text-secondary)" font-size="8" font-family="monospace">COCO.POD</text>
                </g>

                <g class={`visual-chutney visual-chutney-tomato ${chutneys.tomato ? 'active' : ''}`} transform="translate(260, 60)">
                  <circle cx="0" cy="0" r="22" fill="#1E1E24" stroke="var(--text-secondary)" stroke-width="1.5"/>
                  <circle cx="0" cy="0" r="18" fill="#E63946" opacity="0.9"/>
                  <text x="-16" y="32" fill="var(--text-secondary)" font-size="8" font-family="monospace">TOMA.POD</text>
                </g>

                <g class={`visual-chutney visual-chutney-mint ${chutneys.mint ? 'active' : ''}`} transform="translate(160, 270)">
                  <circle cx="0" cy="0" r="22" fill="#1E1E24" stroke="var(--text-secondary)" stroke-width="1.5"/>
                  <circle cx="0" cy="0" r="18" fill="#52B788" opacity="0.9"/>
                  <text x="-16" y="-30" fill="var(--text-secondary)" font-size="8" font-family="monospace">MINT.POD</text>
                </g>

                {/* Bases */}
                <path class={`visual-dosa-base-classic dosa-base ${dosaBase === 'classic' ? 'active' : ''}`} d="M 80 160 C 80 110, 240 110, 240 160 C 240 210, 80 210, 80 160 Z" fill="url(#classic-base-gradient)" stroke="#E85D04" stroke-width="2" filter="drop-shadow(0 8px 16px rgba(232,93,4,0.3))"/>
                
                <g class={`visual-dosa-base-rava dosa-base ${dosaBase === 'rava' ? 'active' : ''}`}>
                  <path d="M 80 160 C 80 110, 240 110, 240 160 C 240 210, 80 210, 80 160 Z" fill="url(#rava-base-gradient)" stroke="#FFB703" stroke-width="2" filter="drop-shadow(0 8px 16px rgba(255,183,3,0.3))"/>
                  <path d="M 90 140 Q 160 180 230 140 M 90 180 Q 160 140 230 180 M 120 120 Q 160 200 200 120 M 120 200 Q 160 120 200 200" stroke="#8D5B00" stroke-width="1" stroke-dasharray="2 2" opacity="0.6"/>
                </g>

                <path class={`visual-dosa-base-ragi dosa-base ${dosaBase === 'ragi' ? 'active' : ''}`} d="M 80 160 C 80 110, 240 110, 240 160 C 240 210, 80 210, 80 160 Z" fill="url(#ragi-base-gradient)" stroke="#3F2212" stroke-width="2.5" filter="drop-shadow(0 8px 16px rgba(63,34,18,0.4))"/>

                {/* Fillings */}
                <g class={`visual-filling-masala ${stuffings.masala ? 'active' : ''}`}>
                  <polygon points="120,150 140,140 150,155 130,165" fill="#FFD166" stroke="#FFB703" stroke-width="1"/>
                  <polygon points="155,145 175,135 185,150 165,160" fill="#FFD166" stroke="#FFB703" stroke-width="1"/>
                  <polygon points="140,165 160,155 170,175 150,180" fill="#FFD166" stroke="#FFB703" stroke-width="1"/>
                  <circle cx="135" cy="152" r="3" fill="#40916C"/>
                  <circle cx="168" cy="158" r="3" fill="#40916C"/>
                </g>

                <g class={`visual-filling-cheese ${stuffings.cheese ? 'active' : ''}`}>
                  <path d="M 100 150 Q 130 170 160 150 Q 190 170 220 150" stroke="#FFE3E0" stroke-width="4" stroke-linecap="round" fill="none" opacity="0.9"/>
                  <path d="M 110 160 Q 160 190 210 160" stroke="#FFD166" stroke-width="3" stroke-linecap="round" fill="none" opacity="0.9"/>
                  <path d="M 130 170 C 135 185, 140 185, 145 170" stroke="#FFE3E0" stroke-width="3" stroke-linecap="round" fill="none"/>
                  <path d="M 175 170 C 180 190, 185 190, 190 170" stroke="#FFD166" stroke-width="3" stroke-linecap="round" fill="none"/>
                </g>

                <g class={`visual-filling-podi ${stuffings.podi ? 'active' : ''}`}>
                  <circle cx="105" cy="145" r="1.5" fill="#D90429"/>
                  <circle cx="120" cy="135" r="1.5" fill="#D90429"/>
                  <circle cx="150" cy="140" r="2.5" fill="#D90429"/>
                  <circle cx="170" cy="130" r="1.5" fill="#D90429"/>
                  <circle cx="205" cy="145" r="1.5" fill="#D90429"/>
                  <circle cx="215" cy="160" r="2.5" fill="#D90429"/>
                  <circle cx="190" cy="175" r="1.5" fill="#D90429"/>
                  <circle cx="160" cy="180" r="1.5" fill="#D90429"/>
                  <circle cx="130" cy="175" r="2" fill="#D90429"/>
                  <circle cx="110" cy="165" r="1.5" fill="#D90429"/>
                  <circle cx="155" cy="160" r="2" fill="#D90429"/>
                </g>
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------
           HOW IT WORKS TIMELINE
           ------------------------------------------------------------- */}
      <section class="timeline-section" id="timeline">
        <div class="container">
          <div class="section-header">
            <div class="section-subtitle" id="timeline-mini-tag">Logistical Flight Timeline</div>
            <h2 class="section-title" id="timeline-main-title">How Air Dosa Autopilot Works</h2>
          </div>

          <div class="timeline" id="timeline-wrapper">
            <div class="timeline-item" id="time-step-1">
              <div class="timeline-node"></div>
              <div class="timeline-content">
                <div class="timeline-step">STEP 01 // [SYS.INIT]</div>
                <h3>Configure Flight & Recipe</h3>
                <p>Select your base, fillings, and chutneys. Our autopilot system maps the optimal aerodynamic flight corridor from the closest Kitchen Hive directly to your balcony coordinates.</p>
              </div>
            </div>

            <div class="timeline-item" id="time-step-2">
              <div class="timeline-node"></div>
              <div class="timeline-content">
                <div class="timeline-step">STEP 02 // [GRIDDLE.FLIGHT]</div>
                <h3>Mid-Air Kitchen Baking</h3>
                <p>During flight, copper induction heaters activate in the drone pod. The batter is auto-spread at 200°C, rolling your custom fillings perfectly inside the crispy fold at terminal velocity.</p>
              </div>
            </div>

            <div class="timeline-item" id="time-step-3">
              <div class="timeline-node"></div>
              <div class="timeline-content">
                <div class="timeline-step">STEP 03 // [PRECISION.DROP]</div>
                <h3>Precision Balcony Drop</h3>
                <p>Using lidar plate navigation and supersonic sonar arrays, the drone locks onto your home targets, deploying a thermal cargo cage to deposit your crisp hot dosa safely.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------
           SUBSCRIPTION & PRICING PLANS
           ------------------------------------------------------------- */}
      <section class="pricing" id="pricing">
        <div class="container">
          <div class="section-header">
            <div class="section-subtitle" id="pricing-mini-tag">Hive Subscriptions</div>
            <h2 class="section-title" id="pricing-main-title">Select Airspace Priority</h2>
          </div>

          <div class="pricing-grid" id="pricing-plans-grid">
            <div class="pricing-card" id="plan-casual">
              <h3 class="plan-name">Dosa Casual</h3>
              <p class="plan-description">Ideal for standard crisp enthusiasts looking for occasional flight drops.</p>
              <div class="plan-price">$29<span>/month</span></div>
              <ul class="plan-features">
                <li>
                  <Check size={16} strokeWidth={3} />
                  <span>5 Premium Dosa Drops per month</span>
                </li>
                <li>
                  <Check size={16} strokeWidth={3} />
                  <span>Standard Griddle Drone queue</span>
                </li>
                <li>
                  <Check size={16} strokeWidth={3} />
                  <span>2 Complimentary Chutney pods</span>
                </li>
                <li>
                  <Check size={16} strokeWidth={3} />
                  <span>Precision Lidar Target plate</span>
                </li>
              </ul>
              <button class="btn btn-secondary plan-btn" id="plan-casual-btn" onClick={() => handleOpenDrawer('Casual Plan Subscription')}>Enlist Now</button>
            </div>

            <div class="pricing-card pro" id="plan-infinite">
              <div class="pro-badge">Priority Airspace</div>
              <h3 class="plan-name">Dosa Infinite</h3>
              <p class="plan-description">For extreme dosa connoisseurs who want unlimited griddling drops with prioritised hive routing.</p>
              <div class="plan-price">$99<span>/month</span></div>
              <ul class="plan-features">
                <li>
                  <Check size={16} strokeWidth={3} />
                  <span>Unlimited Dosa Drops (Fair Use 100/mo)</span>
                </li>
                <li>
                  <Check size={16} strokeWidth={3} />
                  <span>Priority Airspace Lanes (No queuing)</span>
                </li>
                <li>
                  <Check size={16} strokeWidth={3} />
                  <span>Custom Visual builder recipes</span>
                </li>
                <li>
                  <Check size={16} strokeWidth={3} />
                  <span>Advanced target with heater module</span>
                </li>
              </ul>
              <button class="btn btn-primary plan-btn" id="plan-infinite-btn" onClick={() => handleOpenDrawer('Infinite Plan Subscription')}>Unlock Airspace</button>
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------
           FLOATING ACTION BUTTON (FAB)
           ------------------------------------------------------------- */}
      <button class="fab" id="floating-order-fab" onClick={() => handleOpenDrawer()} aria-label="Open instant drone checkout panel">
        <svg viewBox="0 0 24 24" width="28" height="28" stroke="currentColor" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <path d="M12 2v20M2 12h20" />
          <circle cx="12" cy="12" r="3" />
          <circle cx="12" cy="4" r="1.5" fill="currentColor"/>
          <circle cx="12" cy="20" r="1.5" fill="currentColor"/>
          <circle cx="2" cy="12" r="1.5" fill="currentColor"/>
          <circle cx="22" cy="12" r="1.5" fill="currentColor"/>
        </svg>
      </button>

      {/* -------------------------------------------------------------
           SLIDING CHECKOUT DRAWER
           ------------------------------------------------------------- */}
      <div class={`drawer-overlay ${isDrawerOpen ? 'active' : ''}`} id="checkout-drawer-overlay" onClick={handleCloseDrawer}></div>
      <aside class={`drawer ${isDrawerOpen ? 'active' : ''}`} id="checkout-drawer">
        <div class="drawer-header">
          <h3 id="drawer-main-title">{activePlan ? 'Launch Subscription' : 'Launch Drone Dosa'}</h3>
          <button class="drawer-close" id="drawer-close-btn" onClick={handleCloseDrawer} aria-label="Close checkout">&times;</button>
        </div>

        {!isSimulating ? (
          <div class="drawer-body" id="drawer-checkout-content">
            <div class="summary-card" id="order-summary-box">
              <div class="summary-title" id="summary-card-header">
                {activePlan ? 'Subscription Tier Lock' : 'Configure Pod Delivery'}
              </div>
              <div id="summary-items-list">
                {activePlan ? (
                  <>
                    <div class="summary-item">
                      <span>Priority Plan</span>
                      <span>{activePlan}</span>
                    </div>
                    <div class="summary-item" style={{ color: 'var(--text-secondary)' }}>
                      <span>Setup & Air Access</span>
                      <span>Included</span>
                    </div>
                  </>
                ) : (
                  <>
                    <div class="summary-item">
                      <span>Dosa Base ({dosaBase.charAt(0).toUpperCase() + dosaBase.slice(1)})</span>
                      <span>${basePrices[dosaBase].toFixed(2)}</span>
                    </div>
                    {Object.keys(stuffings).some(k => stuffings[k]) && (
                      <div class="summary-item" style={{ color: 'var(--text-secondary)' }}>
                        <span>Stuffings: {Object.keys(stuffings).filter(k => stuffings[k]).map(k => k.charAt(0).toUpperCase() + k.slice(1)).join(', ')}</span>
                        <span>Included</span>
                      </div>
                    )}
                    {Object.keys(chutneys).some(k => chutneys[k]) && (
                      <div class="summary-item" style={{ color: 'var(--text-secondary)' }}>
                        <span>Chutney Pods: {Object.keys(chutneys).filter(k => chutneys[k]).map(k => k.charAt(0).toUpperCase() + k.slice(1)).join(', ')}</span>
                        <span>Free</span>
                      </div>
                    )}
                  </>
                )}
              </div>
              <div class="summary-total" id="summary-total-display">
                <span>Final Cost</span>
                <span id="drawer-total-price">
                  {activePlan ? (activePlan.includes('Infinite') ? '$99.00' : '$29.00') : `$${currentPrice}`}
                </span>
              </div>
            </div>

            <div class="form-group" id="coordinates-form-group">
              <label class="form-label" for="balcony-coords">Lidar Dropoff Coordinates</label>
              <input 
                class="form-input" 
                type="text" 
                id="balcony-coords" 
                placeholder="e.g. 12.9716° N, 77.5946° E" 
                value={coords}
                onChange={(e) => setCoords(e.target.value)}
                required 
              />
            </div>

            <div class="form-group" id="gps-form-group" style={{ marginBottom: '30px' }}>
              <button 
                class="coordinate-lock-btn" 
                id="lock-coordinates-btn" 
                onClick={lockCoordinates}
                style={isCoordsLocked ? { background: 'rgba(0, 229, 255, 0.12)', borderStyle: 'solid', borderColor: 'var(--tech-cyan)' } : {}}
              >
                <MapPin size={16} />
                <span>{coordinateBtnLabel}</span>
              </button>
            </div>

            <button class="btn btn-primary" id="launch-dosa-btn" style={{ width: '100%' }} onClick={startDroneLaunch}>
              {activePlan ? 'Activate Subscription Core' : 'Initiate Drone Launch'}
            </button>
          </div>
        ) : (
          <div class="launch-simulation active" id="drawer-simulation-content">
            <svg class={`success-svg ${showSimClose ? 'active' : ''}`} id="simulation-success-icon" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 2v20M2 12h20" />
              <circle cx="12" cy="12" r="3" />
              <circle cx="12" cy="4" r="2" fill="currentColor"/>
              <circle cx="12" cy="20" r="2" fill="currentColor"/>
              <circle cx="2" cy="12" r="2" fill="currentColor"/>
              <circle cx="22" cy="12" r="2" fill="currentColor"/>
            </svg>
            <div class="launch-status-title" id="simulation-status-text">{simulationStatus}</div>
            <p id="simulation-sub-text" style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.5', maxWidth: '320px' }}>
              {simulationSubText}
            </p>
            
            <div class="progress-bar-container">
              <div class="progress-bar" id="launch-progress-bar" style={{ width: `${simulationProgress}%` }}></div>
            </div>
            
            {showSimClose && (
              <button class="btn btn-secondary" id="sim-back-btn" style={{ width: '100%', marginTop: '20px' }} onClick={handleCloseDrawer}>
                Close Flight Panel
              </button>
            )}
          </div>
        )}
      </aside>

      {/* -------------------------------------------------------------
           FOOTER
           ------------------------------------------------------------- */}
      <footer id="main-footer">
        <div class="container">
          <div class="footer-grid">
            <div class="footer-brand" id="footer-logo-brand">
              <h4>Air Dosa</h4>
              <p>The leading AI-powered aerial breakfast kitchen grid. Crispiness delivered from the clouds directly to your window plates.</p>
            </div>
            <div class="footer-links" id="footer-links-quick">
              <h5>Airspace Grid</h5>
              <ul>
                <li><a href="#features">Baking Tech</a></li>
                <li><a href="#builder">Dosa Configurator</a></li>
                <li><a href="#timeline">Flight Timelines</a></li>
                <li><a href="#pricing">Priority Subscriptions</a></li>
              </ul>
            </div>
            <div class="footer-links" id="footer-links-legal">
              <h5>Security & DGCA</h5>
              <ul>
                <li><a href="#">Flight Operations Rules</a></li>
                <li><a href="#">Lidar Compliance</a></li>
                <li><a href="#">Anti-Bird Safeguards</a></li>
                <li><a href="#">Space Traffic Controls</a></li>
              </ul>
            </div>
          </div>

          <div class="footer-disclaimer" id="footer-airspace-disclaimer" style={{ marginBottom: '30px' }}>
            <p><strong>Drone Airspace Operations Disclaimer:</strong> Air Dosa flights strictly comply with the Ministry of Civil Aviation drone guidelines (DGCA Rules 2026). Keep your balcony target clear of anti-aircraft setups, nets, or birds of prey. Heat and crispness levels are aerodynamic constraints maintained at terminal velocities. Deliveries subject to local wind shear.</p>
          </div>

          <div class="footer-bottom">
            <p id="footer-copyright">&copy; 2026 Air Dosa Technologies Private Limited. All airspace rights reserved.</p>
            <p id="footer-developer-signature" style={{ fontSize: '0.8rem', fontFamily: 'monospace', opacity: '0.5' }}>SYS_VER: 4.2.1-ONLINE</p>
          </div>
        </div>
      </footer>
    </>
  );
}

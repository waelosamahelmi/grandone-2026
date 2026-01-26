import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  Menu, X, ExternalLink, ArrowDown, Zap, Database, Globe,
  Award, Building2, Users, Layers, ArrowRight, Cpu, Monitor,
  Smartphone, Bus, AlertTriangle, Clock, RefreshCw, Palette,
  Lightbulb, Target, Cog, Shield, TrendingUp, Rocket, UserCheck, Wand2,
  Plus, Check, CheckCircle2, BarChart3, ArrowUp,
  Heart, Lock, Megaphone, Flag,
  LayoutDashboard,
  ChevronRight, Quote, Star, CircleDot, Home,
  HelpCircle, Boxes, Brain, Bot, Tag
} from 'lucide-react';

// ============================================
// TOOLTIP COMPONENT
// ============================================
const Tooltip = ({ children, content }: { children: React.ReactNode; content: string }) => {
  const [isVisible, setIsVisible] = useState(false);
  
  return (
    <div className="relative inline-block">
      <div
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        className="cursor-help"
      >
        {children}
      </div>
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg whitespace-nowrap shadow-xl"
          >
            {content}
            <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ============================================
// ANIMATED COUNTER
// ============================================
const AnimatedCounter = ({ end, suffix = '', prefix = '', duration = 2000 }: { end: number; suffix?: string; prefix?: string; duration?: number }) => {
  const [count, setCount] = useState(0);
  const [ref, inView] = useInView({ triggerOnce: true });
  
  useEffect(() => {
    if (inView) {
      let startTime: number;
      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / duration, 1);
        setCount(Math.floor(progress * end));
        if (progress < 1) requestAnimationFrame(animate);
      };
      requestAnimationFrame(animate);
    }
  }, [inView, end, duration]);

  return <span ref={ref}>{prefix}{count}{suffix}</span>;
};

// ============================================
// SECTION LABEL COMPONENT
// ============================================
const SectionLabel = ({ icon: Icon, label, color = 'purple' }: { icon: React.ElementType; label: string; color?: string }) => {
  const colors: Record<string, string> = {
    purple: 'bg-purple-100 border-purple-200 text-purple-700',
    red: 'bg-red-100 border-red-200 text-red-700',
    green: 'bg-green-100 border-green-200 text-green-700',
    blue: 'bg-blue-100 border-blue-200 text-blue-700',
    yellow: 'bg-yellow-100 border-yellow-200 text-yellow-700',
    orange: 'bg-orange-100 border-orange-200 text-orange-700',
  };
  
  return (
    <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border ${colors[color]} mb-6`}>
      <Icon className="w-4 h-4" />
      <span className="text-sm font-semibold uppercase tracking-wider">{label}</span>
    </div>
  );
};

// ============================================
// NAVIGATION COMPONENT
// ============================================
const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      const sections = ['overview', 'challenge', 'strategy', 'solution', 'execution', 'results'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Overview', href: '#overview' },
    { label: 'Challenge', href: '#challenge' },
    { label: 'Strategy', href: '#strategy' },
    { label: 'Solution', href: '#solution' },
    { label: 'Execution', href: '#execution' },
    { label: 'Results', href: '#results' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100 py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a href="#" className="flex items-center gap-3">
          <img 
            src={isScrolled ? "https://norr3.fi/wp-content/uploads/2025/07/logo_valk-web.png" : "https://norr3.fi/wp-content/uploads/2023/06/logo_valk-web.png"}
            alt="NØRR3 Logo" 
            className="h-12 w-auto transition-all"
          />
        </a>

        <div className="hidden lg:flex items-center gap-0.5">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className={`px-3.5 py-2 text-sm font-medium rounded-lg transition-all ${
                activeSection === item.href.slice(1)
                  ? isScrolled ? 'bg-purple-50 text-purple-700' : 'bg-white/20 text-white'
                  : isScrolled ? 'text-gray-600 hover:text-purple-700 hover:bg-gray-50' : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
            >
              {item.label}
            </a>
          ))}
        </div>

        <a
          href="https://norr3demo.netlify.app/"
          target="_blank"
          rel="noopener noreferrer"
          className={`hidden lg:flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
            isScrolled ? 'bg-purple-600 hover:bg-purple-700 text-white' : 'bg-white text-gray-900 hover:bg-gray-100'
          }`}
        >
          Access Demo
          <ExternalLink size={14} />
        </a>

        <button
          className="lg:hidden p-2 text-gray-700"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white mt-4 mx-6 rounded-2xl shadow-lg overflow-hidden"
          >
            <div className="p-6 flex flex-col gap-2">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-gray-700 hover:text-purple-700 hover:bg-purple-50 transition-colors py-3 px-4 rounded-lg"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <a
                href="https://norr3demo.netlify.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-purple-700 text-white px-5 py-3 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 mt-4"
              >
                Access Demo
                <ExternalLink size={16} />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

// ============================================
// HERO SECTION - ENHANCED TWO COLUMN
// ============================================
const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const screenshotRef = useRef<HTMLDivElement>(null);
  
  // Track the screenshot element specifically - peaks when its center hits viewport center
  const { scrollYProgress } = useScroll({
    target: screenshotRef,
    offset: ["start end", "center center", "end start"]
  });
  
  // Dramatic scale: peaks when screenshot center is at viewport center
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.55, 1.25, 0.7]);
  // Y translation
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [40, 0, -60]);
  // Opacity stays strong
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.85, 1, 1, 0.75]);
  // Border radius shrinks at peak, then grows again
  const borderRadius = useTransform(scrollYProgress, [0, 0.5, 1], [24, 4, 18]);
  // Height expands to max when centered, then shrinks back
  const height = useTransform(scrollYProgress, [0, 0.5, 1], [240, 620, 340]);
  // Show/hide expanded content - sharp crossfade, no overlap
  const expandedOpacity = useTransform(scrollYProgress, [0.35, 0.45], [0, 1]);
  const simpleOpacity = useTransform(scrollYProgress, [0.3, 0.4], [1, 0]);

  return (
    <section ref={containerRef} className="relative min-h-[145vh]">
      {/* Dark Hero Background - Stops at 100vh with curved bottom */}
      <div className="absolute top-0 left-0 right-0 h-screen bg-gradient-to-b from-gray-900 via-purple-900 to-gray-900 overflow-hidden">
        {/* Grid pattern */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }}
        />
        {/* Gradient orbs */}
        <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-purple-600/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-blue-600/15 rounded-full blur-[100px]" />
        
        {/* Curved bottom divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto" preserveAspectRatio="none">
            <defs>
              <linearGradient id="glowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="transparent" />
                <stop offset="30%" stopColor="transparent" />
                <stop offset="40%" stopColor="rgba(168, 85, 247, 0.4)" />
                <stop offset="50%" stopColor="rgba(255, 255, 255, 1)" />
                <stop offset="60%" stopColor="rgba(168, 85, 247, 0.4)" />
                <stop offset="70%" stopColor="transparent" />
                <stop offset="100%" stopColor="transparent" />
                <animate attributeName="x1" from="-100%" to="100%" dur="1.5s" repeatCount="indefinite" />
                <animate attributeName="x2" from="0%" to="200%" dur="1.5s" repeatCount="indefinite" />
              </linearGradient>
              <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="6" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <path d="M0 120L0 60C240 20 480 0 720 0C960 0 1200 20 1440 60L1440 120L0 120Z" fill="white"/>
            <path d="M0 60C240 20 480 0 720 0C960 0 1200 20 1440 60" stroke="url(#glowGradient)" strokeWidth="4" fill="none" filter="url(#glow)" />
          </svg>
        </div>
      </div>
      
      {/* White background continues below */}
      <div className="absolute top-screen left-0 right-0 bottom-0 bg-white" style={{ top: '100vh' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32">
        {/* Top Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex justify-center mb-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur border border-white/20">
            <Award className="w-4 h-4 text-yellow-400" />
            <span className="text-sm font-medium text-white/90">Grand One 2026 Competition Entry</span>
          </div>
        </motion.div>

        {/* Main Content - Centered */}
        <div className="text-center max-w-4xl mx-auto mb-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mb-4"
          >
            <img 
              src="https://norr3.fi/wp-content/uploads/2023/06/logo_valk-web.png"
              alt="NØRR3 Logo" 
              className="h-14 md:h-16 mx-auto"
            />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-6xl lg:text-7xl font-black mb-6 tracking-tight text-white leading-[1.1]"
          >
            Marketing <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">Engine</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed max-w-2xl mx-auto"
          >
            Intelligent marketing automation that connects data, AI, and multi-channel 
            delivery into one unified platform.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <a
              href="https://norr3demo.netlify.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-white px-8 py-4 rounded-full text-lg font-bold text-gray-900 hover:bg-gray-100 transition-all flex items-center justify-center gap-3"
            >
              <span>Access Demo</span>
              <ExternalLink size={18} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#overview"
              className="px-8 py-4 rounded-full border border-white/30 text-white text-lg font-semibold hover:bg-white/10 transition-all flex items-center justify-center gap-2"
            >
              Explore Case Study
              <ArrowDown size={18} />
            </a>
          </motion.div>
        </div>

        {/* Scroll Indicator - BEFORE the screenshot */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="flex justify-center mt-8 mb-10"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="flex flex-col items-center gap-2"
          >
            <span className="text-xs uppercase tracking-wider text-gray-400">Scroll to explore</span>
            <ArrowDown size={16} className="text-gray-400" />
          </motion.div>
        </motion.div>

        {/* Platform Preview with Scroll Animation - Positioned to show half in hero */}
        <motion.div
          ref={screenshotRef}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="relative sticky top-16"
        >
          <motion.div 
            style={{ scale, y, opacity }}
            className="relative mx-auto max-w-5xl"
          >
            <motion.div 
              style={{ borderRadius, height }}
              className="bg-gray-900 backdrop-blur-xl border border-white/20 overflow-hidden shadow-2xl shadow-purple-500/30">
              
              {/* Browser Chrome */}
              <div className="bg-gray-800 px-4 py-3 flex items-center gap-3 border-b border-white/10">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <div className="flex-1 bg-gray-700/80 rounded-lg px-4 py-1.5 text-sm text-gray-300 flex items-center gap-2">
                  <Lock size={12} className="text-green-400" />
                  <span>norr3.fi/marketing-engine/dashboard</span>
                </div>
              </div>
              
              {/* App Interface Container */}
              <div className="flex bg-gray-950 h-full overflow-hidden">
                {/* Sidebar - Compact initially */}
                <div className="w-16 bg-gray-900 flex flex-col items-center py-4 gap-3 border-r border-white/10">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: '#03624E' }}>
                    <span className="text-white font-bold text-sm">KM</span>
                  </div>
                  {[LayoutDashboard, Megaphone, Home, Monitor, BarChart3].map((Icon, i) => (
                    <div key={i} className={`w-10 h-10 rounded-xl flex items-center justify-center transition ${i === 0 ? 'bg-purple-600' : 'hover:bg-white/10'}`}>
                      <Icon size={18} className={i === 0 ? 'text-white' : 'text-gray-500'} />
                    </div>
                  ))}
                </div>
                
                {/* Main Content */}
                <div className="flex-1 flex flex-col relative overflow-hidden">
                  {/* SIMPLE VIEW - Shows when not scrolled */}
                  <motion.div 
                    style={{ opacity: simpleOpacity }}
                    className="absolute inset-0 p-6"
                  >
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h3 className="text-white font-bold text-lg">Campaign Dashboard</h3>
                        <p className="text-gray-500 text-sm">Kiinteistömaailma Helsinki</p>
                      </div>
                      <button className="px-4 py-2 bg-purple-600 text-white text-sm font-medium rounded-lg flex items-center gap-2">
                        <Plus size={16} />
                        New Campaign
                      </button>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 mb-6">
                      {[
                        { label: 'Active Campaigns', value: '24', color: 'text-green-400' },
                        { label: 'Total Impressions', value: '2.4M', color: 'text-blue-400' },
                        { label: 'Avg. CTR', value: '14.2%', color: 'text-purple-400' },
                      ].map((stat, i) => (
                        <div key={i} className="bg-white/5 rounded-xl p-4 border border-white/10">
                          <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
                          <div className="text-gray-500 text-sm">{stat.label}</div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="space-y-2">
                      {[
                        { name: 'Helsinki Keskusta', status: 'active', channels: ['Meta', 'Display'] },
                        { name: 'Espoo Tapiola', status: 'active', channels: ['Meta', 'DOOH'] },
                        { name: 'Vantaa Tikkurila', status: 'paused', channels: ['Display'] },
                      ].map((campaign, i) => (
                        <div key={i} className="bg-white/5 rounded-lg p-3 border border-white/10 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className={`w-2 h-2 rounded-full ${campaign.status === 'active' ? 'bg-green-400' : 'bg-yellow-400'}`} />
                            <span className="text-white text-sm font-medium">{campaign.name}</span>
                          </div>
                          <div className="flex gap-1.5">
                            {campaign.channels.map((ch, j) => (
                              <span key={j} className="px-2 py-0.5 bg-purple-500/20 text-purple-300 text-xs rounded">{ch}</span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>

                  {/* EXPANDED VIEW - Shows when scrolled */}
                  <motion.div 
                    style={{ opacity: expandedOpacity }}
                    className="absolute inset-0 flex flex-col"
                  >
                    {/* Top Header */}
                    <div className="bg-gray-900/50 px-6 py-3 border-b border-white/10 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div>
                          <h3 className="text-white font-bold text-lg">Campaign Dashboard</h3>
                          <p className="text-gray-500 text-xs">Real-time performance • Last updated 2 min ago</p>
                        </div>
                        <div className="flex items-center gap-2 ml-4">
                          <span className="text-xs text-gray-500">Client:</span>
                          <div className="flex items-center gap-2 px-2 py-1 bg-gray-800 rounded-lg">
                            <div className="w-5 h-5 rounded bg-orange-500/20 flex items-center justify-center">
                              <Home size={10} className="text-orange-400" />
                            </div>
                            <span className="text-white text-xs font-medium">Kiinteistömaailma</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button className="px-3 py-1.5 bg-gray-800 text-white text-xs font-medium rounded-lg flex items-center gap-2 border border-white/10">
                          <RefreshCw size={12} />
                          Sync
                        </button>
                        <button className="px-3 py-1.5 bg-purple-600 text-white text-xs font-medium rounded-lg flex items-center gap-2">
                          <Plus size={12} />
                          New Campaign
                        </button>
                      </div>
                    </div>
                    
                    {/* Dashboard Content */}
                    <div className="flex-1 p-4 overflow-auto">
                      {/* Stats Grid */}
                      <div className="grid grid-cols-5 gap-3 mb-4">
                        {[
                          { label: 'Active Campaigns', value: '24', change: '+3', color: 'text-green-400', icon: Megaphone },
                          { label: 'Total Impressions', value: '2.4M', change: '+18%', color: 'text-blue-400', icon: Globe },
                          { label: 'Avg. CTR', value: '14.2%', change: '+5.2x', color: 'text-purple-400', icon: TrendingUp },
                          { label: 'Conversions', value: '847', change: '+24%', color: 'text-amber-400', icon: Target },
                          { label: 'Media Spend', value: '€12.4K', change: '68%', color: 'text-pink-400', icon: Layers },
                        ].map((stat, i) => (
                          <div key={i} className="bg-white/5 rounded-xl p-3 border border-white/10">
                            <div className="flex items-start justify-between">
                              <div>
                                <div className={`text-xl font-bold ${stat.color}`}>{stat.value}</div>
                                <div className="text-gray-500 text-xs">{stat.label}</div>
                              </div>
                              <stat.icon size={16} className={stat.color} />
                            </div>
                            <div className="flex items-center gap-1 mt-2">
                              <ArrowUp size={10} className="text-green-400" />
                              <span className="text-green-400 text-xs">{stat.change}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      {/* Three Column Layout */}
                      <div className="grid grid-cols-12 gap-4">
                        {/* Campaign List - Takes 5 columns */}
                        <div className="col-span-5 bg-gray-900/50 rounded-xl border border-white/10">
                          <div className="px-3 py-2 border-b border-white/10 flex items-center justify-between">
                            <h4 className="text-white font-semibold text-sm">Active Campaigns</h4>
                            <div className="flex gap-1">
                              <button className="text-xs px-2 py-1 rounded bg-purple-600 text-white">All</button>
                              <button className="text-xs px-2 py-1 rounded bg-gray-800 text-gray-400">Meta</button>
                              <button className="text-xs px-2 py-1 rounded bg-gray-800 text-gray-400">Display</button>
                              <button className="text-xs px-2 py-1 rounded bg-gray-800 text-gray-400">DOOH</button>
                            </div>
                          </div>
                          <div className="divide-y divide-white/5 max-h-[280px] overflow-auto">
                            {[
                              { name: 'Helsinki Keskusta - Premium Listings', impressions: '456K', ctr: '18.2%', channels: ['Meta', 'Display', 'DOOH'], spent: 78, status: 'active' },
                              { name: 'Espoo Tapiola - New Apartments', impressions: '234K', ctr: '15.8%', channels: ['Meta', 'Display'], spent: 62, status: 'active' },
                              { name: 'Vantaa Tikkurila - Open Houses', impressions: '189K', ctr: '12.4%', channels: ['Meta'], spent: 45, status: 'active' },
                              { name: 'Kallio District - Urban Living', impressions: '167K', ctr: '14.1%', channels: ['Display', 'DOOH'], spent: 88, status: 'active' },
                              { name: 'Pasila Business District', impressions: '98K', ctr: '9.2%', channels: ['Meta'], spent: 100, status: 'paused' },
                              { name: 'Töölö Luxury Homes', impressions: '145K', ctr: '16.5%', channels: ['Meta', 'Display'], spent: 55, status: 'active' },
                            ].map((campaign, i) => (
                              <div key={i} className="px-3 py-2 hover:bg-white/5">
                                <div className="flex items-center justify-between mb-1">
                                  <div className="flex items-center gap-2">
                                    <div className={`w-1.5 h-1.5 rounded-full ${campaign.status === 'active' ? 'bg-green-400' : 'bg-yellow-400'}`} />
                                    <span className="text-white text-xs font-medium truncate max-w-[180px]">{campaign.name}</span>
                                  </div>
                                  <span className="text-purple-400 text-xs font-semibold">{campaign.ctr}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                  <div className="flex gap-1">
                                    {campaign.channels.map((ch, j) => (
                                      <span key={j} className="px-1.5 py-0.5 bg-gray-800 text-gray-400 text-[10px] rounded">{ch}</span>
                                    ))}
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <span className="text-gray-500 text-[10px]">{campaign.impressions}</span>
                                    <div className="w-12 h-1 bg-gray-800 rounded-full overflow-hidden">
                                      <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500" style={{ width: `${campaign.spent}%` }} />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        {/* Middle Column - Apartment Feed Preview */}
                        <div className="col-span-4 space-y-3">
                          <div className="bg-gray-900/50 rounded-xl border border-white/10 p-3">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="text-white font-semibold text-xs">Latest Apartment Listings</h4>
                              <span className="text-purple-400 text-[10px]">156 total</span>
                            </div>
                            <div className="space-y-2">
                              {[
                                { address: 'Bulevardi XX A X', area: 'Helsinki', price: '€XXX,000', size: '78m²', status: 'new' },
                                { address: 'Itämerenkatu X B XX', area: 'Ruoholahti', price: '€XXX,000', size: '52m²', status: 'active' },
                                { address: 'Mannerheimintie XX C X', area: 'Töölö', price: '€XXX,000', size: '112m²', status: 'new' },
                              ].map((apt, i) => (
                                <div key={i} className="flex items-center gap-2 p-2 bg-white/5 rounded-lg">
                                  <div className="w-10 h-10 rounded bg-gradient-to-br from-gray-700 to-gray-600 flex items-center justify-center">
                                    <Home size={14} className="text-gray-400" />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2">
                                      <span className="text-white text-xs font-medium truncate blur-[2px] hover:blur-none transition-all">{apt.address}</span>
                                      {apt.status === 'new' && <span className="px-1 py-0.5 bg-green-500/20 text-green-400 text-[8px] rounded">NEW</span>}
                                    </div>
                                    <div className="flex items-center gap-2 text-[10px] text-gray-500">
                                      <span>{apt.area}</span>
                                      <span>•</span>
                                      <span>{apt.size}</span>
                                      <span className="text-purple-400 font-medium blur-[2px]">{apt.price}</span>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                          
                          {/* Channel Performance */}
                          <div className="bg-gray-900/50 rounded-xl border border-white/10 p-3">
                            <h4 className="text-white font-semibold text-xs mb-2">Channel Performance</h4>
                            <div className="space-y-2">
                              {[
                                { name: 'Meta Ads', ctr: '16.4%', impressions: '1.2M', color: 'from-blue-500 to-blue-400' },
                                { name: 'Display Network', ctr: '12.8%', impressions: '680K', color: 'from-purple-500 to-purple-400' },
                                { name: 'DOOH Screens', ctr: '8.2%', impressions: '520K', color: 'from-pink-500 to-pink-400' },
                              ].map((ch, i) => (
                                <div key={i} className="flex items-center gap-3">
                                  <div className="w-20 text-[10px] text-gray-400">{ch.name}</div>
                                  <div className="flex-1 h-2 bg-gray-800 rounded-full overflow-hidden">
                                    <div className={`h-full bg-gradient-to-r ${ch.color} rounded-full`} style={{ width: ch.ctr }} />
                                  </div>
                                  <div className="text-[10px] text-white font-medium w-10">{ch.ctr}</div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                        
                        {/* Right Column */}
                        <div className="col-span-3 space-y-3">
                          {/* Chart */}
                          <div className="bg-gray-900/50 rounded-xl border border-white/10 p-3">
                            <h4 className="text-white font-semibold text-xs mb-2">CTR Trend (7d)</h4>
                            <div className="h-20 flex items-end gap-1">
                              {[45, 52, 48, 61, 58, 72, 68].map((h, i) => (
                                <div key={i} className="flex-1 bg-gradient-to-t from-purple-600 to-purple-400 rounded-t transition-all hover:from-purple-500 hover:to-purple-300" style={{ height: `${h}%` }} />
                              ))}
                            </div>
                            <div className="flex justify-between mt-1 text-[9px] text-gray-500">
                              <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
                            </div>
                          </div>
                          
                          {/* AI Insights */}
                          <div className="bg-gradient-to-br from-purple-900/50 to-pink-900/30 rounded-xl border border-purple-500/30 p-3">
                            <div className="flex items-center gap-2 mb-2">
                              <Brain size={12} className="text-purple-400" />
                              <h4 className="text-white font-semibold text-xs">AI Insights</h4>
                              <span className="ml-auto px-1.5 py-0.5 bg-purple-500/30 text-purple-300 text-[8px] rounded-full">LIVE</span>
                            </div>
                            <div className="space-y-1.5">
                              <div className="flex items-start gap-1.5">
                                <CheckCircle2 size={10} className="text-green-400 mt-0.5 flex-shrink-0" />
                                <span className="text-gray-300 text-[10px]">Espoo campaigns +23% above avg</span>
                              </div>
                              <div className="flex items-start gap-1.5">
                                <AlertTriangle size={10} className="text-yellow-400 mt-0.5 flex-shrink-0" />
                                <span className="text-gray-300 text-[10px]">Consider increasing Vantaa budget</span>
                              </div>
                              <div className="flex items-start gap-1.5">
                                <TrendingUp size={10} className="text-blue-400 mt-0.5 flex-shrink-0" />
                                <span className="text-gray-300 text-[10px]">DOOH screens peak at 18:00</span>
                              </div>
                            </div>
                          </div>
                          
                          {/* Quick Actions */}
                          <div className="bg-gray-900/50 rounded-xl border border-white/10 p-3">
                            <h4 className="text-white font-semibold text-xs mb-2">Quick Actions</h4>
                            <div className="grid grid-cols-2 gap-1.5">
                              {[
                                { icon: Plus, label: 'Campaign' },
                                { icon: Wand2, label: 'AI Generate' },
                                { icon: RefreshCw, label: 'Sync' },
                                { icon: BarChart3, label: 'Report' },
                              ].map((action, i) => (
                                <button key={i} className="flex items-center gap-1.5 px-2 py-1.5 bg-gray-800 hover:bg-gray-700 rounded-lg text-gray-300 text-[10px] transition">
                                  <action.icon size={10} />
                                  {action.label}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

// ============================================
// COMPETITION INFO BANNER
// ============================================
const CompetitionBanner = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const bannerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: bannerRef,
    offset: ["start end", "end end"]
  });
  
  // Move up faster as user scrolls (parallax effect) - starts very low, catches up fast
  const y = useTransform(scrollYProgress, [0, 0.3], [1000, 0]);

  return (
    <motion.section 
      ref={bannerRef}
      style={{ y }}
      className="pt-4 pb-8 bg-white border-y border-gray-100"
    >
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="flex flex-wrap items-center justify-center gap-x-12 gap-y-4"
        >
          {[
            { label: 'Work', value: 'NØRR3 Marketing Engine' },
            { label: 'Company', value: 'NØRR3' },
            { label: 'Client', value: 'Kiinteistömaailma' },
            { label: 'Launch', value: 'March 2025' },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="text-gray-400 text-sm">{item.label}:</span>
              <span className="font-bold text-gray-900">{item.value}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

// ============================================
// PLATFORM OVERVIEW / ARCHITECTURE
// ============================================
const PlatformOverview = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  const dataSources = [
    { 
      id: 'property', 
      icon: Home, 
      label: 'Property Feeds', 
      desc: 'Real-time listing data',
      explainer: {
        title: 'Automated Property Data',
        details: 'Direct API integration with real estate platforms. New listings appear in campaigns within minutes, sold properties are automatically removed.',
        stats: ['500+ properties synced', 'Updates every 5 min', '99.9% accuracy']
      }
    },
    { 
      id: 'product', 
      icon: Boxes, 
      label: 'Product Data', 
      desc: 'Inventory & pricing',
      explainer: {
        title: 'Dynamic Product Feeds',
        details: 'Connect any product catalog via API or CSV. Prices, availability, and descriptions sync automatically to all ad creatives.',
        stats: ['1000s of products', 'Real-time pricing', 'Multi-language']
      }
    },
    { 
      id: 'crm', 
      icon: Users, 
      label: 'CRM Data', 
      desc: 'Customer insights',
      explainer: {
        title: 'Customer Intelligence',
        details: 'Integrate CRM data for personalized targeting. Build audiences based on behavior, preferences, and lifecycle stage.',
        stats: ['50k+ profiles', 'Custom segments', 'Privacy compliant']
      }
    },
  ];

  const outputs = [
    { 
      id: 'display', 
      icon: Monitor, 
      label: 'Display Ads', 
      desc: 'Programmatic',
      creative: {
        type: 'display',
        preview: 'https://via.placeholder.com/300x250/1a1a2e/ffffff?text=Display+Ad',
        sizes: ['300×250', '728×90', '160×600'],
        platforms: ['Google DV360', 'BidTheatre', 'Adform']
      }
    },
    { 
      id: 'meta', 
      icon: Smartphone, 
      label: 'Meta Platforms', 
      desc: 'FB & Instagram',
      creative: {
        type: 'social',
        preview: 'https://via.placeholder.com/400x400/4267B2/ffffff?text=Meta+Ad',
        sizes: ['1080×1080', '1080×1920', '1200×628'],
        platforms: ['Facebook Feed', 'Instagram Stories', 'Reels']
      }
    },
    { 
      id: 'outdoor', 
      icon: Bus, 
      label: 'Outdoor/DOOH', 
      desc: 'Trams & Billboards',
      creative: {
        type: 'dooh',
        preview: 'https://via.placeholder.com/400x300/2d3436/ffffff?text=DOOH+Screen',
        sizes: ['1920×1080', '1080×1920', 'Custom'],
        platforms: ['Helsinki Trams', 'JCDecaux', 'Clear Channel']
      }
    },
  ];

  return (
    <section id="overview" className="py-24 bg-slate-50/70">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center max-w-4xl mx-auto mb-16"
        >
          <SectionLabel icon={Layers} label="Platform Overview" />
          
          <h2 className="text-4xl md:text-5xl font-black mb-6 text-gray-900">
            One Unified System for
            <br />
            <span className="gradient-text">Intelligent Marketing Automation</span>
          </h2>
          
          <p className="text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto">
            Marketing Engine connects multiple data feeds, DSP tools, Smartly, AI tools, 
            and automatic content modification tools—with <strong className="text-gray-900">automatic tagging</strong> for 
            seamless tracking and optimization.
          </p>
        </motion.div>

        {/* Architecture Diagram */}
        <div className="relative bg-white rounded-2xl p-6 md:p-10 shadow-lg border border-gray-200/60">
          <div className="grid lg:grid-cols-9 gap-4 items-center">
            {/* Data Sources */}
            <div className="lg:col-span-2 space-y-3">
              <div className="text-center lg:text-left mb-4">
                <span className="text-xs uppercase tracking-wider text-purple-600 font-bold bg-purple-50 px-3 py-1 rounded-full">
                  Data Sources
                </span>
              </div>
              {dataSources.map((source) => (
                <div key={source.id} className="relative group">
                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    whileHover={{ scale: 1.02 }}
                    onMouseEnter={() => setHoveredNode(source.id)}
                    onMouseLeave={() => setHoveredNode(null)}
                    className={`bg-white rounded-xl p-4 border transition-all cursor-pointer ${
                      hoveredNode === source.id ? 'border-purple-300 shadow-md' : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
                        hoveredNode === source.id ? 'bg-purple-600' : 'bg-purple-100'
                      }`}>
                        <source.icon className={`w-6 h-6 ${hoveredNode === source.id ? 'text-white' : 'text-purple-600'}`} />
                      </div>
                      <div>
                        <div className="font-bold text-gray-900">{source.label}</div>
                        <div className="text-xs text-gray-500">{source.desc}</div>
                      </div>
                    </div>
                  </motion.div>
                  
                  {/* Explainer Tooltip */}
                  <AnimatePresence>
                    {hoveredNode === source.id && (
                      <motion.div
                        initial={{ opacity: 0, x: -10, scale: 0.95 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: -10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute left-full top-0 ml-3 z-50 w-72 bg-gray-900 rounded-xl p-4 shadow-2xl pointer-events-none"
                      >
                        <div className="absolute left-0 top-4 -translate-x-full">
                          <div className="w-0 h-0 border-t-8 border-b-8 border-r-8 border-transparent border-r-gray-900" />
                        </div>
                        <div className="flex items-center gap-2 mb-2">
                          <source.icon className="w-5 h-5 text-purple-400" />
                          <h4 className="font-bold text-white">{source.explainer.title}</h4>
                        </div>
                        <p className="text-gray-300 text-sm mb-3">{source.explainer.details}</p>
                        <div className="flex flex-wrap gap-2">
                          {source.explainer.stats.map((stat, i) => (
                            <span key={i} className="text-xs bg-purple-500/20 text-purple-300 px-2 py-1 rounded-full">
                              {stat}
                            </span>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            {/* Arrow */}
            <div className="hidden lg:flex items-center justify-center">
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ArrowRight className="w-6 h-6 text-purple-300" />
              </motion.div>
            </div>

            {/* Central Hub - Screen Style */}
            <div className="lg:col-span-3">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                className="relative"
              >
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-purple-700 rounded-2xl blur-xl opacity-30" />
                
                {/* Screen Container */}
                <div className="relative bg-gray-900 rounded-2xl overflow-hidden border border-gray-700 shadow-2xl">
                  {/* Screen Header - like a monitor */}
                  <div className="bg-gray-800 px-4 py-2 flex items-center justify-between border-b border-gray-700">
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                        <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
                      </div>
                      <span className="text-gray-400 text-xs ml-2">marketing-engine</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <motion.div 
                        animate={{ opacity: [1, 0.3, 1] }}
                        transition={{ duration: 1, repeat: Infinity }}
                        className="w-2 h-2 rounded-full bg-green-500"
                      />
                      <span className="text-green-400 text-[10px]">LIVE</span>
                    </div>
                  </div>
                  
                  {/* Screen Content */}
                  <div className="p-5 bg-gradient-to-br from-gray-900 to-gray-950">
                    {/* Title */}
                    <div className="text-center mb-4">
                      <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-500/20 rounded-full mb-2">
                        <Zap size={14} className="text-purple-400" />
                        <span className="text-purple-300 text-xs font-medium">NØRR3</span>
                      </div>
                      <h3 className="text-xl font-black text-white">Marketing Engine</h3>
                    </div>
                    
                    {/* Processing Indicators */}
                    <div className="space-y-2.5">
                      {[
                        { label: 'AI Processing', status: 'Analyzing content...', icon: Brain, color: 'purple' },
                        { label: 'Auto-Tagging', status: 'Applying UTM tags...', icon: Tag, color: 'blue' },
                        { label: 'Creative Generation', status: 'Building assets...', icon: Wand2, color: 'pink' },
                        { label: 'Channel Distribution', status: 'Syncing platforms...', icon: Globe, color: 'green' },
                      ].map((item, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={inView ? { opacity: 1, x: 0 } : {}}
                          transition={{ delay: 0.5 + i * 0.15 }}
                          className="flex items-center gap-3 bg-gray-800/50 rounded-lg p-2.5 border border-gray-700/50"
                        >
                          <motion.div
                            animate={{ rotate: [0, 360] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: i * 0.3 }}
                            className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                              item.color === 'purple' ? 'bg-purple-500/20' :
                              item.color === 'blue' ? 'bg-blue-500/20' :
                              item.color === 'pink' ? 'bg-pink-500/20' :
                              'bg-green-500/20'
                            }`}
                          >
                            <item.icon size={16} className={
                              item.color === 'purple' ? 'text-purple-400' :
                              item.color === 'blue' ? 'text-blue-400' :
                              item.color === 'pink' ? 'text-pink-400' :
                              'text-green-400'
                            } />
                          </motion.div>
                          <div className="flex-1 min-w-0">
                            <div className="text-white text-xs font-semibold">{item.label}</div>
                            <div className="flex items-center gap-1.5">
                              <motion.span
                                animate={{ opacity: [0.5, 1, 0.5] }}
                                transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                                className="text-gray-400 text-[10px] truncate"
                              >
                                {item.status}
                              </motion.span>
                              <motion.div 
                                className="flex gap-0.5"
                                animate={{ opacity: [0.3, 1, 0.3] }}
                                transition={{ duration: 1, repeat: Infinity, delay: i * 0.25 }}
                              >
                                <span className="text-gray-500 text-[10px]">•</span>
                                <span className="text-gray-500 text-[10px]">•</span>
                                <span className="text-gray-500 text-[10px]">•</span>
                              </motion.div>
                            </div>
                          </div>
                          <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15 }}
                          >
                            <Check size={14} className="text-green-500" />
                          </motion.div>
                        </motion.div>
                      ))}
                    </div>
                    
                    {/* Bottom Stats */}
                    <div className="mt-4 pt-3 border-t border-gray-800 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="text-center">
                          <motion.div 
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="text-lg font-black text-white"
                          >
                            847
                          </motion.div>
                          <div className="text-[9px] text-gray-500">Campaigns</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-black text-green-400">99.8%</div>
                          <div className="text-[9px] text-gray-500">Uptime</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-[10px] text-gray-500">
                        <RefreshCw size={10} className="text-gray-500" />
                        <span>Synced 2s ago</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Arrow */}
            <div className="hidden lg:flex items-center justify-center">
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ArrowRight className="w-6 h-6 text-purple-300" />
              </motion.div>
            </div>

            {/* Output Channels */}
            <div className="lg:col-span-2 space-y-3">
              <div className="text-center lg:text-right mb-4">
                <span className="text-xs uppercase tracking-wider text-green-600 font-bold bg-green-50 px-3 py-1 rounded-full">
                  Output Channels
                </span>
              </div>
              {outputs.map((output, index) => (
                <div key={output.id} className="relative group">
                  <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02, x: -5 }}
                    onMouseEnter={() => setHoveredNode(output.id)}
                    onMouseLeave={() => setHoveredNode(null)}
                    className={`bg-gradient-to-l from-gray-50 to-white rounded-xl p-4 border-2 transition-all cursor-pointer ${
                      hoveredNode === output.id ? 'border-green-400 shadow-lg shadow-green-100' : 'border-gray-100'
                    }`}
                  >
                    <div className="flex items-center gap-3 lg:flex-row-reverse">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
                        hoveredNode === output.id ? 'bg-green-600' : 'bg-green-100'
                      }`}>
                        <output.icon className={`w-6 h-6 ${hoveredNode === output.id ? 'text-white' : 'text-green-600'}`} />
                      </div>
                      <div className="lg:text-right">
                        <div className="font-bold text-gray-900">{output.label}</div>
                        <div className="text-xs text-gray-500">{output.desc}</div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Creative Preview Tooltip */}
                  <AnimatePresence>
                    {hoveredNode === output.id && (
                      <motion.div
                        initial={{ opacity: 0, x: 10, scale: 0.95 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-full top-0 mr-3 z-50 w-80 bg-gray-900 rounded-xl overflow-hidden shadow-2xl pointer-events-none"
                      >
                        <div className="absolute right-0 top-4 translate-x-full">
                          <div className="w-0 h-0 border-t-8 border-b-8 border-l-8 border-transparent border-l-gray-900" />
                        </div>
                        
                        {/* Mock Creative Preview */}
                        <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 p-4">
                          <div className="aspect-[4/3] rounded-lg overflow-hidden flex items-center justify-center relative">
                            {output.id === 'display' && (
                              <div className="w-full h-full flex flex-col" style={{ backgroundColor: '#006450' }}>
                                {/* Header with KM logo shape */}
                                <div className="p-3 flex items-center">
                                  <svg className="h-6 w-auto" viewBox="0 0 820 570" fill="none">
                                    <polygon fill="#4bd072" points="366.47 418.05 153.97 177.33 39.26 304.2 39.26 418.05 153.97 289.43 265.21 418.05 366.47 418.05"/>
                                    <polygon fill="white" points="363.41 53.06 263.47 53.06 153.97 177.33 202.64 233.81 363.41 53.06"/>
                                    <polygon fill="white" points="112.26 222.52 39.26 304.2 39.26 53.06 112.26 53.06 112.26 222.52"/>
                                    <polygon fill="white" points="374.7 418.05 374.7 53.06 577.18 277.26 782.27 53.06 782.27 418.05 708.41 418.05 708.41 244.24 578.49 389.37 447.7 245.11 447.7 418.05 374.7 418.05"/>
                                  </svg>
                                </div>
                                {/* Content */}
                                <div className="flex-1 flex items-center justify-center px-4">
                                  <div className="text-center">
                                    <div className="text-white text-xl font-bold leading-tight">Kaunis koti</div>
                                    <div className="text-white text-xl font-bold leading-tight">Töölössä</div>
                                    <div className="text-white/80 text-xs mt-2">3h+k • 85 m² • 425 000 €</div>
                                  </div>
                                </div>
                                {/* CTA */}
                                <div className="p-3">
                                  <div className="text-center py-2 rounded font-bold text-sm" style={{ backgroundColor: '#4bd072', color: '#006450' }}>
                                    Katso lisää →
                                  </div>
                                </div>
                              </div>
                            )}
                            {output.id === 'meta' && (
                              <div className="w-full h-full bg-white p-2">
                                <div className="flex items-center gap-2 mb-2">
                                  <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ backgroundColor: '#006450' }}>
                                    <span className="text-white text-[6px] font-bold">KM</span>
                                  </div>
                                  <div className="text-[10px] font-bold text-gray-900">Kiinteistömaailma</div>
                                  <span className="text-[8px] text-gray-500">Sponsored</span>
                                </div>
                                <div className="aspect-square rounded flex items-center justify-center p-4" style={{ backgroundColor: '#006450' }}>
                                  <div className="text-center">
                                    <div className="text-white font-bold text-sm">Unelmiesi koti</div>
                                    <div className="text-white font-bold text-sm">odottaa!</div>
                                    <div className="mt-2 w-8 h-1 mx-auto" style={{ backgroundColor: '#4bd072' }} />
                                  </div>
                                </div>
                                <div className="mt-2 text-[10px] text-gray-900 font-medium">Löydä kotisi Helsingistä 🏠</div>
                              </div>
                            )}
                            {output.id === 'outdoor' && (
                              <div className="w-full h-full bg-black flex items-center justify-center relative">
                                <div className="absolute inset-2 rounded flex flex-col" style={{ backgroundColor: '#006450' }}>
                                  {/* Header */}
                                  <div className="p-2 flex items-center">
                                    <svg className="h-4 w-auto" viewBox="0 0 820 570" fill="none">
                                      <polygon fill="#4bd072" points="366.47 418.05 153.97 177.33 39.26 304.2 39.26 418.05 153.97 289.43 265.21 418.05 366.47 418.05"/>
                                      <polygon fill="white" points="363.41 53.06 263.47 53.06 153.97 177.33 202.64 233.81 363.41 53.06"/>
                                      <polygon fill="white" points="112.26 222.52 39.26 304.2 39.26 53.06 112.26 53.06 112.26 222.52"/>
                                      <polygon fill="white" points="374.7 418.05 374.7 53.06 577.18 277.26 782.27 53.06 782.27 418.05 708.41 418.05 708.41 244.24 578.49 389.37 447.7 245.11 447.7 418.05 374.7 418.05"/>
                                    </svg>
                                  </div>
                                  {/* Content */}
                                  <div className="flex-1 flex items-center justify-center">
                                    <div className="text-center text-white">
                                      <div className="text-xl font-bold">ASUNTOSI</div>
                                      <div className="text-xl font-bold">TÄÄLLÄ</div>
                                      <div className="w-12 h-1 mx-auto mt-2" style={{ backgroundColor: '#4bd072' }} />
                                    </div>
                                  </div>
                                  {/* Footer */}
                                  <div className="p-2 text-center">
                                    <span className="text-white/80 text-[8px]">kiinteistomaailma.fi</span>
                                  </div>
                                </div>
                                <div className="absolute bottom-1 left-1 right-1 h-4 bg-gray-800 rounded flex items-center justify-center">
                                  <div className="text-[6px] text-gray-400">Helsinki Tram Display</div>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                        
                        {/* Info */}
                        <div className="p-4 bg-gray-900">
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="font-bold text-white flex items-center gap-2">
                              <output.icon className="w-4 h-4 text-green-400" />
                              {output.label}
                            </h4>
                            <span className="text-[10px] text-green-400 bg-green-500/20 px-2 py-0.5 rounded-full">Auto-generated</span>
                          </div>
                          <div className="space-y-2">
                            <div>
                              <div className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">Sizes</div>
                              <div className="flex flex-wrap gap-1">
                                {output.creative.sizes.map((size, i) => (
                                  <span key={i} className="text-xs bg-gray-800 text-gray-300 px-2 py-0.5 rounded">
                                    {size}
                                  </span>
                                ))}
                              </div>
                            </div>
                            <div>
                              <div className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">Platforms</div>
                              <div className="flex flex-wrap gap-1">
                                {output.creative.platforms.map((platform, i) => (
                                  <span key={i} className="text-xs bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded">
                                    {platform}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>

          {/* Key Feature Callout */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.8 }}
            className="mt-10 pt-8 border-t border-gray-100"
          >
            <div className="flex flex-col md:flex-row items-center justify-center gap-6">
              <Tooltip content="Campaigns update instantly when property status changes">
                <div className="flex items-center gap-3 px-5 py-3 bg-yellow-50 rounded-xl border border-yellow-200">
                  <RefreshCw className="w-5 h-5 text-yellow-600" />
                  <span className="text-sm text-gray-700">
                    <strong>Smart Sync:</strong> Property sold? Automatically removed from all campaigns.
                  </span>
                  <HelpCircle className="w-4 h-4 text-yellow-500" />
                </div>
              </Tooltip>
              <Tooltip content="All content is automatically tagged for seamless analytics">
                <div className="flex items-center gap-3 px-5 py-3 bg-purple-50 rounded-xl border border-purple-200">
                  <Wand2 className="w-5 h-5 text-purple-600" />
                  <span className="text-sm text-gray-700">
                    <strong>Auto-Tagging:</strong> All content tagged for seamless tracking.
                  </span>
                  <HelpCircle className="w-4 h-4 text-purple-500" />
                </div>
              </Tooltip>
            </div>
          </motion.div>
        </div>

        {/* Multi-Client Success */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
          className="mt-16 text-center"
        >
          <p className="text-gray-600 mb-6">
            Successfully deployed for multiple major clients across different industries
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8">
            {/* Kiinteistömaailma - Featured */}
            <Tooltip content="Featured case in this entry">
              <div className="flex items-center gap-3 px-5 py-3 rounded-xl border bg-purple-50 border-purple-200">
                <svg fill="none" height="24" viewBox="0 0 233 28" xmlns="http://www.w3.org/2000/svg" className="h-6 w-auto">
                  <g fill="#006450">
                    <path d="m74.8725 15.8038 4.715 5.3263h3.0997l-6.2867-7.1162 6.112-6.85423h-2.8814l-6.7232 7.42173v-7.42173h-2.2702v13.97043h2.2702v-3.2743h.0436l1.8773-2.0956z"></path>
                    <path d="m85.5252 7.46533c-.8296 0-1.3973.56766-1.3973 1.3973 0 .82965.5677 1.39727 1.3973 1.39727.8297 0 1.3973-.56762 1.3973-1.39727 0-.82964-.6113-1.3973-1.3973-1.3973z"></path>
                    <path d="m86.5728 11.832h-2.1392v9.2991h2.1392z"></path>
                    <path d="m90.5457 7.46533c-.8296 0-1.3973.56766-1.3973 1.3973 0 .82965.5677 1.39727 1.3973 1.39727.8297 0 1.3973-.56762 1.3973-1.39727 0-.82964-.6113-1.3973-1.3973-1.3973z"></path>
                    <path d="m91.5933 11.832h-2.1392v9.2991h2.1392z"></path>
                    <path d="m99.6269 11.5693c-1.3971 0-2.4448.5239-3.0124 1.528v-1.3097h-2.1829v9.2991h2.1829v-5.0643c0-1.6153.7858-2.5758 2.2265-2.5758 1.528 0 2.052.8732 2.052 2.8377v4.846h2.183v-5.8501c-.044-2.4448-1.223-3.7109-3.4491-3.7109z"></path>
                    <path d="m108.533 17.463v-3.8419h2.139v-1.8336h-2.139v-2.79409h-2.183v2.79409h-1.572v1.8336h1.572v4.3221c0 3.1433 1.965 3.2743 3.012 3.2743.655 0 1.266-.0437 1.616-.131v-1.8772c-.219.0436-.742.0873-1.092.0873-.873 0-1.353-.2183-1.353-1.8336z"></path>
                    <path d="m114.426 15.5422c0-1.3098.917-2.2266 2.489-2.2266 1.484 0 2.314.7859 2.357 2.2266zm2.532-3.9729c-2.837 0-4.671 1.921-4.671 4.8897 0 3.0123 1.834 4.8896 4.759 4.8896 2.226 0 3.973-1.2224 4.278-2.9687h-2.183c-.349.6985-1.004 1.0478-2.095 1.0478-1.572 0-2.532-.7859-2.576-2.2702h6.898c.044-.5239.044-.8295.044-1.1788 0-2.6194-1.79-4.4094-4.454-4.4094z"></path>
                    <path d="m124.729 7.46533c-.829 0-1.397.56766-1.397 1.3973 0 .82965.568 1.39727 1.397 1.39727.83 0 1.398-.56762 1.398-1.39727 0-.82964-.568-1.3973-1.398-1.3973z"></path>
                    <path d="m125.821 11.832h-2.139v9.2991h2.139z"></path>
                    <path d="m133.417 15.8041-1.877-.5239c-.873-.2183-1.179-.5675-1.179-1.0914 0-.5676.568-.9605 1.354-.9605 1.004 0 1.615.4803 1.615 1.2224h2.139c0-1.7899-1.397-2.8814-3.667-2.8814-2.096 0-3.58 1.1788-3.58 2.7505 0 1.3097.742 2.2701 2.052 2.6194l1.877.4802c1.004.262 1.222.5676 1.222 1.0915 0 .6548-.523 1.0914-1.353 1.0914-1.135 0-1.877-.5675-1.877-1.3534h-2.183c0 1.79 1.659 3.0997 3.973 3.0997 2.27 0 3.667-1.0914 3.667-2.8814 0-1.3097-.873-2.2702-2.183-2.6631z"></path>
                    <path d="m140.882 17.463v-3.8419h2.14v-1.8336h-2.14v-2.79409h-2.182v2.79409h-1.572v1.8336h1.572v4.3221c0 3.1433 1.964 3.2743 3.012 3.2743.655 0 1.266-.0437 1.615-.131v-1.8772c-.218.0436-.742.0873-1.091.0873-.873 0-1.354-.2183-1.354-1.8336z"></path>
                    <path d="m147.082 10.2599c.83 0 1.397-.56762 1.397-1.39727 0-.82964-.567-1.3973-1.397-1.3973s-1.397.56766-1.397 1.3973c0 .82965.611 1.39727 1.397 1.39727z"></path>
                    <path d="m151.928 10.2599c.829 0 1.397-.56762 1.397-1.39727 0-.82964-.568-1.3973-1.397-1.3973-.83 0-1.398.56766-1.398 1.3973 0 .82965.612 1.39727 1.398 1.39727z"></path>
                    <path d="m149.526 19.4284c-1.746 0-2.75-1.2661-2.75-2.9687s.96-2.9687 2.75-2.9687c1.747 0 2.751 1.2661 2.751 2.9687-.044 1.7026-1.004 2.9687-2.751 2.9687zm0-7.8583c-3.056 0-4.889 2.1392-4.889 4.8896s1.833 4.8896 4.889 4.8896 4.89-2.1392 4.89-4.8896c0-2.7068-1.834-4.8896-4.89-4.8896z"></path>
                    <path d="m167.208 11.5693c-1.31 0-2.401.6986-2.838 1.659-.393-.9168-1.222-1.659-2.925-1.659-1.222 0-2.183.6986-2.576 1.528v-1.3097h-2.182v9.2991h2.182v-4.8897c0-2.2265.917-2.7504 2.009-2.7504 1.135 0 1.702.6549 1.702 2.1829v5.5008h2.183v-4.9333c0-2.2265.873-2.7504 1.965-2.7504 1.135 0 1.746.6985 1.746 2.2265v5.4572h2.183v-5.8937c-.131-1.7463-.655-3.6673-3.449-3.6673z"></path>
                    <path d="m177.599 19.4275c-1.703 0-2.707-1.2661-2.707-2.9687 0-1.7027 1.004-2.9687 2.707-2.9687 1.877 0 2.75 1.3533 2.75 2.9687 0 1.6153-.873 2.9687-2.75 2.9687zm2.707-6.3304c-.568-.9168-1.703-1.4843-2.925-1.4843-2.882 0-4.628 2.1392-4.628 4.8896 0 2.7505 1.572 4.8897 4.584 4.8897 1.135 0 2.401-.5676 3.012-1.4844v1.2661h2.14v-9.3427h-2.183z"></path>
                    <path d="m189.604 19.4275c-1.702 0-2.706-1.2661-2.706-2.9687 0-1.7027 1.004-2.9687 2.706-2.9687 1.878 0 2.751 1.3533 2.751 2.9687 0 1.6153-.917 2.9687-2.751 2.9687zm2.664-6.3304c-.568-.9168-1.703-1.4843-2.925-1.4843-2.882 0-4.628 2.1392-4.628 4.8896 0 2.7505 1.572 4.8897 4.584 4.8897 1.135 0 2.401-.5676 3.012-1.4844v1.2661h2.139v-9.3427h-2.139v1.266z"></path>
                    <path d="m198.337 7.46533c-.83 0-1.398.56766-1.398 1.3973 0 .82965.568 1.39727 1.398 1.39727.829 0 1.397-.56762 1.397-1.39727 0-.82964-.611-1.3973-1.397-1.3973z"></path>
                    <path d="m199.384 11.832h-2.139v9.2991h2.139z"></path>
                    <path d="m204.361 7.15967h-2.183v13.97043h2.183z"></path>
                    <path d="m217.72 11.5693c-1.31 0-2.401.6986-2.838 1.659-.393-.9168-1.222-1.659-2.925-1.659-1.223 0-2.183.6986-2.576 1.528v-1.3097h-2.183v9.2991h2.183v-4.8897c0-2.2265.917-2.7504 2.008-2.7504 1.135 0 1.703.6549 1.703 2.1829v5.5008h2.183v-4.9333c0-2.2265.873-2.7504 1.964-2.7504 1.136 0 1.747.6985 1.747 2.2265v5.4572h2.183v-5.8937c-.088-1.7463-.655-3.6673-3.449-3.6673z"></path>
                    <path d="m228.154 19.4275c-1.702 0-2.706-1.2661-2.706-2.9687 0-1.7027 1.004-2.9687 2.706-2.9687 1.878 0 2.751 1.3533 2.751 2.9687 0 1.6153-.917 2.9687-2.751 2.9687zm2.663-7.5964v1.266c-.567-.9604-1.702-1.4843-2.925-1.4843-2.881 0-4.627 2.1392-4.627 4.8896 0 2.7505 1.571 4.8897 4.584 4.8897 1.135 0 2.401-.5676 3.012-1.4844v1.2661h2.139v-9.3427z"></path>
                    <path d="m0 0v18.8164l5.50084-6.1121v-12.7043z"></path>
                    <path d="m8.46973 9.38636 3.71087 4.14744 12.1805-13.5338h-7.4218z"></path>
                    <path d="m40.1652 16.8954-15.2365-16.8954v27.024h5.5445v-12.6607l9.692 10.7834 9.7356-10.7834v12.6607h5.5008v-27.024z"></path>
                  </g>
                  <path d="m8.46955 9.38647-8.46955 9.43003v8.2076l8.46955-9.3864 8.46955 9.3864h7.4218z" fill="#23d278"></path>
                </svg>
                <Star size={14} className="text-yellow-500 fill-yellow-500" />
              </div>
            </Tooltip>

            {/* Terveystalo */}
            <Tooltip content="Marketing Engine client">
              <div className="flex items-center gap-2 px-5 py-3 rounded-xl border bg-white border-gray-200">
                <img 
                  src="https://www.terveystalo.com/Static/assets/Terveystalo_RGB_2021.svg" 
                  alt="Terveystalo" 
                  className="h-5 w-auto"
                />
              </div>
            </Tooltip>

            {/* ILOQ */}
            <Tooltip content="Marketing Engine client">
              <div className="flex items-center gap-2 px-5 py-3 rounded-xl border bg-white border-gray-200">
                <img 
                  src="https://communicationpromediahub.blob.core.windows.net/org9/35fa68e4-1e1d-42e3-b61f-38330e5ebe75/original" 
                  alt="ILOQ" 
                  className="h-8 w-auto"
                />
              </div>
            </Tooltip>

            {/* NØRR3 */}
            <Tooltip content="Marketing Engine client">
              <div className="flex items-center gap-2 px-5 py-3 rounded-xl border bg-white border-gray-200">
                <img 
                  src="https://norr3.fi/wp-content/uploads/2025/07/logo_valk-web.png" 
                  alt="NØRR3" 
                  className="h-8 w-auto"
                />
              </div>
            </Tooltip>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// ============================================
// CHALLENGE SECTION - TWO COLUMNS
// ============================================
const Challenge = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const titleRef = useRef<HTMLHeadingElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: titleRef,
    offset: ["start 0.9", "start 0.3"]
  });
  
  // Create transforms for each line of text
  const line1Progress = useTransform(scrollYProgress, [0, 0.33], [0, 100]);
  const line2Progress = useTransform(scrollYProgress, [0.2, 0.55], [0, 100]);
  const line3Progress = useTransform(scrollYProgress, [0.4, 0.8], [0, 100]);

  const challenges = [
    { icon: Building2, title: 'Franchise Autonomy', desc: '~50 independent businesses needed to run their own local marketing campaigns while maintaining brand consistency' },
    { icon: Clock, title: 'Manual Inefficiency', desc: 'Campaign creation across multiple channels was extremely time-consuming and prone to inconsistency' },
    { icon: RefreshCw, title: 'Real-Time Sync', desc: 'Property data needed instant sync—when listings sold, ads had to update immediately across all channels' },
    { icon: Palette, title: 'Multi-Channel Assets', desc: 'Creative assets needed for display, Meta platforms, and outdoor advertising simultaneously' },
  ];

  return (
    <section id="challenge" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left Column */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            className="lg:sticky lg:top-32"
          >
            <SectionLabel icon={AlertTriangle} label="Lähtökohdat / Challenge" color="red" />

            <h2 ref={titleRef} className="text-4xl md:text-5xl font-black mb-6 leading-tight">
              <span className="block relative">
                <span className="text-gray-300">Finland's Largest</span>
                <motion.span 
                  className="absolute inset-0 text-gray-900 overflow-hidden"
                  style={{ clipPath: useTransform(line1Progress, (v) => `inset(0 ${100 - v}% 0 0)`) }}
                >
                  Finland's Largest
                </motion.span>
              </span>
              <span className="block relative">
                <span className="text-gray-300">Real Estate Franchise</span>
                <motion.span 
                  className="absolute inset-0 text-gray-900 overflow-hidden"
                  style={{ clipPath: useTransform(line2Progress, (v) => `inset(0 ${100 - v}% 0 0)`) }}
                >
                  Real Estate Franchise
                </motion.span>
              </span>
              <span className="block relative">
                <span className="text-gray-300">Faced a Complex Problem</span>
                <motion.span 
                  className="absolute inset-0 text-gray-900 overflow-hidden"
                  style={{ clipPath: useTransform(line3Progress, (v) => `inset(0 ${100 - v}% 0 0)`) }}
                >
                  Faced a Complex Problem
                </motion.span>
              </span>
            </h2>

            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              <strong className="text-gray-900">Kiinteistömaailma</strong>, Finland's leading real estate franchise,
              needed a revolutionary approach to marketing automation that would empower 
              their ~50 independent businesses.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              <Tooltip content="Independent franchise businesses">
                <div className="bg-red-50 rounded-xl p-4 text-center border border-red-100 cursor-help">
                  <div className="text-3xl font-black text-red-600">~50</div>
                  <div className="text-xs text-red-700 font-medium">Franchise Businesses</div>
                </div>
              </Tooltip>
              <Tooltip content="Display, Meta, and Outdoor advertising">
                <div className="bg-red-50 rounded-xl p-4 text-center border border-red-100 cursor-help">
                  <div className="text-3xl font-black text-red-600">3+</div>
                  <div className="text-xs text-red-700 font-medium">Channels to Manage</div>
                </div>
              </Tooltip>
              <Tooltip content="Active property listings">
                <div className="bg-red-50 rounded-xl p-4 text-center border border-red-100 cursor-help">
                  <div className="text-3xl font-black text-red-600">1000s</div>
                  <div className="text-xs text-red-700 font-medium">Property Listings</div>
                </div>
              </Tooltip>
            </div>

            {/* Quote */}
            <div className="mt-8 p-6 bg-gray-50 rounded-2xl border-l-4 border-purple-600">
              <Quote className="w-8 h-8 text-purple-300 mb-3" />
              <p className="text-gray-700 italic">
                "Each franchise needed autonomy to run their own local campaigns, but manual 
                management across multiple channels was unsustainable at scale."
              </p>
            </div>
          </motion.div>

          {/* Right Column - Challenge Cards */}
          <div className="space-y-6">
            {challenges.map((challenge, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.1 + index * 0.15 }}
                className="group bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-xl hover:border-red-200 transition-all duration-300"
              >
                <div className="flex gap-5">
                  <div className="w-14 h-14 rounded-2xl bg-red-100 group-hover:bg-red-600 flex items-center justify-center flex-shrink-0 transition-colors">
                    <challenge.icon className="w-7 h-7 text-red-600 group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl mb-2 text-gray-900">{challenge.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{challenge.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* No System Existed */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.8 }}
              className="bg-gradient-to-r from-red-600 to-orange-500 rounded-2xl p-6 text-white"
            >
              <div className="flex items-start gap-4">
                <AlertTriangle className="w-8 h-8 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-lg mb-2">The Core Problem</h3>
                  <p className="text-red-100">
                    No unified system existed to manage this distributed marketing operation efficiently. 
                    Each franchise was on their own.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ============================================
// STRATEGY SECTION
// ============================================
const Strategy = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const strategies = [
    { icon: UserCheck, title: 'Democratize Access', desc: 'Give all franchise businesses access to professional marketing tools' },
    { icon: Bot, title: 'Remove Complexity', desc: 'Leverage AI and automation to handle technical decisions' },
    { icon: Database, title: 'Connect Real-Time Data', desc: 'Link property data directly to advertising channels' },
    { icon: Shield, title: 'Maintain Consistency', desc: 'Enable local autonomy while ensuring brand standards' },
    { icon: Rocket, title: 'Scale Infinitely', desc: 'Build for growth across multiple channels and use cases' },
  ];

  return (
    <section id="strategy" className="py-24 bg-gradient-to-br from-purple-900 via-purple-800 to-purple-900 text-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Insight */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
          >
            <SectionLabel icon={Lightbulb} label="Strategia / Strategy" color="yellow" />

            <h2 className="text-4xl md:text-5xl font-black mb-8 leading-tight">
              The Key Insight
            </h2>

            <div className="bg-white/10 backdrop-blur rounded-2xl p-8 border border-white/20 mb-8">
              <Lightbulb className="w-12 h-12 text-yellow-400 mb-4" />
              <p className="text-2xl font-medium leading-relaxed text-purple-100">
                "Franchise businesses don't need more marketing specialists—they need 
                <strong className="text-white"> intelligent automation</strong> that makes 
                expert decisions for them."
              </p>
            </div>

            <p className="text-lg text-purple-200 leading-relaxed">
              By combining real-time property data, AI-powered creative generation, and 
              automated campaign management, we could empower local businesses to run 
              sophisticated multi-channel campaigns independently.
            </p>
          </motion.div>

          {/* Right - Strategy Points */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            className="space-y-4"
          >
            <h3 className="text-xl font-bold text-purple-200 mb-6">The Strategic Approach</h3>
            
            {strategies.map((strategy, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="flex items-start gap-4 bg-white/5 hover:bg-white/10 rounded-xl p-4 border border-white/10 transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center flex-shrink-0">
                  <strategy.icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold mb-1">{strategy.title}</h4>
                  <p className="text-sm text-purple-300">{strategy.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// ============================================
// SOLUTION / PLATFORM DEMO
// ============================================
const Solution = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [activeFeature, setActiveFeature] = useState(0);

  const features = [
    {
      title: 'Campaign Dashboard',
      icon: LayoutDashboard,
      points: [
        'Real-time overview of all active campaigns',
        'Performance metrics and analytics at a glance',
        'Each franchise has their own dashboard view',
        'Filter by status, region, or property type'
      ],
    },
    {
      title: 'One-Click Campaign Creation',
      icon: Plus,
      points: [
        'Select property directly from synchronized feed',
        'Choose advertising channels: Meta, Display, DOOH',
        'Set budget and targeting parameters',
        'Launch campaigns in under 60 seconds'
      ],
    },
    {
      title: 'AI-Powered Creative Generation',
      icon: Monitor,
      points: [
        'Automatically generates brand-compliant creatives',
        'Adapts content for each channel format',
        'AI-powered text and image optimization',
        'Automatic UTM tagging for tracking'
      ],
    },
    {
      title: 'Real-Time Data Sync',
      icon: RefreshCw,
      points: [
        'Property sold? Campaigns auto-paused instantly',
        'New listings trigger automatic campaign creation',
        'Price changes update all active creatives',
        'Zero manual intervention needed'
      ],
    },
  ];

  return (
    <section id="solution" className="py-24 bg-slate-50/70">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center max-w-4xl mx-auto mb-16"
        >
          <SectionLabel icon={Target} label="Luova Ratkaisu / Solution" color="green" />
          
          <h2 className="text-4xl md:text-5xl font-black mb-6 text-gray-900">
            NØRR3 Marketing Engine
            <br />
            <span className="gradient-text">for Kiinteistömaailma</span>
          </h2>
          
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            A comprehensive marketing automation platform that transforms how 
            real estate franchises execute their marketing
          </p>
        </motion.div>

        {/* Feature Showcase */}
        <div className="grid lg:grid-cols-2 gap-10 items-start">
          {/* Feature Selector */}
          <div className="space-y-3">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: index * 0.1 }}
                onClick={() => setActiveFeature(index)}
                className={`p-5 rounded-xl cursor-pointer transition-all ${
                  activeFeature === index
                    ? 'bg-white shadow-lg border border-purple-200'
                    : 'bg-white/60 border border-transparent hover:bg-white hover:shadow-sm'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    activeFeature === index ? 'bg-purple-600' : 'bg-purple-100'
                  }`}>
                    <feature.icon className={`w-5 h-5 ${
                      activeFeature === index ? 'text-white' : 'text-purple-600'
                    }`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg text-gray-900 mb-2">{feature.title}</h3>
                    <AnimatePresence mode="wait">
                      {activeFeature === index && (
                        <motion.ul
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="space-y-2"
                        >
                          {feature.points.map((point, i) => (
                            <li key={i} className="flex items-start gap-2 text-gray-600">
                              <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                              <span className="text-sm">{point}</span>
                            </li>
                          ))}
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </div>
                  <ChevronRight className={`w-5 h-5 transition-transform ${
                    activeFeature === index ? 'rotate-90 text-purple-600' : 'text-gray-400'
                  }`} />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Platform Demo Preview - Interactive */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            className="lg:sticky lg:top-32"
          >
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200">
              <div className="bg-gray-100 px-4 py-3 flex items-center gap-2 border-b border-gray-200">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                </div>
                <div className="flex-1 bg-white rounded px-3 py-1 text-xs text-gray-500 ml-2 flex items-center gap-2">
                  <Lock size={12} />
                  norr3.fi/marketing-engine
                </div>
              </div>

              <div className="flex h-[520px]">
                {/* Sidebar */}
                <div className="w-14 bg-gray-900 flex flex-col items-center py-4 gap-3">
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#03624E' }}>
                    <span className="text-white font-bold text-xs">KM</span>
                  </div>
                  {[
                    { icon: LayoutDashboard, active: activeFeature === 0 },
                    { icon: Plus, active: activeFeature === 1 },
                    { icon: Megaphone, active: false },
                    { icon: Monitor, active: activeFeature === 2 },
                    { icon: BarChart3, active: false },
                    { icon: Users, active: false },
                  ].map((item, i) => (
                    <div key={i} className={`w-9 h-9 rounded-lg flex items-center justify-center cursor-pointer transition-colors ${
                      item.active ? 'bg-purple-600' : 'hover:bg-gray-800'
                    }`}>
                      <item.icon size={16} className={item.active ? 'text-white' : 'text-gray-500'} />
                    </div>
                  ))}
                </div>

                {/* Main Content - Changes based on activeFeature */}
                <div className="flex-1 bg-gray-50 overflow-hidden">
                  <AnimatePresence mode="wait">
                    {/* Dashboard View */}
                    {activeFeature === 0 && (
                      <motion.div
                        key="dashboard"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="p-4 h-full overflow-auto"
                      >
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <h1 className="text-base font-bold text-gray-900">Campaign Dashboard</h1>
                            <p className="text-xs text-gray-500">Helsinki Region • Last updated 2 min ago</p>
                          </div>
                          <button className="px-3 py-1.5 bg-purple-600 text-white text-xs rounded-lg flex items-center gap-1.5">
                            <Plus size={14} />
                            New Campaign
                          </button>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-4 gap-2 mb-4">
                          {[
                            { label: 'Active Campaigns', value: '24', change: '+3', color: 'green' },
                            { label: 'Total Impressions', value: '2.4M', change: '+12%', color: 'blue' },
                            { label: 'Properties Listed', value: '156', change: '-5', color: 'purple' },
                            { label: 'Monthly Budget', value: '€45K', change: '68%', color: 'orange' },
                          ].map((stat, i) => (
                            <motion.div 
                              key={i}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: i * 0.1 }}
                              className="bg-white rounded-lg p-3 border border-gray-100"
                            >
                              <div className="text-[10px] text-gray-500 mb-1">{stat.label}</div>
                              <div className="flex items-end justify-between">
                                <span className="text-lg font-bold text-gray-900">{stat.value}</span>
                                <span className={`text-[10px] font-medium ${
                                  stat.color === 'green' ? 'text-green-600' :
                                  stat.color === 'blue' ? 'text-blue-600' :
                                  stat.color === 'purple' ? 'text-purple-600' :
                                  'text-orange-600'
                                }`}>{stat.change}</span>
                              </div>
                            </motion.div>
                          ))}
                        </div>

                        {/* Tabs */}
                        <div className="flex gap-1 mb-3 bg-gray-100 p-1 rounded-lg w-fit">
                          {['All Campaigns', 'Active', 'Paused', 'Completed'].map((tab, i) => (
                            <button key={i} className={`px-3 py-1 text-xs rounded-md transition-colors ${
                              i === 0 ? 'bg-white text-gray-900 font-medium shadow-sm' : 'text-gray-500 hover:text-gray-700'
                            }`}>
                              {tab}
                            </button>
                          ))}
                        </div>

                        {/* Campaign List */}
                        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                          <div className="px-3 py-2 border-b border-gray-100 text-[10px] font-semibold text-gray-500 flex bg-gray-50">
                            <span className="flex-1">CAMPAIGN / PROPERTY</span>
                            <span className="w-20 text-center">CHANNELS</span>
                            <span className="w-16 text-center">CLICKS</span>
                            <span className="w-16 text-center">STATUS</span>
                          </div>
                          {[
                            { name: 'Töölö Premium', address: 'Runeberginkatu XX', channels: ['Meta', 'Display', 'DOOH'], clicks: '2,340', status: 'active', img: '🏠' },
                            { name: 'Kamppi Studio', address: 'Fredrikinkatu XX', channels: ['Meta', 'Display'], clicks: '1,892', status: 'active', img: '🏢' },
                            { name: 'Kallio Family Home', address: 'Hämeentie XX', channels: ['Meta'], clicks: '956', status: 'active', img: '🏡' },
                            { name: 'Punavuori Loft', address: 'Pursimiehenkatu XX', channels: ['Display'], clicks: '—', status: 'pending', img: '🏬' },
                          ].map((campaign, i) => (
                            <motion.div 
                              key={i}
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: 0.3 + i * 0.1 }}
                              className="px-3 py-2.5 border-b border-gray-50 flex items-center hover:bg-purple-50/50 cursor-pointer transition-colors"
                            >
                              <div className="flex-1 flex items-center gap-2">
                                <span className="text-lg">{campaign.img}</span>
                                <div>
                                  <div className="font-medium text-xs text-gray-900">{campaign.name}</div>
                                  <div className="text-[10px] text-gray-500 blur-[1px]">{campaign.address}</div>
                                </div>
                              </div>
                              <div className="w-20 flex justify-center gap-0.5 flex-wrap">
                                {campaign.channels.map((ch, j) => (
                                  <span key={j} className={`px-1 py-0.5 text-[8px] rounded ${
                                    ch === 'Meta' ? 'bg-blue-100 text-blue-600' :
                                    ch === 'Display' ? 'bg-purple-100 text-purple-600' :
                                    'bg-green-100 text-green-600'
                                  }`}>{ch}</span>
                                ))}
                              </div>
                              <div className="w-16 text-center text-xs font-medium text-gray-700">{campaign.clicks}</div>
                              <div className="w-16 text-center">
                                <span className={`px-1.5 py-0.5 rounded-full text-[9px] font-medium ${
                                  campaign.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                                }`}>
                                  {campaign.status}
                                </span>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    )}

                    {/* Campaign Creation View */}
                    {activeFeature === 1 && (
                      <motion.div
                        key="create"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="p-4 h-full overflow-auto"
                      >
                        <div className="mb-4">
                          <h1 className="text-base font-bold text-gray-900">Create New Campaign</h1>
                          <p className="text-xs text-gray-500">Set up automated advertising for a property</p>
                        </div>

                        {/* Steps indicator */}
                        <div className="flex items-center gap-2 mb-5">
                          {['Property', 'Channels', 'Budget', 'Review'].map((step, i) => (
                            <div key={i} className="flex items-center gap-2">
                              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${
                                i === 0 ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-500'
                              }`}>
                                {i + 1}
                              </div>
                              <span className={`text-xs ${i === 0 ? 'text-gray-900 font-medium' : 'text-gray-400'}`}>{step}</span>
                              {i < 3 && <div className="w-6 h-0.5 bg-gray-200" />}
                            </div>
                          ))}
                        </div>

                        {/* Property Selection */}
                        <div className="bg-white rounded-lg border border-gray-200 p-4 mb-4">
                          <label className="text-xs font-semibold text-gray-700 mb-2 block">Select Property from Feed</label>
                          <div className="relative mb-3">
                            <input 
                              type="text" 
                              placeholder="Search by address or property ID..." 
                              className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg bg-gray-50 focus:bg-white focus:border-purple-300 outline-none"
                            />
                          </div>
                          
                          {/* Property Cards */}
                          <div className="space-y-2">
                            {[
                              { name: 'Modern Apartment in Ullanlinna', address: 'Kapteeninkatu XX', price: '€485,000', rooms: '3h+k', sqm: '78m²', selected: true },
                              { name: 'Charming Studio in Kruununhaka', address: 'Meritullinkatu XX', price: '€245,000', rooms: '1h+kk', sqm: '32m²', selected: false },
                            ].map((prop, i) => (
                              <motion.div 
                                key={i}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 + i * 0.1 }}
                                className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${
                                  prop.selected ? 'border-purple-500 bg-purple-50' : 'border-gray-100 hover:border-gray-200'
                                }`}
                              >
                                <div className="flex items-start gap-3">
                                  <div className="w-16 h-12 rounded bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                                    <Home size={20} className="text-gray-400" />
                                  </div>
                                  <div className="flex-1">
                                    <div className="font-medium text-xs text-gray-900">{prop.name}</div>
                                    <div className="text-[10px] text-gray-500 blur-[1px]">{prop.address}</div>
                                    <div className="flex gap-2 mt-1">
                                      <span className="text-[10px] text-gray-600">{prop.rooms}</span>
                                      <span className="text-[10px] text-gray-400">•</span>
                                      <span className="text-[10px] text-gray-600">{prop.sqm}</span>
                                      <span className="text-[10px] text-gray-400">•</span>
                                      <span className="text-[10px] font-semibold text-green-600 blur-[1px]">{prop.price}</span>
                                    </div>
                                  </div>
                                  {prop.selected && (
                                    <CheckCircle2 size={18} className="text-purple-600" />
                                  )}
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        </div>

                        {/* Channel Selection Preview */}
                        <div className="bg-white rounded-lg border border-gray-200 p-4">
                          <label className="text-xs font-semibold text-gray-700 mb-3 block">Select Advertising Channels</label>
                          <div className="grid grid-cols-3 gap-2">
                            {[
                              { icon: Smartphone, label: 'Meta', desc: 'FB & IG', selected: true, color: 'blue' },
                              { icon: Monitor, label: 'Display', desc: 'Programmatic', selected: true, color: 'purple' },
                              { icon: Bus, label: 'DOOH', desc: 'Trams & Screens', selected: false, color: 'green' },
                            ].map((ch, i) => (
                              <motion.div 
                                key={i}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.4 + i * 0.1 }}
                                className={`p-3 rounded-lg border-2 cursor-pointer transition-all text-center ${
                                  ch.selected 
                                    ? ch.color === 'blue' ? 'border-blue-500 bg-blue-50' :
                                      ch.color === 'purple' ? 'border-purple-500 bg-purple-50' :
                                      'border-green-500 bg-green-50'
                                    : 'border-gray-100 hover:border-gray-200'
                                }`}
                              >
                                <ch.icon size={20} className={`mx-auto mb-1 ${
                                  ch.selected
                                    ? ch.color === 'blue' ? 'text-blue-600' :
                                      ch.color === 'purple' ? 'text-purple-600' :
                                      'text-green-600'
                                    : 'text-gray-400'
                                }`} />
                                <div className="text-xs font-medium text-gray-900">{ch.label}</div>
                                <div className="text-[9px] text-gray-500">{ch.desc}</div>
                              </motion.div>
                            ))}
                          </div>
                        </div>

                        <button className="w-full mt-4 py-2.5 bg-purple-600 text-white text-sm font-medium rounded-lg flex items-center justify-center gap-2 hover:bg-purple-700">
                          Continue to Budget
                          <ArrowRight size={16} />
                        </button>
                      </motion.div>
                    )}

                    {/* Creative Generation View */}
                    {activeFeature === 2 && (
                      <motion.div
                        key="creative"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="p-4 h-full overflow-auto"
                      >
                        <div className="mb-4">
                          <h1 className="text-base font-bold text-gray-900">Creative Generation</h1>
                          <p className="text-xs text-gray-500">AI-powered ad creatives for all channels</p>
                        </div>

                        {/* Property being processed */}
                        <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-3 mb-4 border border-purple-100">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-lg bg-white flex items-center justify-center">
                              <Home size={24} className="text-purple-600" />
                            </div>
                            <div className="flex-1">
                              <div className="font-medium text-sm text-gray-900">Töölö Premium Apartment</div>
                              <div className="text-xs text-gray-500">Generating creatives for 3 channels...</div>
                            </div>
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                            >
                              <RefreshCw size={18} className="text-purple-600" />
                            </motion.div>
                          </div>
                        </div>

                        {/* Generated Creatives */}
                        <div className="space-y-3">
                          {[
                            { channel: 'Meta Feed', size: '1080×1080', status: 'ready' },
                            { channel: 'Display Banner', size: '300×250', status: 'ready' },
                            { channel: 'DOOH Screen', size: '1920×1080', status: 'generating' },
                          ].map((creative, i) => (
                            <motion.div
                              key={i}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.2 + i * 0.15 }}
                              className="bg-white rounded-lg border border-gray-200 p-3"
                            >
                              <div className="flex items-start gap-3">
                                {/* Creative Preview */}
                                <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0" style={{ backgroundColor: '#006450' }}>
                                  <div className="w-full h-full flex flex-col p-2">
                                    <div className="text-[6px] text-white font-bold">KIINTEISTÖMAAILMA</div>
                                    <div className="flex-1 flex items-center justify-center">
                                      <div className="text-center">
                                        <div className="text-white text-[8px] font-bold">Kaunis koti</div>
                                        <div className="text-white/70 text-[6px]">3h+k • 78m²</div>
                                      </div>
                                    </div>
                                    <div className="text-[5px] text-center py-0.5 rounded" style={{ backgroundColor: '#4bd072', color: '#006450' }}>
                                      Katso →
                                    </div>
                                  </div>
                                </div>
                                
                                <div className="flex-1">
                                  <div className="flex items-center justify-between mb-1">
                                    <span className="font-medium text-xs text-gray-900">{creative.channel}</span>
                                    <span className={`px-1.5 py-0.5 rounded text-[9px] font-medium ${
                                      creative.status === 'ready' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                                    }`}>
                                      {creative.status === 'ready' ? '✓ Ready' : '⟳ Generating...'}
                                    </span>
                                  </div>
                                  <div className="text-[10px] text-gray-500 mb-2">Size: {creative.size}</div>
                                  
                                  {creative.status === 'ready' && (
                                    <div className="flex gap-1">
                                      <button className="px-2 py-1 bg-gray-100 text-gray-600 text-[9px] rounded hover:bg-gray-200">Preview</button>
                                      <button className="px-2 py-1 bg-purple-100 text-purple-600 text-[9px] rounded hover:bg-purple-200">Edit</button>
                                      <button className="px-2 py-1 bg-green-100 text-green-600 text-[9px] rounded hover:bg-green-200">Approve</button>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </div>

                        {/* Auto-tagging info */}
                        <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-100">
                          <div className="flex items-start gap-2">
                            <Tag size={14} className="text-blue-600 mt-0.5" />
                            <div>
                              <div className="text-xs font-medium text-blue-900">Auto-Tagging Enabled</div>
                              <div className="text-[10px] text-blue-700">UTM parameters automatically applied for tracking</div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* Real-Time Sync View */}
                    {activeFeature === 3 && (
                      <motion.div
                        key="sync"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="p-4 h-full overflow-auto"
                      >
                        <div className="mb-4">
                          <h1 className="text-base font-bold text-gray-900">Real-Time Data Sync</h1>
                          <p className="text-xs text-gray-500">Automatic property feed synchronization</p>
                        </div>

                        {/* Sync Status */}
                        <div className="bg-green-50 rounded-lg p-3 mb-4 border border-green-100">
                          <div className="flex items-center gap-2">
                            <motion.div
                              animate={{ scale: [1, 1.2, 1] }}
                              transition={{ duration: 1.5, repeat: Infinity }}
                              className="w-2 h-2 rounded-full bg-green-500"
                            />
                            <span className="text-xs font-medium text-green-800">All systems synced • Last update: 2 min ago</span>
                          </div>
                        </div>

                        {/* Recent Activity */}
                        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                          <div className="px-3 py-2 bg-gray-50 border-b border-gray-100">
                            <span className="text-xs font-semibold text-gray-700">Recent Sync Activity</span>
                          </div>
                          {[
                            { action: 'Property Sold', address: 'Mannerheimintie XX', result: 'Campaigns paused', time: '5 min ago', type: 'sold' },
                            { action: 'New Listing', address: 'Bulevardi XX', result: 'Campaign created', time: '12 min ago', type: 'new' },
                            { action: 'Price Updated', address: 'Aleksanterinkatu XX', result: 'Creatives refreshed', time: '28 min ago', type: 'update' },
                            { action: 'Property Sold', address: 'Eerikinkatu XX', result: 'Campaigns paused', time: '1 hour ago', type: 'sold' },
                          ].map((activity, i) => (
                            <motion.div
                              key={i}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.1 + i * 0.1 }}
                              className="px-3 py-2.5 border-b border-gray-50 flex items-center gap-3"
                            >
                              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                                activity.type === 'sold' ? 'bg-red-100' :
                                activity.type === 'new' ? 'bg-green-100' :
                                'bg-blue-100'
                              }`}>
                                {activity.type === 'sold' ? <AlertTriangle size={14} className="text-red-600" /> :
                                 activity.type === 'new' ? <Plus size={14} className="text-green-600" /> :
                                 <RefreshCw size={14} className="text-blue-600" />}
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center gap-2">
                                  <span className="text-xs font-medium text-gray-900">{activity.action}</span>
                                  <span className="text-[10px] text-gray-400">{activity.time}</span>
                                </div>
                                <div className="text-[10px] text-gray-500 blur-[1px]">{activity.address}</div>
                              </div>
                              <span className={`px-2 py-0.5 rounded text-[9px] font-medium ${
                                activity.type === 'sold' ? 'bg-red-50 text-red-600' :
                                activity.type === 'new' ? 'bg-green-50 text-green-600' :
                                'bg-blue-50 text-blue-600'
                              }`}>
                                {activity.result}
                              </span>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>

            <div className="mt-6 text-center">
              <a
                href="https://norr3demo.netlify.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 font-semibold"
              >
                Access the demo
                <ExternalLink size={16} />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// ============================================
// CAMPAIGN CREATION DEMO - INTERACTIVE WALKTHROUGH
// ============================================
const CampaignCreationDemo = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedProperties, setSelectedProperties] = useState<number[]>([]);
  const [selectedChannels, setSelectedChannels] = useState<string[]>([]);
  const [budget, setBudget] = useState(0);
  const [mapRadius, setMapRadius] = useState(0);
  const [visibleScreens, setVisibleScreens] = useState(0);
  const [creativesGenerated, setCreativesGenerated] = useState(false);
  const [campaignLaunched, setCampaignLaunched] = useState(false);

  const steps = [
    { id: 0, title: 'Select Properties', desc: 'Choose from your property feed' },
    { id: 1, title: 'Choose Channels', desc: 'Select advertising platforms' },
    { id: 2, title: 'Target Area', desc: 'Set campaign reach on map' },
    { id: 3, title: 'Set Budget', desc: 'Allocate campaign budget' },
    { id: 4, title: 'Generate Creatives', desc: 'AI creates channel-optimized ads' },
    { id: 5, title: 'Launch Campaign', desc: 'Go live across all channels' },
  ];

  const properties = [
    { id: 1, name: 'Modern Apartment in Ullanlinna', rooms: '3h+k', sqm: '78m²', price: '€485,000' },
    { id: 2, name: 'Charming Studio in Kruununhaka', rooms: '1h+kk', sqm: '32m²', price: '€245,000' },
    { id: 3, name: 'Family Home in Töölö', rooms: '4h+k', sqm: '112m²', price: '€695,000' },
    { id: 4, name: 'Penthouse in Eira', rooms: '5h+k', sqm: '156m²', price: '€1,250,000' },
    { id: 5, name: 'Cozy Flat in Kallio', rooms: '2h+k', sqm: '52m²', price: '€320,000' },
  ];

  const channels = [
    { id: 'meta', icon: Smartphone, label: 'Meta', desc: 'Facebook & Instagram', color: 'blue' },
    { id: 'display', icon: Monitor, label: 'Display', desc: 'Programmatic Ads', color: 'purple' },
    { id: 'dooh', icon: Bus, label: 'DOOH', desc: 'Outdoor & Trams', color: 'green' },
  ];

  // Screen positions for the map (relative percentages)
  const screenPositions = [
    { x: 50, y: 35, delay: 0.1 }, // Center area
    { x: 42, y: 42, delay: 0.15 },
    { x: 58, y: 40, delay: 0.2 },
    { x: 35, y: 50, delay: 0.3 },
    { x: 65, y: 48, delay: 0.35 },
    { x: 48, y: 55, delay: 0.4 },
    { x: 55, y: 58, delay: 0.45 },
    { x: 30, y: 38, delay: 0.5 },
    { x: 70, y: 35, delay: 0.55 },
    { x: 25, y: 55, delay: 0.6 },
    { x: 75, y: 52, delay: 0.65 },
    { x: 40, y: 65, delay: 0.7 },
    { x: 60, y: 62, delay: 0.75 },
    { x: 20, y: 45, delay: 0.8 },
    { x: 80, y: 42, delay: 0.85 },
    { x: 33, y: 28, delay: 0.9 },
    { x: 67, y: 25, delay: 0.95 },
  ];

  // Auto-play the demo
  useEffect(() => {
    if (inView && !isPlaying) {
      setIsPlaying(true);
    }
  }, [inView]);

  useEffect(() => {
    if (!isPlaying) return;

    // Timings - first scene faster
    const baseDelay = 500;
    
    // Step 0: Select properties quickly
    const propTimers = [
      setTimeout(() => setSelectedProperties([1]), baseDelay),
      setTimeout(() => setSelectedProperties([1, 2]), baseDelay + 400),
      setTimeout(() => setSelectedProperties([1, 2, 3]), baseDelay + 800),
      setTimeout(() => setSelectedProperties([1, 2, 3, 5]), baseDelay + 1200),
    ];

    // Step 1: Move to channels
    const timer2 = setTimeout(() => {
      setCurrentStep(1);
    }, baseDelay + 2200);

    // Select channels one by one
    const timer3 = setTimeout(() => setSelectedChannels(['meta']), baseDelay + 3200);
    const timer4 = setTimeout(() => setSelectedChannels(['meta', 'display']), baseDelay + 4200);
    const timer5 = setTimeout(() => setSelectedChannels(['meta', 'display', 'dooh']), baseDelay + 5200);

    // Step 2: Map/targeting
    const timer6 = setTimeout(() => {
      setCurrentStep(2);
    }, baseDelay + 6700);

    // Animate radius expanding
    const timer7 = setTimeout(() => {
      let r = 0;
      const radiusInterval = setInterval(() => {
        r += 2;
        setMapRadius(r);
        // Calculate visible screens based on radius
        const screens = Math.min(Math.floor(r / 6), 56);
        setVisibleScreens(screens);
        if (r >= 100) clearInterval(radiusInterval);
      }, 50);
    }, baseDelay + 7200);

    // Step 3: Budget
    const timer8 = setTimeout(() => {
      setCurrentStep(3);
    }, baseDelay + 12200);

    // Animate budget
    const timer9 = setTimeout(() => {
      let b = 0;
      const budgetInterval = setInterval(() => {
        b += 25;
        setBudget(b);
        if (b >= 750) clearInterval(budgetInterval);
      }, 40);
    }, baseDelay + 12700);

    // Step 4: Generate creatives
    const timer10 = setTimeout(() => {
      setCurrentStep(4);
    }, baseDelay + 15700);

    const timer11 = setTimeout(() => {
      setCreativesGenerated(true);
    }, baseDelay + 18200);

    // Step 5: Launch
    const timer12 = setTimeout(() => {
      setCurrentStep(5);
    }, baseDelay + 20700);

    const timer13 = setTimeout(() => {
      setCampaignLaunched(true);
    }, baseDelay + 21700);

    // Reset and replay
    const timer14 = setTimeout(() => {
      setCurrentStep(0);
      setSelectedProperties([]);
      setSelectedChannels([]);
      setBudget(0);
      setMapRadius(0);
      setVisibleScreens(0);
      setCreativesGenerated(false);
      setCampaignLaunched(false);
    }, baseDelay + 26000);

    return () => {
      propTimers.forEach(clearTimeout);
      [timer2, timer3, timer4, timer5, timer6, timer7, timer8, timer9, timer10, timer11, timer12, timer13, timer14].forEach(clearTimeout);
    };
  }, [isPlaying, currentStep === 0 && selectedProperties.length === 0]);

  // Restart animation when it completes
  useEffect(() => {
    if (currentStep === 0 && selectedProperties.length === 0 && isPlaying) {
      const restartTimer = setTimeout(() => {
        setIsPlaying(true);
      }, 1000);
      return () => clearTimeout(restartTimer);
    }
  }, [currentStep, selectedProperties, isPlaying]);

  return (
    <section className="py-24 bg-gradient-to-b from-purple-50 to-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center max-w-4xl mx-auto mb-12"
        >
          <SectionLabel icon={Rocket} label="See It In Action" color="purple" />
          
          <h2 className="text-4xl md:text-5xl font-black mb-6 text-gray-900">
            Campaign Creation
            <br />
            <span className="gradient-text">In Under 5 Minutes</span>
          </h2>
          <p className="text-xl text-gray-600">
            Watch how franchise owners launch sophisticated multi-channel campaigns 
            without any technical expertise.
          </p>
        </motion.div>

        {/* Progress Steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="flex justify-center gap-1 md:gap-2 mb-8 flex-wrap"
        >
          {steps.map((step, i) => (
            <div
              key={step.id}
              className={`flex items-center gap-1.5 px-2 md:px-3 py-1.5 md:py-2 rounded-full transition-all duration-500 ${
                currentStep === i 
                  ? 'bg-purple-600 text-white shadow-lg scale-105' 
                  : currentStep > i 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-gray-100 text-gray-400'
              }`}
            >
              <div className={`w-5 h-5 md:w-6 md:h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                currentStep > i ? 'bg-green-500 text-white' : currentStep === i ? 'bg-white text-purple-600' : 'bg-gray-300 text-white'
              }`}>
                {currentStep > i ? <Check size={12} /> : i + 1}
              </div>
              <span className="text-xs md:text-sm font-medium hidden lg:inline">{step.title}</span>
            </div>
          ))}
        </motion.div>

        {/* Demo Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.3 }}
          className="max-w-5xl mx-auto"
        >
          <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
            {/* Browser Header */}
            <div className="bg-gray-100 px-4 py-3 flex items-center gap-3 border-b border-gray-200">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
              </div>
              <div className="flex-1 flex justify-center">
                <div className="bg-white px-4 py-1 rounded-lg text-sm text-gray-500 flex items-center gap-2">
                  <Lock size={12} />
                  norr3demo.netlify.app/campaigns/new
                </div>
              </div>
            </div>

            {/* App Header */}
            <div className="bg-gradient-to-r from-purple-700 to-purple-600 px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
                  <Home size={18} className="text-white" />
                </div>
                <div>
                  <div className="text-white font-bold text-sm">NØRR3 Marketing Engine</div>
                  <div className="text-purple-200 text-xs">Kiinteistömaailma Helsinki</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                  <Users size={16} className="text-white" />
                </div>
              </div>
            </div>

            {/* Content Area */}
            <div className="p-6 md:p-8 min-h-[500px]">
              <AnimatePresence mode="wait">
                {/* Step 0: Property Selection - Multiple */}
                {currentStep === 0 && (
                  <motion.div
                    key="step0"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    className="space-y-4"
                  >
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">Select Properties to Advertise</h3>
                        <p className="text-gray-500 text-sm">Choose multiple properties from your live feed</p>
                      </div>
                      <div className="flex items-center gap-3">
                        {selectedProperties.length > 0 && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold"
                          >
                            {selectedProperties.length} selected
                          </motion.div>
                        )}
                        <div className="flex items-center gap-2 text-sm text-green-600">
                          <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                            className="w-2 h-2 rounded-full bg-green-500"
                          />
                          Live Feed
                        </div>
                      </div>
                    </div>

                    <div className="grid gap-2 max-h-[380px] overflow-auto pr-2">
                      {properties.map((prop) => {
                        const isSelected = selectedProperties.includes(prop.id);
                        return (
                          <motion.div
                            key={prop.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: prop.id * 0.05 }}
                            className={`p-3 rounded-xl border-2 cursor-pointer transition-all ${
                              isSelected
                                ? 'border-purple-500 bg-purple-50 shadow-md'
                                : 'border-gray-100 hover:border-gray-200 bg-white'
                            }`}
                          >
                            <div className="flex items-center gap-4">
                              <div className={`w-6 h-6 rounded border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                                isSelected ? 'bg-purple-600 border-purple-600' : 'border-gray-300'
                              }`}>
                                {isSelected && (
                                  <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                  >
                                    <Check size={14} className="text-white" />
                                  </motion.div>
                                )}
                              </div>
                              <div className="w-16 h-12 rounded-lg bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center flex-shrink-0">
                                <Home size={20} className="text-gray-400" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="font-semibold text-gray-900 text-sm truncate">{prop.name}</div>
                                <div className="flex gap-2 mt-0.5 text-xs text-gray-500">
                                  <span>{prop.rooms}</span>
                                  <span>•</span>
                                  <span>{prop.sqm}</span>
                                  <span>•</span>
                                  <span className="text-green-600 font-semibold blur-[2px]">{prop.price}</span>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>

                    {selectedProperties.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center justify-between p-3 bg-purple-50 rounded-xl border border-purple-100"
                      >
                        <div className="text-sm text-purple-700">
                          <strong>{selectedProperties.length} properties</strong> will be included in this campaign
                        </div>
                        <ArrowRight size={16} className="text-purple-600" />
                      </motion.div>
                    )}
                  </motion.div>
                )}

                {/* Step 1: Channel Selection */}
                {currentStep === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    className="space-y-4"
                  >
                    <div className="mb-6">
                      <h3 className="text-xl font-bold text-gray-900">Select Advertising Channels</h3>
                      <p className="text-gray-500 text-sm">Choose where to run your campaign</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-4">
                      {channels.map((channel) => {
                        const isSelected = selectedChannels.includes(channel.id);
                        return (
                          <motion.div
                            key={channel.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className={`p-6 rounded-xl border-2 cursor-pointer transition-all text-center ${
                              isSelected
                                ? channel.color === 'blue' ? 'border-blue-500 bg-blue-50 shadow-lg' :
                                  channel.color === 'purple' ? 'border-purple-500 bg-purple-50 shadow-lg' :
                                  'border-green-500 bg-green-50 shadow-lg'
                                : 'border-gray-100 hover:border-gray-200 bg-white'
                            }`}
                          >
                            <div className={`w-16 h-16 mx-auto rounded-xl flex items-center justify-center mb-3 ${
                              isSelected
                                ? channel.color === 'blue' ? 'bg-blue-100' :
                                  channel.color === 'purple' ? 'bg-purple-100' :
                                  'bg-green-100'
                                : 'bg-gray-100'
                            }`}>
                              <channel.icon size={32} className={
                                isSelected
                                  ? channel.color === 'blue' ? 'text-blue-600' :
                                    channel.color === 'purple' ? 'text-purple-600' :
                                    'text-green-600'
                                  : 'text-gray-400'
                              } />
                            </div>
                            <div className="font-bold text-gray-900">{channel.label}</div>
                            <div className="text-sm text-gray-500">{channel.desc}</div>
                            {isSelected && (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className={`mt-3 inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${
                                  channel.color === 'blue' ? 'bg-blue-600 text-white' :
                                  channel.color === 'purple' ? 'bg-purple-600 text-white' :
                                  'bg-green-600 text-white'
                                }`}
                              >
                                <Check size={12} /> Selected
                              </motion.div>
                            )}
                          </motion.div>
                        );
                      })}
                    </div>

                    {selectedChannels.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-6 p-4 bg-gray-50 rounded-xl"
                      >
                        <div className="text-sm text-gray-600">
                          <strong>{selectedChannels.length} channels</strong> selected — Campaign will reach users across all platforms simultaneously
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                )}

                {/* Step 2: Map / DOOH Targeting */}
                {currentStep === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    className="space-y-4"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">Set Campaign Target Area</h3>
                        <p className="text-gray-500 text-sm">Define the geographic reach for DOOH screens</p>
                      </div>
                      {visibleScreens > 0 && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="px-4 py-2 bg-green-100 text-green-700 rounded-full font-bold flex items-center gap-2"
                        >
                          <Monitor size={16} />
                          {visibleScreens} PDOOH Screens
                        </motion.div>
                      )}
                    </div>

                    {/* Map Container */}
                    <div className="relative bg-gradient-to-br from-slate-100 to-slate-200 rounded-xl overflow-hidden h-[350px] border border-gray-200">
                      {/* Stylized Map Background */}
                      <div className="absolute inset-0">
                        {/* Grid pattern for streets */}
                        <svg className="w-full h-full opacity-30">
                          <defs>
                            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#94a3b8" strokeWidth="0.5"/>
                            </pattern>
                          </defs>
                          <rect width="100%" height="100%" fill="url(#grid)" />
                        </svg>
                        
                        {/* Water area (bay) */}
                        <div className="absolute bottom-0 right-0 w-1/3 h-1/2 bg-blue-200/50 rounded-tl-[100px]" />
                        
                        {/* Parks */}
                        <div className="absolute top-[20%] left-[15%] w-16 h-12 bg-green-200/60 rounded-lg" />
                        <div className="absolute top-[60%] right-[40%] w-20 h-8 bg-green-200/60 rounded-lg" />
                      </div>

                      {/* Center Point (Property Location) */}
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                          className="w-4 h-4 bg-purple-600 rounded-full border-2 border-white shadow-lg"
                        />
                      </div>

                      {/* Expanding Radius Circle */}
                      <motion.div
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-purple-400 bg-purple-400/10 z-10"
                        style={{
                          width: `${mapRadius * 3}px`,
                          height: `${mapRadius * 3}px`,
                        }}
                      />
                      <motion.div
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-purple-300/50 z-10"
                        style={{
                          width: `${mapRadius * 3.5}px`,
                          height: `${mapRadius * 3.5}px`,
                        }}
                      />

                      {/* PDOOH Screen Markers */}
                      {screenPositions.map((pos, i) => {
                        // Calculate if this screen is within the radius
                        const distFromCenter = Math.sqrt(Math.pow(pos.x - 50, 2) + Math.pow(pos.y - 50, 2));
                        const isVisible = (mapRadius / 2) > distFromCenter;
                        
                        return (
                          <AnimatePresence key={i}>
                            {isVisible && (
                              <motion.div
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0, opacity: 0 }}
                                transition={{ delay: pos.delay * 0.5 }}
                                className="absolute z-30"
                                style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
                              >
                                <div className="relative -translate-x-1/2 -translate-y-1/2">
                                  <div className="w-6 h-6 bg-green-500 rounded-lg flex items-center justify-center shadow-md">
                                    <Monitor size={12} className="text-white" />
                                  </div>
                                  <motion.div
                                    animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                    className="absolute inset-0 bg-green-400 rounded-lg"
                                  />
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        );
                      })}

                      {/* Map Labels */}
                      <div className="absolute top-4 left-4 bg-white/90 px-3 py-1 rounded-lg shadow text-xs font-medium text-gray-600">
                        Helsinki Center
                      </div>
                      <div className="absolute bottom-4 right-4 bg-white/90 px-3 py-1 rounded-lg shadow text-xs text-gray-500">
                        Radius: {Math.round(mapRadius * 0.05 * 10) / 10} km
                      </div>
                    </div>

                    {/* Screen Count Summary */}
                    {visibleScreens > 0 && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="grid grid-cols-3 gap-4"
                      >
                        <div className="p-3 bg-green-50 rounded-xl border border-green-100 text-center">
                          <div className="text-2xl font-black text-green-600">{Math.min(visibleScreens, 24)}</div>
                          <div className="text-xs text-green-700">Tram Screens</div>
                        </div>
                        <div className="p-3 bg-blue-50 rounded-xl border border-blue-100 text-center">
                          <div className="text-2xl font-black text-blue-600">{Math.min(Math.floor(visibleScreens * 0.4), 18)}</div>
                          <div className="text-xs text-blue-700">Mall Displays</div>
                        </div>
                        <div className="p-3 bg-purple-50 rounded-xl border border-purple-100 text-center">
                          <div className="text-2xl font-black text-purple-600">{Math.min(Math.floor(visibleScreens * 0.25), 14)}</div>
                          <div className="text-xs text-purple-700">Street Screens</div>
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                )}

                {/* Step 3: Budget */}
                {currentStep === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    className="space-y-6"
                  >
                    <div className="mb-6">
                      <h3 className="text-xl font-bold text-gray-900">Set Campaign Budget</h3>
                      <p className="text-gray-500 text-sm">Allocate budget across selected channels</p>
                    </div>

                    <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-6">
                      <div className="text-center mb-6">
                        <div className="text-5xl font-black text-purple-600">€{budget}</div>
                        <div className="text-gray-500 mt-1">Total Campaign Budget</div>
                      </div>

                      <div className="relative h-4 bg-gray-200 rounded-full overflow-hidden">
                        <motion.div
                          className="absolute top-0 left-0 h-full bg-gradient-to-r from-purple-600 to-purple-400 rounded-full"
                          style={{ width: `${(budget / 1500) * 100}%` }}
                        />
                      </div>

                      <div className="mt-6 grid grid-cols-3 gap-4">
                        {channels.map((ch) => (
                          <div key={ch.id} className="text-center p-3 bg-white rounded-lg">
                            <ch.icon size={20} className="mx-auto text-gray-400 mb-1" />
                            <div className="text-xs text-gray-500">{ch.label}</div>
                            <div className="font-bold text-gray-900">€{Math.round(budget / 3)}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
                      <div className="flex items-start gap-3">
                        <Lightbulb size={20} className="text-blue-600 mt-0.5" />
                        <div>
                          <div className="font-semibold text-blue-900">Smart Budget Distribution</div>
                          <div className="text-sm text-blue-700">AI automatically optimizes spend across channels based on performance</div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 4: Creative Generation */}
                {currentStep === 4 && (
                  <motion.div
                    key="step4"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    className="space-y-4"
                  >
                    <div className="mb-6">
                      <h3 className="text-xl font-bold text-gray-900">AI Creative Generation</h3>
                      <p className="text-gray-500 text-sm">Generating optimized ads for {selectedProperties.length} properties × 3 channels</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-4">
                      {[
                        { channel: 'Meta Feed', size: '1080×1080', icon: Smartphone },
                        { channel: 'Display Banner', size: '300×250', icon: Monitor },
                        { channel: 'DOOH Screen', size: '1920×1080', icon: Bus },
                      ].map((creative, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.2 }}
                          className="bg-white rounded-xl border border-gray-200 overflow-hidden"
                        >
                          {/* Preview */}
                          <div 
                            className="h-40 flex items-center justify-center relative"
                            style={{ backgroundColor: '#006450' }}
                          >
                            {!creativesGenerated ? (
                              <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                              >
                                <RefreshCw size={32} className="text-white/50" />
                              </motion.div>
                            ) : (
                              <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="text-center text-white p-4"
                              >
                                <div className="text-xs font-bold mb-2">KIINTEISTÖMAAILMA</div>
                                <div className="text-sm font-bold">4 upeaa kotia</div>
                                <div className="text-xs opacity-75 mt-1">Ullanlinna • Kruununhaka • Töölö</div>
                                <div className="mt-3 px-3 py-1 rounded text-xs font-bold inline-block" style={{ backgroundColor: '#4bd072', color: '#006450' }}>
                                  Katso lisää →
                                </div>
                              </motion.div>
                            )}
                          </div>
                          
                          <div className="p-3">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <creative.icon size={14} className="text-gray-400" />
                                <span className="text-sm font-medium text-gray-900">{creative.channel}</span>
                              </div>
                              {creativesGenerated ? (
                                <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                                  ✓ Ready
                                </span>
                              ) : (
                                <span className="px-2 py-0.5 bg-yellow-100 text-yellow-700 text-xs font-medium rounded-full">
                                  Generating...
                                </span>
                              )}
                            </div>
                            <div className="text-xs text-gray-500 mt-1">{creative.size}</div>
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    {creativesGenerated && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 bg-green-50 rounded-xl border border-green-100"
                      >
                        <div className="flex items-center gap-3">
                          <CheckCircle2 size={24} className="text-green-600" />
                          <div>
                            <div className="font-semibold text-green-900">12 creatives generated!</div>
                            <div className="text-sm text-green-700">Auto-tagged with UTM parameters for tracking</div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                )}

                {/* Step 5: Launch */}
                {currentStep === 5 && (
                  <motion.div
                    key="step5"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    className="text-center py-8"
                  >
                    {!campaignLaunched ? (
                      <motion.div
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ duration: 0.5, repeat: Infinity }}
                      >
                        <div className="w-24 h-24 mx-auto rounded-full bg-purple-100 flex items-center justify-center mb-6">
                          <Rocket size={48} className="text-purple-600" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">Launching Campaign...</h3>
                        <p className="text-gray-500">Deploying to all channels</p>
                      </motion.div>
                    ) : (
                      <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                      >
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 200 }}
                          className="w-24 h-24 mx-auto rounded-full bg-green-500 flex items-center justify-center mb-6"
                        >
                          <Check size={48} className="text-white" />
                        </motion.div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">Campaign Live! 🎉</h3>
                        <p className="text-gray-500 mb-6">4 properties now advertising across 56 DOOH screens + Meta + Display</p>

                        <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto">
                          {channels.map((ch) => (
                            <motion.div
                              key={ch.id}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.2 }}
                              className="p-3 bg-gray-50 rounded-lg"
                            >
                              <ch.icon size={20} className="mx-auto text-green-600 mb-1" />
                              <div className="text-xs font-medium text-gray-700">{ch.label}</div>
                              <div className="text-[10px] text-green-600">● Live</div>
                            </motion.div>
                          ))}
                        </div>

                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.5 }}
                          className="mt-8 p-4 bg-purple-50 rounded-xl inline-block"
                        >
                          <div className="flex items-center gap-2 text-purple-700">
                            <Clock size={16} />
                            <span className="font-semibold">Total time: Under 5 minutes</span>
                          </div>
                        </motion.div>
                      </motion.div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

        {/* CTA to Demo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
          className="text-center mt-10"
        >
          <a
            href="https://norr3demo.netlify.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-full shadow-lg hover:shadow-xl transition-all"
          >
            <span>Try the Demo Yourself</span>
            <ExternalLink size={18} />
          </a>
          <p className="text-gray-500 text-sm mt-3">
            Experience the full platform with sample data
          </p>
        </motion.div>
      </div>
    </section>
  );
};

// ============================================
// REAL-LIFE TRAM CAMPAIGN RESULTS
// ============================================
const TramCampaignShowcase = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [currentSlide, setCurrentSlide] = useState(0);

  const media = [
    { type: 'video', src: import.meta.env.BASE_URL + '1.mp4' },
    { type: 'image', src: import.meta.env.BASE_URL + '2.jpeg' },
    { type: 'image', src: import.meta.env.BASE_URL + '3.jpeg' },
    { type: 'video', src: import.meta.env.BASE_URL + '4.mp4' },
  ];

  // Auto-switch slides
  useEffect(() => {
    if (!inView) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % media.length);
    }, 5000); // 5 seconds per slide

    return () => clearInterval(interval);
  }, [inView, media.length]);

  return (
    <section className="py-24 bg-gradient-to-br from-green-900 via-green-800 to-emerald-900 overflow-hidden relative">
      {/* KM Skyline Artwork - Animated Background */}
      <div className="absolute bottom-0 left-0 right-0 h-64 overflow-hidden pointer-events-none z-0 opacity-50">
        <img 
          src="https://lhrfgfqwxbgyjbiniotw.supabase.co/storage/v1/object/public/km-src/img/footer.svg" 
          alt="" 
          className="h-full absolute bottom-0 left-0"
          style={{ 
            width: '250vw',
            maxWidth: 'none',
            animation: 'slideFooter 15s linear infinite' 
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="grid lg:grid-cols-2 gap-12 items-center"
        >
          {/* Left - Text Content */}
          <div className="text-white">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.2 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 mb-6">
                <Bus className="w-4 h-4" />
                <span className="text-sm font-semibold uppercase tracking-wider">Real-Life Results</span>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-black mb-6">
                Helsinki Tram
                <br />
                <span className="text-green-300">Screen Ads in Action</span>
              </h2>
              
              <p className="text-xl text-green-100 mb-8 leading-relaxed">
                Marketing Engine powers the digital screen advertising on Kiinteistömaailma's branded trams — 
                automated ad delivery running across Helsinki's tram network.
              </p>

              <div className="space-y-4 mb-8">
                {[
                  'Digital screen ads managed through Marketing Engine',
                  'Automated ad scheduling with time-based rules',
                  'Sequential, random, or weighted rotation patterns',
                  'Priority-based content scheduling for peak hours',
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-6 h-6 rounded-full bg-green-400 flex items-center justify-center flex-shrink-0">
                      <Check size={14} className="text-green-900" />
                    </div>
                    <span className="text-green-50">{item}</span>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.7 }}
                className="p-4 bg-white/10 rounded-xl border border-white/20 backdrop-blur-sm"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-green-400 flex items-center justify-center">
                    <Flag size={24} className="text-green-900" />
                  </div>
                  <div>
                    <div className="font-bold text-white">Phase 2 Launch: December 2025</div>
                    <div className="text-green-200 text-sm">Helsinki tram advertising control added to Marketing Engine</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Right - Media Slider */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="relative max-w-lg mx-auto lg:mx-0"
          >
            {/* Phone/Device Frame Effect */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-black">
              {/* Media Container */}
              <div className="relative aspect-[3/4] overflow-hidden">
                <AnimatePresence mode="wait">
                  {media.map((item, index) => (
                    currentSlide === index && (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.5 }}
                        className="absolute inset-0"
                      >
                        {item.type === 'video' ? (
                          <video
                            src={item.src}
                            autoPlay
                            muted
                            loop
                            playsInline
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <img
                            src={item.src}
                            alt={`Tram campaign ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        )}
                      </motion.div>
                    )
                  ))}
                </AnimatePresence>

                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/20 pointer-events-none" />

                {/* KM Logo */}
                <div className="absolute top-4 left-4" style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 820.08 568.89" className="h-10 w-auto">
                    <defs>
                      <style>{`.km-cls-1{fill:#4bd072}.km-cls-2{fill:#fafffe}.km-cls-3{fill:#fefdfc}`}</style>
                    </defs>
                    <polygon className="km-cls-3" points="363.41 53.06 263.47 53.06 153.97 177.33 202.64 233.81 363.41 53.06"/>
                    <polygon className="km-cls-3" points="112.26 222.52 39.26 304.2 39.26 53.06 112.26 53.06 112.26 222.52"/>
                    <polygon className="km-cls-1" points="366.47 418.05 153.97 177.33 39.26 304.2 39.26 418.05 153.97 289.43 265.21 418.05 366.47 418.05"/>
                    <polygon className="km-cls-2" points="374.7 418.05 374.7 53.06 577.18 277.26 782.27 53.06 782.27 418.05 708.41 418.05 708.41 244.24 578.49 389.37 447.7 245.11 447.7 418.05 374.7 418.05"/>
                  </svg>
                </div>
              </div>

              {/* Slide Indicators */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {media.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`transition-all ${
                      currentSlide === index
                        ? 'w-8 h-2 bg-white rounded-full'
                        : 'w-2 h-2 bg-white/50 rounded-full hover:bg-white/70'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-green-400/20 rounded-full blur-2xl" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-emerald-400/20 rounded-full blur-2xl" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

// ============================================
// EXECUTION / TIMELINE
// ============================================
const Execution = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const timeline = [
    { date: 'Q4 2024', title: 'Development & Testing', desc: 'Platform architecture and core features built' },
    { date: 'March 2025', title: 'Platform Launch', desc: 'Initial release with digital channels (Display, Meta)' },
    { date: 'December 2025', title: 'Major Upgrade', desc: 'Helsinki tram advertising control added' },
    { date: 'Ongoing', title: 'Continuous Evolution', desc: 'Feature development and optimization' },
  ];

  const channels = [
    { icon: Monitor, label: 'Display Ads', desc: 'Programmatic advertising' },
    { icon: Smartphone, label: 'Meta Platforms', desc: 'Facebook & Instagram' },
    { icon: Bus, label: 'Outdoor/DOOH', desc: 'Trams & digital billboards' },
  ];

  const techFeatures = [
    { icon: Database, label: 'Multi-tenant architecture supporting ~50 users' },
    { icon: RefreshCw, label: 'Real-time synchronization engine' },
    { icon: Wand2, label: 'AI-powered creative generation' },
    { icon: Target, label: 'Automatic content tagging system' },
    { icon: BarChart3, label: 'Smart campaign optimization' },
    { icon: Shield, label: 'Property status monitoring' },
  ];

  return (
    <section id="execution" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center max-w-4xl mx-auto mb-16"
        >
          <SectionLabel icon={Cog} label="Toteutus / Execution" color="blue" />
          
          <h2 className="text-4xl md:text-5xl font-black mb-6 text-gray-900">
            Technical Implementation
            <br />
            <span className="text-gray-400">& Deployment Timeline</span>
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative mb-20">
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-600 to-purple-200 hidden md:block" />
          
          <div className="space-y-12">
            {timeline.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 + index * 0.1 }}
                className={`flex items-center gap-8 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
              >
                <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                  <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 inline-block">
                    <div className="text-sm font-bold text-purple-600 mb-1">{item.date}</div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-gray-600">{item.desc}</p>
                  </div>
                </div>
                
                <div className="hidden md:flex w-12 h-12 rounded-full bg-purple-600 items-center justify-center flex-shrink-0 z-10 shadow-lg">
                  <CircleDot className="w-6 h-6 text-white" />
                </div>
                
                <div className="flex-1 hidden md:block" />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Two Column Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Channel Coverage */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6 }}
            className="bg-white rounded-2xl p-6 border border-gray-200/60 shadow-sm"
          >
            <h3 className="font-bold text-lg text-gray-900 mb-5 flex items-center gap-2">
              <Globe className="w-5 h-5 text-purple-600" />
              Channel Coverage
            </h3>
            <div className="space-y-3">
              {channels.map((channel, i) => (
                <div key={i} className="flex items-center gap-3 bg-slate-50 p-3 rounded-xl">
                  <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                    <channel.icon className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 text-sm">{channel.label}</div>
                    <div className="text-xs text-gray-500">{channel.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Technical Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.7 }}
            className="bg-white rounded-2xl p-6 border border-gray-200/60 shadow-sm"
          >
            <h3 className="font-bold text-lg text-gray-900 mb-5 flex items-center gap-2">
              <Cpu className="w-5 h-5 text-purple-600" />
              Intelligence Features
            </h3>
            <div className="space-y-2">
              {techFeatures.map((feature, i) => (
                <div key={i} className="flex items-center gap-3 bg-slate-50 p-3 rounded-lg">
                  <feature.icon className="w-4 h-4 text-purple-600 flex-shrink-0" />
                  <span className="text-sm text-gray-700">{feature.label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Why This Approach */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
          className="mt-10 bg-gradient-to-r from-purple-600 to-purple-700 rounded-2xl p-6 text-white"
        >
          <div className="flex items-start gap-4">
            <Lightbulb className="w-8 h-8 flex-shrink-0" />
            <div>
              <h3 className="font-bold text-xl mb-3">Why This Approach?</h3>
              <p className="text-blue-100 leading-relaxed">
                We chose a phased deployment to validate core functionality before expanding capabilities. 
                The self-service model was essential for scalability—NØRR3 couldn't manually manage campaigns 
                for 50 businesses. <strong className="text-white">Automation wasn't just a feature; it was the product.</strong>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// ============================================
// RESULTS SECTION - CHARTS & METRICS
// ============================================
const Results = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="results" className="py-24 bg-emerald-50/50">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center max-w-4xl mx-auto mb-16"
        >
          <SectionLabel icon={TrendingUp} label="Tulokset / Results" color="green" />
          
          <h2 className="text-4xl md:text-5xl font-black mb-6 text-gray-900">
            Transformational
            <br />
            <span className="gradient-text">Business Impact</span>
          </h2>
        </motion.div>

        {/* Hero CTR Metric */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.2 }}
          className="mb-16"
        >
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-10 border border-gray-200/60">
            <div className="text-center mb-8">
              <h3 className="text-lg font-bold text-gray-700 mb-2">Dynamic Meta Retargeting CTR</h3>
              <p className="text-gray-500">Click-Through Rate Performance</p>
            </div>

            {/* CTR Comparison Chart */}
            <div className="grid md:grid-cols-3 gap-8 items-end mb-8">
              {/* Before */}
              <div className="text-center">
                <div className="text-gray-400 text-sm uppercase tracking-wider mb-4">Before</div>
                <div className="relative h-32 bg-gray-100 rounded-xl mx-auto w-full max-w-[200px] overflow-hidden">
                  <motion.div
                    initial={{ height: 0 }}
                    animate={inView ? { height: '15%' } : {}}
                    transition={{ delay: 0.5, duration: 1 }}
                    className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-gray-400 to-gray-300 rounded-b-xl"
                  />
                </div>
                <div className="mt-4 text-3xl font-black text-gray-400">0.5-2%</div>
                <div className="text-sm text-gray-500 mt-1">Industry Standard</div>
              </div>

              {/* Arrow */}
              <div className="text-center hidden md:block">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={inView ? { scale: 1 } : {}}
                  transition={{ delay: 0.8, type: "spring" }}
                  className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 shadow-xl"
                >
                  <ArrowUp className="w-10 h-10 text-white" />
                </motion.div>
                <div className="mt-4 text-4xl font-black text-green-600">5-20x</div>
                <div className="text-sm text-green-700 font-semibold">Improvement</div>
              </div>

              {/* After */}
              <div className="text-center">
                <div className="text-green-600 text-sm uppercase tracking-wider mb-4 font-bold">After Marketing Engine</div>
                <div className="relative h-32 bg-green-50 rounded-xl mx-auto w-full max-w-[200px] overflow-hidden border-2 border-green-200">
                  <motion.div
                    initial={{ height: 0 }}
                    animate={inView ? { height: '90%' } : {}}
                    transition={{ delay: 0.7, duration: 1.5 }}
                    className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-green-600 to-emerald-400 rounded-b-xl"
                  />
                </div>
                <div className="mt-4 text-4xl font-black text-green-600">10-20%</div>
                <div className="text-sm text-green-700 font-semibold mt-1">Achieved CTR</div>
              </div>
            </div>

            {/* Mobile Arrow */}
            <div className="flex justify-center mb-8 md:hidden">
              <div className="px-6 py-3 bg-green-100 rounded-full text-green-700 font-bold">
                ↑ 5-20x Improvement
              </div>
            </div>

            {/* Highlight Banner */}
            <div className="bg-gradient-to-r from-green-600 to-emerald-500 rounded-xl p-6 text-white text-center">
              <p className="text-lg">
                <strong className="text-xl">This represents a dramatic 5-20x improvement</strong>
                <br />
                in click-through rates, significantly improving campaign efficiency and ROI
              </p>
            </div>
          </div>
        </motion.div>

        {/* Secondary Metrics Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {[
            { icon: Users, value: 50, suffix: '+', label: 'Franchise Users', desc: 'Running independent campaigns' },
            { icon: Clock, valueText: 'Minutes', label: 'Campaign Launch Time', desc: 'Down from hours/days' },
            { icon: RefreshCw, valueText: 'Zero', label: 'Manual Intervention', desc: 'For property updates' },
            { icon: TrendingUp, valueText: 'Significant', label: 'Overhead Reduction', desc: 'In NØRR3 operations' },
          ].map((metric, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 text-center hover:shadow-xl transition-shadow"
            >
              <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-purple-100 flex items-center justify-center">
                <metric.icon className="w-7 h-7 text-purple-600" />
              </div>
              <div className="text-3xl font-black text-gray-900 mb-1">
                {metric.value ? (
                  <AnimatedCounter end={metric.value} suffix={metric.suffix} />
                ) : metric.valueText}
              </div>
              <div className="font-semibold text-gray-700">{metric.label}</div>
              <div className="text-sm text-gray-500 mt-1">{metric.desc}</div>
            </motion.div>
          ))}
        </div>

        {/* Scalability Success */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
          className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100"
        >
          <h3 className="font-bold text-xl text-gray-900 mb-6 text-center">
            <Rocket className="inline w-6 h-6 text-purple-600 mr-2" />
            Scalability Achieved Across Industries
          </h3>
          
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { name: 'Kiinteistömaailma', industry: 'Real Estate', icon: Building2, featured: true },
              { name: 'Terveystalo', industry: 'Healthcare', icon: Heart },
              { name: 'ILOQ', industry: 'Smart Locks', icon: Lock },
              { name: 'NØRR3', industry: 'Agency Marketing', icon: Megaphone },
            ].map((client, i) => (
              <div key={i} className={`p-4 rounded-xl text-center ${
                client.featured ? 'bg-purple-50 border-2 border-purple-200' : 'bg-gray-50 border border-gray-100'
              }`}>
                <div className={`w-12 h-12 mx-auto mb-3 rounded-xl flex items-center justify-center ${
                  client.featured ? 'bg-purple-600' : 'bg-gray-200'
                }`}>
                  <client.icon className={`w-6 h-6 ${client.featured ? 'text-white' : 'text-gray-600'}`} />
                </div>
                <div className="font-bold text-gray-900">{client.name}</div>
                <div className="text-sm text-gray-500">{client.industry}</div>
                {client.featured && (
                  <span className="inline-block mt-2 px-2 py-0.5 bg-purple-600 text-white text-xs rounded-full">
                    Featured
                  </span>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// ============================================
// CATEGORIES SECTION
// ============================================
const Categories = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const categories = [
    {
      title: 'Best Digital Service',
      titleFi: 'Paras digitaalinen palvelu',
      icon: Monitor,
      primary: true,
      color: 'purple',
      points: [
        'Self-service platform empowering ~50 franchise businesses',
        'User experience enabling non-technical users to launch sophisticated campaigns',
        'Scalability across 50+ independent users',
        'Multi-channel integration (display, social, outdoor)',
      ],
    },
    {
      title: 'Best Use of Data',
      titleFi: 'Paras datan käyttö',
      icon: Database,
      color: 'blue',
      points: [
        'Real-time property data integration',
        'Automatic property status monitoring and campaign adjustments',
        'Performance data tracking and optimization',
        'Cross-channel data synchronization',
      ],
    },
    {
      title: 'Best Use of AI',
      titleFi: 'Paras AI:n tai muun uuden teknologian käyttö',
      icon: Brain,
      color: 'green',
      points: [
        'AI-powered creative generation across channels',
        'Intelligent automation reducing manual work',
        'Smart content adaptation per channel requirements',
        'Automatic content tagging and optimization',
      ],
      note: 'Designed and developed in Finland 🇫🇮',
    },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center max-w-4xl mx-auto mb-16"
        >
          <SectionLabel icon={Award} label="Competition Categories" color="yellow" />

          <h2 className="text-4xl md:text-5xl font-black mb-6 text-gray-900">
            Competing in
            <br />
            <span className="gradient-text">Three Grand One Categories</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 + index * 0.15 }}
              className={`relative bg-white rounded-xl p-6 border hover:shadow-lg transition-all ${
                category.primary ? 'border-purple-300 shadow-md' : 'border-gray-200'
              }`}
            >
              {category.primary && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-purple-600 text-white text-xs font-bold rounded-full">
                  PRIMARY CATEGORY
                </div>
              )}

              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
                category.color === 'purple' ? 'bg-purple-100' :
                category.color === 'blue' ? 'bg-blue-100' : 'bg-green-100'
              }`}>
                <category.icon className={`w-6 h-6 ${
                  category.color === 'purple' ? 'text-purple-600' :
                  category.color === 'blue' ? 'text-blue-600' : 'text-green-600'
                }`} />
              </div>

              <h3 className="font-bold text-lg text-gray-900 mb-1">{category.title}</h3>
              <p className="text-gray-500 text-sm mb-4">{category.titleFi}</p>

              <ul className="space-y-3">
                {category.points.map((point, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                    <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>

              {category.note && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <p className="text-xs text-gray-500 flex items-center gap-1">
                    <Flag size={12} />
                    {category.note}
                  </p>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ============================================
// CTA SECTION
// ============================================
const CTA = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section className="py-24 bg-gradient-to-br from-purple-900 via-purple-800 to-purple-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}
        />
      </div>

      <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
        >
          <img 
            src="https://norr3.fi/wp-content/uploads/2023/06/logo_valk-web.png"
            alt="NØRR3" 
            className="h-14 mx-auto mb-8"
          />

          <h2 className="text-4xl md:text-5xl font-black mb-6">
            Experience the
            <br />
            Marketing Engine
          </h2>

          <p className="text-xl text-purple-200 mb-12 max-w-2xl mx-auto">
            See how NØRR3 Marketing Engine is transforming marketing automation 
            for franchise businesses across Finland
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <a
              href="https://norr3.fi/marketing-engine"
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-white text-purple-700 px-10 py-5 rounded-xl text-xl font-bold shadow-xl hover:shadow-2xl transition-all flex items-center gap-3"
            >
              <span>Access the Platform</span>
              <ExternalLink className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          {/* Jury Note */}
          <div className="bg-white/10 backdrop-blur rounded-2xl p-6 max-w-2xl mx-auto border border-white/20">
            <p className="text-purple-100">
              <strong className="text-white">For Grand One Jury Members:</strong>
              <br />
              The platform link above provides direct access to the NØRR3 Marketing Engine.
              <br />
              Contact us if you need test credentials for a full platform walkthrough.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// ============================================
// FOOTER
// ============================================
const Footer = () => {
  return (
    <footer className="py-12 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-4">
            <img 
              src="https://norr3.fi/wp-content/uploads/2023/06/logo_valk-web.png"
              alt="NØRR3" 
              className="h-8"
            />
            <span className="text-gray-500">|</span>
            <span className="text-gray-400">Marketing Engine</span>
          </div>

          <div className="flex items-center gap-2 text-gray-400 text-sm">
            Made with <Heart className="w-4 h-4 text-red-500 fill-red-500" /> in Helsinki, Finland
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-800 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
          <div>© 2026 NØRR3. All rights reserved.</div>
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4" />
            Grand One 2026 Competition Entry
          </div>
        </div>
      </div>
    </footer>
  );
};

// ============================================
// MAIN APP
// ============================================
function App() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <Hero />
      <CompetitionBanner />
      <PlatformOverview />
      <Challenge />
      <Strategy />
      <Solution />
      <CampaignCreationDemo />
      <TramCampaignShowcase />
      <Execution />
      <Results />
      <Categories />
      <CTA />
      <Footer />
    </div>
  );
}

export default App;

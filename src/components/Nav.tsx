import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import type { Route } from '../hooks/useRouter';

interface NavProps {
  route: Route;
  navigate: (path: string) => void;
}

const links = [
  { label: 'Home', path: '/', route: 'home' },
  { label: 'Pearson Units', path: '/units', route: 'units' },
  { label: 'STEAM Lab Archive', path: '/archive', route: 'archive' },
  { label: 'My Lab Tracker', path: '/tracker', route: 'tracker' },
];

export function Nav({ route, navigate }: NavProps) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [route]);

  const isActive = (r: string) => {
    if (r === 'home' && route.name === 'home') return true;
    if (r === 'units' && (route.name === 'units' || route.name === 'unit')) return true;
    if (r === 'archive' && (route.name === 'archive' || route.name === 'lab')) return true;
    if (r === 'tracker' && route.name === 'tracker') return true;
    return false;
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled || open
            ? 'bg-bone/95 backdrop-blur-md border-b border-line'
            : 'bg-transparent border-b border-transparent'
        }`}
      >
        <nav className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="flex items-center justify-between h-16">
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2.5 group"
            >
              <span className="w-8 h-8 bg-ink flex items-center justify-center rounded-sm transition-transform group-hover:scale-105">
                <span className="font-display font-bold text-bone text-sm tracking-tightest">TL</span>
              </span>
              <span className="font-mono text-[10px] tracking-wide2 text-concrete uppercase hidden sm:block">
                TOLERANCE LAB
              </span>
            </button>

            <div className="hidden md:flex items-center gap-1">
              {links.map((link) => (
                <button
                  key={link.path}
                  onClick={() => navigate(link.path)}
                  className={`px-4 py-2 text-sm font-medium transition-colors rounded-sm ${
                    isActive(link.route)
                      ? 'text-ink'
                      : 'text-concrete hover:text-ink'
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </div>

            <button
              onClick={() => setOpen(!open)}
              className="md:hidden w-9 h-9 flex items-center justify-center text-ink"
              aria-label="Menu"
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>

        {open && (
          <div className="md:hidden border-t border-line bg-bone animate-fade-in">
            <div className="px-5 py-4 space-y-1">
              {links.map((link) => (
                <button
                  key={link.path}
                  onClick={() => navigate(link.path)}
                  className={`block w-full text-left px-4 py-3 text-sm font-medium rounded-sm transition-colors ${
                    isActive(link.route)
                      ? 'text-ink bg-ink/5'
                      : 'text-concrete hover:text-ink hover:bg-ink/5'
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </header>
    </>
  );
}

import { useEffect, useState, useCallback } from 'react';

export type Route =
  | { name: 'home' }
  | { name: 'units' }
  | { name: 'unit'; id: string }
  | { name: 'archive' }
  | { name: 'lab'; id: string }
  | { name: 'tracker' };

function parseHash(): Route {
  const hash = window.location.hash.replace(/^#\/?/, '');
  const parts = hash.split('/').filter(Boolean);

  if (parts.length === 0) return { name: 'home' };
  if (parts[0] === 'units') return { name: 'units' };
  if (parts[0] === 'archive') return { name: 'archive' };
  if (parts[0] === 'tracker') return { name: 'tracker' };
  if (parts[0] === 'lab' && parts[1]) return { name: 'lab', id: parts[1] };
  // Match /unit-01 through /unit-08 as top-level routes
  if (/^unit-\d{2}$/.test(parts[0])) return { name: 'unit', id: parts[0] };

  return { name: 'home' };
}

export function useRouter() {
  const [route, setRoute] = useState<Route>(parseHash);

  useEffect(() => {
    const onChange = () => {
      setRoute(parseHash());
      window.scrollTo(0, 0);
    };
    window.addEventListener('hashchange', onChange);
    return () => window.removeEventListener('hashchange', onChange);
  }, []);

  const navigate = useCallback((path: string) => {
    window.location.hash = path;
  }, []);

  return { route, navigate };
}

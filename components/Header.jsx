import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

const Header = () => {
  const router = useRouter();
  const normalizedPathname = (router.pathname || '').replace(/\/$/, '');

  // Initialize from pathname only so server & client HTML match during hydration
  const [isWorksMenu, setIsWorksMenu] = useState(() => {
    return normalizedPathname === '/works';
  });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const isWorksRoute = normalizedPathname === '/works';
    if (isWorksRoute !== isWorksMenu) setIsWorksMenu(isWorksRoute);
    if (isWorksRoute) sessionStorage.setItem('menuState', 'works');
    else sessionStorage.removeItem('menuState');
  }, [normalizedPathname]);

  useEffect(() => setIsMobileMenuOpen(false), [normalizedPathname]);

  // After mount, sync with sessionStorage (client-only) to avoid SSR mismatch
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = sessionStorage.getItem('menuState');
      if (saved === 'works' && !isWorksMenu) setIsWorksMenu(true);
    }
  }, []);

  const mainMenu = [
    { id: 'start', label: 'Inicio' },
    { id: 'about', label: 'Sobre mí' },
    { id: 'experience', label: 'Experiencia' },
    { id: 'contact', label: 'Contacto' },
    {
      path: '/works',
      label: 'Trabajos',
      action: () => {
        setIsWorksMenu(true);
        sessionStorage.setItem('menuState', 'works');
      },
    },
  ];

  const worksMenu = [
    { id: 'UIUX-projects', label: 'Diseño UI/UX' },
    { id: 'graphic-design', label: 'Gráfico' },
    { id: 'ilustración', label: 'ilustración' },
   
    {
      label: '← Volver',
      action: () => {
        setIsWorksMenu(false);
        sessionStorage.removeItem('menuState');
        router.push('/');
      },
    },
  ];

  const handleScrollClick = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else if (router.pathname !== '/works') {
      // navigate to works with hash
      router.push({ pathname: '/works', hash: `#${id}` });
    }
    setIsMobileMenuOpen(false);
  };

  const currentMenu = isWorksMenu ? worksMenu : mainMenu;

  return (
    <header>
      <button
        className="menu-toggle"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        aria-expanded={isMobileMenuOpen}
        aria-label="Toggle menu"
      >
        {isMobileMenuOpen ? '✕' : '☰'}
      </button>

      <nav>
        <ul className={isMobileMenuOpen ? 'menu-open' : ''}>
          {currentMenu.map((item) => (
            <li key={item.id || item.path}>
              {item.path ? (
                <Link
                  href={item.path}
                  onClick={() => {
                    item.action?.();
                    setIsMobileMenuOpen(false);
                  }}
                >
                  {item.label}
                </Link>
              ) : (
                <button
                  onClick={() => {
                    if (item.action) item.action();
                    else handleScrollClick(item.id);
                  }}
                >
                  {item.label}
                </button>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;

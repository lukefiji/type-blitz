import { SunMoon } from 'lucide-react';
import { useEffect, useState } from 'react';

const ThemeToggle = () => {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <SunMoon
      className="absolute right-4 top-4 h-10 w-10 cursor-pointer"
      onClick={() => setDarkMode((state) => !state)}
    />
  );
};

export default ThemeToggle;

import React, { useState, useEffect } from 'react';
import type { Page, Theme } from '../types';
import { Waves, Search, Settings } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { SoundToggle } from './SoundToggle';
// Wallet integration
import { useWalletKit } from '@mysten/wallet-kit';
import { WalletKitButton } from '@mysten/wallet-kit';

interface NavbarProps {
  onNavigate: (page: Page) => void;
  currentTheme: Theme;
  toggleTheme: () => void;
  isSoundOn: boolean;
  toggleSound: () => void;
  onToggleSettings: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate, currentTheme, toggleTheme, isSoundOn, toggleSound, onToggleSettings }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { currentAccount } = useWalletKit();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'py-3 border-b border-white/10 bg-background/50 backdrop-blur-xl' : 'py-6'}`}>
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div 
          className="flex items-center space-x-2 cursor-pointer"
          onClick={() => onNavigate('landing')}
          data-magnetic
        >
          <Waves size={28} className="text-[var(--primary-blue)]" />
          <span className="font-heading font-bold text-2xl text-text">SuiSphere</span>
        </div>
        <div className="hidden md:flex items-center gap-6">
          <nav className="flex items-center gap-6 text-sm font-medium text-gray-300 dark:text-gray-400">
            <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('feed'); }} className="hover:text-[var(--primary-blue)] transition-colors" data-magnetic>Feed</a>
            <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('ecosystem'); }} className="hover:text-[var(--primary-blue)] transition-colors" data-magnetic>Ecosystem</a>
            <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('profile'); }} className="hover:text-[var(--primary-blue)] transition-colors" data-magnetic>Profile</a>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative hidden sm:block">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <input type="text" placeholder="Search..." className="pl-10 pr-4 py-2 w-48 rounded-lg bg-white/5 border border-white/10 focus:ring-2 focus:ring-[var(--primary-blue)] focus:outline-none transition-all duration-300 text-sm" data-magnetic/>
          </div>
          <SoundToggle isSoundOn={isSoundOn} onToggle={toggleSound} />
          <ThemeToggle theme={currentTheme} onToggle={toggleTheme} />
          {/* Wallet Connection Button */}
          <div className="flex items-center">
            {currentAccount ? (
              <div className="flex items-center gap-2 bg-white/10 rounded-full px-3 py-1">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span className="text-sm">
                  {currentAccount.address.substring(0, 6)}...{currentAccount.address.substring(currentAccount.address.length - 4)}
                </span>
              </div>
            ) : (
              <WalletKitButton style={{ 
                background: 'var(--primary-blue)', 
                color: 'white', 
                border: 'none', 
                padding: '8px 16px', 
                borderRadius: '8px',
                fontSize: '14px',
                cursor: 'pointer'
              }} />
            )}
          </div>
          <button
            onClick={onToggleSettings}
            className="relative w-10 h-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--primary-blue)]"
            aria-label="Open settings"
            data-magnetic
          >
            <Settings size={20} />
          </button>
        </div>
      </div>
    </header>
  );
};
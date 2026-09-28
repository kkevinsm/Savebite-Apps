"use client";

import { Home, ChefHat, FileText, User } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';

export default function BottomNav() {
  const pathname = usePathname();
  const { t } = useLanguage();

  const navItems = [
    { href: '/', icon: Home, label: t.nav_home },
    { href: '/my-kitchen', icon: ChefHat, label: t.nav_kitchen },
    { href: '/receipt', icon: FileText, label: t.nav_receipt },
    { href: '/profile', icon: User, label: t.nav_profile },
  ];

  // Full-screen pages that shouldn't have a bottom nav
  if (pathname === '/scan' || pathname === '/login') return null;

  return (
    <div className="absolute bottom-0 w-full bg-white border-t border-gray-100 flex justify-around items-end pb-6 pt-3 px-2 z-50">
      {navItems.map(({ href, icon: Icon, label }) => {
        const isActive = pathname === href;
        return (
          <Link
            key={href}
            href={href}
            className="flex flex-col items-center gap-1 flex-1 transition-colors"
          >
            <Icon
              className={`w-6 h-6 transition-colors ${isActive ? 'text-primary-600' : 'text-gray-400'}`}
              strokeWidth={isActive ? 2.5 : 1.8}
            />
            <span
              className={`text-[10px] font-semibold transition-colors ${isActive ? 'text-primary-600' : 'text-gray-400'}`}
            >
              {label}
            </span>
          </Link>
        );
      })}
    </div>
  );
}

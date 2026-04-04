"use client";
import React, { createContext, useContext, useState } from 'react';
import { strings } from '@/i18n/strings';
import type { Lang, Strings } from '@/i18n/strings';

interface LangContextType {
  lang: Lang;
  t: Strings;
  toggleLang: () => void;
}

const LangContext = createContext<LangContextType>({
  lang: 'zh',
  t: strings.zh,
  toggleLang: () => {},
});

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>(() => {
    if (typeof window === 'undefined') return 'zh';
    const stored = localStorage.getItem('nio-lang') as Lang | null;
    return (stored === 'en' || stored === 'zh') ? stored : 'zh';
  });

  const toggleLang = () => {
    setLang(prev => {
      const next = prev === 'zh' ? 'en' : 'zh';
      localStorage.setItem('nio-lang', next);
      return next;
    });
  };

  return (
    <LangContext.Provider value={{ lang, t: strings[lang], toggleLang }}>
      {children}
    </LangContext.Provider>
  );
}

export const useLang = () => useContext(LangContext);


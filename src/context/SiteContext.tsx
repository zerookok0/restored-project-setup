import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { SiteData, defaultSiteData } from '../data/default-content';

interface SiteContextType {
  data: SiteData;
  updateData: (newData: SiteData) => void;
  updateSection: <K extends keyof SiteData>(section: K, content: Partial<SiteData[K]>) => void;
  resetData: () => void;
}

const SiteContext = createContext<SiteContextType | undefined>(undefined);

export function SiteProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<SiteData>(() => {
    try {
      const saved = localStorage.getItem('site-data');
      if (saved) {
        const parsed = JSON.parse(saved);
        // Deep-merge: defaults first, then overwrite only keys that exist in saved data
        // This ensures newly added fields (productShowcase, productList) are never missing
        const merged: SiteData = { ...defaultSiteData };
        for (const key of Object.keys(defaultSiteData) as Array<keyof SiteData>) {
          if (parsed.hasOwnProperty(key) && parsed[key] != null) {
            (merged as any)[key] = { ...(defaultSiteData as any)[key], ...parsed[key] };
          }
        }
        return merged;
      }
    } catch (e) {
      console.warn('Failed to load saved site data:', e);
    }
    return defaultSiteData;
  });

  useEffect(() => {
    try {
      localStorage.setItem('site-data', JSON.stringify(data));
    } catch (e) {
      console.warn('Failed to save site data:', e);
    }
  }, [data]);

  const updateData = useCallback((newData: SiteData) => {
    setData(newData);
  }, []);

  const updateSection = useCallback(<K extends keyof SiteData>(section: K, content: Partial<SiteData[K]>) => {
    setData(prev => ({
      ...prev,
      [section]: { ...prev[section], ...content },
    }));
  }, []);

  const resetData = useCallback(() => {
    setData(defaultSiteData);
    localStorage.removeItem('site-data');
  }, []);

  return (
    <SiteContext.Provider value={{ data, updateData, updateSection, resetData }}>
      {children}
    </SiteContext.Provider>
  );
}

export function useSiteData() {
  const ctx = useContext(SiteContext);
  if (!ctx) throw new Error('useSiteData must be used within SiteProvider');
  return ctx;
}

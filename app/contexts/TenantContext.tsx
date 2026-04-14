"use client";

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { getTenantProfile, TenantProfile } from '../../lib/dristaService';

interface TenantContextType {
  tenantProfile: TenantProfile | null;
  loading: boolean;
  error: string | null;
}

const TenantContext = createContext<TenantContextType | undefined>(undefined);

export function TenantProvider({ children }: { children: ReactNode }) {
  const [tenantProfile, setTenantProfile] = useState<TenantProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const profile = await getTenantProfile();
        if (profile) {
          setTenantProfile(profile);
        }
      } catch (err: any) {
        console.error('[TenantContext] Failed to fetch tenant profile:', err);
        setError(err.message || 'Failed to load profile');
      } finally {
        setLoading(false);
      }
    }

    fetchProfile();
  }, []);

  return (
    <TenantContext.Provider value={{ tenantProfile, loading, error }}>
      {children}
    </TenantContext.Provider>
  );
}

export function useTenant() {
  const context = useContext(TenantContext);
  if (context === undefined) {
    throw new Error('useTenant must be used within a TenantProvider');
  }
  return context;
}

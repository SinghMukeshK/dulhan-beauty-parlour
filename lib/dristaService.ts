export type DristaServiceItem = {
  id: string;
  name: string;
  description?: string;
  selling_price?: number;
  item_category?: string;
  item_type?: { name?: string } | null;
  images?: Array<{ url?: string; is_primary?: boolean }>;
};

export type TenantProfile = {
  id: string;
  name: string;
  subdomain: string;
  logo_url?: string;
  email: string;
  phone?: string;
  emails: string[];
  contact_numbers: string[];
  contact_address?: {
    line1: string;
    line2?: string;
    city: string;
    state: string;
    postal_code: string;
    country: string;
    type: string;
  };
  settings?: {
    social?: {
      facebook?: string;
      instagram?: string;
      twitter?: string;
      linkedin?: string;
      youtube?: string;
    };
  };
};

export type Album = {
  id: string;
  title: string;
  description?: string;
  cover_image_url?: string;
  Media?: Array<{
    id: string;
    file_url: string;
    media_type: string;
    caption?: string;
  }>;
};

const DRISTA_API_BASE_URL = (process.env.DRISTA_API_BASE_URL || process.env.NEXT_PUBLIC_DRISTA_API_BASE_URL || process.env.NEXT_PUBLIC_API_URL?.replace(/\/v1\/?$/, '') || 'https://api.drista.in').replace(/\/+$/, '');
const DRISTA_API_KEY = process.env.DRISTA_API_KEY || process.env.NEXT_PUBLIC_DRISTA_API_KEY || '';
const TENANT_ID = process.env.NEXT_PUBLIC_TENANT_ID || '5bf64b35-e575-4a2c-98a6-248d1b1e4879';

/**
 * Shared Fetch Utility
 * Automatically injects API Key and Tenant ID headers.
 */
async function dristaFetch(endpoint: string, options: RequestInit = {}) {
  if (!DRISTA_API_KEY) {
    console.warn('[DristaService] DRISTA_API_KEY is not set.');
  }

  const url = endpoint.startsWith('http') ? endpoint : `${DRISTA_API_BASE_URL}${endpoint.startsWith('/') ? '' : '/'}${endpoint}`;
  
  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'x-api-key': DRISTA_API_KEY,
    'tenant-id': TENANT_ID,
    ...(options.headers || {}),
  } as Record<string, string>;

  const response = await fetch(url, {
    ...options,
    headers,
  });

  const payload = await response.json();

  if (!response.ok) {
    const errorMsg = payload?.error || payload?.message || `HTTP ${response.status}`;
    throw new Error(errorMsg);
  }

  return payload;
}

/**
 * Fetch all products/services
 */
export async function getDristaServiceItems(): Promise<DristaServiceItem[]> {
  try {
    const payload = await dristaFetch('/v1/ecommerce/products', { cache: 'no-store' });
    return (payload?.data || []) as DristaServiceItem[];
  } catch (error) {
    console.error('[DristaService] getDristaServiceItems error:', error);
    return [];
  }
}

/**
 * Fetch tenant profile
 */
export async function getTenantProfile(): Promise<TenantProfile | null> {
  try {
    const payload = await dristaFetch('/v1/tenants/profile', { cache: 'no-store' });
    return (payload?.data || null) as TenantProfile;
  } catch (error) {
    console.error('[DristaService] getTenantProfile error:', error);
    return null;
  }
}

/**
 * Fetch gallery albums
 */
export async function getGalleryAlbums(): Promise<Album[]> {
  try {
    const payload = await dristaFetch('/v1/gallery/albums?is_published=true', { cache: 'no-store' });
    return (payload?.data || []) as Album[];
  } catch (error) {
    console.error('[DristaService] getGalleryAlbums error:', error);
    return [];
  }
}

/**
 * Submit an appointment
 */
export async function submitAppointment(data: any) {
  return dristaFetch('/v1/ecommerce/appointments', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

/**
 * Submit a contact inquiry
 */
export async function submitContactInquiry(data: any) {
  return dristaFetch('/v1/contact/submit', {
    method: 'POST',
    body: JSON.stringify({
      ...data,
      inquiryType: data.subject || 'general'
    }),
  });
}

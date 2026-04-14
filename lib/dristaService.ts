export type DristaServiceItem = {
  id: string;
  name: string;
  description?: string;
  selling_price?: number;
  item_category?: string;
  item_type?: { name?: string } | null;
  images?: Array<{ url?: string }>;
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

const DRISTA_API_BASE_URL = (process.env.DRISTA_API_BASE_URL || process.env.NEXT_PUBLIC_DRISTA_API_BASE_URL || 'http://localhost:3000').replace(/\/+$/, '');
// Prefer the server-only key (not exposed to browser bundle); fall back to the public key for
// environments that only configure NEXT_PUBLIC_DRISTA_API_KEY.
const DRISTA_API_KEY = process.env.DRISTA_API_KEY || process.env.NEXT_PUBLIC_DRISTA_API_KEY || '';
const TENANT_ID = process.env.NEXT_PUBLIC_TENANT_ID || '5bf64b35-e575-4a2c-98a6-248d1b1e4879';

export async function getDristaServiceItems(): Promise<DristaServiceItem[]> {
  if (!DRISTA_API_KEY) {
    console.warn('[DristaService] DRISTA_API_KEY is not set. Skipping remote fetch.');
    return [];
  }

  const endpoint = `${DRISTA_API_BASE_URL}/v1/ecommerce/products`;

  try {
    const response = await fetch(endpoint, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'x-api-key': DRISTA_API_KEY,
        'tenant-id': TENANT_ID,
      },
      cache: 'no-store',
    });

    const payload = await response.json();

    if (!response.ok) {
      console.error('[DristaService] Backend fetch failed', response.status, payload);
      return [];
    }

    if (!Array.isArray(payload?.data)) {
      console.warn('[DristaService] Unexpected API response shape', payload);
      return [];
    }

    return payload.data as DristaServiceItem[];
  } catch (error) {
    console.error('[DristaService] Fetch error', error);
    return [];
  }
}

export async function getTenantProfile(): Promise<TenantProfile | null> {
  const DRISTA_API_KEY = process.env.DRISTA_API_KEY || process.env.NEXT_PUBLIC_DRISTA_API_KEY || '';
  if (!DRISTA_API_KEY) {
    console.warn('[DristaService] DRISTA_API_KEY is not set. Skipping profile fetch.');
    return null;
  }

  const endpoint = `${DRISTA_API_BASE_URL}/v1/tenants/profile`;

  try {
    const response = await fetch(endpoint, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'x-api-key': DRISTA_API_KEY,
        'tenant-id': TENANT_ID,
      },
      cache: 'no-store',
    });

    const payload = await response.json();

    if (!response.ok) {
      console.error('[DristaService] Tenant profile fetch failed', response.status, payload);
      return null;
    }

    return payload.data as TenantProfile;
  } catch (error) {
    console.error('[DristaService] Tenant profile fetch error', error);
    return null;
  }
}

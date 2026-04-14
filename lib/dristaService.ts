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
 * Transforms internal s3:// URLs into public HTTPS URLs.
 * This serves as a safety net if the backend fails to provide presigned URLs.
 */
export function resolveServiceImageUrl(url: string | undefined): string | undefined {
  if (!url) return url;
  if (url.startsWith('s3://')) {
    // Extract bucket and key: s3://bucket-name/key/path/file.jpg
    const withoutProtocol = url.substring(5);
    const firstSlash = withoutProtocol.indexOf('/');
    if (firstSlash !== -1) {
      const bucket = withoutProtocol.substring(0, firstSlash);
      const key = withoutProtocol.substring(firstSlash + 1);
      // Construct public S3 URL (assuming us-east-1 based on backend .env, or generic s3.amazonaws.com)
      return `https://${bucket}.s3.amazonaws.com/${key}`;
    }
  }
  return url;
}

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
    const items = (payload?.data || []) as DristaServiceItem[];
    
    // Resolve any s3:// images that reached the frontend
    return items.map(item => ({
      ...item,
      images: item.images?.map(img => ({
        ...img,
        url: resolveServiceImageUrl(img.url)
      }))
    }));
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
    const profile = (payload?.data || null) as TenantProfile;
    if (profile && profile.logo_url) {
      profile.logo_url = resolveServiceImageUrl(profile.logo_url)!;
    }
    return profile;
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
    const albums = (payload?.data || []) as Album[];

    // Resolve any s3:// images in the gallery
    return albums.map(album => ({
      ...album,
      cover_image_url: resolveServiceImageUrl(album.cover_image_url),
      Media: album.Media?.map(m => ({
        ...m,
        file_url: resolveServiceImageUrl(m.file_url) || m.file_url
      }))
    }));
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

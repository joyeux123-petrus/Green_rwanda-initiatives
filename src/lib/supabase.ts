/// <reference types="vite/client" />

/**
 * Supabase Storage Service
 * Uses standard REST API for zero-dependency, lightweight image uploads.
 * No credit card or Blaze plan required (Free Tier includes 1GB Storage).
 */

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';
const storageBucket = import.meta.env.VITE_SUPABASE_STORAGE_BUCKET || 'gri-images';

export function isSupabaseConfigured(): boolean {
  return Boolean(supabaseUrl && supabaseAnonKey);
}

/**
 * Uploads a file directly to Supabase Storage via REST API
 * @param file File object to upload
 * @param folder Folder name inside the bucket (e.g. 'news', 'programs', 'gallery')
 * @returns Public URL of the uploaded image
 */
export async function uploadToSupabase(file: File, folder: string = 'uploads'): Promise<string> {
  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error("Supabase is not configured. Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY in environment variables.");
  }

  // Clean filename: remove special characters and spaces
  const cleanFileName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
  const filePath = `${folder}/${Date.now()}_${cleanFileName}`;

  // Supabase Storage REST endpoint for object upload
  const baseUrl = supabaseUrl.replace(/\/$/, '');
  const uploadEndpoint = `${baseUrl}/storage/v1/object/${storageBucket}/${filePath}`;

  const response = await fetch(uploadEndpoint, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${supabaseAnonKey}`,
      'apikey': supabaseAnonKey,
      'Content-Type': file.type || 'application/octet-stream',
      'x-upsert': 'true'
    },
    body: file
  });

  if (!response.ok) {
    const errorText = await response.text();
    let detail = errorText;
    try {
      const parsed = JSON.parse(errorText);
      if (parsed.message) {
        detail = parsed.message;
      }
    } catch (e) {
      // keep raw error text
    }

    if (detail.includes("row-level security policy")) {
      throw new Error(`Supabase Storage RLS Policy Error: Uploads to bucket '${storageBucket}' are blocked by Row Level Security. Please add an INSERT policy in Supabase Console -> Storage -> Policies.`);
    }

    throw new Error(`Supabase Storage Upload Error (${response.status}): ${detail}`);
  }

  // Return public URL for the uploaded image
  return `${baseUrl}/storage/v1/object/public/${storageBucket}/${filePath}`;
}

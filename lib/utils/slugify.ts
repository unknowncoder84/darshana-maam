import { createClient } from '@/lib/supabase/server';

/**
 * Generates a URL-friendly slug from a title
 * - Converts to lowercase
 * - Replaces spaces with hyphens
 * - Removes special characters except hyphens
 */
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special characters except spaces and hyphens
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
}

/**
 * Ensures slug uniqueness by appending a numeric suffix if needed
 * @param slug - The base slug to check
 * @param table - The table name ('news', 'articles', or 'videos')
 * @param excludeId - Optional ID to exclude from uniqueness check (for updates)
 * @returns A unique slug
 */
export async function ensureUniqueSlug(
  slug: string,
  table: 'news' | 'articles' | 'videos',
  excludeId?: string
): Promise<string> {
  const supabase = await createClient();
  let uniqueSlug = slug;
  let counter = 2;

  while (true) {
    // Check if slug exists
    let query = supabase.from(table).select('id').eq('slug', uniqueSlug);

    // Exclude current item if updating
    if (excludeId) {
      query = query.neq('id', excludeId);
    }

    const { data, error } = await query.single();

    // If no data found, slug is unique
    if (error || !data) {
      return uniqueSlug;
    }

    // Slug exists, append counter
    uniqueSlug = `${slug}-${counter}`;
    counter++;
  }
}

/**
 * Generates a unique slug from a title
 * Combines generateSlug and ensureUniqueSlug
 */
export async function generateUniqueSlug(
  title: string,
  table: 'news' | 'articles' | 'videos',
  excludeId?: string
): Promise<string> {
  const baseSlug = generateSlug(title);
  return await ensureUniqueSlug(baseSlug, table, excludeId);
}

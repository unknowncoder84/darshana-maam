'use server';

import { createClient } from '@/lib/supabase/server';
import { FirmSettings, SocialLinks, Profile, Database } from '@/lib/types/database';
import { revalidatePath } from 'next/cache';

export interface UpdateSettingsData {
  firm_name: string;
  address?: string;
  phone?: string;
  email?: string;
  social_links?: SocialLinks;
}

/**
 * Gets the firm settings
 * Public access for displaying on website
 */
export async function getSettings(): Promise<{
  success: boolean;
  data?: FirmSettings;
  error?: string;
}> {
  try {
    const supabase = await createClient();

    const { data: settings, error } = await supabase
      .from('settings')
      .select('*')
      .single();

    if (error) {
      // If no settings exist, return default values
      if (error.code === 'PGRST116') {
        return {
          success: true,
          data: {
            id: '',
            firm_name: 'Law Firm',
            address: '',
            phone: '',
            email: '',
            social_links: {},
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
        };
      }
      console.error('Error getting settings:', error);
      return { success: false, error: error.message };
    }

    return { success: true, data: settings };
  } catch (error) {
    console.error('Error getting settings:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Updates the firm settings
 * Admin only
 */
export async function updateSettings(
  data: UpdateSettingsData
): Promise<{ success: boolean; data?: FirmSettings; error?: string }> {
  try {
    const supabase = await createClient();

    // Check authentication
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      return { success: false, error: 'Unauthorized' };
    }

    // Check if user is admin
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single<Pick<Profile, 'role'>>();

    if (profileError || !profile || profile.role !== 'admin') {
      return { success: false, error: 'Unauthorized - Admin access required' };
    }

    // Check if settings exist
    const { data: existingSettings } = await supabase
      .from('settings')
      .select('id')
      .single();

    let settings: FirmSettings;

    if (existingSettings) {
      // Update existing settings
      const { data: updatedSettings, error } = await supabase
        .from('settings')
        // @ts-ignore - Bypass Supabase type inference issue
        .update({
          firm_name: data.firm_name,
          address: data.address,
          phone: data.phone,
          email: data.email,
          social_links: data.social_links || {},
          updated_at: new Date().toISOString(),
        })
        // @ts-ignore
        .eq('id', existingSettings.id)
        .select()
        .single();

      if (error) {
        console.error('Error updating settings:', error);
        return { success: false, error: error.message };
      }

      settings = updatedSettings;
    } else {
      // Create new settings
      const { data: newSettings, error } = await supabase
        .from('settings')
        // @ts-ignore - Bypass Supabase type inference issue
        .insert({
          firm_name: data.firm_name,
          address: data.address,
          phone: data.phone,
          email: data.email,
          social_links: data.social_links || {},
        })
        .select()
        .single();

      if (error) {
        console.error('Error creating settings:', error);
        return { success: false, error: error.message };
      }

      settings = newSettings;
    }

    // Revalidate all pages that might display settings
    revalidatePath('/');
    revalidatePath('/about');
    revalidatePath('/contact');
    revalidatePath('/admin/settings');

    return { success: true, data: settings };
  } catch (error) {
    console.error('Error updating settings:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

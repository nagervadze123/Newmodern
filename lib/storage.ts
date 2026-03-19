import { supabase } from './supabase'

export type StorageBucket = 'product-images' | 'hero-images'

export async function uploadImage(
  file: File,
  bucket: StorageBucket
): Promise<string> {
  const ext = file.name.split('.').pop()?.toLowerCase() || 'jpg'
  const filename = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`

  const { error } = await supabase.storage.from(bucket).upload(filename, file, {
    cacheControl: '3600',
    upsert: false,
  })

  if (error) throw new Error(error.message)

  const { data } = supabase.storage.from(bucket).getPublicUrl(filename)
  return data.publicUrl
}

export function getStorageUrl(bucket: StorageBucket, filename: string): string {
  const { data } = supabase.storage.from(bucket).getPublicUrl(filename)
  return data.publicUrl
}

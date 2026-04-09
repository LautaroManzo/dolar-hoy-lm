import { MetadataRoute } from 'next'
import { supabase } from '@/app/lib/supabase'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://dolarinfohoy.com.ar'

  const fechaArgentina = new Date(
    new Date().toLocaleString('en-US', { timeZone: 'America/Argentina/Buenos_Aires' })
  )

  const { data: posts } = await supabase
    .from('posts')
    .select('slug, created_at')
    .not('slug', 'is', null)

  const postEntries: MetadataRoute.Sitemap = (posts ?? []).map((post) => ({
    url: `${baseUrl}/noticia/${post.slug}`,
    lastModified: new Date(post.created_at),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [
    {
      url: baseUrl,
      lastModified: fechaArgentina,
      changeFrequency: 'hourly',
      priority: 1,
    },
    ...postEntries,
  ]
}

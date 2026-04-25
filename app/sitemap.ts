import { MetadataRoute } from 'next'
import { supabase } from '@/app/lib/supabase'
import { getFechaArgentina } from '@/app/utils/site'
import { DOLAR_PAGE_LIST } from '@/app/constants/dolarPageContent'

export const dynamic = 'force-dynamic'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://dolarinfohoy.com.ar'
  const fechaArgentina = getFechaArgentina()

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

  const dolarTypeEntries: MetadataRoute.Sitemap = DOLAR_PAGE_LIST.map(page => ({
    url: `${baseUrl}/${page.slug}`,
    lastModified: fechaArgentina,
    changeFrequency: 'hourly' as const,
    priority: 0.9,
  }))

  return [
    {
      url: baseUrl,
      lastModified: fechaArgentina,
      changeFrequency: 'hourly',
      priority: 1,
    },
    ...dolarTypeEntries,
    ...postEntries,
  ]
}

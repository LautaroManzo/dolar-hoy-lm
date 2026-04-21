import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Calendar, ArrowLeft, Newspaper } from 'lucide-react'
import { supabase } from '@/app/lib/supabase'

export async function generateStaticParams() {
  const { data: posts } = await supabase
    .from('posts')
    .select('slug')
    .not('slug', 'is', null)

  return (posts ?? []).map((post) => ({ id: post.slug }))
}

interface PageProps {
  params: Promise<{ id: string }>
}

interface Post {
  id: number;
  title: string;
  resumen_noticia: string;
  content: string;
  category: string;
  image_url: string | null;
  created_at: string;
  source_name?: string | null;
  source_url?: string | null;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id: slug } = await params;

  if (!slug || slug === 'undefined') {
    return {
      title: 'Noticia no encontrada',
      description: 'El slug de la noticia no es válido.',
    }
  }

  const { data: post } = await supabase
    .from('posts')
    .select('title, resumen_noticia, content, category, image_url, created_at')
    .eq('slug', slug)
    .single()

  if (!post) {
    const titleFromSlug = slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    const { data: fallbackPost } = await supabase
      .from('posts')
      .select('title, resumen_noticia, content, category, image_url, created_at')
      .ilike('title', `%${titleFromSlug}%`)
      .single()

    if (!fallbackPost) {
      return {
        title: 'Noticia no encontrada',
      }
    }

    return {
      title: `${fallbackPost.title} | Dólar Hoy`,
      description: fallbackPost.resumen_noticia,
      alternates: {
        canonical: `https://dolarinfohoy.com.ar/noticia/${slug}`,
      },
      openGraph: {
        title: fallbackPost.title,
        description: fallbackPost.resumen_noticia,
        type: 'article',
        locale: 'es_AR',
        url: `https://dolarinfohoy.com.ar/noticia/${slug}`,
        publishedTime: fallbackPost.created_at,
        images: fallbackPost.image_url
          ? [{ url: fallbackPost.image_url, width: 1200, height: 630, alt: fallbackPost.title }]
          : [],
      },
      twitter: {
        card: 'summary_large_image',
        title: fallbackPost.title,
        description: fallbackPost.resumen_noticia,
        images: fallbackPost.image_url ? [fallbackPost.image_url] : [],
      },
    }
  }

  return {
    title: `${post.title} | Dólar Hoy`,
    description: post.resumen_noticia,
    alternates: {
      canonical: `https://dolarinfohoy.com.ar/noticia/${slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.resumen_noticia,
      type: 'article',
      locale: 'es_AR',
      url: `https://dolarinfohoy.com.ar/noticia/${slug}`,
      publishedTime: post.created_at,
      images: post.image_url
        ? [{ url: post.image_url, width: 1200, height: 630, alt: post.title }]
        : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.resumen_noticia,
      images: post.image_url ? [post.image_url] : [],
    },
  }
}

export default async function NoticiaPage({ params }: PageProps) {
  const { id: slug } = await params;

  const { data: post, error } = await supabase
    .from('posts')
    .select('id, title, resumen_noticia, content, category, image_url, created_at')
    .eq('slug', slug)
    .single()

  if (error || !post) {
    const titleFromSlug = slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    const { data: fallbackPost, error: fallbackError } = await supabase
      .from('posts')
      .select('id, title, resumen_noticia, content, category, image_url, created_at')
      .ilike('title', `%${titleFromSlug}%`)
      .single()

    if (fallbackError || !fallbackPost) {
      notFound()
    }

    const fallbackJsonLd = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "NewsArticle",
          "headline": fallbackPost.title,
          "description": fallbackPost.resumen_noticia,
          "image": fallbackPost.image_url,
          "datePublished": fallbackPost.created_at,
          "dateModified": fallbackPost.created_at,
          "author": { "@type": "Organization", "name": "DolarInfoHoy", "url": "https://dolarinfohoy.com.ar" },
          "publisher": { "@type": "Organization", "name": "DolarInfoHoy", "url": "https://dolarinfohoy.com.ar", "logo": { "@type": "ImageObject", "url": "https://dolarinfohoy.com.ar/icons/money.svg" } },
          "mainEntityOfPage": { "@type": "WebPage", "@id": `https://dolarinfohoy.com.ar/noticia/${slug}` }
        },
        {
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Inicio", "item": "https://dolarinfohoy.com.ar" },
            { "@type": "ListItem", "position": 2, "name": fallbackPost.title, "item": `https://dolarinfohoy.com.ar/noticia/${slug}` }
          ]
        }
      ]
    }

    return (
      <div className="bg-[#fcf7f8]">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(fallbackJsonLd) }} />
        <div className="max-w-6xl mx-auto px-4 py-10">

          <nav aria-label="Ruta de navegación" className="mb-6">
            <ol className="flex items-center gap-3 text-sm">
              <li>
                <Link href="/" className="flex items-center gap-3 text-slate-500 hover:text-slate-800 transition-colors">
                  <ArrowLeft size={13} />
                  Inicio
                </Link>
              </li>
              <li className="text-slate-400 select-none" aria-hidden="true">/</li>
              <li className="text-[#1a3a52] font-medium truncate max-w-[200px] sm:max-w-xs">{fallbackPost.title}</li>
            </ol>
          </nav>

          <article className="bg-white rounded-2xl shadow-sm overflow-hidden">

            <div className="relative h-96 w-full">
              {fallbackPost.image_url ? (
                <Image
                  src={fallbackPost.image_url}
                  alt={fallbackPost.title}
                  fill
                  sizes="(max-width: 1152px) 100vw, 1152px"
                  className="object-cover"
                  priority
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-slate-100">
                  <Newspaper className="h-24 w-24 text-slate-300" />
                </div>
              )}
            </div>

            <div className="p-6 sm:p-8">

              <div className="flex items-center gap-2 text-slate-500 mb-4">
                <Calendar size={16} />
                <time dateTime={new Date(fallbackPost.created_at).toISOString()} className="text-[12px] sm:text-sm font-medium">
                  {new Date(fallbackPost.created_at).toLocaleDateString('es-AR', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })}
                </time>
              </div>

              <h1 className="mb-4 text-xl sm:text-3xl font-bold text-slate-900 leading-tight">
                {fallbackPost.title}
              </h1>

              <div className="max-w-none">
                {fallbackPost.content ? (
                  <div className="text-slate-700 leading-relaxed space-y-2 text-sm sm:text-base">
                    {fallbackPost.content.split('\n\n').map((paragraph: string, i: number) => (
                      <p key={i} className="mb-3">
                        {paragraph.split('\n').map((line: string, j: number, arr: string[]) => (
                          <span key={j}>{line}{j < arr.length - 1 && <br />}</span>
                        ))}
                      </p>
                    ))}
                  </div>
                ) : (
                  <div className="text-slate-700 leading-relaxed space-y-3 text-sm sm:text-base">
                    <p className="text-sm italic text-slate-500">
                      El contenido completo de esta noticia no está disponible en este momento.
                    </p>
                    <p>
                      {fallbackPost.resumen_noticia}
                    </p>
                  </div>
                )}
              </div>

              {(fallbackPost as Post).source_name && (
                <p className="mt-6 text-xs text-slate-400 border-t pt-4">
                  Fuente:{' '}
                  {(fallbackPost as Post).source_url ? (
                    <a
                      href={(fallbackPost as Post).source_url!}
                      rel="nofollow noopener"
                      target="_blank"
                      className="hover:underline"
                    >
                      {(fallbackPost as Post).source_name}
                    </a>
                  ) : (
                    (fallbackPost as Post).source_name
                  )}
                </p>
              )}

            </div>

          </article>

        </div>

      </div>
    )
  }

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "NewsArticle",
        "headline": post.title,
        "description": post.resumen_noticia,
        "image": post.image_url,
        "datePublished": post.created_at,
        "dateModified": post.created_at,
        "author": { "@type": "Organization", "name": "DolarInfoHoy", "url": "https://dolarinfohoy.com.ar" },
        "publisher": { "@type": "Organization", "name": "DolarInfoHoy", "url": "https://dolarinfohoy.com.ar", "logo": { "@type": "ImageObject", "url": "https://dolarinfohoy.com.ar/icons/money.svg" } },
        "mainEntityOfPage": { "@type": "WebPage", "@id": `https://dolarinfohoy.com.ar/noticia/${slug}` }
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Inicio", "item": "https://dolarinfohoy.com.ar" },
          { "@type": "ListItem", "position": 2, "name": post.title, "item": `https://dolarinfohoy.com.ar/noticia/${slug}` }
        ]
      }
    ]
  }

  return (
    <div className="bg-[#fcf7f8]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <div className="max-w-6xl mx-auto px-4 py-10">

        <nav aria-label="Ruta de navegación" className="mb-6">
          <ol className="flex items-center gap-3 text-sm">
            <li>
              <Link href="/" className="flex items-center gap-3 text-slate-500 hover:text-slate-800 transition-colors">
                <ArrowLeft size={13} />
                Inicio
              </Link>
            </li>
            <li className="text-slate-400 select-none" aria-hidden="true">/</li>
            <li className="text-[#1a3a52] font-medium truncate max-w-[200px] sm:max-w-xs">{post.title}</li>
          </ol>
        </nav>

        <article className="bg-white rounded-2xl shadow-sm overflow-hidden">

          <div className="relative h-96 w-full">
            {post.image_url ? (
              <Image
                src={post.image_url}
                alt={post.title}
                fill
                sizes="(max-width: 1152px) 100vw, 1152px"
                className="object-cover"
                priority
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-slate-100">
                <Newspaper className="h-24 w-24 text-slate-300" />
              </div>
            )}
          </div>

          <div className="p-6 sm:p-8">

            <div className="flex items-center gap-2 text-slate-500 mb-4">
              <Calendar size={16} />
              <time dateTime={new Date(post.created_at).toISOString()} className="text-[12px] sm:text-sm font-medium">
                {new Date(post.created_at).toLocaleDateString('es-AR', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                })}
              </time>
            </div>

            <h1 className="mb-4 text-xl sm:text-3xl font-bold text-slate-900 leading-tight">
              {post.title}
            </h1>

            <div className="max-w-none">
              {post.content ? (
                <div className="text-slate-700 leading-relaxed space-y-2 text-sm sm:text-base">
                  {post.content.split('\n\n').map((paragraph: string, i: number) => (
                    <p key={i} className="mb-3">
                      {paragraph.split('\n').map((line: string, j: number, arr: string[]) => (
                        <span key={j}>{line}{j < arr.length - 1 && <br />}</span>
                      ))}
                    </p>
                  ))}
                </div>
              ) : (
                <div className="text-slate-700 leading-relaxed space-y-3 text-sm sm:text-base">
                  <p className="text-sm italic text-slate-500">
                    El contenido completo de esta noticia no está disponible en este momento.
                  </p>
                  <p>
                    {post.resumen_noticia}
                  </p>
                </div>
              )}
            </div>

            {(post as Post).source_name && (
              <p className="mt-6 text-xs text-slate-400 border-t pt-4">
                Fuente:{' '}
                {(post as Post).source_url ? (
                  <a
                    href={(post as Post).source_url!}
                    rel="nofollow noopener"
                    target="_blank"
                    className="hover:underline"
                  >
                    {(post as Post).source_name}
                  </a>
                ) : (
                  (post as Post).source_name
                )}
              </p>
            )}

          </div>

        </article>

      </div>

    </div>
  )
}

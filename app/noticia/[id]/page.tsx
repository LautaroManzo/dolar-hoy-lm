import { Metadata } from 'next'

export const revalidate = 3600;
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Calendar, ArrowLeft, Newspaper, ExternalLink } from 'lucide-react'
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
  published_at?: string | null;
  source_name?: string | null;
  source_url?: string | null;
}

const POST_COLUMNS = 'id, title, resumen_noticia, content, category, image_url, created_at, published_at, source_name, source_url' as const;

async function findPost(slug: string): Promise<Post | null> {
  const { data } = await supabase
    .from('posts')
    .select(POST_COLUMNS)
    .eq('slug', slug)
    .single()

  if (data) return data as Post;

  const titleFromSlug = slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  const { data: fallback } = await supabase
    .from('posts')
    .select(POST_COLUMNS)
    .ilike('title', `%${titleFromSlug}%`)
    .single()

  return (fallback as Post) ?? null;
}

function buildArticleJsonLd(post: Post, slug: string) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "NewsArticle",
        "headline": post.title,
        "description": post.resumen_noticia,
        "image": post.image_url,
        "datePublished": post.published_at ?? post.created_at,
        "dateModified": post.published_at ?? post.created_at,
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
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id: slug } = await params;

  if (!slug || slug === 'undefined') {
    return {
      title: 'Noticia no encontrada',
      description: 'El slug de la noticia no es válido.',
    }
  }

  const post = await findPost(slug);

  if (!post) {
    return { title: 'Noticia no encontrada' }
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
      publishedTime: post.published_at ?? post.created_at,
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

  const post = await findPost(slug);

  if (!post) notFound();

  const articleJsonLd = buildArticleJsonLd(post, slug);

  return (
    <div className="bg-brand-bg">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd).replace(/</g, '\\u003c') }} />
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
            <li className="text-brand-primary font-medium truncate max-w-[200px] sm:max-w-xs">{post.title}</li>
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

            <div className="flex items-center justify-between gap-2 text-slate-500 mb-4">
              <div className="flex items-center gap-2">
                <Calendar size={16} />
                <time dateTime={new Date(post.published_at ?? post.created_at).toISOString()} className="text-[12px] sm:text-sm font-medium">
                  {new Date(post.published_at ?? post.created_at).toLocaleDateString('es-AR', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })}
                </time>
              </div>
              {post.source_name && (
                <div className="flex items-center gap-1 text-[12px] sm:text-sm">
                  {post.source_url ? (
                    <a
                      href={post.source_url}
                      rel="nofollow noopener"
                      target="_blank"
                      className="flex items-center gap-1 hover:text-slate-800 transition-colors"
                    >
                      {post.source_name}
                      <ExternalLink size={12} />
                    </a>
                  ) : (
                    <span>{post.source_name}</span>
                  )}
                </div>
              )}
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

          </div>

        </article>

      </div>

    </div>
  )
}

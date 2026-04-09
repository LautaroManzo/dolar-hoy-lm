import { createClient } from '@supabase/supabase-js'
import { Metadata } from 'next'
import Image from 'next/image'
import { Calendar, ArrowLeft } from 'lucide-react'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

interface PageProps {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id: slug } = await params;
  
  if (!slug || slug === 'undefined') {
    return {
      title: 'Noticia no encontrada',
      description: 'El slug de la noticia no es válido.',
    }
  }

  // Buscar por título que coincida con el slug
  const { data: post } = await supabase
    .from('posts')
    .select('title, resumen_noticia, content, category')
    .eq('slug', slug)
    .single()

  // Si no se encuentra por slug, intentar convertir el slug a título y buscar
  if (!post) {
    const titleFromSlug = slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    const { data: fallbackPost } = await supabase
      .from('posts')
      .select('title, resumen_noticia, content, category')
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
      openGraph: {
        title: fallbackPost.title,
        description: fallbackPost.resumen_noticia,
        type: 'article',
        locale: 'es_AR',
        url: `https://dolarinfohoy.com.ar/noticia/${slug}`,
      },
    }
  }

  return {
    title: `${post.title} | Dólar Hoy`,
    description: post.resumen_noticia,
    openGraph: {
      title: post.title,
      description: post.resumen_noticia,
      type: 'article',
      locale: 'es_AR',
      url: `https://dolarinfohoy.com.ar/noticia/${slug}`,
    },
  }
}

export default async function NoticiaPage({ params }: PageProps) {
  const { id: slug } = await params;
  
  // Primero intentar buscar por slug (si existe el campo)
  const { data: post, error } = await supabase
    .from('posts')
    .select('id, title, resumen_noticia, content, category, image_url, created_at')
    .eq('slug', slug)
    .single()

  // Si no se encuentra por slug, intentar buscar por título similar
  if (error || !post) {
    const titleFromSlug = slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    const { data: fallbackPost, error: fallbackError } = await supabase
      .from('posts')
      .select('id, title, resumen_noticia, content, category, image_url, created_at')
      .ilike('title', `%${titleFromSlug}%`)
      .single()

    if (fallbackError || !fallbackPost) {
      throw new Error('404 La noticia solicitada no está disponible o no existe en nuestro sistema.')
    }

    return (
      <div className="bg-[#fcf7f8]">
        <div className="max-w-6xl mx-auto px-4 py-10">

          <article className="bg-white rounded-2xl shadow-sm overflow-hidden">

            <div className="relative h-96 w-full">
              <Image
                src={fallbackPost.image_url}
                alt={fallbackPost.title}
                fill
                className="object-cover"
                priority
              />
            </div>

            <div className="p-6 sm:p-8">

              <div className="flex items-center gap-2 text-slate-500 mb-4">
                <Calendar size={16} />
                <span className="text-[12px] sm:text-sm font-medium">
                  {new Date(fallbackPost.created_at).toLocaleDateString('es-AR', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })}
                </span>
              </div>

              <h1 className="mb-4 text-xl sm:text-3xl font-bold text-slate-900 leading-tight">
                {fallbackPost.title}
              </h1>

              <div className="max-w-none">
                {fallbackPost.content ? (
                  <div className="text-slate-700 leading-relaxed space-y-2 text-sm sm:text-base">
                    {fallbackPost.content.split('\n\n').map((paragraph, i) => (
                      <p key={i} className="mb-3">
                        {paragraph.split('\n').map((line, j, arr) => (
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

            </div>

          </article>

        </div>

      </div>
    )
  }

  return (
    <div className="bg-[#fcf7f8]">
      <div className="max-w-6xl mx-auto px-4 py-10">

        <article className="bg-white rounded-2xl shadow-sm overflow-hidden">

          <div className="relative h-96 w-full">
            <Image
              src={post.image_url}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          <div className="p-6 sm:p-8">

            <div className="flex items-center gap-2 text-slate-500 mb-4">
              <Calendar size={16} />
              <span className="text-[12px] sm:text-sm font-medium">
                {new Date(post.created_at).toLocaleDateString('es-AR', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                })}
              </span>
            </div>

            <h1 className="mb-4 text-xl sm:text-3xl font-bold text-slate-900 leading-tight">
              {post.title}
            </h1>

            <div className="max-w-none">
              {post.content ? (
                <div className="text-slate-700 leading-relaxed space-y-2 text-sm sm:text-base">
                  {post.content.split('\n\n').map((paragraph, i) => (
                    <p key={i} className="mb-3">
                      {paragraph.split('\n').map((line, j, arr) => (
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

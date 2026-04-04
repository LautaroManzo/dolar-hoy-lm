import { createClient } from '@supabase/supabase-js'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { Calendar, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  
  if (!slug || slug === 'undefined') {
    return {
      title: 'Noticia no encontrada',
      description: 'El ID de la noticia no es válido.',
    }
  }

  const { data: post } = await supabase
    .from('posts')
    .select('title, resumen_noticia, content, category')
    .eq('id', slug)
    .single()

  if (!post) {
    return {
      title: 'Noticia no encontrada',
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
      url: `https://dolarinfohoy.com.ar/noticias/${slug}`,
    },
  }
}

export default async function NoticiaPage({ params }: PageProps) {
  const { slug } = await params;
  
  const { data: post, error } = await supabase
    .from('posts')
    .select('id, title, resumen_noticia, content, category, image_url, created_at')
    .eq('id', slug)
    .single()

  if (error || !post) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-[#fcf7f8]">
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

          <div className="p-8">

            <div className="flex items-center gap-2 text-slate-500 mb-4">
              <Calendar size={16} />
              <span className="text-sm font-medium">
                {new Date(post.created_at).toLocaleDateString('es-AR', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                })}
              </span>
            </div>

            <h1 className="text-4xl font-bold text-slate-900 mb-6 leading-tight">
              {post.title}
            </h1>

            <div className="prose prose-lg prose-slate max-w-none">
              {post.content ? (
                <div
                  className="text-slate-700 leading-relaxed space-y-6"
                  dangerouslySetInnerHTML={{ 
                    __html: post.content
                      .replace(/\n\n/g, '</p><p class="mb-4">')
                      .replace(/\n/g, '<br />')
                      .replace(/^/, '<p class="mb-4">')
                      .replace(/$/, '</p>')
                  }}
                />
              ) : (
                <div className="text-slate-700 leading-relaxed space-y-4">
                  <p className="text-lg italic text-slate-500">
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

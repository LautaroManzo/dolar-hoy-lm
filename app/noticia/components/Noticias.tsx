import { createClient } from '@supabase/supabase-js'
import NoticiaCard from './NoticiaCard';
import { Newspaper, TrendingUp, Calendar } from 'lucide-react';
import { createSlug } from '../../utils/slug';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default async function Noticias() {

  const { data: posts, error } = await supabase
    .from('posts')
    .select('id, title, resumen_noticia, content, category, image_url, created_at')
    .order('created_at', { ascending: false })
    .limit(2)

  if (error) return (
    <section className="max-w-7xl w-full mx-auto px-6 py-16 bg-gradient-to-br from-slate-50 to-blue-50/30">
      <div className="text-center p-8">
        <div className="mb-4 inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-2xl">
          <Newspaper className="w-8 h-8 text-red-600" />
        </div>
        <p className="text-red-600 font-medium text-lg mb-2">Error al cargar noticias</p>
        <p className="text-slate-500">{error.message}</p>
      </div>
    </section>
  )
  
  const hasPosts = posts && posts.length > 0;
  const isEmpty = !hasPosts;
  
  if (isEmpty) {
    return null;
  }
  
  return (
    <div className='w-full font-sans py-8 px-4'>
    
      <section className={`max-w-6xl mx-auto space-y-6 relative overflow-hidden`}>
  
        <header className="relative z-10 text-left">

        <h2 id="otras-cotizaciones" className="flex items-center mb-5 text-[#1a3a52] text-2xl tracking-wide opacity-70
            after:content-[''] after:flex-grow after:h-[1px] after:ml-6 
            after:bg-gradient-to-r after:from-transparent after:to-[#1a3a52]/15">
          Contexto actual
        </h2>

        </header>

        <div className="relative z-10">

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 py-4 px-1">
            {posts.map((post, index) => {
              const slug = createSlug(post.title);
              return (
                <div 
                  key={post.id} 
                  className="transform transition-all duration-700"
                  style={{
                    animationDelay: `${index * 150}ms`,
                    animation: 'fadeInUp 0.8s ease-out forwards'
                  }}
                >
                  <NoticiaCard post={post} slug={slug} />
                </div>
              );
            })}
          </div>
        
        </div>

      </section>

    </div>
  );
}
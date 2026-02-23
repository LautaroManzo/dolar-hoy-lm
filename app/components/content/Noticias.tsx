import { Calendar } from 'lucide-react';
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

const NewsCard = ({ post }: { post: any }) => {
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl border border-slate-100 cursor-pointer">

      <div className="relative h-60 w-full overflow-hidden">
        <img
          src={post.image_url}
          alt={post.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="mb-3 flex items-center gap-2 text-slate-400">
          <Calendar size={14} />
          <span className="text-xs font-medium">
            {new Date(post.created_at).toLocaleDateString('es-AR')}
          </span>
        </div>
        
        <h2 className="mb-3 text-xl font-bold leading-tight text-slate-900">
          {post.title}
        </h2>
        
        <p className="line-clamp-3 text-sm leading-relaxed text-slate-600">
          {post.resumen_noticia}
        </p>

      </div>
    </article>
  );
};

export default async function Noticias() {
  const { data: posts, error } = await supabase
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(2)

  if (error) return (
    <section className="max-w-6xl w-full mx-auto px-4 py-12 bg-slate-50">
      <p className="text-red-500 p-4 text-center">Error cargando noticias: {error.message}</p>
    </section>
  )
  
  if (!posts || posts.length === 0) {
    return (
      <section className="max-w-6xl w-full mx-auto px-4 py-12 bg-slate-50">
        <header className="mb-12 text-center">
          <div className="mb-2 flex justify-center">
            <span className="h-1.5 w-12 rounded-full bg-blue-600"></span>
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">
            Noticias Financieras <span className="text-blue-600">del Día</span>
          </h1>
          <p className="mt-4 text-slate-500 max-w-2xl mx-auto">
            Análisis exclusivo y actualizaciones en tiempo real de los mercados globales.
          </p>
        </header>
        <div className="p-12 text-center text-slate-500 border-2 border-dashed border-slate-200 rounded-2xl">
          No hay noticias disponibles en este momento.
        </div>
      </section>
    );
  }

  return (
    <section className="max-w-6xl w-full mx-auto px-4 py-12 bg-slate-200">
      <header className="mb-12 text-left">
         <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">
          Noticias Financieras del Día
        </h1>
      </header>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {posts.map((post) => (
          <NewsCard key={post.id} post={post} />
        ))}
      </div>
    </section>
  );
}
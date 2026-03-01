import { createClient } from '@supabase/supabase-js'
import NoticiaCard from './NoticiaCard';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

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
  
  const hasPosts = posts && posts.length > 0;
  const isEmpty = !hasPosts;
  
  return (
    <section className={`max-w-6xl w-full mx-auto px-4 py-12 ${isEmpty ? 'bg-slate-50' : 'bg-slate-200'}`}>
 
      <header className={`mb-12 ${isEmpty ? 'text-center' : 'text-left'}`}>
 
        {isEmpty && (
          <div className="mb-2 flex justify-center">
            <span className="h-1.5 w-12 rounded-full bg-blue-600"></span>
          </div>
        )}
 
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">
          Noticias Financieras {isEmpty && <span className="text-blue-600">del Día</span>}
        </h1>
 
        {isEmpty && (
          <p className="mt-4 text-slate-500 max-w-2xl mx-auto">
            Análisis exclusivo y actualizaciones en tiempo real de los mercados globales.
          </p>
        )}
 
      </header>
      
      {isEmpty ? (

        <div className="p-12 text-center text-slate-500 border-2 border-dashed border-slate-200 rounded-2xl">
          No hay noticias disponibles en este momento.
        </div>
      
      ) : (
 
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {posts.map((post) => (
            <NoticiaCard key={post.id} post={post} />
          ))}
        </div>
      
      )}
 
    </section>
  );
}
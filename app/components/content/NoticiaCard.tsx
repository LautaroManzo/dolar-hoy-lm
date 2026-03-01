import { Calendar } from 'lucide-react';

interface NoticiaCardProps {
  post: {
    id: string;
    title: string;
    resumen_noticia: string;
    image_url: string;
    created_at: string;
  };
}

export default function NoticiaCard({ post }: NoticiaCardProps) {
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
}

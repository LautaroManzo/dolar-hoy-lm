import Link from 'next/link';
import Image from 'next/image';
import { Calendar, TrendingUp, ArrowUpRight } from 'lucide-react';

interface NoticiaCardProps {
  post: {
    id: string;
    title: string;
    resumen_noticia: string;
    content: string;
    category: string;
    image_url: string;
    created_at: string;
  };
}

export default function NoticiaCard({ post }: NoticiaCardProps) {
  return (
    <Link
      href={`/noticias/${post.id}`}
      className="h-full group relative flex flex-col overflow-hidden rounded-3xl bg-white shadow-md transition-all duration-500 hover:-translate-y-3 hover:shadow-lg backdrop-blur-sm bg-gradient-to-br from-white via-white to-blue-50/30 border-b-4 border-[#2d5a7b] cursor-pointer"
    >
      <div className="relative h-72 w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <Image
          src={post.image_url}
          alt={post.title}
          fill
          className="object-cover transition-all duration-700 group-hover:scale-105"
          priority
        />
      </div>

      <div className="flex flex-1 flex-col p-7">
        
        <h2 className="mb-4 text-2xl font-semibold text-gray-900 tracking-wide leading-tight">
          {post.title}
        </h2>
        
        <p className="line-clamp-3 text-base leading-relaxed text-slate-600">
          {post.resumen_noticia}
        </p>

      </div>
    </Link>
  );
}
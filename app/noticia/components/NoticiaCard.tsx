'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Newspaper } from 'lucide-react';

interface NoticiaCardProps {
  post: {
    id: number;
    title: string;
    resumen_noticia: string;
    content: string;
    category: string;
    image_url: string | null;
    created_at: string;
    slug: string;
    source_name?: string | null;
    source_url?: string | null;
  };
  slug: string;
}

export default function NoticiaCard({ post, slug }: NoticiaCardProps) {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/noticia/${slug}`)}
      onKeyDown={(e) => e.key === 'Enter' && router.push(`/noticia/${slug}`)}
      role="article"
      tabIndex={0}
      className="h-full group relative flex flex-col overflow-hidden rounded-3xl bg-white shadow-md transition-all duration-500 hover:-translate-y-3 hover:shadow-lg backdrop-blur-sm bg-gradient-to-br from-white via-white to-blue-50/30 border-b-4 border-brand-secondary cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary"
    >
      <div className="relative h-72 w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        {post.image_url ? (
          <Image
            src={post.image_url}
            alt={post.title}
            fill
            className="object-cover transition-all duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-slate-100">
            <Newspaper className="h-16 w-16 text-slate-300" />
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-7">

        <h2 className="mb-3 text-lg sm:text-xl font-semibold text-gray-900 tracking-wide leading-tight">
          {post.title}
        </h2>

        <p className="text-sm sm:text-base leading-relaxed text-slate-600">
          {post.resumen_noticia}
        </p>

      </div>
    </div>
  );
}

import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import DolarTypePage from '@/app/components/DolarTypePage';
import { DOLAR_PAGE_CONTENT } from '@/app/constants/dolarPageContent';

export const revalidate = 60;
export const dynamicParams = false;

const VALID_TYPES = Object.keys(DOLAR_PAGE_CONTENT);

export function generateStaticParams() {
  return VALID_TYPES.map((type) => ({ type }));
}

interface PageProps {
  params: Promise<{ type: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { type } = await params;
  const content = DOLAR_PAGE_CONTENT[type];
  if (!content) return { title: 'No encontrado' };

  return {
    title: content.metaTitle,
    description: content.metaDescription,
    alternates: { canonical: `https://dolarinfohoy.com.ar/${content.slug}` },
    openGraph: {
      title: content.metaTitle,
      description: content.metaDescription,
      type: 'website',
      locale: 'es_AR',
      url: `https://dolarinfohoy.com.ar/${content.slug}`,
      siteName: 'DolarInfoHoy',
    },
    twitter: {
      card: 'summary_large_image',
      title: content.metaTitle,
      description: content.metaDescription,
    },
  };
}

export default async function DolarPage({ params }: PageProps) {
  const { type } = await params;
  const content = DOLAR_PAGE_CONTENT[type];
  if (!content) notFound();

  return <DolarTypePage content={content} />;
}

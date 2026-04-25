import { Metadata } from 'next';
import DolarTypePage from '@/app/components/DolarTypePage';
import { DOLAR_PAGE_CONTENT } from '@/app/constants/dolarPageContent';

const content = DOLAR_PAGE_CONTENT.mep;

export const revalidate = 60;

export const metadata: Metadata = {
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

export default function DolarMepPage() {
  return <DolarTypePage content={content} />;
}

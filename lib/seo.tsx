import type { Metadata } from 'next';
import { clinic } from './clinic';
export function seo(title: string, description: string, path: string): Metadata {
 const url = clinic.websiteUrl ? new URL(path, clinic.websiteUrl).href : undefined;
 return { title, description, alternates: url ? {canonical: url} : undefined, openGraph: {title: `${title} | Deepsara`, description, type:'website', ...(url ? {url} : {})}, twitter:{card:'summary_large_image', title, description} };
}
export function JsonLd({data}: {data: Record<string, unknown>}) { return <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(data).replace(/</g,'\\u003c')}} /> }

import Link from "next/link";
import { notFound } from "next/navigation";
import { articles, treatments } from "@/lib/content";
import { Breadcrumbs, CTASection, BlogCard } from "@/components/shared";
import { ViewEvent } from "@/components/interactive";
import { seo, JsonLd } from "@/lib/seo";
import { clinic, disclaimer } from "@/lib/clinic";
export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const a = articles.find((a) => a.slug === slug);
  return a
    ? {
        ...seo(a.title, a.excerpt, `/blog/${slug}`),
        openGraph: {
          title: a.title,
          description: a.excerpt,
          type: "article" as const,
          publishedTime: a.date,
        },
      }
    : { title: "Article not found" };
}
export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const a = articles.find((a) => a.slug === slug);
  if (!a) notFound();
  const t = treatments.find((t) => t.slug === a.treatment);
  return (
    <>
      <ViewEvent event="blog_view" slug={slug} />
      <article className="section container article">
        <Breadcrumbs
          items={[{ label: "Blog", href: "/blog" }, { label: a.title }]}
        />
        <span className="eyebrow">{a.category}</span>
        <h1>{a.title}</h1>
        <p className="article-lead">{a.excerpt}</p>
        <div className="article-meta">
          <time dateTime={a.date}>03 October 2026</time>
          <span>Deepsara Patient Resources · Educational draft</span>
        </div>
        {t && (
          <section>
            <h2>Understanding {t.short}</h2>
            <p>{t.definition}</p>
            <p>
              <Link href={`/services/${t.slug}`}>
                Read our {t.short.toLowerCase()} information page
              </Link>{" "}
              for general details, evaluation and treatment discussion points.
            </p>
            <p>
              Reference:{" "}
              <a href={t.source} target="_blank" rel="noopener noreferrer">
                NHS patient information
              </a>
              .
            </p>
          </section>
        )}
        {a.sections.map((s) => (
          <section key={s.heading}>
            <h2>{s.heading}</h2>
            <p>{s.text}</p>
          </section>
        ))}
        <aside className="medical-note">
          <h2>When You Need Prompt Care</h2>
          <p>
            For severe symptoms or heavy or continuous bleeding, seek prompt
            medical care or appropriate local emergency services. Do not wait
            for a consultation callback.
          </p>
        </aside>
        <p className="care-note">{disclaimer}</p>
      </article>
      <CTASection title="Have Questions? Book a Free Consultation" />
      <section className="section container">
        <h2>More Patient Resources</h2>
        <div className="blog-grid">
          {articles
            .filter((x) => x.slug !== slug)
            .slice(0, 3)
            .map((x, i) => (
              <BlogCard key={x.slug} article={x} index={i} />
            ))}
        </div>
      </section>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: a.title,
          description: a.excerpt,
          datePublished: a.date,
          author: { "@type": "Organization", name: clinic.name },
          publisher: { "@type": "Organization", name: clinic.name },
          ...(clinic.websiteUrl
            ? { mainEntityOfPage: `${clinic.websiteUrl}/blog/${slug}` }
            : {}),
        }}
      />
    </>
  );
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Article } from "@/components/authority/article";
import { getArticleBySlug, authorityArticles } from "@/content/authority";

type ArticlePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return authorityArticles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    return {};
  }

  return {
    alternates: { canonical: `/insights/${article.slug}` },
    description: article.description,
    openGraph: {
      description: article.description,
      title: article.title,
      type: "article",
    },
    title: article.title,
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  return <Article article={article} />;
}

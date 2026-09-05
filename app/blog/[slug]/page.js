import { notFound } from "next/navigation";
import Link from "next/link";
import { posts } from "@/data/blog";

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const post = posts.find(p => p.slug === resolvedParams.slug);
  if (!post) return { title: "Post Not Found" };

  return {
    title: `${post.title} | Naik Foods Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.image],
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
    },
  };
}

export async function generateStaticParams() {
  return posts.map(post => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({ params }) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;
  const post = posts.find(p => p.slug === slug);

  if (!post) return notFound();

  // Basic markdown-like parsing (just for our mock data)
  const renderContent = (content) => {
    return content.split('\n\n').map((paragraph, i) => {
      if (paragraph.startsWith('### ')) {
        return <h3 key={i} style={{ marginTop: '2rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>{paragraph.replace('### ', '')}</h3>;
      }
      if (paragraph.startsWith('1. ') || paragraph.startsWith('- ')) {
        const items = paragraph.split('\n').map(item => item.replace(/^[1-9]\. |- /, ''));
        return (
          <ul key={i} style={{ paddingLeft: '1.5rem', marginBottom: '1.5rem' }}>
            {items.map((item, j) => {
              // Handle bold
              const text = item.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
              return <li key={j} style={{ marginBottom: '0.5rem', color: 'var(--text-secondary)', lineHeight: 1.6 }} dangerouslySetInnerHTML={{ __html: text }} />
            })}
          </ul>
        );
      }
      return <p key={i} style={{ marginBottom: '1.5rem', color: 'var(--text-secondary)', lineHeight: 1.6, fontSize: '1.05rem' }}>{paragraph}</p>;
    });
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [{
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://naik-foods-improved-demo.surge.sh"
    },{
      "@type": "ListItem",
      "position": 2,
      "name": "Blog",
      "item": "https://naik-foods-improved-demo.surge.sh/blog"
    },{
      "@type": "ListItem",
      "position": 3,
      "name": post.title
    }]
  };

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "image": [post.image],
    "datePublished": post.date,
    "author": [{
        "@type": "Person",
        "name": post.author,
    }]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }}
      />

      <div className="container" style={{ maxWidth: "800px", padding: "4rem 20px" }}>
        <div className="breadcrumbs" style={{ marginBottom: "2rem" }}>
          <Link href="/">Home</Link>
          <span>›</span>
          <Link href="/blog">Blog</Link>
          <span>›</span>
          <span style={{ color: "var(--text-primary)", fontWeight: 600 }}>{post.title}</span>
        </div>

        <h1 style={{ fontSize: "2.5rem", fontWeight: 800, marginBottom: "1rem", color: "var(--text-primary)", lineHeight: 1.2 }}>
          {post.title}
        </h1>
        
        <div style={{ display: "flex", gap: "1rem", color: "var(--text-muted)", marginBottom: "2rem", fontSize: "0.95rem" }}>
          <span>By {post.author}</span>
          <span>•</span>
          <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
        </div>

        <img 
          src={post.image} 
          alt={post.title} 
          style={{ width: "100%", height: "400px", objectFit: "cover", borderRadius: "16px", marginBottom: "3rem" }} 
        />

        <div className="blog-content">
          {renderContent(post.content)}
        </div>
      </div>
    </>
  );
}

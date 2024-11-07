"use client"

interface Article {
  id: number
  title: string
  excerpt: string
  image: string
  date: string
  author: string
}

const SAMPLE_ARTICLES: Article[] = [
  {
    id: 1,
    title: "The Art of Storytelling",
    excerpt: "Discover the secrets behind compelling narratives...",
    image: "https://via.placeholder.com/400x300/111827/FFFFFF?text=Story+1",
    date: "2024-01-15",
    author: "Sarah Kim"
  },
  {
    id: 2,
    title: "Digital Narratives",
    excerpt: "How technology is shaping modern storytelling...",
    image: "https://via.placeholder.com/400x300/111827/FFFFFF?text=Story+2",
    date: "2024-01-14",
    author: "Mike Chen"
  },
  {
    id: 3,
    title: "Community Voices",
    excerpt: "Stories from our diverse community...",
    image: "https://via.placeholder.com/400x300/111827/FFFFFF?text=Story+3",
    date: "2024-01-13",
    author: "Lisa Park"
  }
]

function ArticleCard({ article }: { article: Article }) {
  return (
    <div className="article-card">
      <img 
        src={article.image} 
        alt={article.title}
        className="article-image"
      />
      <div className="article-content">
        <h3 className="article-title">{article.title}</h3>
        <p>{article.excerpt}</p>
        <div className="article-meta">
          <span>{article.author}</span>
          <span>{article.date}</span>
        </div>
      </div>
    </div>
  )
}

export default function ArticleGrid() {
  return (
    <div className="articles-container">
      <h2>Latest Articles</h2>
      <div className="articles-grid">
        {SAMPLE_ARTICLES.map(article => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </div>
  )
}

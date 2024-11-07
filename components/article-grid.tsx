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
    excerpt: "Discover the secrets behind compelling narratives that captivate audiences...",
    image: "https://via.placeholder.com/400x300/111827/FFFFFF?text=Storytelling",
    date: "2024-01-15",
    author: "Sarah Kim"
  },
  {
    id: 2,
    title: "Digital Narratives",
    excerpt: "How technology is shaping the way we tell and consume stories in the modern age...",
    image: "https://via.placeholder.com/400x300/111827/FFFFFF?text=Digital+Stories",
    date: "2024-01-14",
    author: "Mike Chen"
  },
  {
    id: 3,
    title: "Community Voices",
    excerpt: "Highlighting unique perspectives from our diverse storytelling community...",
    image: "https://via.placeholder.com/400x300/111827/FFFFFF?text=Community",
    date: "2024-01-13",
    author: "Lisa Park"
  },
  {
    id: 4,
    title: "Podcast Highlights",
    excerpt: "The best moments from our recent podcast episodes featuring amazing guests...",
    image: "https://via.placeholder.com/400x300/111827/FFFFFF?text=Podcast",
    date: "2024-01-12",
    author: "David Lee"
  },
  {
    id: 5,
    title: "Writing Workshop",
    excerpt: "Tips and techniques from our latest writing workshop series...",
    image: "https://via.placeholder.com/400x300/111827/FFFFFF?text=Workshop",
    date: "2024-01-11",
    author: "Emma Wong"
  },
  {
    id: 6,
    title: "Story of the Week",
    excerpt: "Our featured story this week takes us on a journey through memories...",
    image: "https://via.placeholder.com/400x300/111827/FFFFFF?text=Featured",
    date: "2024-01-10",
    author: "James Kim"
  }
]

function ArticleCard({ article }: { article: Article }) {
  return (
    <div className="bg-white/5 rounded-lg overflow-hidden hover:bg-white/10 transition-colors">
      <img 
        src={article.image} 
        alt={article.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <h3 className="text-xl font-bold text-white mb-2">
          {article.title}
        </h3>
        <p className="text-white/70 mb-4">
          {article.excerpt}
        </p>
        <div className="flex justify-between items-center text-sm text-white/50">
          <span>{article.author}</span>
          <span>{new Date(article.date).toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  )
}

export function ArticleGrid() {
  return (
    <div className="py-12">
      <h2 className="text-2xl font-bold text-white mb-8">Latest Articles</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {SAMPLE_ARTICLES.map(article => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </div>
  )
}

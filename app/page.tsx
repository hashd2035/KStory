import { Carousel } from '@/components/carousel'
import { ArticleGrid } from '@/components/article-grid'

export default function HomePage() {
  return (
    <main>
      {/* Hero Carousel */}
      <Carousel />

      {/* Articles Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ArticleGrid />
      </div>
    </main>
  )
}

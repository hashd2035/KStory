export default function StoriesPage() {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8">
          Stories
        </h1>
        
        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Featured Stories</h2>
            <p className="text-white/70">
              Discover our collection of handpicked stories from talented writers 
              around the world. From personal narratives to fictional tales, 
              explore the diverse world of storytelling.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Categories</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-white/5 rounded-lg">
                <h3 className="text-lg font-semibold text-white">Personal Essays</h3>
                <p className="text-white/70">Real stories from real people</p>
              </div>
              <div className="p-4 bg-white/5 rounded-lg">
                <h3 className="text-lg font-semibold text-white">Fiction</h3>
                <p className="text-white/70">Imaginative storytelling</p>
              </div>
              <div className="p-4 bg-white/5 rounded-lg">
                <h3 className="text-lg font-semibold text-white">Poetry</h3>
                <p className="text-white/70">Verses that move and inspire</p>
              </div>
              <div className="p-4 bg-white/5 rounded-lg">
                <h3 className="text-lg font-semibold text-white">Memoirs</h3>
                <p className="text-white/70">Life stories and reflections</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Submit Your Story</h2>
            <p className="text-white/70">
              Have a story to share? We welcome submissions from writers of all 
              backgrounds and experience levels. Join our community of storytellers 
              and share your voice with the world.
            </p>
          </section>
        </div>
      </div>
    </main>
  )
}

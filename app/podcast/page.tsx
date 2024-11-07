export default function PodcastPage() {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8">
          KStory Podcast
        </h1>
        
        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Latest Episodes</h2>
            <div className="space-y-4">
              {/* Episode Cards */}
              <div className="bg-white/5 rounded-lg p-6">
                <h3 className="text-xl font-bold text-white">The Art of Digital Storytelling</h3>
                <p className="text-white/70 mt-2">
                  Exploring how technology is changing the way we tell and consume stories.
                </p>
                <div className="mt-4 text-sm text-white/50">Episode 12 • 45 mins</div>
              </div>

              <div className="bg-white/5 rounded-lg p-6">
                <h3 className="text-xl font-bold text-white">Stories That Move Mountains</h3>
                <p className="text-white/70 mt-2">
                  How powerful narratives can inspire change and action.
                </p>
                <div className="mt-4 text-sm text-white/50">Episode 11 • 38 mins</div>
              </div>

              <div className="bg-white/5 rounded-lg p-6">
                <h3 className="text-xl font-bold text-white">Community Voices</h3>
                <p className="text-white/70 mt-2">
                  Featuring stories from our diverse community of writers.
                </p>
                <div className="mt-4 text-sm text-white/50">Episode 10 • 42 mins</div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">About the Podcast</h2>
            <p className="text-white/70">
              The KStory Podcast brings you weekly conversations about storytelling, 
              creativity, and the power of narrative. Join us as we explore the craft 
              of storytelling with writers, creators, and storytellers from all walks of life.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Listen On</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 bg-white/5 rounded-lg text-center">
                <div className="text-white">Spotify</div>
              </div>
              <div className="p-4 bg-white/5 rounded-lg text-center">
                <div className="text-white">Apple Podcasts</div>
              </div>
              <div className="p-4 bg-white/5 rounded-lg text-center">
                <div className="text-white">Google Podcasts</div>
              </div>
              <div className="p-4 bg-white/5 rounded-lg text-center">
                <div className="text-white">YouTube</div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}

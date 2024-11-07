export default function AboutPage() {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8">
          About KStory
        </h1>
        
        <div className="prose prose-invert">
          <p className="text-lg text-white/70">
            KStory is a platform dedicated to sharing compelling stories and narratives 
            that inspire, educate, and entertain. Our mission is to bring together 
            storytellers from all walks of life and provide them with a space to share 
            their unique perspectives with the world.
          </p>

          <div className="mt-12 space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Our Mission</h2>
              <p className="text-white/70">
                To create a vibrant community where stories come alive and connections 
                are made through the power of narrative.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Our Vision</h2>
              <p className="text-white/70">
                To become the premier platform for storytellers and story enthusiasts, 
                fostering creativity and connection through shared narratives.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Join Us</h2>
              <p className="text-white/70">
                Whether you&apos;re a writer, reader, or simply someone who appreciates 
                good stories, there&apos;s a place for you in our community.
              </p>
            </section>
          </div>
        </div>
      </div>
    </main>
  )
}

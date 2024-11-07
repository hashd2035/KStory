# KStory

A modern storytelling platform built with Next.js, Supabase, and TailwindCSS.

## Features

- User authentication with Supabase
- Responsive design with TailwindCSS
- Story sharing and management
- Podcast integration
- Profile management

## Tech Stack

- Next.js 14 (App Router)
- Supabase (Auth & Database)
- TailwindCSS
- TypeScript

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/yourusername/kstory.git
cd kstory
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file in the root directory with your Supabase credentials:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deployment

### Vercel Deployment

1. Push your code to GitHub
2. Connect your GitHub repository to Vercel
3. Add your environment variables in Vercel's project settings
4. Deploy!

### Cloudflare Pages Deployment

1. Push your code to GitHub
2. Connect your GitHub repository to Cloudflare Pages
3. Set up your build configuration:
   - Build command: `npm run build`
   - Build output directory: `.next`
4. Add your environment variables in Cloudflare's project settings
5. Deploy!

## Environment Variables

Make sure to set these environment variables in your deployment platform:

- `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase anonymous key

## Project Structure

```
/app                    # Next.js app directory
  /auth                 # Authentication pages
  /dashboard           # User dashboard
  /about              # About page
  /stories            # Stories page
  /podcast            # Podcast page
/components           # React components
  /ui                 # UI components
/lib                  # Utility functions
  /supabase.ts       # Supabase client
/public               # Static files
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details

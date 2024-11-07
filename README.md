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

## Prerequisites

- Node.js 18 or later
- A Supabase account and project
- Git

## Development Setup

1. Clone the repository:
```bash
git clone https://github.com/yourusername/kstory.git
cd kstory
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
# Copy the example environment file
cp .env.example .env.local

# Edit .env.local with your Supabase credentials
```

Required environment variables:
- `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase anonymous key

You can find these values in your Supabase project settings.

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Using Dev Containers

This project includes a dev container configuration for VSCode, which provides a consistent development environment with all necessary extensions and tools pre-configured.

To use it:

1. Install the [Remote - Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers) extension in VSCode
2. Open the project in VSCode
3. Click the green button in the bottom-left corner and select "Reopen in Container"
4. Wait for the container to build and install dependencies

The container includes:
- Node.js 18
- Git
- GitHub CLI
- Essential VSCode extensions for Next.js development
- Prettier and ESLint configuration

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting

## Environment Variables

The project uses several environment variables for configuration. Create a `.env.local` file in the root directory with the following variables:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

**Important**: Never commit your `.env.local` file. It's already added to `.gitignore`.

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

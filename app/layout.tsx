import { Navbar } from '@/components/navbar'
import './globals.css'

export const metadata = {
  title: 'KStory',
  description: 'Share your stories with the world',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-black min-h-screen">
        <Navbar />
        {children}
      </body>
    </html>
  )
}

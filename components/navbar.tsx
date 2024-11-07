import Link from "next/link"

export default function Navbar() {
  return (
    <div className="nav-container">
      {/* Logo */}
      <Link href="/" className="nav-logo">
        KStory
      </Link>

      {/* Navigation Links */}
      <div className="nav-links">
        <Link href="/about">About KStory</Link>
        <Link href="/stories">Stories</Link>
        <Link href="/podcast">Podcast</Link>
      </div>

      {/* Auth Links */}
      <div className="nav-auth">
        <Link href="/auth/login">Sign In</Link>
        <Link href="/auth/signup">Sign Up</Link>
      </div>
    </div>
  )
}

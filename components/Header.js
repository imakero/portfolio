import Link from 'next/link'

export default function Header() {
  return (
    <div>
      <header>
        <nav>
          <Link href="/">
            <a>Imakero</a>
          </Link>
          <ul>
            <li>
              <Link href="/blog">
                <a>Blog</a>
              </Link>
            </li>
            <li>
              <Link href="/projects">
                <a>Projects</a>
              </Link>
            </li>
            <li>
              <Link href="/contact">
                <a>Contact</a>
              </Link>
            </li>
          </ul>
        </nav>
      </header>
    </div>
  )
}

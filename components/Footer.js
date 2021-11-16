import Link from 'next/link'

export default function Footer() {
  return (
    <footer>
      <nav>
        <ul>
          <li>
            <Link href="/">
              <a>Home</a>
            </Link>
          </li>
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
            <Link href="">
              <a>Contact</a>
            </Link>
          </li>
        </ul>
        <ul>
          <li>
            <a href="http://www.github.com/imakero">Github</a>
          </li>
          <li>
            <a href="#">LinkedIn</a>
          </li>
          <li>
            <a href="#">Twitter</a>
          </li>
        </ul>
      </nav>
      <small>Copyright © Imakero 2021</small>
    </footer>
  )
}

import Link from 'next/link'

export default function Footer() {
  return (
    <footer>
      <nav>
        <ul>
          <li>Home</li>
          <li>Blog</li>
          <li>Projects</li>
          <li>Contact</li>
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

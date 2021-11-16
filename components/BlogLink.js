import Link from 'next/link'
import slugify from 'slugify'
import parseBlock from '../notion/parseBlock'

export default function BlogLink({ blog }) {
  return (
    <li className="blog-link-container">
      <Link href={`/blog/${slugify(blog.title).toLowerCase()}`}>
        <a>
          <small>{blog.date}</small>
          <h2>{blog.title}</h2>
          <div className="blog-description">{parseBlock(blog.description)}</div>
        </a>
      </Link>
    </li>
  )
}

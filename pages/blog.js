import { Client } from '@notionhq/client/build/src'
import BlogLink from '../components/BlogLink'
import { parsePlainText } from '../notion/parseBlock'

export default function Blogs({ blogs }) {
  return (
    <main>
      <ul className="blog-list">
        {blogs.map((blog) => (
          <BlogLink key={blog.id} blog={blog} />
        ))}
      </ul>
    </main>
  )
}

export const getStaticProps = async () => {
  const notion = new Client({
    auth: process.env.NOTION_SECRET,
  })

  const data = await notion.databases.query({
    database_id: process.env.NOTION_BLOGS,
  })

  const blogs = data.results
    .filter((blog) => blog.properties.publish.checkbox)
    .map((blog) => ({
      id: blog.id,
      date: blog.properties.date.date.start,
      description: blog.properties.description,
      title: parsePlainText(blog.properties.page.title),
    }))

  return {
    props: {
      blogs,
    },
  }
}

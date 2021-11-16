import { Client } from '@notionhq/client/build/src'
import slugify from 'slugify'
import { parsePlainText } from '../../notion/parseBlock'
import parseBlocks from '../../notion/parseBlocks'

export default function Blog({ blog }) {
  return (
    <main>
      <article>
        <h2>{blog.title}</h2>
        <div>{parseBlocks(blog.content)}</div>
      </article>
    </main>
  )
}

export const getStaticPaths = async () => {
  const notion = new Client({
    auth: process.env.NOTION_SECRET,
  })

  const data = await notion.databases.query({
    database_id: process.env.NOTION_BLOGS,
  })

  const paths = data.results.map((block) => ({
    params: {
      slug: slugify(parsePlainText(block.properties.page.title)).toLowerCase(),
    },
  }))

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps = async ({ params: { slug } }) => {
  const notion = new Client({
    auth: process.env.NOTION_SECRET,
  })

  const data = await notion.databases.query({
    database_id: process.env.NOTION_BLOGS,
  })

  const blogData = data.results.find((block) => {
    return (
      slugify(parsePlainText(block.properties.page.title)).toLowerCase() ===
      slug
    )
  })

  const page = await notion.blocks.children.list({
    block_id: blogData.id,
  })

  return {
    props: {
      blog: {
        content: page.results,
        title: parsePlainText(blogData.properties.page.title),
      },
    },
  }
}

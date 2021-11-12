import { Client } from '@notionhq/client'
import Head from 'next/head'
import Image from 'next/image'
import parseBlocks from '../notion/parseBlocks'
import { downloadFile, fileExists, preprocessBlocks } from '../server/utils'

export default function Home({ blocks }) {
  return (
    <div>
      <Head>
        <title>Imakero | Web Developer</title>
        <meta
          name="description"
          content="I'm a web developer from Sweden who loves rock climbing."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <article>
          <section className="section-heading">
            <h1>Imakero</h1>
            <div className="main-heading">
              <div className="image-container">
                <Image
                  src="/images/me.jpg"
                  alt="Picture of me"
                  width={480}
                  height={480}
                />
              </div>
            </div>
          </section>
          <section>{parseBlocks(blocks)}</section>
        </article>
      </main>
    </div>
  )
}

export const getStaticProps = async () => {
  const notion = new Client({
    auth: process.env.NOTION_SECRET,
  })

  const data = await notion.blocks.children.list({
    block_id: process.env.NOTION_HOME_PAGE_INTRO,
  })

  if (data.has_more) {
    throw Exception()
  }

  const blocks = await preprocessBlocks(data.results)

  if (!fileExists('./public/images/me.jpg')) {
    const image = await notion.blocks.retrieve({
      block_id: process.env.NOTION_HOME_PORTRAIT_IMAGE,
    })

    await downloadFile(image.image.file.url, './public/images/me.jpg')
  }

  return {
    props: {
      blocks,
    },
  }
}

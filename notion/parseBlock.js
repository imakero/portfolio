import Image from 'next/image'
import React from 'react'

export default function parseBlock(block) {
  //console.log(JSON.stringify(block, null, 2))
  switch (block.type) {
    case 'heading_1':
      return parseHeading1(block)
    case 'heading_2':
      return parseHeading2(block)
    case 'heading_3':
      return parseHeading3(block)
    case 'paragraph':
      return parseParagraph(block)
    case 'image':
      return parseImage(block)
    default:
      throw new Exception('Could not parse')
  }
}

const parseHeading1 = (block) => {
  return <h2 key={block.id}>{block.heading_1.text.map(parseText)}</h2>
}

const parseHeading2 = (block) => {
  return <h3 key={block.id}>{block.heading_2.text.map(parseText)}</h3>
}

const parseHeading3 = (block) => {
  return <h4 key={block.id}>{block.heading_3.text.map(parseText)}</h4>
}

const parseParagraph = (block) => {
  return (
    <p key={block.id}>
      {block.paragraph.text.map((text, index) => {
        let element = parseText(text)
        if (typeof element !== 'string') {
          element = React.cloneElement(element, { key: index })
        }
        return element
      })}
    </p>
  )
}
const parseImage = ({ id, dimensions, image }) => {
  return (
    <Image
      key={id}
      src={`/images/${id}.jpg`}
      width={dimensions.width}
      height={dimensions.height}
      alt={parsePlainText(image.caption)}
    />
  )
}

const parsePlainText = (texts) => texts.map((text) => text.plain_text).join('')

const parseText = (text) => wrapAnnotations(text.text.content, text.annotations)

const wrapAnnotations = (content, annotations) => {
  let element = content
  if (annotations.bold) {
    element = <strong>{element}</strong>
  }
  if (annotations.italic) {
    element = <em>{element}</em>
  }
  if (annotations.strikethrough) {
    element = <span className="strikethrough">{element}</span>
  }
  if (annotations.underline) {
    element = <span className="underline">{element}</span>
  }
  if (annotations.code) {
    element = <code>{element}</code>
  }
  return element
}

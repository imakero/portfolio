import parseBlock from "./parseBlock"

export default function parseBlocks(blocks){
  return <>{blocks.map(block => parseBlock(block))}</>
}

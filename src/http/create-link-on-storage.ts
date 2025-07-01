import axios from 'axios'

export interface CreateLinkParams {
  url: string
  shortUrl: string
}

export async function createLinkOnStorage({ url, shortUrl }: CreateLinkParams) {
  const { data } = await axios.post('http://localhost:3333/links', {
    url,
    shortUrl,
  })
  return {
    id: data.id,
    url: data.url,
    shortUrl: data.shortUrl,
    accessCount: data.accessCount,
  }
}

import axios from 'axios'

export interface getLinkParams {
  id: string
  url: string
  shortUrl: string
  accessCount: number
}

export async function getLinksOnStorage(): Promise<getLinkParams[]> {
  const { data } = await axios.get(`http://localhost:3333/links`)
  return data
}

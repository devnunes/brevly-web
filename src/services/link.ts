import axios from 'axios'

const env = import.meta.env

export interface CreateLinkParams {
  url: string
  shortUrl: string
}

export async function createLink({ url, shortUrl }: CreateLinkParams) {
  const { data } = await axios.post(`${env.VITE_SERVER_URL}/links`, {
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

export interface getLinkParams {
  id: string
  url: string
  shortUrl: string
  accessCount: number
}

export async function getLinks(): Promise<getLinkParams[]> {
  const { data } = await axios.get(`${env.VITE_SERVER_URL}/links`)
  return data
}

export async function deleteLink(id: string) {
  await axios.delete(`${env.VITE_SERVER_URL}/link`, {
    data: { id },
  })
  return id
}

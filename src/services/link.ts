import axios from 'axios'
import type { ZodSafeParseResult } from 'zod/v4'

const env = import.meta.env

export interface CreateLinkParams {
  url: string
  shortUrl: string
}

export async function createLink({ url, shortUrl }: CreateLinkParams) {
  const { data } = await axios.post(`${env.VITE_API_URL}/links`, {
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
  createdAt?: string
}

export async function getLinks(): Promise<getLinkParams[]> {
  const { data } = await axios.get(`${env.VITE_API_URL}/links`)
  return data
}

export async function getLinkByShortUrl(
  shortUrl: ZodSafeParseResult<string>
): Promise<getLinkParams> {
  const { data } = await axios.get(`${env.VITE_API_URL}/link/${shortUrl.data}`)
  return {
    id: data.id,
    url: data.url,
    shortUrl: data.shortUrl,
    accessCount: data.accessCount,
  }
}

export async function deleteLink(id: string) {
  await axios.delete(`${env.VITE_API_URL}/link`, {
    data: { id },
  })
  return id
}

export async function exportLinksCSV() {
  const { data } = await axios.post(`${env.VITE_API_URL}/links/export`)

  return { reportUrl: data.reportUrl }
}

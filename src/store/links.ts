import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import {
  type CreateLinkParams,
  createLinkOnStorage,
} from '@/http/create-link-on-storage'
import { getLinksOnStorage } from '@/http/get-links-from-storage'

type Link = {
  id: string
  url: string
  shortUrl: string
  accessCount: number
}

type LinksState = {
  links: Link[]
  addLink: (link: CreateLinkParams) => void
  loadLinks: () => Promise<void>
  // removeLink: (id: string) => void
}

export const useLinksStore = create<LinksState>()(
  immer(set => {
    async function addLink(link: CreateLinkParams) {
      const response = await createLinkOnStorage(link)

      const newLink: Link = {
        id: response.id,
        url: response.url,
        shortUrl: response.shortUrl,
        accessCount: response.accessCount || 0,
      }
      set(state => {
        state.links.push(newLink)
      })
    }
    async function loadLinks() {
      const links = await getLinksOnStorage()
      set(state => {
        state.links = links
      })
    }

    return {
      links: [],
      addLink,
      loadLinks,
    }
  })
)

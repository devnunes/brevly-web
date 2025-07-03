import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import {
  type CreateLinkParams,
  createLink,
  deleteLink,
  getLinks,
} from '@/services/link'

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
  removeLink: (id: string) => void
}

export const useLinksStore = create<LinksState>()(
  immer(set => {
    async function addLink(link: CreateLinkParams) {
      const response = await createLink(link)

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
      const links = await getLinks()
      set(state => {
        state.links = links
      })
    }
    async function removeLink(id: string) {
      const response = await deleteLink(id)
      if (response !== id) {
        console.error('Failed to delete link:', response)
        return
      }
      set(state => {
        state.links = state.links.filter(link => link.id !== id)
      })
    }

    return {
      links: [],
      addLink,
      loadLinks,
      removeLink,
    }
  })
)

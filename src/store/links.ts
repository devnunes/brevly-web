import { z } from 'zod/v4'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import {
  type CreateLinkParams,
  createLink,
  deleteLink,
  getLinkByShortUrl,
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
  getLink: (shortUrl: string) => Promise<Link>
  loadLinks: () => Promise<void>
  removeLink: (id: string) => void
}

export const useLinksStore = create<LinksState>()(
  persist(
    immer((set, _get) => {
      async function addLink(link: CreateLinkParams) {
        const response = await createLink(link)

        const newLink: Link = {
          id: response.id,
          url: response.url,
          shortUrl: response.shortUrl,
          accessCount: response.accessCount || 0,
        }
        set(state => {
          state.links = [newLink].concat(state.links)
        })
      }
      async function getLink(shortUrl: string) {
        const url = await getLinkByShortUrl(shortUrl).then(data => {
          if (!z.url().min(1).safeParse(data.url).success) {
            console.error('Invalid URL:', data.url)
            return {} as Link
          }
          set(state => {
            state.links = state.links.map(link => {
              if (link.shortUrl === data.shortUrl) {
                return data
              }
              return link
            })
          })
          return data
        })

        return url
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
        getLink,
        loadLinks,
        removeLink,
      }
    }),
    { name: 'links-storage', storage: createJSONStorage(() => localStorage) }
  )
)

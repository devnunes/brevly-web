import { useEffect } from 'react'
import { useLinksStore } from '../store/links'

export function MyLinksWidget() {
  const links = useLinksStore(store => store.links)
  const loadLinks = useLinksStore(store => store.loadLinks)

  useEffect(() => {
    loadLinks()
  }, [loadLinks])
  return (
    <div className="flex flex-col rounded-lg w-91.5 lg:w-145  p-8 bg-gray-100 gap-6">
      <span className="text-lg w-79">Meus links</span>
      <div className="flex flex-col">
        {links.map(link => (
          <div
            key={link.id}
            className="flex justify-between items-center border-t-1 border-gray-200 py-3 md:py-4"
          >
            <div className="flex flex-col w-79.5 md:w-87 lg:w-87">
              <a
                className="text-blue-base text-md"
                href="http://localhost:3333/"
              >
                brev.ly/{link.shortUrl}
              </a>
              <span className="text-gray-500 text-sm">{link.url}</span>
            </div>
            <div className="flex justify-center items-center gap-x-20">
              <span>{link.accessCount}</span>
              <span className="">copiar</span>
              <span className=""> excluir</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

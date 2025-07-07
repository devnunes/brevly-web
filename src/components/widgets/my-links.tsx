import {
  CopyIcon,
  DownloadSimpleIcon,
  LinkIcon,
  TrashIcon,
} from '@phosphor-icons/react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { useLinksStore } from '@/store/links'

const env = import.meta.env

export function MyLinksWidget() {
  const links = useLinksStore(store => store.links)
  const loadLinks = useLinksStore(store => store.loadLinks)
  const removeLink = useLinksStore(store => store.removeLink)

  useEffect(() => {
    loadLinks()
  }, [loadLinks])

  return (
    <div className="flex flex-col rounded-lg w-80 p-5.5 gap-6 sm:w-91.5 md:gap-5 md:p-8 lg:w-145 bg-gray-100 ">
      <div className="flex justify-between items-center">
        <span className="text-lg">Meus links</span>
        <Button size={'secondary'}>
          <DownloadSimpleIcon className="text-gray-600" size={16} />
          Baixar CSV
        </Button>
      </div>
      <div className="flex flex-col items-center">
        {links.length === 0 && (
          <div className="flex flex-col w-full items-center border-t-2 border-gray-200 gap-3 pb-6 pt-4 md:pt-4 md:gap-4">
            <LinkIcon className="text-gray-400 mt-4" size={32} />
            <span className="text-gray-500 text-xs">
              AINDA NÃO EXISTEM LINKS CADASTRADOS
            </span>
          </div>
        )}
        {links.map(link => (
          <div
            key={link.id}
            className="flex w-full justify-between items-center border-t-1 border-gray-200 py-3 md:py-4"
          >
            <div className="flex flex-col max-w-37 lg:max-w-87">
              <Link
                className="text-blue-base text-md overflow-hidden text-ellipsis whitespace-nowrap"
                to={`/${link.shortUrl}`}
              >
                brev.ly/{link.shortUrl}
              </Link>
              <span className="text-gray-500 text-sm overflow-hidden text-ellipsis whitespace-nowrap">
                {link.url}
              </span>
            </div>
            <div className="flex justify-center items-center">
              <span className="text-sm text-gray-500 mr-5">
                {link.accessCount in [0, 1]
                  ? `${link.accessCount} acesso`
                  : `${link.accessCount} acessos`}
              </span>
              <Button size={'tertiary'} className="mr-1">
                <CopyIcon
                  onClick={() =>
                    navigator.clipboard.writeText(
                      `${env.VITE_APP_URL}/${link.shortUrl}`
                    )
                  }
                  className="text-gray-600"
                  size={16}
                />
              </Button>
              <Button onClick={() => removeLink(link.id)} size={'tertiary'}>
                <TrashIcon className="text-gray-600" size={16} />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

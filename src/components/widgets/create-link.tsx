import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod/v4'
import type { CreateLinkParams } from '@/services/link'
import { useLinksStore } from '../../store/links'

const newLinkFormValidationSchema = z.object({
  url: z.url().min(1, 'URL must be a valid URL'),
  shortUrl: z.string().min(1, 'Short URL must be at least 1 character long'),
})

export function CreateLinkWidget() {
  const { addLink } = useLinksStore()
  const { register, handleSubmit, reset } = useForm({
    resolver: zodResolver(newLinkFormValidationSchema),
  })

  const handleCreateLink = (data: CreateLinkParams) => {
    addLink(data)
    reset()
  }

  return (
    <form
      onSubmit={handleSubmit(handleCreateLink)}
      action=""
      className="flex flex-col rounded-lg w-80 sm:w-91.5 md:w-95 h-85 p-8 bg-gray-100 gap-6"
    >
      <span className="text-lg w-79">Novo link</span>
      <div className="flex flex-col gap-2 text-gray-500 focus-within:text-blue-base">
        <label htmlFor="url" className="text-xs">
          LINK ORIGINAL
        </label>
        <input
          className="border text-gray-600 border-gray-300 rounded-lg px-4 py-2 focus:border-blue-base focus:outline-none"
          type="text"
          placeholder="https://www.exemplo.com.br"
          {...register('url', { required: true })}
        />
      </div>

      <div className="flex flex-col gap-2 text-gray-500 focus-within:text-blue-base">
        <label htmlFor="shortUrl" className="text-xs">
          LINK ENCURTADO
        </label>
        <div className="border border-gray-300 rounded-lg px-4 py-2 focus-within:border-blue-base ">
          <span className="text-md text-gray-400">brev.ly/</span>
          <input
            className="text-gray-600 focus:outline-none"
            type="text"
            placeholder=""
            {...register('shortUrl', { required: true })}
          />
        </div>
      </div>
      <button
        className="bg-blue-base text-white rounded-lg w-full text-md py-3.5"
        type="submit"
      >
        Salvar link
      </button>
    </form>
  )
}

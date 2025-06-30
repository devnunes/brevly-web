export function CreateLinkWidget() {
  return (
    <div className="flex flex-col rounded-lg w-95 h-85 p-8 bg-gray-100 gap-6">
      <span className="text-lg w-79">Novo link</span>
      <div className="flex flex-col gap-2">
        <label htmlFor="originalLink" className="text-xs text-gray-500">
          LINK ORIGINAL
        </label>
        <input
          className="border border-gray-300 rounded-lg text-gray-400 px-4 py-2"
          name="originalLink"
          type="text"
          placeholder="https://www.exemplo.com.br"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="shortLink" className="text-xs text-gray-500">
          LINK ENCURTADO
        </label>
        <input
          className="border border-gray-300 rounded-lg text-gray-400 px-4 py-3"
          name="shortLink"
          type="text"
          placeholder="brev.ly/"
        />
      </div>
      <input
        className="bg-blue-base text-white rounded-lg w-full text-md py-3.5"
        type="button"
        value="Salvar link"
      />
    </div>
  )
}

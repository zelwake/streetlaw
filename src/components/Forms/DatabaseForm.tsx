import { DatabaseFormProps } from '@projectType/componentTypes'
import AlertMessage from '../AlertMessage'

const DatabaseForm = ({
  categories,
  keywordsList,
  selected,
  keywords,
  addValue,
  message,
  fetchKeywordsGroup,
  removeRelation,
  addRelation,
  setAddValue,
}: DatabaseFormProps) => {
  return (
    <section className="grid grid-cols-8 gap-x-4 relative">
      <ul className="col-span-2">
        {categories.map((v) => (
          <li
            key={v.id}
            onClick={() => fetchKeywordsGroup(v.id)}
            className={`text-xl mb-1 cursor-pointer hover:outline-2 hover:outline-streetlaw-500 ${
              v.id == selected ? 'text-black font-semibold' : 'text-gray-400'
            }`}
          >
            {v.word}
          </li>
        ))}
      </ul>
      <ul className="col-span-3">
        {keywords.map((v) => (
          <li key={v.id} className="flex justify-between mb-1">
            <p className="text-xl">{v.word}</p>
            <button
              onClick={() => removeRelation(v.id, v.word)}
              className="bg-red-500 px-2 text-white hover:border-l-2 hover:border-l-red-900 "
            >
              Odebrat
            </button>
          </li>
        ))}
      </ul>
      {selected != 0 && (
        <form onSubmit={addRelation} className="col-span-3 flex flex-col">
          <select
            value={addValue}
            onChange={(e) => setAddValue(parseInt(e.target.value))}
            className="pl-2 text-xl block"
          >
            <option value="0" disabled>
              Pro přidání vyberte
            </option>
            {keywordsList.map((v) => (
              <option value={v.id} key={v.id}>
                {v.word}
              </option>
            ))}
          </select>
          <input
            type="submit"
            value="Přidat"
            className="cursor-pointer bg-streetlaw-500 w-fit text-lg text-white px-2 self-end mt-6 hover:border-l-2 hover:border-l-green-700"
          />
        </form>
      )}
      <AlertMessage
        message={message}
        className="col-start-6 col-span-3 w-full top-28 text-center"
      />
    </section>
  )
}

export default DatabaseForm

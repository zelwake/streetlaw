import { LessonFormType } from '@projectType/componentTypes'

const LessonForm = ({
  categories,
  keywordsList,
  selected,
  keywords,
  addValue,
  fetchKeywordsGroup,
  removeRelation,
  addRelation,
  setAddValue,
}: LessonFormType) => {
  return (
    <section className="grid grid-cols-8 gap-x-4">
      <ul className="col-span-2">
        {categories.map((v) => (
          <li
            key={v.id}
            onClick={() => fetchKeywordsGroup(v.id)}
            className={`text-xl mb-1 cursor-pointer hover:outline-2 hover:outline-streetlaw-500 ${
              v.id == selected ? 'text-black' : 'text-gray-400'
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
              onClick={() => removeRelation(v.id)}
              className="text-base bg-red-500 px-1 text-white hover:border-l-2 hover:border-l-red-900 "
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
            className=" pl-2 text-xl block"
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
            name="addRelation"
            value="Přidat"
            className="cursor-pointer bg-streetlaw-500 w-fit text-lg text-white px-2 self-end mt-5 hover:border-l-2 hover:border-l-green-700"
          />
        </form>
      )}
    </section>
  )
}

export default LessonForm

import { splitDate } from '@/scripts/timeDate/splitDate'
import { NewsType } from '@projectType/componentTypes'

const News = ({ date, title, abstract }: NewsType) => {
  const { day, month, year } = splitDate(new Date(date))

  console.log(date)

  return (
    <li className="w-full max-h-60 flex justify-between pt-10">
      <div className="w-32 h-32 bg-streetlaw-500 text-white text-center flex flex-col justify-center">
        <p className="text-5xl font-bold">{day}</p>
        <p className="text-xl font-semibold">{month}</p>
        <p className="text-xl font-semibold">{year}</p>
      </div>
      <div className="w-[1100px] shadow-sl px-6 py-5 grid grid-cols-8 grid-rows-3">
        <h3 className="text-2xl font-semibold col-span-7">{title}</h3>
        <p className="w-[950px] text-lg text-justify col-span-7 row-start-2 row-span-2">
          {abstract}
        </p>
        <div className="col-start-8 row-start-1 row-span-3 flex justify-end items-center">
          <div className="bg-streetlaw-500 w-10 h-10 rounded-full relative">
            <button className="text-white text-4xl font-semibold absolute left-[10px] bottom-1">
              &gt;
            </button>
          </div>
        </div>
      </div>
    </li>
  )
}

export default News

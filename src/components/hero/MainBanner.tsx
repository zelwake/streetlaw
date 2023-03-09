import useImageInfo from '@/hooks/useImageInfo'
import Image from 'next/image'

const MainBanner = () => {
  const widthOfHero = 1290 // px
  const heightOfHero = 580 // px

  const [imageUrl, imageText] = useImageInfo()

  return (
    <div
      // background
      className={`bg-streetlaw-500 w-[${widthOfHero}px] h-[${heightOfHero}px] relative`}
    >
      {/* photo */}
      <div className="relative h-full w-auto flex items-center justify-center">
        <Image
          src={'/main-page-photos/' + imageUrl}
          alt={imageText}
          width={widthOfHero}
          height={heightOfHero}
          quality={100}
          className="h-full w-auto"
        />
      </div>

      {/* top green line */}
      <div className="bg-streetlaw-500 h-12 w-[750px] absolute top-0 left-0"></div>
      {/* bottom green line */}
      <div className="bg-streetlaw-500 h-12 w-[750px] absolute bottom-0 right-0 flex items-center justify-end">
        {/* text inside bottom line */}
        <h2 className="text-2xl font-semibold text-white px-5">{imageText}</h2>
      </div>
    </div>
  )
}

export default MainBanner

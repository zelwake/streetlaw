import useImageInfo from '@/hooks/useImageInfo'
import Image from 'next/image'

const MainBanner = () => {
  const WIDTH_OF_SITE = process.env.NEXT_PUBLIC_WIDTH_OF_SITE // px
  const HEIGHT_OF_HERO = 580 // px

  const [imageUrl, imageText] = useImageInfo()

  return (
    <div
      // background
      className={`bg-streetlaw-500 w-sl h-sl relative`}
    >
      {/* photo */}
      <div className="relative h-full w-auto flex items-center justify-center">
        <Image
          src={'/main-page-photos/' + imageUrl}
          alt={imageText}
          width={WIDTH_OF_SITE}
          height={HEIGHT_OF_HERO}
          quality={100}
          className="h-full w-auto"
        />
      </div>

      {/* top green line */}
      <div className="bg-streetlaw-500 h-12 w-fit absolute rounded-r-3xl top-0 left-0">
        <h2 className="text-2xl font-semibold text-streetlaw-500 select-none px-5 text-right">
          {imageText}
        </h2>
      </div>
      {/* bottom green line */}
      <div className="bg-streetlaw-500 h-12 w-fit absolute bottom-0 right-0 rounded-l-3xl flex items-center justify-end">
        {/* text inside bottom line */}
        <h2 className="text-2xl font-semibold text-white px-5">{imageText}</h2>
      </div>
    </div>
  )
}

export default MainBanner

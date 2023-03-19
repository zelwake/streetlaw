import { useEffect, useMemo, useState } from 'react'

const useImageInfo = () => {
  const [imageInfo, setImageInfo] = useState<[string, string]>([
    'placeholder.png',
    'placeholder',
  ])

  const selectImageInfo = useMemo(() => {
    const images: [string, string][] = [
      [
        'IMG-20210727-WA0002_o-1024x837.jpg',
        'Uspořádali jsme letní školu lidských práv',
      ],
      [
        'cropped-2016_04_23a-4-scaled-1-e1649063933974-1024x422.jpg',
        'Učit právo nás baví!',
      ],
      [
        '2018_04_06MCC-fakultni-54-scaled.jpg',
        'Podílíme se na soutěži Mezinárodní Středoškolský Moot Court',
      ],
    ]
    return images.at(Math.floor(Math.random() * images.length)) as [
      string,
      string
    ]
  }, [])

  useEffect(() => {
    setImageInfo(selectImageInfo)
  }, [selectImageInfo])

  return imageInfo
}

export default useImageInfo

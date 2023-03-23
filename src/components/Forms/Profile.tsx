import Image from 'next/image'
import { useState } from 'react'

const Profile = () => {
  const [showPhotoText, setShowPhotoText] = useState<boolean>(false)

  return (
    <form className="grid grid-cols-5 items-center pl-9 pr-16 mt-7 gap-7 relative">
      <label htmlFor="email" className="profile-label">
        Email:
      </label>
      <input id="email" type="email" className="profile-input" />
      <label htmlFor="name" className="profile-label">
        Jméno:
      </label>
      <input id="name" type="text" className="profile-input" />
      <label htmlFor="surname" className="profile-label">
        Příjmení:
      </label>
      <input id="surname" type="text" className="profile-input" />
      <label htmlFor="about" className="profile-label place-self-start">
        Popis:
      </label>
      <textarea
        id="about"
        cols={64}
        rows={10}
        className="col-span-4 resize-none overflow-y-scroll outline-none py-1 px-3 text-2xl bg-gray-100"
      ></textarea>
      <label
        htmlFor="photo"
        className="absolute top-0 right-16 bg-zinc-300  cursor-pointer"
        onMouseEnter={() => setShowPhotoText(true)}
        onMouseLeave={() => setShowPhotoText(false)}
      >
        <Image
          src="/user-profile/placeholder.png"
          alt="profilová fotografie"
          width={200}
          height={200}
          className="rounded-full"
        />
        {showPhotoText && (
          <p className="absolute w-full text-xl text-center top-20 ">
            Změnit fotografii
          </p>
        )}
      </label>
      <input id="photo" type="file" accept="image/*" className="hidden" />
    </form>
  )
}

export default Profile

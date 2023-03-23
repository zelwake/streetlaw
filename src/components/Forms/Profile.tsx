import Button from '@/components/Button'
import { User } from '@prisma/client'
import { UpdateFormInterface } from '@projectType/apiInterface'
import Image from 'next/image'
import { useState } from 'react'

const Profile = ({ user }: { user: User }) => {
  const [showPhotoText, setShowPhotoText] = useState<boolean>(false)

  const [updateForm, setUpdateForm] = useState<UpdateFormInterface>({
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    photoUrl: user.photoUrl || '/user-profile/placeholder.png',
    description: user.description || '',
  })

  const editProfile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // TODO validate info

    try {
      const response = await fetch('/api/user', {
        method: 'PUT',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(updateForm),
      })

      // TODO what to do here?
      switch (response.status) {
        case 200:
          return alert("It's all good!")
        default:
          return alert("Something's wrong man!")
      }
    } catch (error) {
      // TODO do something useful here
      console.log(error)
      alert('Something went wrong. Please try again later.')
    }
  }

  return (
    <form
      onSubmit={(event) => editProfile(event)}
      className="grid grid-cols-5 items-center pl-9 pr-16 my-7 gap-7 relative"
    >
      <label htmlFor="email" className="profile-label">
        Email:
      </label>
      <input
        id="email"
        type="email"
        className="profile-input"
        value={updateForm.email}
        onChange={(e) =>
          setUpdateForm((prev) => ({
            ...prev,
            email: e.target.value,
          }))
        }
      />
      <label htmlFor="name" className="profile-label">
        Jméno:
      </label>
      <input
        id="name"
        type="text"
        className="profile-input"
        value={updateForm.firstName}
        onChange={(e) =>
          setUpdateForm((prev) => ({
            ...prev,
            firstName: e.target.value,
          }))
        }
      />
      <label htmlFor="surname" className="profile-label">
        Příjmení:
      </label>
      <input
        id="surname"
        type="text"
        className="profile-input"
        value={updateForm.lastName}
        onChange={(e) =>
          setUpdateForm((prev) => ({
            ...prev,
            lastName: e.target.value,
          }))
        }
      />
      <label htmlFor="about" className="profile-label place-self-start">
        Popis:
      </label>
      <textarea
        id="about"
        cols={64}
        rows={10}
        className="col-span-4 resize-none overflow-y-scroll outline-none py-1 px-3 text-2xl bg-gray-100"
        value={updateForm.description}
        onChange={(e) =>
          setUpdateForm((prev) => ({
            ...prev,
            description: e.target.value,
          }))
        }
      ></textarea>
      <label
        htmlFor="photo"
        className="absolute top-6 right-16 bg-zinc-300 cursor-pointer"
        onMouseEnter={() => setShowPhotoText(true)}
        onMouseLeave={() => setShowPhotoText(false)}
      >
        <Image
          src={updateForm.photoUrl}
          alt="profilová fotografie"
          width={150}
          height={150}
          className={`rounded-full ${showPhotoText && 'blur-sm'}`}
        />
        {showPhotoText && (
          <p className="absolute w-full text-xl text-center top-16">
            Změnit fotografii
          </p>
        )}
      </label>
      <input id="photo" type="file" accept="image/*" className="hidden" />
      <Button className="col-start-5" value="Uložit" />
    </form>
  )
}

export default Profile

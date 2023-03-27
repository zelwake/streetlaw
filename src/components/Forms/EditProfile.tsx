import SubmitButton from '@/components/SubmitButton'
import { UpdateFormInterface } from '@projectType/apiInterface'
import Image from 'next/image'
import { Dispatch, FormEvent, SetStateAction, useState } from 'react'

const EditProfile = ({
  editProfile,
  updateForm,
  setUpdateForm,
}: {
  editProfile: (event: FormEvent<HTMLFormElement>) => void
  updateForm: UpdateFormInterface
  setUpdateForm: Dispatch<SetStateAction<UpdateFormInterface>>
}) => {
  const [showPhotoText, setShowPhotoText] = useState<boolean>(false)

  return (
    <form
      onSubmit={(event) => editProfile(event)}
      className="grid grid-cols-5 items-center pl-9 pr-16 my-7 gap-y-12 relative"
    >
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
        className="col-span-4 resize-none overflow-y-scroll outline-none py-1 px-3 text-xl bg-gray-100"
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
        className="absolute top-1 right-16 bg-zinc-300 cursor-pointer"
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
      <SubmitButton className="relative -right-5 col-start-5" value="Uložit" />
    </form>
  )
}

export default EditProfile

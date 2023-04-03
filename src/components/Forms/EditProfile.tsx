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
      className="my-8 gap-y-4 flex flex-col relative"
    >
      <label htmlFor="name" className="profile-label">
        <span className="profile-span">Jméno:</span>
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
      </label>
      <label htmlFor="surname" className="profile-label">
        <span className="profile-span">Příjmení:</span>
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
      </label>
      <label htmlFor="about" className="profile-label">
        <span className="profile-span">Popis:</span>
        <textarea
          id="about"
          cols={64}
          rows={10}
          className="resize-none grow overflow-y-scroll outline-none py-1 px-3 bg-gray-50 text-xl"
          value={updateForm.description}
          onChange={(e) =>
            setUpdateForm((prev) => ({
              ...prev,
              description: e.target.value,
            }))
          }
        ></textarea>
      </label>
      <label
        htmlFor="photo"
        className="absolute top-0 right-12 bg-zinc-300 cursor-pointer"
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
          <p className="absolute w-full text-xl text-center top-14">
            Změnit fotografii
          </p>
        )}
      </label>
      <input id="photo" type="file" accept="image/*" className="hidden" />
      <SubmitButton
        className="relative self-end right-[271px]"
        value="Uložit"
      />
    </form>
  )
}

export default EditProfile

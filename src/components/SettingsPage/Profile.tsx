import { User } from '@prisma/client'
import { UpdateFormInterface } from '@projectType/apiInterface'
import { Dispatch, SetStateAction, useState } from 'react'
import EditProfile from '../Forms/EditProfile'

const Profile = ({
  user,
  setUser,
}: {
  user: User
  setUser: Dispatch<SetStateAction<User>>
}) => {
  const [updateForm, setUpdateForm] = useState<UpdateFormInterface>({
    firstName: user.firstName,
    lastName: user.lastName,
    photoUrl: user.photoUrl || '/user-profile/placeholder.png',
    description: user.description || '',
  })

  const editProfile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!updateForm.firstName.trim() || !updateForm.lastName.trim())
      return alert('Chybí jméno nebo příjmení.')

    try {
      const response = await fetch('/api/settings/user', {
        method: 'PUT',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(updateForm),
      })

      switch (response.status) {
        case 200:
          setUser((prev) => ({
            ...prev,
            ...updateForm,
          }))
          // TODO create some pop-up with message what happened instead of alert
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
    <EditProfile
      editProfile={editProfile}
      setUpdateForm={setUpdateForm}
      updateForm={updateForm}
    />
  )
}

export default Profile

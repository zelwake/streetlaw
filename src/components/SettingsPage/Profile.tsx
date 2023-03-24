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

import RightsForm from '@/components/Forms/RightsForm'
import useUserRoleList from '@/hooks/useUserRoleList'
import { UserRoleForm } from '@projectType/componentTypes'
import { useState } from 'react'

const Rights = () => {
  const [userRoleForm, setUserRoleForm] = useState<UserRoleForm>({
    email: '',
    roleId: 0,
  })

  const [updateMessage, setUpdateMessage] = useState<string>('')

  const { userList, updateUserList } = useUserRoleList()

  const updateRole = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const patch = await fetch('/api/settings/rights', {
        method: 'PATCH',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(userRoleForm),
      })

      const json = await patch.json()

      switch (patch.status) {
        case 200:
          updateUserList(userRoleForm, json)
          setUpdateMessage('Změna role proběhla úspěšně.')
          break
        case 400:
          setUpdateMessage('Špatně zadané údaje.')
          break
        case 401:
          setUpdateMessage('Nemáte přístup.')
          break

        case 500:
        default:
          setUpdateMessage('Něco se pokazilo. Opakujte akci později.')
          break
      }
    } catch (error) {
      return setUpdateMessage('Něco se pokazilo. Opakujte akci později.')
    }
  }

  return (
    <RightsForm
      setUserRoleForm={setUserRoleForm}
      updateRole={updateRole}
      userList={userList}
      userRoleForm={userRoleForm}
      updateMessage={updateMessage}
    />
  )
}

export default Rights

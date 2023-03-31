import RightsForm from '@/components/Forms/RightsForm'
import useUserRoleList from '@/hooks/useUserRoleList'
import { UserRoleForm } from '@projectType/componentTypes'
import { useState } from 'react'

const Rights = () => {
  const [userRoleForm, setUserRoleForm] = useState<UserRoleForm>({
    email: '',
    roleId: 0,
  })

  const { userList, updateUserList } = useUserRoleList()

  const updateRole = async (e: React.FormEvent) => {
    e.preventDefault()
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
        break
      case 400:
        alert('Špatně zadané údaje.')
        break
      case 401:
        alert('Nemáte přístup.')
        break

      case 500:
      default:
        alert('Něco se pokazilo. Opakujte akci později.')
        break
    }
  }

  return (
    <RightsForm
      setUserRoleForm={setUserRoleForm}
      updateRole={updateRole}
      userList={userList}
      userRoleForm={userRoleForm}
    />
  )
}

export default Rights

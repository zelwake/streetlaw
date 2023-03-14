import { useRouter } from 'next/router'

const Error = () => {
  const route = useRouter()

  if (route.query.error) return <p>{route.query.error.toString()}</p>
  else return <p>No error happened</p>
}

export default Error

const AlertMessage = ({
  message,
  style,
}: {
  message: string
  style?: string | ''
}) => {
  return <p className={`absolute ${style}`}>{message}</p>
}

export default AlertMessage

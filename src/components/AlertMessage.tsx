const AlertMessage = ({
  message,
  className,
}: {
  message: string
  className?: string | ''
}) => {
  return (
    <p className={`absolute text-lg text-gray-500 ${className}`}>{message}</p>
  )
}

export default AlertMessage

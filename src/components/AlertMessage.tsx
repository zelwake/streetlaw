const AlertMessage = ({
  message,
  className,
}: {
  message: string
  className?: string | ''
}) => {
  return <p className={`absolute ${className}`}>{message}</p>
}

export default AlertMessage

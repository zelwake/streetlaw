const Button = ({
  value,
  className,
}: {
  value: string
  className: string | ''
}) => {
  return (
    <input
      type="submit"
      value={value}
      className={`w-44 h-14 text-4xl font-semibold text-center bg-streetlaw-500 cursor-pointer text-white ${className}`}
    />
  )
}

export default Button

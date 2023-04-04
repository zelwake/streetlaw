const SubmitButton = ({
  value,
  className,
}: {
  value: string
  className?: string
}) => {
  return (
    <input
      type="submit"
      value={value}
      className={`w-fit px-4 py-1 text-2xl font-semibold  bg-streetlaw-500 cursor-pointer text-white hover:border-l-2 hover:border-l-green-700  ${
        className || ''
      }`}
    />
  )
}

export default SubmitButton

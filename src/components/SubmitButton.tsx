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
      className={`w-fit px-4 py-1 text-2xl font-semibold text-center bg-streetlaw-500 cursor-pointer text-white ${
        className || ''
      }`}
    />
  )
}

export default SubmitButton

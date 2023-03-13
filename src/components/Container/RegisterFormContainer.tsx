const RegisterFormContainer = ({
  children,
}: {
  children: JSX.Element[] | JSX.Element
}) => {
  return (
    <div className="border-4 border-streetlaw-500 p-4 shadow-sl">
      {children}
    </div>
  )
}

export default RegisterFormContainer

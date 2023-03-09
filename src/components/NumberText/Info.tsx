const Info = ({ number, text }: { number: string; text: string }) => {
  return (
    <div className="h-28 flex gap-3 justify-between">
      <div className="bg-streetlaw-500 w-28 flex justify-center items-center">
        <h2 className="text-4xl font-bold text-white">{number}</h2>
      </div>
      <div className="shadow-sl flex text-center items-center">
        <p className="text-xl px-5 break-words">{text}</p>
      </div>
    </div>
  )
}

export default Info

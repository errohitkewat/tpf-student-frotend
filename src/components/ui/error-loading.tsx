
export default function Error({message = "Something went wrong"}: any) {
  return (
    <div className=" h-full w-full fixed top-0 left-0 pl-45 bg-black/80 flex items-center justify-center  ">

      <div className="flex  flex-col   justify-center items-center  ">
        
        <div className="text-6xl mb-4">⚠️</div>

        <h2 className="text-lg text-white font-semibold mb-2">
          Oops! Error Occurred
        </h2>

        <p className="text-gray-400 text-sm mb-4 text-center max-w-sm">
          {message}
        </p>

        <button className="px-4 py-1 duration-300 border border-black rounded-md bg-black text-white hover:bg-white hover:text-black transition">
            Try Again
        </button> 

      </div>

    </div>
  );
}



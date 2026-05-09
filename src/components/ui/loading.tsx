export default function Loading({ text = "Loading..." }: { text?: string }) {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black/80 flex items-center pl-[50%] ">
      
      <div className="flex flex-col items-center gap-4">
        
        <div className="w-10 h-10 border-4 border-white border-t-transparent rounded-full animate-spin"></div>

        <p className="text-white  tracking-wide animate-pulse">
          {text}
        </p>

      </div>
    </div>
  );
}

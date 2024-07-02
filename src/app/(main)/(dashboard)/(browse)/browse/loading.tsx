
const Loading = () => {
  return (
    <div>
      <div className="animate-pulse border rounded-lg">
        <div className="rounded-t-xl w-[320px] h-[180px] object-contain object-center"></div>
        <div className="px-4 py-3 flex flex-col gap-3">
          <div className="h-4 bg-gray-300 rounded w-3/4"></div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-300 rounded"></div>
            <div className="h-4 bg-gray-300 rounded w-5/6"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Loading;

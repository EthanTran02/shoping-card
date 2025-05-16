export default function ShopLoading() {
  return (
    <div>
      <h1 className="mt-9 h-5 w-70 animate-pulse rounded-full bg-gray-200"></h1>

      <div className="mt-10 mb-20 grid grid-cols-1 place-items-center gap-x-6 gap-y-12 sm:mt-16 sm:mb-32 sm:grid-cols-2 md:grid-cols-3 md:gap-x-10">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="w-full max-w-xs">
            <div className="mx-auto h-[200px] w-full max-w-[200px] animate-pulse rounded-lg bg-gray-200"></div>
            <div className="mx-auto mt-4 h-3 w-full max-w-[200px] animate-pulse rounded-lg bg-gray-200"></div>
            <div className="mx-auto mt-2 h-3 w-full max-w-[200px] animate-pulse rounded-lg bg-gray-200"></div>
            <div className="mx-auto mt-4 h-3 w-15 animate-pulse rounded-lg bg-gray-200"></div>
          </div>
        ))}
      </div>
    </div>
  );
}

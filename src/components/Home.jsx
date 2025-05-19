export default function Home() {
  return (
    <div
      className="-mx-20 -my-8 flex min-h-screen flex-grow flex-col items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
      }}
    >
      <div className="mx-auto -mt-15 flex w-full max-w-2xl flex-col items-center rounded-xl bg-white/70 px-8 py-10 backdrop-blur-sm">
        <h1 className="mb-4 text-center text-4xl font-bold text-gray-800">
          Welcome to Glow!
        </h1>
        <p className="mb-8 max-w-xl text-center text-lg text-gray-600">
          Discover the best deals on fashion, jewelery, and more. Start shopping
          now and fill your cart with your favorite items!
        </p>
        <a
          href="/shop"
          className="focus:ring-opacity-50 rounded-md bg-sky-800 px-8 py-3 text-lg font-semibold text-white shadow-md transition-colors duration-200 hover:bg-sky-900 focus:ring-2 focus:ring-blue-400 focus:outline-none"
        >
          Shop Now
        </a>
      </div>
    </div>
  );
}

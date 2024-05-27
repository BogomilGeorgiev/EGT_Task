function Pagination({ totalPages, currentPage, setCurrentPage }) {
  return (
    <div className="flex mx-auto justify-center w-full">
      <div>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            className={`px-3 py-1 cursor-pointer rounded ${
              currentPage === index + 1
                ? "bg-blue-500 text-white"
                : "bg-white text-gray-700 hover:bg-gray-400"
            }`}
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            disabled={currentPage === index + 1}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Pagination;

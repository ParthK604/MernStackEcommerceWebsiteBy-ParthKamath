function Pagination({ currentPage, totalPages, onPageChange }) {
  return (
    <div className="flex justify-center m-4 gap-2 ">
      <button
        disabled={currentPage === 0}
        onClick={() => onPageChange(currentPage - 1)}
        className="border p-2 cursor-pointer"
      >
        Left
      </button>

      {[...Array(totalPages).keys()].map((n) => (
        <span
          key={n}
          onClick={() => onPageChange(n)}
          className={`border p-2 cursor-pointer ${
            currentPage === n ? "bg-purple-600 text-white" : ""
          }`}
        >
          {n + 1}
        </span>
      ))}

      <button 
        disabled={currentPage === totalPages - 1}
        onClick={() => onPageChange(currentPage + 1)}
        className="border p-2 cursor-pointer"
      >
        Right
      </button>
    </div>
  );
}

export default Pagination;

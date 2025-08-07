import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  isLoading: boolean;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  isLoading,
}) => {
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      }
    }

    return pages;
  };

  return (
    <div className="bg-card rounded-xl p-6 border border-accent/10">
      <div className="flex justify-center items-center space-x-3">
        {/* Previous Button */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1 || isLoading}
          className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 font-poppins ${
            currentPage === 1 || isLoading
              ? "bg-card border border-accent/20 text-secondary cursor-not-allowed"
              : "bg-card border border-accent/30 text-primary hover:bg-accent/20 hover:scale-105"
          }`}
        >
          <span className="flex items-center">
            <span className="mr-2">←</span>
            Previous
          </span>
        </button>

        {/* Page Numbers */}
        <div className="flex space-x-2">
          {getPageNumbers().map((page, index) => (
            <React.Fragment key={index}>
              {page === "..." ? (
                <span className="px-3 py-2 text-secondary">•••</span>
              ) : (
                <button
                  onClick={() => onPageChange(page as number)}
                  disabled={isLoading}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 font-poppins ${
                    currentPage === page
                      ? "bg-accent text-white shadow-lg scale-105"
                      : "bg-card border border-accent/30 text-primary hover:bg-accent/20 hover:scale-105"
                  } ${isLoading ? "cursor-not-allowed" : ""}`}
                >
                  {page}
                </button>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Next Button */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages || isLoading}
          className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 font-poppins ${
            currentPage === totalPages || isLoading
              ? "bg-card border border-accent/20 text-secondary cursor-not-allowed"
              : "bg-card border border-accent/30 text-primary hover:bg-accent/20 hover:scale-105"
          }`}
        >
          <span className="flex items-center">
            Next
            <span className="ml-2">→</span>
          </span>
        </button>
      </div>

      {/* Page Info */}
      <div className="text-center mt-4">
        <p className="text-secondary text-sm font-poppins">
          Page {currentPage} of {totalPages}
        </p>
      </div>
    </div>
  );
};

import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { PaginationProps } from "@/types/interface";
import { getPageNumbers } from "./../../lib/getNumbers";
import { Button } from "@/components/ui/button";

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  return (
    <nav className="flex items-center justify-center mt-8 mb-8">
      <ul className="flex items-center gap-2">
        <li>
          <Button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            variant="outline"
            size="icon"
            aria-label="Previous page"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
        </li>

        {getPageNumbers({ currentPage, totalPages }).map((page, index) => (
          <li key={index}>
            <Button
              onClick={() =>
                typeof page === "number" ? onPageChange(page) : null
              }
              disabled={page === "..."}
              variant={page === currentPage ? "default" : "outline"}
              size="icon"
              className={`min-w-[40px] ${page === "..." ? "cursor-default" : ""}`}
              aria-current={page === currentPage ? "page" : undefined}
            >
              {page}
            </Button>
          </li>
        ))}

        <li>
          <Button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            variant="outline"
            size="icon"
            aria-label="Next page"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;

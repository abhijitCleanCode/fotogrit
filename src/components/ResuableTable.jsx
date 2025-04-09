import { useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
} from "./ui/pagination";
import { Table, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Skeleton } from "./ui/skeleton";
import { Button } from "./ui/button";
import { DropdownMenu, DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { DropdownMenuContent, DropdownMenuTrigger } from "./ui/dropdown-menu";

const ResuableTable = ({
  data,
  columns,
  actions = [],
  pageSize = 10,
  onPageChange = () => {},
  currentPage = 1,
  totalPages = 1,
  isLoading = false,
  emptyState,
}) => {
  const [openDropdownId, setOpenDropdownId] = useState(null);

  // safe handler: ensure that received page is within bounds
  const handlePageChange = (page) => {
    // validate the page number
    if (page >= 1 && page <= totalPages) {
      // optional chaining to support optional prop, no crashing if prop is not passed
      onPageChange?.(page);
    }
  };

  const getPaginationsItems = () => {
    const items = []; // an array of react elements (note: react elements!) representing the pagination control
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        items.push(
          <PaginationItem key={i}>
            <PaginationLink
              isActive={i === currentPage} // highlight the current page with isActive
              onClick={() => handlePageChange(i)}
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }
    } else {
      // this is where the real logic kicks in
      // 1. determine the start and end of visible pages
      let startPage = Math.max(
        1,
        currentPage - Math.floor(maxVisiblePages / 2)
      );
      let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

      // 2. if the number of visible pages is less than the max, adjust the startPage. A clean up adjustment in pagination logic
      if (endPage - startPage + 1 < maxVisiblePages) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
      }

      if (startPage > 1) {
        items.push(
          <PaginationItem key={1}>
            <PaginationLink onClick={() => handlePageChange(1)}>
              1
            </PaginationLink>
          </PaginationItem>
        );
        if (startPage > 2) {
          items.push(<PaginationEllipsis key="ellipses-start" />);
        }
      }

      // 4. loop through visible pages
      for (let i = startPage; i <= endPage; i++) {
        items.push(
          <PaginationItem key={i}>
            <PaginationLink
              isActive={i === currentPage}
              onClick={() => handlePageChange(i)}
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }

      // 5. add end ecllipses and last page
      if (endPage < totalPages) {
        // checking if u r at last page
        if (endPage < totalPages - 1) {
          items.push(<PaginationEllipsis key="ellipsis-end" />);
        }
        items.push(
          <PaginationItem key={totalPages}>
            <PaginationLink onClick={() => handlePageChange(totalPages)}>
              {totalPages}
            </PaginationLink>
          </PaginationItem>
        );
      }
    }

    return items;
  };

  const renderCellContent = (row, column) => {
    if (column.cell) {
      return column.cell(row);
    }

    return row[column.accessorKey] ?? "-";
  };

  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((column) => (
                <TableHead
                  key={column.accessorKey}
                  className={column.className}
                >
                  {column.header}
                </TableHead>
              ))}

              {actions.length > 0 && (
                <TableHead className="text-right">Actions</TableHead>
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              // display loading skeleton (visually appleaing)
              // 1. Create an array of empty items equal to number of rows per page, 2. then iterate over the fake array just to render the placeholder rows while actual data is loading
              Array.from({ length: pageSize }).map((_, index) => (
                <TableRow key={`skeleton-${index}`}>
                  {columns.map((column) => (
                    <TableCell key={`skeleton-${column.accessorKey}-${index}`}>
                      <Skeleton className="h-4 w-[100px]" />
                    </TableCell>
                  ))}
                  {actions.length > 0 && (
                    <TableCell>
                      <Skeleton className="h-8 w-8 rounded-full" />
                    </TableCell>
                  )}
                </TableRow>
              ))
            ) : data.length > 0 ? (
              data.map((row, index) => (
                <TableRow key={`row-${index}`}>
                  {columns.map((column) => (
                    <TableCell
                      key={`${column.accessorKey}-${index}`}
                      className={column.className}
                    >
                      {renderCellContent(row, column)}
                    </TableCell>
                  ))}
                  {actions.length > 0 && (
                    <TableCell className="text-right">
                      {actions.length === 1 ? (
                        <Button
                          variant={actions[0].variant || "ghost"}
                          size="sm"
                          onClick={() => actions[0].onClick(row)}
                          className="h-8 w-8 p-0"
                        >
                          {actions[0].icon}
                        </Button>
                      ) : (
                        <DropdownMenu
                          open={openDropdownId === `dropdown-${index}`}
                          onOpenChange={(open) =>
                            setOpenDropdownId(open ? `dropdown-${index}` : null)
                          }
                        >
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <span className="sr-only">Open menu</span>
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            {actions.map((action, actionIndex) => (
                              <DropdownMenuItem
                                key={`action-${actionIndex}`}
                                onClick={() => action.onClick(row)}
                                className="cursor-pointer"
                              >
                                {action.icon && (
                                  <span className="mr-2">{action.icon}</span>
                                )}
                                {action.label}
                              </DropdownMenuItem>
                            ))}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      )}
                    </TableCell>
                  )}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colspan={columns.length + (actions.lenght > 0 ? 1 : 0)}
                  className="h-24 text-center"
                >
                  {emptyState || "No data available"}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {totalPages > 1 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              />
            </PaginationItem>

            {getPaginationsItems()}

            <PaginationItem>
              <PaginationNext
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
};

export default ResuableTable;

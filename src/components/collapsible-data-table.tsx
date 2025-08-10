"use client";

import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronRight } from "lucide-react";
import {
  useReactTable,
  ColumnDef,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";

interface CollapsibleTableProps<TData> {
  data: TData[];
  columns: ColumnDef<TData>[];
  renderDetails: (row: TData) => React.ReactNode;
  multiExpand?: boolean;
  getRowId?: (row: TData) => string;
}

export function CollapsibleDataTable<TData>({
  data,
  columns,
  renderDetails,
  multiExpand = false,
  getRowId,
}: CollapsibleTableProps<TData>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getRowId,
  });

  const [openRows, setOpenRows] = React.useState<Set<string>>(new Set());

  function toggleRow(id: string) {
    setOpenRows((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        if (!multiExpand) newSet.clear();
        newSet.add(id);
      }
      return newSet;
    });
  }

  return (
    <div className="overflow-hidden rounded-lg border">
      <Table>
        <TableHeader className="bg-muted sticky top-0 z-10">
          <TableRow>
            {/* empty header for toggle column */}
            <TableHead className="w-8" />
            {table
              .getHeaderGroups()
              .map((headerGroup) =>
                headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))
              )}
          </TableRow>
        </TableHeader>

        <TableBody className="**:data-[slot=table-cell]:first:w-8">
          {table.getRowModel().rows.length > 0 ? (
            table.getRowModel().rows.map((row) => {
              const id = row.id;
              const isOpen = openRows.has(id);
              return (
                <Collapsible
                  key={id}
                  open={isOpen}
                  onOpenChange={() => toggleRow(id)}
                  asChild
                >
                  <>
                    {/* main row */}
                    <TableRow
                      data-state={row.getIsSelected() ? "selected" : undefined}
                    >
                      <TableCell className="w-8 p-0">
                        <CollapsibleTrigger asChild>
                          <Button variant="ghost" size="sm" className="p-0">
                            {isOpen ? (
                              <ChevronDown className="h-4 w-4" />
                            ) : (
                              <ChevronRight className="h-4 w-4" />
                            )}
                          </Button>
                        </CollapsibleTrigger>
                      </TableCell>
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>

                    {/* expanded row */}
                    <CollapsibleContent asChild>
                      <TableRow>
                        <TableCell
                          colSpan={row.getVisibleCells().length + 1}
                          className="bg-muted"
                        >
                          {renderDetails(row.original)}
                        </TableCell>
                      </TableRow>
                    </CollapsibleContent>
                  </>
                </Collapsible>
              );
            })
          ) : (
            <TableRow>
              <TableCell
                colSpan={table.getVisibleLeafColumns().length + 1}
                className="h-24 text-center"
              >
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

"use client"

import { Badge } from "@/lib/ui/badge"
import { Button } from "@/lib/ui/button"
import { Course } from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, Pencil } from "lucide-react"
import Link from "next/link"
export const CourseTableColumns: ColumnDef<Course>[] = [
  {
    accessorKey: "title",
    header:  ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Title
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "price",
    header:  ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Price (USD)
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("price"))
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount || 0)
 
      return <div className="font-medium">{formatted}</div>
    }
  },
  {
    accessorKey: "isPublished",
    header:  ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const isPublished = row.getValue("isPublished") || false;
      return (
        <Badge className={`${isPublished && 'bg-[#9747FF] hover:bg-[#9747FF]/80'}`}>
          {row.original.isPublished ? "Published" : "Draft"}
        </Badge>
      )
    }
  },
  {
    id: "actions",
    cell: ({row}) => {
      return (
        <Link href={`/instructor/courses/${row.original.id}/basic`} className="flex gap-2 text-center hover:text-[#9747FF]"><Pencil className="h-4 w-4"/>Edit</Link>
      )
    }
  }
]

"use client";
import { ReactNode } from "react";
import Link from "next/link";

interface Column {
  label: string,
  key: string
}

interface TableProps {
  data: Record<string, any>[],
  columns: Column[]
}

/** A reusable table component to table in data[] and show 
 * 
 * @param data, an array of objects to display as rows
 * @param columns, an array describing the which keys in our data get columns 
 * Column { label: string, key: string } 
 * @returns a Table component populated with the data given
 */
export default function DocutiserTable ( { data, columns } : TableProps ) {
  
  // Function to create header
  const createHeader = () => (
    <thead className="bg-gray-100 border-b">
      <tr className="text-left">
        { 
          columns.map( (col : Column) => (
            <th key={col.key} className="px-4 py-2">
              {col.label}
            </th>
          ))
        }
      </tr>
    </thead>
  )

  // Function to create row
  const createRow = (rowData : Record<string, ReactNode>) => (
    <tr className="">
      {
        columns.map( (col : Column) => (
          <td className="px-4 py-2 border-gray-300">
            {
              rowData[col.key]
            }
          </td>
        ))
      }
    </tr>
  )

  // Function to create body, utilisation createRow function
  const createBody = () => (
    <tbody className="">
      {
        data.map( (thisData) => (
          createRow(thisData)
        ))
      }
    </tbody>
  )

  return (
    <table className="w-full border p-4 space-y-2 mt-5">
      {createHeader()}
      {createBody()}
    </table>
  )
}


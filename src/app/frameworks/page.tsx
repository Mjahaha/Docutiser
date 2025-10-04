import Link from "next/link";
import { getFrameworks, Framework } from "@/utils/frameworks";
import { FrameworkList } from "./FrameworkList";
import { ReactNode } from "react";
import DocutiserTable from "../components/DocutiserTable";

interface Column {
  label: string,
  key: string
}

export default async function Frameworks() {
  const frameworkData = await getFrameworks();

  // Sorts our the data for the DocutiserTable component 
  const frameworkColumnsForTable : Column[] = [
    { label: 'Framework Name', key: 'name'},
    { label: 'Framework Description', key: 'description'},
    { label: ' ', key: 'link'},
  ]
  interface FrameworksForTable extends Framework {
    link?: ReactNode
  }
  let frameworksForTable : FrameworksForTable[] = frameworkData.map( (framework : Framework) => ({
      ...framework,
      link: (<Link 
        href={`/frameworks/details/${framework.id}`} 
        className="border px-4 py-2 mx-4"
      >
        View
      </Link>)
  }))
  console.log(frameworksForTable)


  return (
    <div className="p-8 space-y-8">
      {/* Back button */}
      <div>
        <Link href="/" className="border px-4 py-2">
          ← Back to Dashboard
        </Link>
      </div>

      <h1 className="text-center text-xl font-bold">Frameworks</h1>

      <FrameworkList frameworks={frameworkData} />
      <Link href="/frameworks/builder" className="border px-4 py-2">
        + New Framework
      </Link>
      <DocutiserTable data={frameworksForTable} columns={frameworkColumnsForTable} />
      


    </div>
  );
}

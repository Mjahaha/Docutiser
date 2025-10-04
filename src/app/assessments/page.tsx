import Link from "next/link";
import { getAssessment, Assessment } from "@/utils/assessments";
import { ReactNode } from "react";
import DocutiserTable, { Column } from "../components/DocutiserTable";

export default async function AssessmentHistory() {
  const assessments = [getAssessment(1), getAssessment(2)];
  const assessmentData = await Promise.all(assessments);

  // Sorts our the data for the DocutiserTable component 
  const assessmentColumnsForTable : Column[] = [
    { label: 'Assessment Name', key: 'name'},
    { label: 'Assessment Description', key: 'description'},
    { label: ' ', key: 'link'},
  ]
  interface AssessmentDataForTable extends Assessment {
    link?: ReactNode
  }
  const assessmentDataForTable : AssessmentDataForTable[] = assessmentData.map( (assessment : Assessment) => ({
    ...assessment, 
    link: (
      <Link 
        href={`/assessments/details/${assessment.id}`}
        className="border px-4 py-2 mx-4"
      >
        View
      </Link>
    )
  }));
  console.log(assessmentDataForTable)

  function renderAssessmentInHistory(assessment: { id: number; name: string; framework: string }) 
    {
    return (
      <li key={assessment.id} className="flex justify-between m-5">
          <span>{assessment.name}</span>
          <span>{assessment.framework}</span>
          <div>
            <Link
              href={`/assessments/details/${assessment.id}`}
              className="border px-4 py-2 mx-4">View</Link>
            <Link href="#" className="border px-4 py-2">Delete</Link>
          </div>
        </li>
    );
  }

  return (
    <div className="p-8 space-y-8">
      {/* Back button */}
      <div>
        <Link href="/" className="border px-4 py-2">
          ← Back to Dashboard
        </Link>
      </div>
      <h1 className="text-center text-xl font-bold">Document Assessments</h1>

      <ul className="border p-4 space-y-2">
        {assessmentData.map(renderAssessmentInHistory)}
      </ul>
      <div>
        <Link href="/assessments/new" className="border px-4 py-2">+ New </Link>
      </div>
      <DocutiserTable data={assessmentDataForTable} columns={assessmentColumnsForTable} />

    </div>
  );
}

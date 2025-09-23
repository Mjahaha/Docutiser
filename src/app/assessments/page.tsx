import Link from "next/link";
import { getAssessment } from "@/utils/assessments";

export default async function AssessmentHistory() {
  const assessments = [getAssessment(1), getAssessment(2)];
  const assessmentData = await Promise.all(assessments);

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
    </div>
  );
}

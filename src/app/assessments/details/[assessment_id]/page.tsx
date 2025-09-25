import Link from "next/link";
import { notFound } from "next/navigation";
import { getAssessment } from "@/utils/assessments";

export default async function AssessmentDetail({params,}: { params: { assessment_id: string } }) 
{
  const id = Number(params.assessment_id);
  if (Number.isNaN(id)) notFound();
  let assessment;
  try {
    assessment = await getAssessment(id);
  } catch (e) {
    notFound();
  }
  if (!assessment) notFound();

  return (
    <div className="p-8 space-y-8">
      <div>
        <Link href="/assessments" className="border px-4 py-2">← Back to Assessments</Link>
      </div>
      <h1 className="text-center text-xl font-bold">Assessment Results</h1>

      <div className="border p-4">
        <p><strong>Name:</strong> {assessment.name}</p>
        <p><strong>Description:</strong> {assessment.description}</p>
        <p><strong>Framework:</strong> {assessment.framework}</p>
      </div>

      <div className="space-y-2">
        <h2 className="font-semibold">Summary</h2>
        <p>{assessment.summary}</p>
      </div>

      <div className="space-y-2">
        <h2 className="font-semibold">Results</h2>
        <ul className="border p-4 space-y-2">
          {assessment.results.map((result) => (
            <li key={result.requirementId} className="flex justify-between">
              <span>{result.requirementName}</span>
              <span>{result.passed ? '✅ Pass' : '❌ Fail'}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex space-x-2">
        <button className="border px-4 py-2">Re-assess</button>
      </div>
    </div>
  );
}
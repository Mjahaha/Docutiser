import Link from "next/link";

export default function AssessmentDetail() {
  return (
    <div className="p-8 space-y-8">
      <div>
        <Link href="/assessments" className="border px-4 py-2">← Back to Assessments</Link>
      </div>
      <h1 className="text-center text-xl font-bold">Assessment Results</h1>

      <div className="border p-4">
        <p><strong>Name:</strong> My Document</p>
        <p><strong>Description:</strong> Auto generated description</p>
        <p><strong>Framework:</strong> Hugh Jackman Letter Assessment</p>
      </div>

      <div className="space-y-2">
        <h2 className="font-semibold">Summary</h2>
        <p>
          The document was up to par in several areas ....
        </p>
      </div>

      <div className="space-y-2">
        <h2 className="font-semibold">Results</h2>
        <ul className="border p-4 space-y-2">
          <li className="flex justify-between">
            <span>Requirement 1</span>
            <span>✅ Pass</span>
          </li>
          <li className="flex justify-between">
            <span>Requirement 2</span>
            <span>❌ Fail</span>
          </li>
        </ul>
      </div>

      <div className="flex space-x-2">
        <button className="border px-4 py-2">Re-assess</button>
      </div>
    </div>
  );
}

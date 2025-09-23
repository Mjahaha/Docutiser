import Link from "next/link";

export default function AssessmentHistory() {
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
        <li className="flex justify-between m-5">
          <span>Assessment 1</span>
          <span>Hugh Jackman Letter Assessment</span>
          <div>
            <Link href="/assessments/details/1" className="border px-4 py-2 mx-4">View</Link>
            <Link href="#" className="border px-4 py-2">Delete</Link>
          </div>
        </li>
        <li className="flex justify-between m-5">
          <span>Assessment 2</span>
          <span>Hugh Jackman Letter Assessment</span>
          <div>
            <Link href="/assessments/details/2" className="border px-4 py-2 mx-4">View</Link>
            <Link href="#" className="border px-4 py-2">Delete</Link>
          </div>
        </li>
      </ul>
      <div className="flex space-x-2">
      </div>
      <div>
        <Link href="/assessments/new" className="border px-4 py-2">+ New </Link>
      </div>
    </div>
  );
}

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
        <li className="flex justify-between">
          <span>Assessment 1</span>
          <span>Hugh Jackman Fan Letter</span>
          <Link href="/assessments/details" className="border px-4 py-2">View</Link>
        </li>
        <li className="flex justify-between">
          <span>Assessment 2</span>
          <span>Hugh Jackman Fan Letter</span>
          <Link href="/assessments/details" className="border px-4 py-2">View</Link>
        </li>
      </ul>

      <div className="flex space-x-2">
        <button className="border px-4 py-2">Re-run</button>
        <button className="border px-4 py-2">Delete</button>
      </div>
    </div>
  );
}

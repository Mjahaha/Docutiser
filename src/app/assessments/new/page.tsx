import Link from "next/link";

export default function NewAssessment() {
  return (
    <div className="p-8 space-y-8">
      <h1 className="text-center text-xl font-bold">New Assessment</h1>
      <div>
        <Link href="/assessments" className="border px-4 py-2">← Back to Assessments</Link>
      </div>
      <div>
        <label className="block">Select Framework</label>
        <select className="border w-full">
          <option>Hugh Jackman Letter Assessment</option>
          <option>Framework B</option>
        </select>
      </div>

      <div>
        <label className="block">Upload Document</label>
        <input type="file" className="border w-full" />
      </div>

      <div>
        <label className="block">Name</label>
        <input className="border w-full" placeholder="Generated name" />
      </div>

      <div>
        <label className="block">Description</label>
        <textarea className="border w-full" placeholder="Generated description" />
      </div>

      <button className="border px-4 py-2">Process Document</button>
    </div>
  );
}

import Link from "next/link";

export default function Frameworks() {
  return (
    <div className="p-8 space-y-8">
      {/* Back button */}
      <div>
        <Link href="/" className="border px-4 py-2">
          ← Back to Dashboard
        </Link>
      </div>

      <h1 className="text-center text-xl font-bold">Frameworks</h1>

      <ul className="border p-4 space-y-2">
        <li className="flex justify-between m-5">
          <span>Hugh Jackman Letter Assessment</span>
          <span>Assess the contents of a Hugh Jackman fan letter</span>
          <div>
            <Link href="/frameworks/builder" className="border px-4 py-2 mx-4">View</Link>
            <Link href="#" className="border px-4 py-2">Delete</Link>
          </div>
        </li>
        <li className="flex justify-between m-5">
          <span>Framework 2</span>
          <span>Framework to assess a document type</span>
          <div>
            <Link href="/frameworks/builder" className="border px-4 py-2 mx-4">View</Link>
            <Link href="#" className="border px-4 py-2">Delete</Link>
          </div>
        </li>
      </ul>

      <Link href="/frameworks/builder" className="border px-4 py-2">
        + New Framework
      </Link>
    </div>
  );
}

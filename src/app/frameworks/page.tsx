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
        <li className="flex justify-between">
          <span>Framework A</span>
          <div className="space-x-2">
            <button>Edit</button>
            <button>Delete</button>
          </div>
        </li>
        <li className="flex justify-between">
          <span>Framework B</span>
          <div className="space-x-2">
            <button>Edit</button>
            <button>Delete</button>
          </div>
        </li>
      </ul>

      <Link href="/frameworks/builder" className="border px-4 py-2">
        + New Framework
      </Link>
    </div>
  );
}

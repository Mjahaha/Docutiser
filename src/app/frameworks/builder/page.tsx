import Link from "next/link";

export default function FrameworkBuilder() {
  return (
    <div className="p-8 space-y-8">
      <div>
        <Link href="/assessments" className="border px-4 py-2">← Back to Frameworks</Link>
      </div>
      <h1 className="text-center text-xl font-bold">Framework Builder</h1>

      <div>
        <label className="block">Name</label>
        <input className="border w-full" placeholder="Framework name" />
      </div>

      <div>
        <label className="block">Description</label>
        <textarea className="border w-full" placeholder="Framework description" />
      </div>

      <div className="space-y-2">
        <h2 className="font-semibold">Requirements</h2>
        <ul className="border p-4 space-y-2">
          <li className="flex justify-between">
            <span>Requirement 1</span>
            <button>Remove</button>
          </li>
        </ul>
        <div className="flex space-x-2">
          <input className="border flex-1" placeholder="New requirement" />
          <button className="border px-4">Add</button>
        </div>
      </div>

      <Link href="/frameworks" className="border px-4 py-2">Save Framework</Link>
    </div>
  );
}

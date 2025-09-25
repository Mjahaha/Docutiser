import Link from "next/link";
import { getFrameworks } from "@/utils/frameworks";

export default async function Frameworks() {
  const frameworkData = await getFrameworks();

  function renderFramework(framework: { id: number; name: string; description: string }) {
    return (
      <li key={framework.id} className="flex justify-between m-5">
          <span>{framework.name}</span>
          <span>{framework.description}</span>
          <div>
            <Link href={`/frameworks/details/${framework.id}`} className="border px-4 py-2 mx-4">View</Link>
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

      <h1 className="text-center text-xl font-bold">Frameworks</h1>

      <ul className="border p-4 space-y-2">
        {frameworkData.map(renderFramework)}
      </ul>

      <Link href="/frameworks/builder" className="border px-4 py-2">
        + New Framework
      </Link>
    </div>
  );
}

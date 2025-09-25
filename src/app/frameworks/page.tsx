import Link from "next/link";
import { getFrameworks } from "@/utils/frameworks";
import { FrameworkList } from "./frameworkList";

export default async function Frameworks() {
  const frameworkData = await getFrameworks();
  return (
    <div className="p-8 space-y-8">
      {/* Back button */}
      <div>
        <Link href="/" className="border px-4 py-2">
          ← Back to Dashboard
        </Link>
      </div>

      <h1 className="text-center text-xl font-bold">Frameworks</h1>

      <FrameworkList frameworks={frameworkData} />

      <Link href="/frameworks/builder" className="border px-4 py-2">
        + New Framework
      </Link>
    </div>
  );
}

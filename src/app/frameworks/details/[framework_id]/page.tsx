import Link from "next/link";
import { notFound } from "next/navigation";
import { getFramework } from "@/utils/frameworks";

export default async function frameworkDetail({params,}: { params: { framework_id: string } }) 
{
  const { framework_id } = await params;
  const id = Number(framework_id);
  if (Number.isNaN(id)) notFound();
  let framework;
  try {
    framework = await getFramework(id);
  } catch (e) {
    notFound();
  }
  if (!framework) notFound();

  return (
    <div className="p-8 space-y-8">
      <div>
        <Link href="/frameworks" className="border px-4 py-2">← Back to frameworks</Link>
      </div>
      <h1 className="text-center text-xl font-bold">Framework Results</h1>

      <div className="border p-4">
        <p><strong>Name:</strong> {framework.name}</p>
        <p><strong>Description:</strong> {framework.description}</p>
      </div>

      <div className="space-y-2">
        <h2 className="font-semibold">Results</h2>
        <ul className="border p-4 space-y-2">
          {framework.requirements.map((result) => (
            <li key={result.requirementId} className="flex justify-between">
              <span>{result.requirementName}</span>
              <span>{result.requirementDesc}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex space-x-2">
        <button className="border px-4 py-2">Add Requirement</button>
      </div>
    </div>
  );
}
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

type Framework = { id: number; name: string; description: string };

export function FrameworkList({ frameworks }: { frameworks: Framework[] }) {
  const router = useRouter();

  const deleteFramework = async (id: number) => {
    try {
      const response = await fetch(`/api/frameworks/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete framework");
      router.refresh(); // re-fetch server data
    } catch (error) {
      console.error("Error deleting framework:", error);
    }
  };

  return (
    <ul className="border p-4 space-y-2">
      {frameworks.map((framework) => (
        <li key={framework.id} className="flex justify-between m-5">
          <span>{framework.name}</span>
          <span>{framework.description}</span>
          <div>
            <Link
              href={`/frameworks/details/${framework.id}`}
              className="border px-4 py-2 mx-4"
            >
              View
            </Link>
            <button
              onClick={() => deleteFramework(framework.id)}
              className="border px-4 py-2"
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}

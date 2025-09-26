import Link from "next/link";

export default function Home() {
  return (
    <div className="p-8 space-y-12">
      {/* Title */}
      <h1 className="text-center text-2xl font-bold">Welcome to Docutiser</h1>
      <p className="text-center text-sm text-gray-600">
        Your home for document assessments and frameworks.
      </p>

      {/* Placeholder sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Assessments card */}
        <div className="border p-6 flex flex-col items-center justify-center space-y-4">
          <h2 className="font-semibold text-lg">Assessments</h2>
          <p className="text-center text-sm text-gray-600">
            View, create, and manage document assessments.
          </p>
          <Link href="/assessments" className="border px-4 py-2">
            Go to Assessments
          </Link>
        </div>

        {/* Frameworks card */}
        <div className="border p-6 flex flex-col items-center justify-center space-y-4">
          <h2 className="font-semibold text-lg">Frameworks</h2>
          <p className="text-center text-sm text-gray-600">
            Build and edit assessment frameworks.
          </p>
          <Link href="/frameworks" className="border px-4 py-2">
            Manage Frameworks
          </Link>
        </div>

        {/* Legislation card */}
        <div className="border p-6 flex flex-col items-center justify-center space-y-4">
          <h2 className="font-semibold text-lg">NSW Legislation</h2>
          <p className="text-center text-sm text-gray-600">
            Interpret and check legislation against your documents.
          </p>
          <Link href="#" className="border px-4 py-2">
            Open Interpreter
          </Link>
        </div>

        {/* Profile & Settings card */}
        <div className="border p-6 flex flex-col items-center justify-center space-y-4">
          <h2 className="font-semibold text-lg">Profile & Settings</h2>
          <p className="text-center text-sm text-gray-600">
            Manage your profile, billing, and app preferences.
          </p>
          <Link href="#" className="border px-4 py-2">
            Go to Settings
          </Link>
        </div>
      </div>

      {/* Optional footer placeholder */}
      <div className="text-center text-sm text-gray-500">
        Docutiser – Document assessment made simple
      </div>
    </div>
  );
}

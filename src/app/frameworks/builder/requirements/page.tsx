import Link from "next/link";

export default function RequirementEditor() {
  return (
    <div className="p-8 space-y-8">
      <div>
        <Link
          href="/frameworks/builder"
          className="border px-4 py-2"
          title="Discard any changes and go back"
        >
          ← Return to Framework (discard changes)
        </Link>
      </div>

      <h1 className="text-center text-xl font-bold">Requirement Editor</h1>

      <div>
        <label className="block" title="A short title for this requirement">
          Title
        </label>
        <input className="border w-full" placeholder="Requirement title" />
      </div>

      <div>
        <label
          className="block"
          title="What text should the LLM evaluate or check?"
        >
          Prompt Text
        </label>
        <textarea
          className="border w-full"
          placeholder="Enter the exact check or question here"
        />
      </div>

      <div>
        <label
          className="block"
          title="Additional background, context, or notes"
        >
          Supplementary Info
        </label>
        <textarea
          className="border w-full"
          placeholder="Optional supporting info"
        />
      </div>

      <div>
        <label
          className="block"
          title="Choose what type of answer this requirement expects"
        >
          Output Type
        </label>
        <select className="border w-full">
          <option value="boolean">True / False</option>
          <option value="number">Whole Number</option>
          <option value="decimal">Decimal Number</option>
          <option value="date">Date</option>
          <option value="currency">Currency</option>
          <option value="text">Text</option>
        </select>
      </div>

      <div className="flex space-x-4">
        <Link
          href="/frameworks/builder"
          className="border px-4 py-2"
          title="Go back without saving"
        >
          Save Requirement
        </Link>
                <Link
          href="/frameworks/builder"
          className="border px-4 py-2"
          title="Go back without saving"
        >
          Cancel
        </Link>
      </div>
    </div>
  );
}

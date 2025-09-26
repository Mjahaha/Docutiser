"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Requirement } from "@/utils/requirements";

export default function FrameworkBuilder() {
  const router = useRouter();
  const [allRequirements, setAllRequirements] = useState<Requirement[]>([]);
  const [selectedReqIds, setSelectedReqIds] = useState<number[]>([]);
  const [selectValue, setSelectValue] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // form state
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [saving, setSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState<string | null>(null);

  // Load all requirements from api/requirements.
  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch("/api/requirements");
        if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`);
        const data = await res.json();
        setAllRequirements(data ?? []);
      } catch (e: any) {
        setError(e?.message ?? "Unable to load requirements");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);


  // Show all selected requirements
  const selectedRequirements = useMemo(
    () => allRequirements.filter((r) => selectedReqIds.includes(r.requirementId)),
    [allRequirements, selectedReqIds]
  );

  // Show only requirements that are not already selected
  const availableOptions = useMemo(
    () => allRequirements.filter((r) => !selectedReqIds.includes(r.requirementId)),
    [allRequirements, selectedReqIds]
  );

  const addSelected = () => {
    if (!selectValue) return;
    const id = Number(selectValue);
    if (!Number.isNaN(id) && !selectedReqIds.includes(id)) {
      setSelectedReqIds((prev) => [...prev, id]);
    }
    setSelectValue("");
  };

  const removeReq = (id: number) => {
    setSelectedReqIds((prev) => prev.filter((x) => x !== id));
  };

  return (
    <div className="p-8 space-y-8">
      <div>
        <Link href="/frameworks" className="border px-4 py-2 ">
          ← Back to Frameworks
        </Link>
      </div>

      <h1 className="text-center text-xl font-bold">Framework Builder</h1>

      <div>
        <label className="block mb-1">Name</label>
        <input
          className="border w-full p-2 "
          placeholder="Framework name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div>
        <label className="block mb-1">Description</label>
        <textarea className="border w-full p-2 " placeholder="Framework description"
        value={description}
        onChange={(e) => setDescription(e.target.value)} />
      </div>

      {/* Requirements Section */}
      <div className="space-y-3">
        <h2 className="font-semibold">Requirements</h2>

        <ul className="border p-4 space-y-2  min-h-[3rem]">
          {selectedRequirements.length === 0 && (
            <li className="text-sm text-gray-500">No requirements selected yet.</li>
          )}
          {selectedRequirements.map((r) => (
            <li key={r.requirementId} className="flex justify-between items-center">
              <span>{r.requirementName}</span>
              <div className="space-x-2">
                <Link href={`/frameworks/builder/requirements/${r.requirementId}`} className="border px-2 py-1 ">
                  View
                </Link>
                <Link href={`/frameworks/builder/requirements/${r.requirementId}/edit`} className="border px-2 py-1 ">
                  Edit
                </Link>
                <button onClick={() => removeReq(r.requirementId)} className="border px-2 py-1 ">
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>

        <div className="flex flex-col sm:flex-row gap-2 items-stretch sm:items-center">
          <label className="sr-only" htmlFor="reqSelect">Add requirement</label>
          <select
            id="reqSelect"
            className="border  p-2 flex-1"
            value={selectValue}
            onChange={(e) => {
              const value = e.target.value;
              if (!value) return;
              const id = Number(value);
              if (!Number.isNaN(id) && !selectedReqIds.includes(id)) {
                setSelectedReqIds((prev) => [...prev, id]);
              }
              setSelectValue(""); // reset to placeholder
            }}
            disabled={loading || availableOptions.length === 0}
          >
            <option value="" disabled>
              {loading
                ? "Loading…"
                : availableOptions.length === 0
                ? "All requirements have been selected"
                : "Select a requirement"}
            </option>
            {availableOptions.map((r) => (
              <option key={r.requirementId} value={String(r.requirementId)}>
                {r.requirementName}
              </option>
            ))}
          </select>
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3">
        <button
          onClick={async () => {
            try {
              setSaving(true);
              setSaveMsg(null);
              const payload = { name, description, requirements: selectedRequirements };
              const res = await fetch("/api/frameworks", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
              });
              if (!res.ok) throw new Error(await res.text());
              const json = await res.json();
              setSaveMsg(json?.message || "Framework saved successfully");
              router.push("/frameworks");
            } catch (e: any) {
              setSaveMsg(e?.message ?? "Failed to save framework");
            } finally {
              setSaving(false);
            }
          }}
          className="border px-4 py-2  disabled:opacity-50"
          disabled={saving || !name.trim() || selectedRequirements.length === 0}
          title={
              !name.trim() || selectedRequirements.length === 0
                ? "You must enter a name and select at least one requirement"
                : ""
            }
        >
          {saving ? "Saving…" : "Save Framework"}
        </button>
        {saveMsg && <span className="text-sm">{saveMsg}</span>}
      </div>
    </div>
  );
}


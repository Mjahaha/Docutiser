'use client';

import { OutputType } from "@/app/api/requirements/route";
import Link from "next/link";
import { useState } from 'react';

interface RequirementFormData {
    requirementName: string;
    requirementDesc: string;
    promptText: string;
    supplementaryInfo: string;
    outputType: OutputType;
}

export default function RequirementEditor() {

  const [formData, setFormData] = useState({
    requirementName: '',
    requirementDesc: '',
    promptText: '',
    supplementaryInfo: '',
    outputType: 'boolean' as OutputType
  });

  const handleInputChange = (field: keyof RequirementFormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value
    }));
  };

  const saveRequirementForm = () => {
    saveRequirement(formData);
  };

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
        <input className="border w-full"    placeholder="Requirement title"
          value={formData.requirementName} onChange={handleInputChange('requirementName')}
        />
      </div>

      <div>
        <label className="block" title="A brief description of this requirement">
          Description
        </label>
        <input className="border w-full" placeholder="Requirement description"
          value={formData.requirementDesc} onChange={handleInputChange('requirementDesc')}
        />
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
          value={formData.promptText} onChange={handleInputChange('promptText')}
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
          value={formData.supplementaryInfo} onChange={handleInputChange('supplementaryInfo')}
        />
      </div>

      <div>
        <label
          className="block"
          title="Choose what type of answer this requirement expects"
        >
          Output Type
        </label>
        <select className="border w-full" value={formData.outputType} onChange={handleInputChange('outputType')}>
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
          onClick={saveRequirementForm}
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

export async function saveRequirement(requirementData: RequirementFormData) {
    try {
        const response = await fetch('/api/requirements', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requirementData),
        });
        
        console.log(response);
        if (!response.ok) {
            throw new Error('Failed to save requirement');
        }
        
        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Error saving requirement:', error);
        throw error;
    }
}

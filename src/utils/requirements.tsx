import path from 'path';
import fs from 'fs/promises';

export type OutputType = 'boolean' | 'number' | 'decimal' | 'date' | 'currency' | 'text';

interface RequirementFormData {
    requirementName: string;
    requirementDesc: string;
    promptText: string;
    supplementaryInfo: string;
    outputType: OutputType;
}

interface Requirement {
    requirementId: number;
    requirementName: string;
    requirementDesc: string;
    promptText: string;
    supplementaryInfo: string;
    outputType: OutputType;
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

export async function getRequirement(id: number): Promise<Requirement> {
  // Read the JSON file
  const filePath = path.join(process.cwd(), 'src', 'app', 'test_data', 'requirement_test_data.json');
  const fileContents = await fs.readFile(filePath, 'utf8');
  const requirements: Requirement[] = JSON.parse(fileContents);

  // Find the requirement with the matching id
  const requirement = requirements.find(r => r.requirementId === id);

  if (!requirement) {
    throw new Error(`Requirement with id ${id} not found`);
  }
  return requirement;
}

export async function getRequirements(): Promise<Requirement[]> {
  // Read the JSON file
  const filePath = path.join(process.cwd(), 'src', 'app', 'test_data', 'requirement_test_data.json');
  const fileContents = await fs.readFile(filePath, 'utf8');
  const requirements: Requirement[] = JSON.parse(fileContents);
  return requirements;
}
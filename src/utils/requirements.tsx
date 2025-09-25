import path from 'path';
import fs from 'fs/promises';

export type OutputType = 'boolean' | 'number' | 'decimal' | 'date' | 'currency' | 'text';

export interface Requirement {
    requirementId: number;
    requirementName: string;
    requirementDesc: string;
    promptText: string;
    supplementaryInfo: string;
    outputType: OutputType;
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
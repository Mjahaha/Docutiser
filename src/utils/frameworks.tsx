import path from 'path';
import fs from 'fs/promises';

interface FrameworkRequirement {
  requirementId: number;
  requirementName: string;
  requirementDesc: string;
}

export interface Framework {
  id: number;
  name: string;
  description: string;
  requirements: FrameworkRequirement[];
}

export async function getFramework(id: number): Promise<Framework> {
  // Read the JSON file
  const filePath = path.join(process.cwd(), 'src', 'app', 'test_data', 'framework_test_data.json');
  const fileContents = await fs.readFile(filePath, 'utf8');
  const frameworks: Framework[] = JSON.parse(fileContents);
  
  // Find the framework with the matching id
  const framework = frameworks.find(a => a.id === id);
  
  if (!framework) {
    throw new Error(`Framework with id ${id} not found`);
  }
  return framework;
}

export async function getFrameworks(): Promise<Framework[]> {
  // Read the JSON file
  const filePath = path.join(process.cwd(), 'src', 'app', 'test_data', 'framework_test_data.json');
  const fileContents = await fs.readFile(filePath, 'utf8');
  const frameworks: Framework[] = JSON.parse(fileContents);
  return frameworks;
}   

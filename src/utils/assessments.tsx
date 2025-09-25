import path from 'path';
import fs from 'fs/promises';

interface AssessmentResult {
  requirementId: number;
  requirementName: string;
  passed: boolean;
}

interface Assessment {
  id: number;
  name: string;
  description: string;
  framework: string;
  summary: string;
  results: AssessmentResult[];
}

// TODO: Get this from db when db is ready
export async function getAssessment(id: number): Promise<Assessment> {
  // Read the JSON file
  const filePath = path.join(process.cwd(), 'src', 'app', 'test_data', 'assessment_test_data.json');
  const fileContents = await fs.readFile(filePath, 'utf8');
  const assessments: Assessment[] = JSON.parse(fileContents);
  
  // Find the assessment with the matching id
  const assessment = assessments.find(a => a.id === id);
  
  if (!assessment) {
    throw new Error(`Assessment with id ${id} not found`);
  }
  return assessment;
}

export async function getAssessments(): Promise<Assessment[]> {
  // Read the JSON file
  const filePath = path.join(process.cwd(), 'src', 'app', 'test_data', 'assessment_test_data.json');
  const fileContents = await fs.readFile(filePath, 'utf8');
  const assessments: Assessment[] = JSON.parse(fileContents);
  return assessments;
}
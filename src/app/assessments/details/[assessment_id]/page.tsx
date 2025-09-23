import Link from "next/link";
import path from 'path';
import fs from 'fs/promises';

interface AssessmentResult {
  requirement_id: number;
  requirement_name: string;
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
async function getAssessment(id: number): Promise<Assessment> {
  // Read the JSON file
  const filePath = path.join(process.cwd(), 'src', 'app', 'assessments', 'details', 'assessment_test_data.json');
  const fileContents = await fs.readFile(filePath, 'utf8');
  const assessments: Assessment[] = JSON.parse(fileContents);
  
  // Find the assessment with the matching id
  const assessment = assessments.find(a => a.id === id);
  
  if (!assessment) {
    throw new Error(`Assessment with id ${id} not found`);
  }
  return assessment;
}

import { notFound } from "next/navigation";

export default async function AssessmentDetail({params,}: { params: { assessment_id: string } }) 
{
  const id = Number(params.assessment_id);
  if (Number.isNaN(id)) notFound();
  const assessment = await getAssessment(id);

  return (
    <div className="p-8 space-y-8">
      <div>
        <Link href="/assessments" className="border px-4 py-2">← Back to Assessments</Link>
      </div>
      <h1 className="text-center text-xl font-bold">Assessment Results</h1>

      <div className="border p-4">
        <p><strong>Name:</strong> {assessment.name}</p>
        <p><strong>Description:</strong> {assessment.description}</p>
        <p><strong>Framework:</strong> {assessment.framework}</p>
      </div>

      <div className="space-y-2">
        <h2 className="font-semibold">Summary</h2>
        <p>{assessment.summary}</p>
      </div>

      <div className="space-y-2">
        <h2 className="font-semibold">Results</h2>
        <ul className="border p-4 space-y-2">
          {assessment.results.map((result) => (
            <li key={result.requirement_id} className="flex justify-between">
              <span>{result.requirement_name}</span>
              <span>{result.passed ? '✅ Pass' : '❌ Fail'}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex space-x-2">
        <button className="border px-4 py-2">Re-assess</button>
      </div>
    </div>
  );
}
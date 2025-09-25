import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs/promises';

interface Requirement {
    requirementId: number;
    requirementName: string;
    requirementDesc: string;
    promptText: string;
    supplementaryInfo: string;
    outputType: OutputType;
}

interface RequirementFormData {
    requirementName: string;
    requirementDesc: string;
    promptText: string;
    supplementaryInfo: string;
    outputType: OutputType;
}

export type OutputType = 'boolean' | 'number' | 'decimal' | 'date' | 'currency' | 'text';

export async function POST(request: NextRequest) {
    try {
        const requirementData: RequirementFormData = await request.json();
        
        const filePath = path.join(process.cwd(), 'src', 'app', 'test_data', 'requirement_test_data.json');
        
        // Read existing requirements
        let requirements: Requirement[] = [];
        const data = await fs.readFile(filePath, 'utf-8');
        requirements = JSON.parse(data);
      
        // Create new requirement from form.
        const requirement: Requirement = {
            requirementId: requirements.length,
            ...requirementData
        };
        requirements.push(requirement);
        
        // Ensure directory exists
        await fs.mkdir(path.dirname(filePath), { recursive: true });
        
        // Save to file
        await fs.writeFile(filePath, JSON.stringify(requirements, null, 2));
        
        return NextResponse.json({ 
            success: true, 
            requirement,
            message: 'Requirement saved successfully'
        });
        
    } catch (error) {
        console.error('Error saving requirement:', error);
        return NextResponse.json(
            { error: 'Failed to save requirement' },
            { status: 500 }
        );
    }
}

export async function GET() {
    try {
        const filePath = path.join(process.cwd(), 'data', 'requirements.json');
        const data = await fs.readFile(filePath, 'utf-8');
        const requirements = JSON.parse(data);
        
        return NextResponse.json({ requirements });
    } catch (error) {
        // File doesn't exist or other error
        return NextResponse.json({ requirements: [] });
    }
}
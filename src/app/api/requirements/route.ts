import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs/promises';
import { OutputType, Requirement } from '@/utils/requirements';

interface RequirementFormData {
    requirementName: string;
    requirementDesc: string;
    promptText: string;
    supplementaryInfo: string;
    outputType: OutputType;
}

export async function GET() {
    try {
        const filePath = path.join(process.cwd(), 'src', 'app', 'test_data', 'requirement_test_data.json');
        const data = await fs.readFile(filePath, 'utf-8');
        const requirements: Requirement[] = JSON.parse(data);
        return NextResponse.json(requirements);
    } catch (error) {
        console.error('Error fetching requirements:', error);
        return NextResponse.json(
            { error: 'Failed to fetch requirements' },
            { status: 500 }
        );
    }
}

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
            requirementId: requirements.length + 1,
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
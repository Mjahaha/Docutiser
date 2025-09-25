import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs/promises';
import { Framework } from '@/utils/frameworks';
import { Requirement } from '@/utils/requirements';

interface FrameworkFormData {
    name: string;
    description: string;
    requirements: Requirement[];
}

export async function POST(request: NextRequest) {
    try {
        const frameworkData: FrameworkFormData = await request.json();

        const filePath = path.join(process.cwd(), 'src', 'app', 'test_data', 'framework_test_data.json');
        const data = await fs.readFile(filePath, 'utf-8');
        const frameworks: Framework[] = JSON.parse(data);
      
        // Create new Framework from form.
        const framework: Framework = {
            id: Math.max(...frameworks.map(f => f.id), 0) + 1,
            ...frameworkData
        };
        frameworks.push(framework);

        // Ensure directory exists
        await fs.mkdir(path.dirname(filePath), { recursive: true });
        
        // Save to file
        await fs.writeFile(filePath, JSON.stringify(frameworks, null, 2));
        
        return NextResponse.json({ 
            success: true, 
            framework,
            message: 'Framework saved successfully'
        });
        
    } catch (error) {
        console.error('Error saving Framework:', error);
        return NextResponse.json(
            { error: 'Failed to save Framework' },
            { status: 500 }
        );
    }
}
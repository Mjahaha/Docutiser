// src/app/api/process-document/route.js
import { NextResponse } from 'next/server';
import { spawn } from 'child_process';
import fs from 'fs/promises';
import path from 'path';
import { writeFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';

export async function POST(request) {
  console.log('Processing document upload...');
  
  try {
    // Parse the form data using Next.js built-in method
    const formData = await request.formData();
    
    // Get the uploaded file and requirements
    const file = formData.get('document');
    const requirementsField = formData.get('requirements');
    
    if (!file) {
      return NextResponse.json(
        { error: 'No file uploaded' },
        { status: 400 }
      );
    }
    
    if (!requirementsField) {
      return NextResponse.json(
        { error: 'Requirements field is missing' },
        { status: 400 }
      );
    }
    
    // Parse requirements
    const requirements = JSON.parse(requirementsField);
    console.log('Requirements:', requirements);
    
    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    // Create tmp directory if it doesn't exist
    const tmpDir = path.join(process.cwd(), 'tmp');
    if (!existsSync(tmpDir)) {
      await mkdir(tmpDir, { recursive: true });
    }
    
    // Save file temporarily
    const fileName = file.name || 'uploaded_file';
    const filePath = path.join(tmpDir, `${Date.now()}-${fileName}`);
    await writeFile(filePath, buffer);
    
    console.log('File saved to:', filePath);
    
    // Check if Python script exists
    const scriptPath = path.join(process.cwd(), 'src', 'app', 'scripts', 'process_document.py');
    if (!existsSync(scriptPath)) {
      console.error('Python script not found at:', scriptPath);
      // Clean up the uploaded file
      await fs.unlink(filePath).catch(err => console.error('Cleanup error:', err));
      return NextResponse.json(
        { error: 'Python script not found' },
        { status: 500 }
      );
    }
    
    // Prepare arguments for Python script
    const pythonArgs = [
      scriptPath,
      filePath,
      JSON.stringify(requirements),
    ];
    console.log('Executing Python script with args:', pythonArgs);
    
    // Execute Python script
    const result = await executePythonScript(pythonArgs);
    
    // Clean up uploaded file
    try {
      await fs.unlink(filePath);
      console.log('Temporary file cleaned up');
    } catch (cleanupError) {
      console.error('Error cleaning up file:', cleanupError);
    }
    
    if (result.success) {
      return NextResponse.json({
        success: true,
        output: result.output,
        fileName: fileName,
        requirementsCount: requirements.length
      });
    } else {
      console.error('Python script error:', result.error);
      return NextResponse.json(
        {
          success: false,
          error: result.error
        },
        { status: 500 }
      );
    }
    
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error',
        details: error.message 
      },
      { status: 500 }
    );
  }
}

// Helper function to execute Python script
function executePythonScript(args) {
  return new Promise((resolve) => {
    // Use python3 on Unix-like systems, python on Windows
    const pythonCommand = process.platform === 'win32' ? 'python' : 'python3';
    console.log(`Executing: ${pythonCommand} ${args[0]}`);
    
    const python = spawn(pythonCommand, args);
    
    let output = '';
    let error = '';
    
    python.stdout.on('data', (data) => {
      output += data.toString();
      console.log('Python output:', data.toString());
    });
    
    python.stderr.on('data', (data) => {
      error += data.toString();
      console.error('Python stderr:', data.toString());
    });
    
    python.on('close', (code) => {
      console.log('Python script exited with code:', code);
      if (code === 0) {
        resolve({ success: true, output: output.trim() });
      } else {
        resolve({ 
          success: false, 
          error: error.trim() || `Script execution failed with code ${code}` 
        });
      }
    });
    
    python.on('error', (err) => {
      console.error('Failed to start Python script:', err);
      resolve({ 
        success: false, 
        error: `Failed to start Python script: ${err.message}` 
      });
    });
  });
}
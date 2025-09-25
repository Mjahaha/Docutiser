export type OutputType = 'boolean' | 'number' | 'decimal' | 'date' | 'currency' | 'text';

interface RequirementFormData {
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

// Optional: Add function to get requirements
export async function getRequirements() {
    try {
        const response = await fetch('/api/requirements');
        const result = await response.json();
        return result.requirements;
    } catch (error) {
        console.error('Error fetching requirements:', error);
        return [];
    }
}
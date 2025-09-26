import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";
import { Requirement } from "@/utils/requirements";

export async function DELETE(
  _req: NextRequest,
  { params }: { params: { requirement_id: string } }
) {
    try {
        const { requirement_id } = await params;
        if (!requirement_id) {
            return NextResponse.json({ error: 'Requirement id is required' }, { status: 400 });
        }
        const id = parseInt(requirement_id);
        if (isNaN(id)) {
            return NextResponse.json({ error: 'Invalid Requirement id' }, { status: 400 });
        }

        const filePath = path.join(process.cwd(), 'src', 'app', 'test_data', 'requirement_test_data.json');
        const data = await fs.readFile(filePath, 'utf-8');
        const requirements: Requirement[] = JSON.parse(data);

        const index = requirements.findIndex(r => r.requirementId === id);
        if (index === -1) {
            return NextResponse.json({ error: 'Requirement not found' }, { status: 404 });
        }

        requirements.splice(index, 1);
        await fs.writeFile(filePath, JSON.stringify(requirements, null, 2));

        return NextResponse.json({ success: true, message: 'Requirement deleted successfully' });
    } catch (error) {
        console.error('Error deleting Requirement:', error);
        return NextResponse.json(
            { error: 'Failed to delete Requirement' },
            { status: 500 }
        );
    }
}
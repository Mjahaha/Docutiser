import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";
import { Framework } from "@/utils/frameworks";

export async function DELETE(
  _req: NextRequest,
  { params }: { params: { framework_id: string } }
) {
  try {
    const { framework_id } = await params;
    const id = Number(framework_id);
    if (Number.isNaN(id)) {
      return NextResponse.json({ error: "Invalid Framework id" }, { status: 400 });
    }

    const filePath = path.join(process.cwd(), "src", "app", "test_data", "framework_test_data.json");
    const data = await fs.readFile(filePath, "utf-8");
    const frameworks: Framework[] = JSON.parse(data);

    const index = frameworks.findIndex((f) => f.id === id);
    if (index === -1) {
      return NextResponse.json({ error: "Framework not found" }, { status: 404 });
    }

    frameworks.splice(index, 1);
    await fs.writeFile(filePath, JSON.stringify(frameworks, null, 2));

    return NextResponse.json({ success: true, message: "Framework deleted successfully" });
  } catch (error) {
    console.error("Error deleting Framework:", error);
    return NextResponse.json({ error: "Failed to delete Framework" }, { status: 500 });
  }
}
import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"
import fs from "fs";
import path from "path";

export const GET = async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  const { id } = await params

  const filePath = path.join(process.cwd(), "/src/app/api/data", id);

   // Read the JSON file
   const jsonData = fs.readFileSync(filePath, "utf-8");
    
   // Parse JSON into an object
   const data = JSON.parse(jsonData);

   return NextResponse.json(data);
}
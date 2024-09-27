import { promises as fs } from 'node:fs';
import path from 'node:path';

import { NextResponse } from 'next/server';

export async function GET() {
  // Find the absolute path of the json directory
  const jsonDirectory = path.join(process.cwd(), 'json');
  // Read the json data file data.json
  const fileContents = await fs.readFile(`${jsonDirectory}/data.json`, 'utf8');
  // Parse the JSON string into an object
  const data = JSON.parse(fileContents);
  // Return the content of the data file in json format
  return NextResponse.json(data);
}

import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    const { email, type, source } = await request.json();

    // Validate email
    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
    }

    // Prepare data to save
    const timestamp = new Date().toISOString();
    const csvRow = `"${email}","${type}","${source}","${timestamp}"\n`;
    
    // Define the CSV file path (in the project root)
    const csvPath = path.join(process.cwd(), 'email-signups.csv');
    
    // Check if file exists, if not create with headers
    if (!fs.existsSync(csvPath)) {
      const headers = 'Email,Type,Source,Timestamp\n';
      fs.writeFileSync(csvPath, headers);
    }
    
    // Check if email already exists to prevent duplicates
    const existingData = fs.readFileSync(csvPath, 'utf8');
    if (existingData.includes(`"${email}"`)) {
      return NextResponse.json({ error: 'Email already registered' }, { status: 400 });
    }
    
    // Append the new signup
    fs.appendFileSync(csvPath, csvRow);
    
    return NextResponse.json({ success: true, message: 'Email registered successfully' });
    
  } catch (error) {
    console.error('Error saving email signup:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
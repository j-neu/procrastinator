import { NextRequest, NextResponse } from 'next/server';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';

export async function POST(request: NextRequest) {
  try {
    const { primaryType, secondaryType, confidence } = await request.json();

    // Check for required environment variables
    if (!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || !process.env.GOOGLE_PRIVATE_KEY || !process.env.GOOGLE_SHEET_ID) {
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }

    // Initialize Google Sheets connection
    let privateKey = process.env.GOOGLE_PRIVATE_KEY;
    if (privateKey.startsWith('"') && privateKey.endsWith('"')) {
      privateKey = privateKey.slice(1, -1);
    }

    const serviceAccountAuth = new JWT({
      email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      key: privateKey,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID!, serviceAccountAuth);
    await doc.loadInfo();

    // Get or create "Quiz Completions" sheet
    let sheet = doc.sheetsByTitle['Quiz Completions'];
    if (!sheet) {
      sheet = await doc.addSheet({
        title: 'Quiz Completions',
        headerValues: ['Primary Type', 'Secondary Type', 'Confidence', 'Timestamp']
      });
    }

    // Add the quiz completion data
    await sheet.addRow({
      'Primary Type': primaryType || '',
      'Secondary Type': secondaryType || '',
      'Confidence': confidence || '',
      'Timestamp': new Date().toISOString(),
    });

    return NextResponse.json({ success: true, message: 'Quiz completion tracked' });
  } catch (error) {
    console.error('Error tracking quiz completion:', error);
    return NextResponse.json(
      { error: 'Failed to track completion' },
      { status: 500 }
    );
  }
}
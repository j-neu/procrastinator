import { NextRequest, NextResponse } from 'next/server';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';

export async function POST(request: NextRequest) {
  try {
    const { email, type, source, subtype } = await request.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    // Check for required environment variables
    if (!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL) {
      console.error('Missing GOOGLE_SERVICE_ACCOUNT_EMAIL');
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }

    if (!process.env.GOOGLE_PRIVATE_KEY) {
      console.error('Missing GOOGLE_PRIVATE_KEY');
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }

    if (!process.env.GOOGLE_SHEET_ID) {
      console.error('Missing GOOGLE_SHEET_ID');
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }

    // Initialize Google Sheets connection
    // Remove quotes if present
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

    // Get the first sheet
    const sheet = doc.sheetsByIndex[0];

    // Self-healing schema: Subtype was added after this sheet was first
    // created, so extend the header row in place rather than requiring the
    // write to fail if the column name doesn't already match exactly.
    await sheet.loadHeaderRow();
    if (!sheet.headerValues.includes('Subtype')) {
      await sheet.setHeaderRow([...sheet.headerValues, 'Subtype']);
    }

    // Add the email signup data. Subtype is only populated by the avoidant
    // subtype follow-up quiz; every other signup source leaves it blank.
    await sheet.addRow({
      Email: email,
      Type: type || '',
      Source: source || 'website',
      Timestamp: new Date().toISOString(),
      Subtype: subtype || '',
    });

    return NextResponse.json({ success: true, message: 'Email added successfully' });
  } catch (error) {
    console.error('Error adding email to Google Sheets:', error);
    return NextResponse.json(
      { error: 'Failed to add email' },
      { status: 500 }
    );
  }
}
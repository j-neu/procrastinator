import { NextRequest, NextResponse } from 'next/server';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';

export async function POST(request: NextRequest) {
  try {
    const { primaryType, secondaryType, confidence, matchStrength, neutralResponseRate } = await request.json();

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
        headerValues: ['Primary Type', 'Secondary Type', 'Confidence', 'Timestamp', 'Match Strength', 'Neutral Response Rate']
      });
    } else {
      // Self-healing schema: the sheet was created before Match Strength /
      // Neutral Response Rate existed, so extend the header row in place on
      // first write rather than requiring a manual migration.
      await sheet.loadHeaderRow();
      if (!sheet.headerValues.includes('Match Strength')) {
        await sheet.setHeaderRow([...sheet.headerValues, 'Match Strength', 'Neutral Response Rate']);
      }
    }

    // Add the quiz completion data. Match Strength and Neutral Response Rate
    // are only computed by the improved (35-question) scoring path, so they
    // are blank for completions from the original quiz -- same pattern as
    // Secondary Type and Confidence above.
    await sheet.addRow({
      'Primary Type': primaryType || '',
      'Secondary Type': secondaryType || '',
      'Confidence': confidence || '',
      'Timestamp': new Date().toISOString(),
      'Match Strength': typeof matchStrength === 'number' ? matchStrength : '',
      'Neutral Response Rate': typeof neutralResponseRate === 'number' ? neutralResponseRate : '',
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
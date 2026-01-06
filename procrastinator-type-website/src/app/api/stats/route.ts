import { NextResponse } from 'next/server';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';

export async function GET() {
  try {
    // Check for required environment variables
    if (!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || !process.env.GOOGLE_PRIVATE_KEY || !process.env.GOOGLE_SHEET_ID) {
      return NextResponse.json({
        success: false,
        error: 'Server configuration error'
      }, { status: 500 });
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

    let totalSignups = 0;
    let totalCompletions = 0;

    // Count email signups from Sheet1 (first sheet)
    try {
      const signupSheet = doc.sheetsByIndex[0]; // First sheet for email signups
      await signupSheet.loadHeaderRow();
      const signupRows = await signupSheet.getRows();
      totalSignups = signupRows.length;
    } catch (error) {
      console.log('Could not read signup sheet:', error);
    }

    // Count quiz completions from "Quiz Completions" sheet
    try {
      const completionSheet = doc.sheetsByTitle['Quiz Completions'];
      if (completionSheet) {
        await completionSheet.loadHeaderRow();
        const completionRows = await completionSheet.getRows();
        totalCompletions = completionRows.length;
      }
    } catch (error) {
      console.log('Could not read quiz completions sheet:', error);
    }

    return NextResponse.json({
      success: true,
      data: {
        total_signups: totalSignups,
        total_completions: totalCompletions
      }
    });

  } catch (error) {
    console.error('Error reading Google Sheets stats:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to read stats'
    }, { status: 500 });
  }
}
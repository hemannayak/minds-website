/**
 * MINDS - Google Sheets Webhook
 * 
 * This script receives a POST request from the Vercel (Node.js) backend API
 * and appends the user data into the specified Google Sheet.
 * 
 * 1. Create a Google Sheet named "MINDS_Join_Registrations"
 * 2. Copy the ID from the URL and paste it below.
 * 3. Deploy as a Web App (Execute as: Me, Who has access: Anyone)
 */

const SPREADSHEET_ID = '125cng8ocEjcP3uoyZW4S0RW54FtiZOQYk5tgfowFr2U'; // <-- Paste the ID of your Google Sheet here
const SHEET_NAME = 'MINDS_Join_Registrations';

function doPost(e) {
  try {
    // 1. Parse JSON data sent from the Node.js backend
    let data;
    try {
      if (e.postData && e.postData.contents) {
        data = JSON.parse(e.postData.contents);
      } else {
        throw new Error("No post data received");
      }
    } catch (parseError) {
      throw new Error("Error parsing JSON: " + parseError.message);
    }

    const { name, email, year, branch, section, why, status, timestamp } = data;
    const dateSubmitted = timestamp ? new Date(timestamp) : new Date();

    // 2. Open spreadsheet and sheet using explicit ID
    if (SPREADSHEET_ID === 'YOUR_SPREADSHEET_ID_HERE') {
      throw new Error("Spreadsheet ID was not set in the Apps Script.");
    }
    
    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    let sheet = spreadsheet.getSheetByName(SHEET_NAME);
    
    // Create the sheet if it doesn't exist
    if (!sheet) {
      sheet = spreadsheet.insertSheet(SHEET_NAME);
      // Setup headers
      sheet.appendRow([
        'Timestamp', 
        'Name', 
        'Email', 
        'Year', 
        'Branch', 
        'Section', 
        'Why',
        'Status'
      ]);
      sheet.getRange("A1:H1").setFontWeight("bold");
      sheet.setFrozenRows(1);
    }

    // 3. Append data to Google Sheets
    sheet.appendRow([
      dateSubmitted,
      name,
      email,
      year,
      branch,
      section,
      why,
      status || 'Registered'
    ]);

    // 4. Return success response to the Node.js backend
    return ContentService.createTextOutput(JSON.stringify({ 
      success: true, 
      message: 'Appended to Google Sheets' 
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    // If it fails, log error and return failure response
    return ContentService.createTextOutput(JSON.stringify({ 
      success: false, 
      error: error.message 
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Handles GET requests to ensure Web App is active
 */
function doGet(e) {
  return ContentService.createTextOutput("MINDS Sheets Webhook is active.");
}

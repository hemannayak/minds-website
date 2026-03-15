const SPREADSHEET_ID = '125cng8ocEjcP3uoyZW4S0RW54FtiZOQYk5tgfowFr2U';
const SHEET_NAME = 'MINDS_Join_Registrations';
const WHATSAPP_LINK = 'https://chat.whatsapp.com/Hir2hpXuLqAAmW1CoV5qaq?mode=hq1tswa';
const WEBSITE_DATA_URL = 'https://minds-ds.vercel.app/website-data.json';


function doPost(e) {
  try {
    // 1. Parse JSON data from React frontend
    let data;
    try {
      if (e.postData && e.postData.contents) {
        data = JSON.parse(e.postData.contents);
      } else {
        throw new Error("No post data received");
      }
    } catch (parseError) {
      // Sometimes no-cors requests can come through as URL-encoded or raw text depending on how the browser treats it
      // Since mode='no-cors' from fetch(), it's likely a plain text body
      throw new Error("Error parsing JSON: " + parseError.message);
    }

    const { name, email, year, branch, section, why } = data;
    const timestamp = new Date();

    // 2. Open spreadsheet and sheet
    // We use the explicit Spreadsheet ID to avoid issues with standalone vs bound scripts.
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

    // 3. Store the data in Google Sheets
    sheet.appendRow([
      timestamp,
      name,
      email,
      year,
      branch,
      section,
      why,
      'Registered'
    ]);

    // 4. Fetch the dynamic website data
    let websiteData = { upcomingEvents: [], recruitment: { isOpen: false } };
    try {
      const response = UrlFetchApp.fetch(WEBSITE_DATA_URL);
      websiteData = JSON.parse(response.getContentText());
    } catch(err) {
      console.log('Error fetching website data:', err);
      // We will proceed using the fallback empty arrays/false flags if it fails
    }

    // 5. Send the Welcome Email
    sendWelcomeEmail(name, email, websiteData);

    // 6. Return success response (Note: no-cors mode in React won't be able to read this, but it's good practice)
    return ContentService.createTextOutput(JSON.stringify({ status: 'success', message: 'Registration complete' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    // If it fails, email the owner so they know!
    try {
      MailApp.sendEmail({
        to: Session.getEffectiveUser().getEmail(),
        subject: "MINDS Join Form Error",
        body: "There was an error processing the submission: " + error.message + "\n\nStack: " + error.stack
      });
    } catch (e) {}

    // Return error response
    return ContentService.createTextOutput(JSON.stringify({ status: 'error', message: error.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Handles GET requests. Useful for testing if the Web App is deployed correctly.
 */
function doGet(e) {
  return ContentService.createTextOutput("MINDS Registration Web App is active.");
}

/**
 * Sends a stylized HTML welcome email.
 */
function sendWelcomeEmail(name, email, websiteData) {
  const subject = `Welcome to MINDS - Your Data Journey Starts Here 🚀`;
  
  // -- Build Upcoming Events HTML --
  let eventsHtml = '';
  const events = websiteData.upcomingEvents;
  
  if (events && events.length > 0) {
    let eventsList = '';
    events.forEach((event, idx) => {
      eventsList += `
        <li style="margin-bottom: 10px;">
          <strong>${idx + 1}. ${event.title}</strong><br>
          <em>Date: ${event.date || 'TBA'} | Time: ${event.time || 'TBA'} | Location: ${event.location || 'TBA'}</em><br>
          ${event.description || ''}
        </li>
      `;
    });
    
    eventsHtml = `
      <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 30px 0;">
        <h2 style="color: #0f172a; margin-top: 0;">📅 Upcoming Events</h2>
        <ul style="padding-left: 20px; color: #334155;">
          ${eventsList}
        </ul>
      </div>
    `;
  } else {
    eventsHtml = `
      <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 30px 0;">
        <h2 style="color: #0f172a; margin-top: 0;">📅 Upcoming Events</h2>
        <p style="color: #334155;">No upcoming events are currently scheduled.</p>
        <p style="color: #334155;">Stay tuned for announcements and updates from MINDS.</p>
      </div>
    `;
  }
  
  // -- Build Recruitment HTML --
  let recruitmentHtml = '';
  const isRecruitmentOpen = websiteData.recruitment && websiteData.recruitment.isOpen;
  const recruitmentFormUrl = (websiteData.recruitment && websiteData.recruitment.formUrl) || '';
  
  if (isRecruitmentOpen) {
    recruitmentHtml = `
      <div style="background-color: #f0fdf4; padding: 20px; border-radius: 8px; margin: 30px 0;">
        <h2 style="color: #059669; margin-top: 0;">🚀 Core Committee Recruitment</h2>
        <p style="color: #064e3b;">Applications for the first-ever core committee of MINDS are now open.</p>
        <a href="${recruitmentFormUrl}" style="display: inline-block; background-color: #059669; color: white; padding: 10px 20px; text-decoration: none; border-radius: 6px; font-weight: bold; margin-top: 10px;">Apply here</a>
      </div>
    `;
  } else {
    recruitmentHtml = `
      <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 30px 0;">
        <h2 style="color: #0f172a; margin-top: 0;">🚀 Core Committee Recruitment</h2>
        <p style="color: #334155;">Recruitment is currently closed.</p>
        <p style="color: #334155;">Follow our announcements for the next opportunity.</p>
      </div>
    `;
  }

  // -- Create the Final HTML body --
  const htmlBody = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
      <h1 style="color: #0f172a; text-align: center; margin-bottom: 30px;">WELCOME TO MINDS – Data Science Club</h1>
      
      <p style="font-size: 16px; line-height: 1.5;">Hi <strong>${name}</strong>,</p>
      
      <p style="font-size: 16px; line-height: 1.5;">
        Welcome to MINDS! We are thrilled to have you join our community of builders and innovators.
      </p>

      ${eventsHtml}

      ${recruitmentHtml}

      <div style="margin: 30px 0; text-align: center;">
        <h2 style="color: #0f172a;">💬 Join the WhatsApp Community</h2>
        <p style="margin-bottom: 15px; color: #334155;">Stay up-to-date with all announcements and connect with other members.</p>
        <a href="${WHATSAPP_LINK}" style="display: inline-block; background-color: #25D366; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 16px;">
          Join WhatsApp Group
        </a>
      </div>

      <p style="margin-top: 40px; font-size: 14px; color: #64748b; border-top: 1px solid #e2e8f0; padding-top: 20px; text-align: center;">
        Follow us on Instagram and stay tuned for action!<br>
        <strong>The MINDS Team</strong>
      </p>
    </div>
  `;

  // Send the email
  MailApp.sendEmail({
    to: email,
    subject: subject,
    htmlBody: htmlBody,
    name: "MINDS - Data Science Club"
  });
}

/**
 * RSVP Backend for Nabanita & Nishant Wedding Invite
 *
 * Setup:
 * 1. Create a new Google Sheet (this will store all RSVP responses).
 * 2. Open Extensions > Apps Script.
 * 3. Replace the default code with this file's contents.
 * 4. Click Deploy > New deployment.
 *    - Type: Web app
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 5. Copy the deployment URL (ends with /exec).
 * 6. Set it as PUBLIC_RSVP_ENDPOINT in your .env file or
 *    as a GitHub repository variable, then rebuild the site.
 *
 * The script creates two sheets on first use:
 *   Households  — one row per submission (name, attending, guest count, timestamp)
 *   Guests      — one row per attending guest (household, name, food, allergy, allergy description)
 */

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var ss = SpreadsheetApp.getActiveSpreadsheet();

    // Households sheet
    var households = ss.getSheetByName('Households');
    if (!households) {
      households = ss.insertSheet('Households');
      households.appendRow(['Household', 'Attending', 'Guest count', 'Timestamp']);
      households.getRange('1:1').setFontWeight('bold');
    }
    households.appendRow([
      data.household || '',
      data.attending ? 'Yes' : 'No',
      data.guests ? data.guests.length : 0,
      data.timestamp || new Date().toISOString(),
    ]);

    // Guests sheet
    if (data.attending && data.guests && data.guests.length > 0) {
      var guests = ss.getSheetByName('Guests');
      if (!guests) {
        guests = ss.insertSheet('Guests');
        guests.appendRow(['Household', 'Guest name', 'Food preference', 'Allergy', 'Allergy description', 'Timestamp']);
        guests.getRange('1:1').setFontWeight('bold');
      }
      var ts = data.timestamp || new Date().toISOString();
      data.guests.forEach(function (g) {
        guests.appendRow([
          data.household || '',
          g.name || '',
          g.food || '',
          g.allergy === 'yes' ? 'Yes' : 'No',
          g.allergyDesc || '',
          ts,
        ]);
      });
    }

    return ContentService.createTextOutput(JSON.stringify({ status: 'ok' }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ status: 'error', message: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet() {
  return ContentService.createTextOutput(JSON.stringify({ status: 'ok', message: 'RSVP backend is running.' }))
    .setMimeType(ContentService.MimeType.JSON);
}

function sendConfirmationEmails() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const data = sheet.getDataRange().getValues();
  
  // Identify column indexes based on Row 1 headers
  const headers = data[0];
  const emailIdx = headers.indexOf("Email");
  const codeIdx = headers.indexOf("ConfirmationCode");
  const adultsIdx = headers.indexOf("Adults");
  const kidsIdx = headers.indexOf("Kids");
  const statusIdx = headers.indexOf("Status");
  
  // MUST match the custom domain email you added to Gmail exactly
  const senderAlias = "info@yourdomain.org"; 
  
  for (let i = 1; i < data.length; i++) {
    const row = data[i];
    const status = row[statusIdx];
    
    // Only send if the Status column is blank
    if (status !== "Sent" && row[emailIdx] !== "") {
      const recipient = row[emailIdx];
      
      // Load and populate the HTML template
      const htmlTemplate = HtmlService.createTemplateFromFile("EmailTemplate");
      htmlTemplate.code = row[codeIdx];
      htmlTemplate.adults = row[adultsIdx];
      htmlTemplate.kids = row[kidsIdx];
      
      const emailBody = htmlTemplate.evaluate().getContent();
      
      try {
        GmailApp.sendEmail(recipient, "Your Event Registration Confirmation", "", {
          from: senderAlias,
          htmlBody: emailBody,
          name: "Community Event Team" // Sender name
        });
        
        // Mark as Sent in the sheet so they don't get emailed again
        sheet.getRange(i + 1, statusIdx + 1).setValue("Sent");
        SpreadsheetApp.flush();
      } catch (e) {
        Logger.log("Failed to send to " + recipient + ": " + e.toString());
      }
    }
  }
}
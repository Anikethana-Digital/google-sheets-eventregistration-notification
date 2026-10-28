# Google Sheets Automated Event Emailer for Non-Profits

A lightweight, zero-cost solution for non-profits, community interest companies, and volunteer groups to send automated, rich HTML confirmation emails for event registrations directly from Google Sheets. 

This tool eliminates the need for expensive third-party email marketing platforms while allowing you to send professional emails using your organization's custom domain.

## Features
* **Zero Cost:** Runs entirely on free Google Apps Script.
* **Custom Domain Support:** Uses Gmail as an SMTP proxy to send from your custom organizational email (e.g., `info@yourdomain.org`) hosted on providers like IONOS, GoDaddy, or Namecheap.
* **Rich HTML Templates:** Supports full CSS styling, background images, and custom branding.
* **Bilingual Support:** Designed to easily accommodate multi-language communities.
* **State Management:** Automatically tracks which rows have been processed to prevent duplicate emails.

## Prerequisites
1. A **Google Account** (Gmail) to host the Google Sheet.
2. A **Custom Domain Email** with SMTP credentials.
3. A public location to host your background and logo images (e.g., your organization's WordPress media library, Imgur, or a public Google Drive link).

## Installation & Setup

### 1. Connect Custom Domain to Gmail (SMTP Proxy)
To send emails from your custom domain without exposing raw SMTP credentials in your code, link your domain email to your Gmail account.
1. Open Gmail > **Settings** > **See all settings** > **Accounts and Import**.
2. Under **Send mail as**, click **Add another email address**.
3. Enter your organization's name and your custom email address.
4. Enter your webmail provider's SMTP server details (e.g., `smtp.ionos.com`, Port `587` or `465`), along with your email username and password.
5. Verify the address via the confirmation email sent by Google.

### 2. Prepare the Google Sheet
Create a new Google Sheet to collect your event registrations. Ensure **Row 1** contains the following exact headers (you can add more columns, but these are required by the script):

| Email | Confirmation Code | Adults | Kids | Status |
| :--- | :--- | :--- | :--- | :--- |

*Note: Leave the `Status` column blank. The script will write "Sent" here once an email is dispatched.*

### 3. Add the Code
1. In your Google Sheet, navigate to **Extensions** > **Apps Script**.
2. Create a new script file named `Code.gs` and copy the contents of `src/Code.gs` from this repository into it.
   * *Important:* Update the `senderAlias` variable in the script to match the exact custom email address you linked in Step 1.
3. Click the **`+`** icon next to Files, select **HTML**, and name it `EmailTemplate` (case-sensitive).
4. Copy the contents of `src/EmailTemplate.html` into this file.

### 4. Customize Your Template
Open `EmailTemplate.html` and update the placeholders with your organization's assets and details:
* `background-image: url('...');` -> Your event flyer or background image.
* `<img src="..." alt="Logo">` -> Your organization's logo.
* Update the copyright text and contact email in the footer and disclaimer.
* Modify the HTML text to match your desired language(s) and messaging.

### 5. Automate the Trigger
To make the script run automatically when new data is added:
1. In the Apps Script editor, click the **Triggers** icon (clock symbol) on the left sidebar.
2. Click **Add Trigger**.
3. Configure as follows:
   * **Function to run:** `sendConfirmationEmails`
   * **Event source:** `From spreadsheet`
   * **Event type:** `On form submit` (if linked to Google Forms) OR `On edit` (if pasting data manually).
4. Save and authorize the script when prompted by Google.

## How It Works
When a new registration is submitted, the script reads the latest rows. It checks the `Status` column. If the status is empty, it injects the row's data (Confirmation Code, Adults, Kids) into the HTML template using `<?= variable ?>` tags. It then sends the email via the Gmail API using your custom alias and marks the row as "Sent".

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details. Free for all community groups to use, modify, and distribute!
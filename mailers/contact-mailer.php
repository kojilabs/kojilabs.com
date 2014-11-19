<?php
	// Check that this is a POST request.
	if ($_SERVER["REQUEST_METHOD"] == "POST") {

		// Get the form fields and remove whitespace.
    $name = strip_tags(trim($_POST["name"]));
		$name = str_replace(array("\r","\n"),array(" "," "),$name);
		$company = strip_tags(trim($_POST["company"]));
    $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $phone = strip_tags(trim($_POST["phone"]));
    $website = strip_tags(trim($_POST["website"]));

    $details = strip_tags(trim($_POST["details"]));

    // Check that data was sent to the mailer.
    if ( empty($name) OR empty($company) OR empty($email) OR empty($phone) OR empty($details) OR !filter_var($email, FILTER_VALIDATE_EMAIL)) {
      // Set a 400 (bad request) response code and exit.
      header("HTTP/1.1 400 Bad Request");
      echo "Oops! There was a problem with your submission. Please complete the form and try again.";
      exit;
    }

    // Set the recipient email address.
    $recipient = "matt.west@kojilabs.com";

    // Set the email subject.
    $subject = $name . " contacted you via the Koji Labs website";

    // Build the email headers.
    $email_headers = "From: " . $name . " <" . $email . ">\r\n";
		$email_headers .= "MIME-Version: 1.0\r\n";
		$email_headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";

		// Build the email content.
		$email_content = '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
											<html xmlns="http://www.w3.org/1999/xhtml">
											  <head>
											    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
											    <meta name="viewport" content="width=device-width, initial-scale=1.0">
											    <title>' . $subject . '</title>
											    <style type="text/css">
											      .ecxitemInfo {margin-bottom: 0 !important;}
											    </style>
											  </head>
											  <body leftmargin="0" marginwidth="0" topmargin="0" marginheight="0" offset="0" style="margin: 0;padding: 0;background-color: #EEEEEE;font-family: arial, sans-serif;-webkit-font-smoothing: antialiased;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;height: 100%;width: 100%;">
											    <center>
											      <table align="center" border="0" cellpadding="0" cellspacing="0" height="100%" width="100%" id="bodyTable" style="border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;margin: 0;padding: 0;background-color: #EEEEEE;font-family: arial, sans-serif;-webkit-font-smoothing: antialiased;height: 100%;width: 100%;">
											        <tr>
											          <td align="center" valign="top" id="bodyCell" style="mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;margin: 0;padding: 0;background-color: #EEEEEE;font-family: arial, sans-serif;-webkit-font-smoothing: antialiased;height: 100%;width: 100%;">
											            <table border="0" cellpadding="0" cellspacing="0" width="600" id="linksContainer" style="border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;background: #FFF;margin-top: 16px;margin-bottom: 16px;margin-left: 16px;margin-right: 16px;box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);-webkit-border-radius: 3px;-moz-border-radius: 3px;border-radius: 3px;">
											              <tr>
											                <td align="left" valign="top" style="border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%; padding-top: 16px; padding-bottom: 16px;padding-left: 32px; padding-right: 32px; background-color: #FFF;-webkit-border-radius: 3px;-moz-border-radius: 3px;border-radius: 3px;">
											                	<p style="line-height: 1.6; color: #333333; font-size: 15px; margin-bottom:30px;">
											                		A visitor contacted Koji Labs via the website. Their details are below:
											                	</p>
											                	<table border="0" cellpadding="5" cellspacing="0" width="100%" id="linksContainer" style="border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
																					<tr>
																						<td width="130" style="font-weight: bold;">Name:</td>
																						<td>' . $name . '</td>
																					</tr>
																					<tr>
																						<td width="130" style="font-weight: bold;">Company:</td>
																						<td>' . $company . '</td>
																					</tr>
																					<tr>
																						<td width="130" style="font-weight: bold;">Email:</td>
																						<td>' . $email . '</td>
																					</tr>
																					<tr>
																						<td width="130" style="font-weight: bold;">Phone:</td>
																						<td>' . $phone . '</td>
																					</tr>
																					<tr>
																						<td width="130" style="font-weight: bold;">Website:</td>
																						<td>' . $website . '</td>
																					</tr>
																					<tr>
																						<td width="130" style="font-weight: bold;">Details:</td>
																						<td>' . $details . '</td>
																					</tr>
											                	</table>
											                </td>
											              </tr>
											            </table>
											          </td>
											        </tr>
											      </table>
											    </center>
											  </body>
											</html>';

		// Send the email.
    if (mail($recipient, $subject, $email_content, $email_headers)) {
      // Set a 200 (okay) response code.
      header("HTTP/1.1 200 OK");
      echo "Thank you! Your enquiry has been sent. Matt will be in touch shortly.";
    } else {
      // Set a 500 (internal server error) response code.
      header("HTTP/1.1 500 Internal Server Error");
      echo "Oops! Something went wrong and we couldn't send your enquiry. Please email us at hello@kojilabs.com";
    }
	} else {
		// Set a 400 (bad request) response code and exit.
    header("HTTP/1.1 400 Bad Request");
    echo "Oops! There was a problem with your submission. Please complete the form and try again.";
    exit;
	}
?>

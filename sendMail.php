<?php

switch ($_SERVER['REQUEST_METHOD']) {
    case "OPTIONS": // Allow preflighting
        header("Access-Control-Allow-Origin: *");
        header("Access-Control-Allow-Methods: POST");
        header("Access-Control-Allow-Headers: content-type");
        exit;

    case "POST": // Send the email
        header("Access-Control-Allow-Origin: *");

        // Payload auslesen
        $json = file_get_contents('php://input');
        $params = json_decode($json);

        $email = $params->email;
        $name = $params->name;
        $message = $params->message;
        $lang = isset($params->lang) ? $params->lang : 'en';

        $recipient = 'mail@johannes-waechter.de';  
        $subject = "Contact From <$email>";
        $mailMessage = "From: " . $name . "<br>" . $message;

        $headers   = array();
        $headers[] = 'MIME-Version: 1.0';
        $headers[] = 'Content-type: text/html; charset=utf-8';
        // Absender auf Interessenten setzen, damit du direkt antworten kannst
        $headers[] = "From: $name <$email>";

        // Mail an dich
        mail($recipient, $subject, $mailMessage, implode("\r\n", $headers));

        // Bestätigungsmail an Interessenten
        if ($lang === 'de') {
            $confirmationSubject = "Danke für deine Nachricht";
            $confirmationMessage = "Hallo $name,<br><br>Vielen Dank für deine Kontaktaufnahme! Ich haben deine Nachricht erhalten und werden uns in Kürze bei dir melden.<br><br>Beste Grüße,<br>Johannes";
        } else {
            $confirmationSubject = "Thank you for contacting us";
            $confirmationMessage = "Hello $name,<br><br>Thank you for reaching out! We received your message and will get back to you shortly.<br><br>Best regards,<br>Johannes";
        }

        $confirmationHeaders   = array();
        $confirmationHeaders[] = 'MIME-Version: 1.0';
        $confirmationHeaders[] = 'Content-type: text/html; charset=utf-8';
        $confirmationHeaders[] = "From: Johannes Wächter <mail@johannes-waechter.de>";

        mail($email, $confirmationSubject, $confirmationMessage, implode("\r\n", $confirmationHeaders));

        break;

    default: // Reject other requests
        header("Allow: POST", true, 405);
        exit;
}
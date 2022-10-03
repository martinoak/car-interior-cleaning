<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;


require $_SERVER['DOCUMENT_ROOT'] . '/vendor/autoload.php';

$dotenv = Dotenv\Dotenv::createImmutable($_SERVER['DOCUMENT_ROOT']);
$dotenv->safeLoad();

$mail = new PHPMailer(true);

if (strlen($_POST['phone']) == 9) {
    $phone = "+420" . $_POST['phone'];
} else if (strlen($_POST['phone']) == 11) {
    $phone = "+420 " . $_POST['phone'];
}
else {
    $phone = $_POST['phone'];
}

if ($_POST["name"] and $_POST["email"] and $_POST['phone']) {
    $content_name = $_POST["name"];
    $content_email = $_POST["email"];
    $content_phone = $phone;
    $content_textMessage = $_POST["textmessage"];
}
else {
    $content_name = "Špatné jméno";
    $content_email = "Špatný e-mail";
    $content_phone = "Špatné telefonní číslo";
    $content_textMessage = "Špatný text";
}

$content_body = '<b>Přišla nová zpráva:</b><br />
                <strong>Od</strong>: ' . $content_name . '<br />
                <strong>E-mail</strong>: ' . $content_email . '<br />
                <strong>Telefon</strong>: <a href="tel:' . $content_phone . '">'. $content_phone .'</a><br />
                <strong>Zpráva</strong>: ' . $content_textMessage . '<br />';

try {
    $mail->CharSet = 'UTF-8';
    $mail->SMTPDebug = SMTP::DEBUG_SERVER;
    $mail->isSMTP();
    $mail->Host = 'smtp.gmail.com';
    $mail->SMTPAuth = true;
    $mail->Username = $_ENV['EMAIL'];
    $mail->Password = $_ENV['PASSWORD'];
    $mail->SMTPSecure = 'ssl';
    $mail->Port = 465;

    $mail->setFrom('cisteni.kondrac@gmail.com', 'Poptávka z webu');
    $mail->addAddress('cisteni.kondrac@gmail.com');
    $mail->addReplyTo($content_email);


    $mail->isHTML();
    $mail->Subject = 'Test';
    $mail->Body = $content_body;

    $test = $mail->send();
    if ($test == 1) {
        var_dump(http_response_code(200));
    }
    echo 'Zpráva poslána!';
} catch (Exception $e) {
    var_dump(http_response_code(500));
    echo 'Nepodařilo se poslat e-mail. Chyba: ', $mail->ErrorInfo;
}
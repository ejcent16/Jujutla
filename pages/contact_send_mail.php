<?php
//Import PHPMailer classes into the global namespace
use PHPMailer\PHPMailer\PHPMailer;
require '../vendor/phpmailer/Exception.php';
require '../vendor/phpmailer/PHPMailer.php';
require '../vendor/phpmailer/SMTP.php';

// Get the parameters
$name = $_POST["name"];
$email = $_POST["email"];
$message = $_POST["message"];

$htmlString = "<div style=\"font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif\">
<p>Hola $name, </p>
<p>Gracias por contactarnos, estaremos tomando en cuenta tu opini&oacute;n. A continuaci&oacute;n te mostramos una copia de tu mensaje.</p>
<p>
    <strong>Nombre: </strong> $name <br>
    <strong>Correo: </strong> $email <br>
    <strong>Mensaje: </strong> $message
</p>
<p>Si quieres reportar un caso para seguimiento, puedes hacerlo desde nuestro <a href=\"http://www.alcaldiadejujutla.com\">sistema de tickets</a> en nuestra web.</p>
<p>Saludos,</p> 

<h4>
<hr>
<a href=\"http://localhost/web-jujutla/\" style=\"text-decoration: none;\">
    <img src=\"cid:logo\" width=\"32\" height=\"32\">
    <span style=\"color: #007bff;vertical-align: super;\">Alcald&iacute;a Municipla de Jujutla</span>
</a>
</h4>
<em style=\"font-size: 0.8em;\">
    <strong>Direcci&oacute;n:</strong>
    <span style=\"color: #28a745;\">1a. avenida Norte calle Bol&iacute;var, Frente a Parque Central, Jujutla, Ahuachap&aacute;n.</span> <br>
    <strong>Correo electr&oacute;nico:</strong>
    <span style=\"color: #28a745;\"><a href=\"mailto:#\">info@alcaldiajujutla.com</a></span> <br>
    <strong>Telefonos:</strong>
    <span style=\"color: #28a745;\"><a href=\"tel:#\">2420-0859</a> | <a href=\"tel:#\">2486-0912</a></span>
</em>
</div>";

// var_dump($htmlString);

//Create a new PHPMailer instance
$mail = new PHPMailer;
//Tell PHPMailer to use SMTP
//$mail->isSMTP();
//Enable SMTP debugging
// 0 = off (for production use)
// 1 = client messages
// 2 = client and server messages
$mail->SMTPDebug = 0;
//Set the hostname of the mail server
$mail->Host = 'smtp.ipage.com';
$mail->Port = 587;
//$mail->SMTPSecure = '';
$mail->SMTPAuth = true;
$mail->Username = "info@alcaldiadejujutla.com";
$mail->Password = "MailJujutla!2019!";
//Set who the message is to be sent from
$mail->setFrom('info@alcaldiajujutla.com', 'Alcaldía Municipal de Jujutla');
//Set an alternative reply-to address
// $mail->addReplyTo('mh18dani@gmail.com', 'Test Name 2');
$mail->addAddress($email, $name);
$mail->AddCC('support@alcaldiadejujutla.com', 'Centro de Soporte - Alcaldía Municipal de Jujutla ');

$subject = "Contacto - Alcaldía Municipal de Jujutla";
$mail->AddEmbeddedImage("../images/logo.ico", "logo");
$mail->Subject = utf8_decode($subject);
$mail->CharSet = 'UTF-8';
//Read an HTML message body from an external file, convert referenced images to embedded,
//convert HTML into a basic plain-text alternative body
// $mail->msgHTML(file_get_contents('contents.html'), __DIR__);
$mail->msgHTML($htmlString, __DIR__);

//send the message, check for errors
$result = array();

if (!$mail->send()) {
    $result["success"] = false;
    $result["message"] = "Error en el envío del correo, favor intentarlo más tarde. Ayúdanos a resolverlo reportando a <strong>support@alcaldiadejujutla.com</strong>";
} else {
    $result["success"] = true;
    $result["message"] = "El correo se ha enviado con éxito.";
}

echo json_encode($result);
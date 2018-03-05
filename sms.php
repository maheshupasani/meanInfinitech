<?php
	// Authorisation details.
	$username = "vishalgaikwad1718@gmail.com";
	$hash = "c1c602fbd92dc9bff75b0ca2923d55aa6682d264f1a1c59ead008fa99688329c";

	// Config variables. Consult http://api.textlocal.in/docs for more info.
	$test = "0";

	// Data for text message. This is the text message data.
	$sender = "TXTLCL"; // This is who the message appears to be from.
	$numbers = "919619404202"; // A single number or a comma-seperated list of numbers
	$message = "This is a test message from the PHP API script.";
	// 612 chars or less
	// A single number or a comma-seperated list of numbers
	$message = urlencode($message);
	$data = "username=".$username."&hash=".$hash."&message=".$message."&sender=".$sender."&numbers=".$numbers."&test=".$test;
	$ch = curl_init('http://api.textlocal.in/send/?');
	curl_setopt($ch, CURLOPT_POST, true);
	curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	$result = curl_exec($ch); // This is the result from the API
	print_r($result);
	$path = 'http://api.textlocal.in/send/?username=vishalgaikwad1718@gmail.com&hash=c1c602fbd92dc9bff75b0ca2923d55aa6682d264f1a1c59ead008fa99688329c&message=testing&sender=TXTLCL&numbers=919619404202&test=0';
	curl_close($ch);
?>
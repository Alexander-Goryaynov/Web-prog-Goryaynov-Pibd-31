<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET,HEAD,OPTIONS,POST,PUT');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept, Authorization');
$requestBody = file_get_contents('php://input');
if (is_null($requestBody)) {
    echo 'Request body is empty';
    return;
}
error_log($requestBody);
header("HTTP/1.1 200 OK");

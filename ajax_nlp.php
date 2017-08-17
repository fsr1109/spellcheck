<?php

$url = "https://language.googleapis.com/v1/documents:analyzeSyntax?key=AIzaSyAyUYw5dNLkjbZkigq26oX0Lu0ESGP2gJ8";
var_dump($_GET["data"]);
//var_dump("hello");
//$content = "Risa's dog is in the, cooking culb. at high school";
$content =  htmlspecialchars($_GET["data"]);
//$content =  $_GET["data"];
$document = array('type' =>'PLAIN_TEXT','language' =>'en','content' =>$content);
$postdata = array('encodingType' => 'UTF8', 'document' => $document);
$json_post = json_encode($postdata);
$ch = curl_init($url);
curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json'));
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, $json_post);
$result = curl_exec($ch);
curl_close($ch);
 
$result_array = json_decode($result,true);
//echo '感情数値：'.$result_array[documentSentiment][score];
  // echo file_get_contents($result_array);
echo json_encode($result_array);

//for($i=0;$i<=count($result_array[tokens]);$i++){
//echo json_encode($result_array[tokens][$i][lemma]);
	// if(json_encode($result_array[tokens][$i][text][content]) != "null"){
	// 	echo json_encode($result_array[tokens][$i][text][content]);
	// 	echo "&fsr&";
	// 	echo json_encode($result_array[tokens][$i][lemma]);
	// 	echo "/fsr/";
	// }

// // ループ処理
//}

?>
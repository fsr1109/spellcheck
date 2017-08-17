<?php

var_dump("hi");
// phpinfo();

$url = "https://language.googleapis.com/v1/documents:analyzeEntities?key=AIzaSyAyUYw5dNLkjbZkigq26oX0Lu0ESGP2gJ8";
$content ="How to write a Google Home survey chatbot.";
$document = array('type' =>'PLAIN_TEXT','language' =>'en','content' =>$content);
$postdata = array('encodingType' => 'UTF8', 'document' => $document);
$json_post = json_encode($postdata);

// 新しい cURL リソースを作成します
$ch = curl_init();

// URL や他の適当なオプションを設定します
curl_setopt($ch, CURLOPT_URL, "http://www.google.com/");
curl_setopt($ch, CURLOPT_HEADER, 0);

// URL を取得し、ブラウザに渡します
curl_exec($ch);

// cURL リソースを閉じ、システムリソースを解放します
// curl_close($ch);

// $ch = curl_init();
// curl_setopt($ch, CURLOPT_URL, $url);
// curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json'));
// curl_setopt($ch, CURLOPT_POST, true);
// curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
// curl_setopt($ch, CURLOPT_POSTFIELDS, $json_post);
// $result = curl_exec($ch);
// curl_close($ch);
//
// $result_array = json_decode($result,true);
// //echo '感情数値：'.$result_array[documentSentiment][score];
//   // echo file_get_contents($result_array);
// echo json_encode($result_array);

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

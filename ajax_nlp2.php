<?php
// phpinfo();

// API Key
$key = "AIzaSyAyUYw5dNLkjbZkigq26oX0Lu0ESGP2gJ8";
// Google Request
$url = "https://language.googleapis.com/v1/documents:analyzeSyntax?key=".$key;
// var_dump($url);
$content =  htmlspecialchars($_GET["data"]);
if(empty($content)){
  $content ="How to write a Google Home survey chatbot.";
}

$document = array(
  'type' =>'PLAIN_TEXT',
  'language' =>'en',
  'content' =>$content
);

$postdata = array('encodingType' => 'UTF8', 'document' => $document);
$json_post = json_encode($postdata);
// var_dump($json_post);

// 新しい cURL リソースを作成します
$ch = curl_init();
// URL や他の適当なオプションを設定します
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json'));
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, $json_post);
// // URL を取得し、ブラウザに渡します
$result = curl_exec($ch);
// // cURL リソースを閉じ、システムリソースを解放します
curl_close($ch);
$result_array = json_decode($result, true);

header('Content-type: application/json');
echo json_encode($result_array, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
exit;

// $result_array = json_decode($result, true);
// //echo '感情数値：'.$result_array[documentSentiment][score];
// echo $result_array;
// var_dump($result_array);
// var_dump("hi ai");

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

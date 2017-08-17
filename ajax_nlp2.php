

<?php


if ($_SERVER["REQUEST_METHOD"] === "POST") {
  var_dump("hello");
  var_dump($_POST);
  var_dump($_POST['document']);
  var_dump($_POST['content']);


  if (!empty($_POST[""]) && !empty($_POST["last_name"])) {
    $fullName = $_POST["last_name"] . " " . $_POST["first_name"];
  } else {
    $lastName = $_POST["last_name"];
    $firstName = $_POST["first_name"];
    $err = "入力されていない項目があります。";
  }
}


// var_dump($_POST);


$key = "AIzaSyAyUYw5dNLkjbZkigq26oX0Lu0ESGP2gJ8";
$url = "https://language.googleapis.com/v1/documents:analyzeEntities?key=".$key;
// var_dump($url);
// //$url ="https://language.googleapis.com/v1/documents:analyzeEntities";
//        //https://language.googleapis.com/v1/documents:analyzeEntities
// //var_dump($_GET["data"]);
// //var_dump("hello");
// //$content = "Japan%27s%20Defense%20Ministry%20has%20decided%20to%20consider%20introducing%20a%20new%20US%2dmade%20missile%20defense%20system%20known%20as%20%27Aegis%20Ashore%27%20in%20light%20of%20progress%20in%20North%20Korea%27s%20missile%20development%2e%0d%0aJapan%20is%20prepared%20for%20North%20Korea%27s%20possible%20launches%20of%20ballistic%20missiles%20by%20deploying%20a%20destroyer%20equipped%20with%20the%20Aegis%20advanced%20radar%20system%20and%20PAC3%20interceptor%20missile%20units%2e%20The%20Aegis%20advanced%20radar%20system%20is%20designed%20to%20intercept%20a%20missile%20outside%20the%20atmosphere%20and%20a%20land%2dbased%20PAC%203%20system%20is%20capable%20of%20intercepting%20a%20missile%20entering%20the%20atmosphere%2e%0d%0a";
// //$content =  htmlspecialchars($_GET["data"]);
//
// // $content =  $_GET["data"];
// $content = {
//   "data": "A record number of high school students across Japan have signed a petition addressed to the United Nations calling for the abolition of nuclear weapons."
//   // "data": text
// };
// $content = array('data'=>'A record number of high school students across Japan have signed a petition addressed to the United Nations calling for the abolition of nuclear weapons.');

$content = 'A record number of high school students across Japan have signed a petition addressed to the United Nations calling for the abolition of nuclear weapons.';

// var_dump($content);

$document = array('type' =>'PLAIN_TEXT','language' =>'en','content' => $content);
$postdata = array('encodingType' => 'UTF8', 'document' => $document);
$json_post = json_encode($postdata);
// $ch = curl_init($url);

// curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json'));
// curl_setopt($ch, CURLOPT_POST, true);
// curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
// curl_setopt($ch, CURLOPT_POSTFIELDS, $json_post);
// $result = curl_exec($ch);
// curl_close($ch);
//
// $result_array = json_decode($result,true);

// echo '感情数値：'.$result_array[documentSentiment][score];
// echo file_get_contents($result_array);
// var_dump($result_array);

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


<!DOCTYPE html>
<html lang = "ja">
<head>
<meta charset = "UFT-8">
<title>フォームからデータを受け取る</title>
</head>
<body>
<h1>フォームデータの送信</h1>
<form action = "ajax_nlp2.php" method = "post">

<input type = "submit" value ="送信">
</form>
</body>
</html>


<?php



if ($_SERVER["REQUEST_METHOD"] == "POST") {
  var_dump($_SERVER);
  var_dump($_POST["last_name"]);

  $key = "AIzaSyAyUYw5dNLkjbZkigq26oX0Lu0ESGP2gJ8";
  $url = "https://language.googleapis.com/v1/documents:analyzeEntities?key=".$key;
  var_dump($url);

  // var_dump("hello");
  // var_dump($_POST);
  // var_dump($_POST['document']);
  // var_dump($_POST['content']);


if (!empty($_POST[""]) && !empty($_POST["last_name"])) {
    $fullName = $_POST["last_name"] . " " . $_POST["first_name"];
  } else {
    $lastName = $_POST["last_name"];
    $firstName = $_POST["first_name"];
    $err = "入力されていない項目があります。";
  }
}


// // //$content =  htmlspecialchars($_GET["data"]);
// //
// // // $content =  $_GET["data"];
// // $content = {
// //   "data": ""
// //   // "data": text
// // };
// // $content = array('data'=>'A record number of high school students across Japan have signed a petition addressed to the United Nations calling for the abolition of nuclear weapons.');
//
// $content = 'A record number of high school students across Japan have signed a petition addressed to the United Nations calling for the abolition of nuclear weapons.';
//
// // var_dump($content);
//
// $document = array('type' =>'PLAIN_TEXT','language' =>'en','content' => $content);
// $postdata = array('encodingType' => 'UTF8', 'document' => $document);
// $json_post = json_encode($postdata);
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
<form action="" method="post">
  <input type ="text" value ="A record number of high school students across Japan have signed a petition addressed to the United Nations calling for the abolition of nuclear weapons." name="last_name">
  <input type = "submit" value ="送信">
</form>
</body>
</html>

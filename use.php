<?php
  include 'includes/login.php';
?>

<!DOCTYPE html>
<html>
<head>
  <meta lang="ja" >
  <meta charset="UTF-8">
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <link rel="stylesheet" type="text/css" href="http://yui.yahooapis.com/3.18.1/build/cssreset/cssreset-min.css">
  <link rel="stylesheet" href="tts/myst.css">
  <style type="text/css"> /*a{ text-decoration:none;}*/ </style>
  <title>Text-to-Speech</title>

  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link href="bootstrap/css/bootstrap.min.css" rel="stylesheet" media="screen">

</head>

<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js" type="text/javascript" ></script>
<script src="http://ajax.googleapis.com/ajax/libs/jqueryui/1.9.2/jquery-ui.min.js" type="text/javascript"></script>
<!-- <link href="bootstrap/css/bootstrap.min.css" rel="stylesheet"> -->
<body onload="playAudio();">



  <!-- 
  <div id="iphone" class="kadomaru">
    <div id="outer" class="kadomaru">
 -->

      <!-- <div align="center"> -->
    <!--   <div class="group">
        <input type="radio" name="language" id="en" value="en-US" checked><label for="en"> Female</label>
        <input type="radio" name="language" id="uk" value="en-GB"><label for="uk"> Male</label>
      </div> -->

        <!-- 
        <br>
        <label for="volume">Volume</label>
        <input type="range" min="0" max="2" step="0.1" name="volume" id="volume" value="1">
      
        <label for="rate">Rate</label>
        <input type="range" min="0" max="2" step="0.1" name="rate" id="rate" value="1">

        <label for="pitch">Pitch</label>
        <input type="range" min="0" max="2" step="0.1" name="pitch" id="pitch" value="1">
        </div> -->
          
        <!-- <div id="show-text">Triclosan is a material that was created for killing bacteria in hospitals. And makers add it to a wide range of household products. However, recent research has shown that triclosan can have a bad effect on human health and the environment. So some governments are limiting its use.
</div> -->

      <!--   <div align="center"> -->
      <!--   <button onclick="" id="repeat-btn" type="button" name="speakButton"> ▶ ︎</button>
        <button onclick="stopTTS();" id="stop-btn" name="stopButton"> ■ </button> -->
        <!-- <button onclick="dictionary();" id="dic-btn" name="dicButton"><img src='volume.png' /></button> -->
        <!-- <a href="#" class="btn btn-danger"><i class="icon-white icon-heart"></i> ボタン</a> -->

        <!-- </div> -->
        <!-- <button onclick="ttsRecognition();" id="ttsRec-btn">Recognition</button>
        <button onclick="stopRecognition();" id="recStop-btn">stopRecognition</button>
        <div id="recognition_result">停止中</div> -->
        
        <!-- <form action="upload.php" method="post" enctype="multipart/form-data">
          ファイル：<br />
          <input type="file" name="upfile"/><br />
          <br/>
          <input type="submit" value="アップロード" />
        </form> -->

    <!-- </div> -->
  <!-- </div> -->


<div class="container" style="padding:20px 0">
  <input type="radio" name="language" id="en" value="en-US" checked><label for="en"> Female</label>
        <input type="radio" name="language" id="uk" value="en-GB"><label for="uk"> Male</label>
        Triclosan is a material that was created for killing bacteria in hospitals. And makers add it to a wide range of household products. However, recent research has shown that triclosan can have a bad effect on human health and the environment. So some governments are limiting its use.<br>
<button onclick="" id="repeat-btn" type="button" name="speakButton"> ▶ ︎</button>
        <button onclick="stopTTS();" id="stop-btn" name="stopButton"> ■ </button>

</div>


<script>

  //ドラッグされた文字列を取得
  var btn = document.getElementById('repeat-btn');

  // var dicbtn = document.getElementById('dic-btn');
  // dicbtn.onclick = function(){
  //   // window.open('http://ejje.weblio.jp/content/'+window.getSelection().toString());
  //   // window.open('http://eow.alc.co.jp/search?q='+window.getSelection().toString());
  //   window.open('https://translate.google.co.jp/?hl=ja#en/ja/'+window.getSelection().toString());
    

    
  // }

  // var dictionaryWord = document.getElementById('dic-btn');

  // dictionaryWord.onclick = function(){

  // }

  btn.onclick = function(){
    var selObj = window.getSelection().toString();

    firstStep(selObj);
    wordSplit(selObj);
  }

 //" "で分けられる単語　→　符号なし単語
  var splWord;

  function wordSplit(text){

    var originaltext = text;
    text = text.replace(/[\ \n]/g, "<>");
    splWord = text.split("<>");

    for (var i = 0; i < splWord.length; i++) {  
      //splitWordの中の""を除去する、show-textに表示される前に処理をしたほうが良い
      if(splWord[i]==""){ 
        splWord.splice(i, 1);
        //要素を減らすので、一個前に戻る必要がある
        i--;
        continue;
      }
    }

    if(splWord.length == 0){
      console.log("0文字、無記入");
    }else{
      $.ajax({
        type: 'POST',
        url: 'write.php',
        data:{
          'mymode' : "1",
          'mylanguage' : document.querySelector('input[type=radio]:checked').value,
          // 'myvolume' : document.getElementById('volume').value,
          // 'myrate' : document.getElementById('rate').value,
          // 'mypitch' : document.getElementById('pitch').value,
          'mywordcount' : splWord.length,
          'myvoicedtext' : originaltext
        },
        success: function(data) {
          //取得成功したら実行する処理
          console.log("ファイルの取得に成功しました");
          
        },
        error:function() {
          //取得失敗時に実行する処理
          console.log("何らかの理由で失敗しました");
        }
      });
    } 
  }

</script>


<script src="http://code.jquery.com/jquery-2.0.3.min.js" charset="utf-8"></script>
<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.5/jquery.min.js"></script>
<script src="http://code.jquery.com/jquery-1.11.2.min.js"></script>
<script src="tts/js/sample1.js"></script>
</body>
</html>
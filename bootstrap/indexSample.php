<?php
  include '../includes/login.php';
?>

<!DOCTYPE html>
<html lang="ja">
  <head>
    <meta charset="utf-8">
    <title>Text-to-Speech</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="css/bootstrap.min.css" rel="stylesheet" media="screen">
  </head>

  <body onload="playAudio();">

  <body>


    <script src="http://code.jquery.com/jquery-1.10.1.min.js"></script>
      //  <script>
      //     jQuery( function($) {
      //       $('tbody').addClass('clickable').click( function() {
      //         //window.location = $(this).attr('data-href');
      //         var selObj = document.getElementById('fulltext').innerHTML;

      //         firstStep(selObj);
      //         wordSplit(selObj);

      //       }).find('a').hover( function() {
      //         $(this).parents('tr').unbind('click');
      //       }, function() {
      //         $(this).parents('tr').click( function() {
      //           window.location = $(this).attr('data-href');
      //         });
      //       });
      //     });
      // </script>

<!-- <table>
    <tbody>
        <tr data-href="http://www.webantena.net/">
            <th>項目1</th>
            <th>項目2</th>
            <th>項目3</th>
            <th>項目4</th>
        </tr>
    </tbody>
</table> -->


    <div class="container" style="padding:50px 0">

      <ul class="nav nav-tabs">
        <li class="active"><a href="#tab1" data-toggle="tab">Full Text</a></li>
        <li><a href="#tab2" data-toggle="tab">Sentence</a></li>
        <li><a href="#tab3" data-toggle="tab">N-gram</a></li>
        <li><a href="#tab4" data-toggle="tab">Word</a></li>
        </ul>
        <!-- / タブ-->
        <div id="myTabContent" class="tab-content">
        <div class="tab-pane fade in active" id="tab1" class="lead">
          <table class="table table-striped table-bordered table-hover table-condensed">
      
            <tbody>
            <tr class="warning" data-href="http://www.webantena.net/"><td id="fulltext">Triclosan is a material that was created for killing bacteria in hospitals. And makers add it to a wide range of household products. However, recent research has shown that triclosan can have a bad effect on human health and the environment. So some governments are limiting its use. Triclosan is a material that was created for killing bacteria in hospitals. And makers add it to a wide range of household products. However, recent research has shown that triclosan can have a bad effect on human health and the environment. So some governments are limiting its use.</td></tr>
            

          </tbody>
        </table>

        </div>
        <div class="tab-pane fade" id="tab2">

        <table class="table table-striped table-bordered table-hover table-condensed">
          <tbody>
            <tr><td>Triclosan is a material that was created for killing bacteria in hospitals.</td></tr>
            <tr class="warning"><td>And makers add it to a wide range of household products.</td></tr>
            <tr><td>However, recent research has shown that triclosan can have a bad effect on human health and the environment. </td></tr>
            <tr class="warning"><td>So some governments are limiting its use. </td></tr>
            <tr><td>Triclosan is a material that was created for killing bacteria in hospitals.</td></tr>
            <tr class="warning"><td>And makers add it to a wide range of household products.</td></tr>
            <tr><td>However, recent research has shown that triclosan can have a bad effect on human health and the environment. </td></tr>
            <tr class="warning"><td>So some governments are limiting its use. </td></tr>       
          </tbody>
        </table>

        </div>

        <div class="tab-pane fade" id="tab3">
           <table class="table table-striped table-bordered table-hover table-condensed">
        
            <tbody>
            <tr><td>1</td></tr>
            <tr class="warning"><td>2</td></tr>
            <tr><td>3</td></tr>
          </tbody>
        </table>
        </div>

        <div class="tab-pane fade" id="tab4">
           <table class="table table-striped table-bordered table-hover table-condensed">
        
            <tbody>
            <tr><td>2</td></tr>
            <tr class="warning"><td>2</td></tr>
            <tr><td>3</td></tr>
          </tbody>
        </table>
        </div>

    </div>
     <!--  <table class="table table-striped table-bordered table-hover table-condensed">
        <thead>
          <tr><th>ID</th><th>Score</th></tr>
        </thead>
        <tbody>
          <tr><td>@taguchi</td><td>200</td></tr>
          <tr class="warning"><td>@fkoji</td><td>300</td></tr>
          <tr><td>@dotinstall</td><td>240</td></tr>
        </tbody>
      </table> -->
      <br>
      <div align="center">
        <!-- <button onclick="" id="repeat-btn" type="button" name="speakButton"> ▶ ︎</button> -->
        <button onclick="stopTTS();" id="stop-btn" name="stopButton"> ■ </button>

<p><i class="glyphicon glyphicon-book"></i> Book</p>
        <!-- <button type="button" class="btn btn-default btn-lg"> ▶ </button> -->
        <!-- <button type="button" class="btn btn-default btn-lg"> ■ </button> -->


      </div>

    </div>

    <script>

  //ドラッグされた文字列を取得
  // var btn = document.getElementById('repeat-btn');


  // btn.onclick = function(){
  //   var selObj = window.getSelection().toString();


  //   console.log("here");
  // //   firstStep(selObj);
  // //   wordSplit(selObj);
  // }

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
          // 'mylanguage' : document.querySelector('input[type=radio]:checked').value,
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





    <script src="http://code.jquery.com/jquery.js"></script>
    <script src="js/bootstrap.min.js"></script>

    <script src="http://code.jquery.com/jquery-2.0.3.min.js" charset="utf-8"></script>
    <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.5/jquery.min.js"></script>
    <script src="http://code.jquery.com/jquery-1.11.2.min.js"></script>
    <script src="../tts/js/sample1.js"></script>

  </body>
</html>

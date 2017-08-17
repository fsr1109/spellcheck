 

  //現在選択されているresultの中の単語や句の番号
  var count = 0;
  var recognitionResult = new webkitSpeechRecognition();
  
  //リピートする番号が入る配列
  var repeatArray = new Array();
  //選択されている句
  var chosenWords;

  var markCount = new Array();

  var allResult = new Array();
  var allResultCount = new Array();


 //単語内の余分の記号を消す
  function markDel(){

    for (var i = 0; i < splitWord.length; i++) {   
      //小文字に変更 
      splitWord[i] = splitWord[i].toLowerCase();

      if(splitWord[i][splitWord[i].length-1] == '.'
       || splitWord[i][splitWord[i].length-1] == '!'
       || splitWord[i][splitWord[i].length-1] == '?'
       || splitWord[i][splitWord[i].length-1] == ','
       || splitWord[i][splitWord[i].length-1] == ':'
       || splitWord[i][splitWord[i].length-1] == ';'
       || splitWord[i][splitWord[i].length-1] == '('
       || splitWord[i][splitWord[i].length-1] == ')'
       || splitWord[i][splitWord[i].length-1] == '['
       || splitWord[i][splitWord[i].length-1] == ']'
       || splitWord[i][splitWord[i].length-1] == '\"' 
       || splitWord[i][splitWord[i].length-1] == '\n'){
        splitWord[i] = splitWord[i].substr( 0 , (splitWord[i].length-1) );
       //要素を削除したため、一個前に戻るべき
        i--;
      }else if(splitWord[i][0] == '.'
       || splitWord[i][0] ==  '!'
       || splitWord[i][0] ==  '?'
       || splitWord[i][0] ==  ','
       || splitWord[i][0] ==  ':'
       || splitWord[i][0] ==  ';'
       || splitWord[i][0] ==  '('
       || splitWord[i][0] ==  ')'
       || splitWord[i][0] ==  '['
       || splitWord[i][0] ==  ']'
       || splitWord[i][0] == '\"'
       || splitWord[i][0] == '\n'){
        splitWord[i] = splitWord[i].substr( 1 , splitWord[i].length );
        i--;
      }
    }
  }


  function stopRecognition(){
    recognitionResult.stop();
    // recognitionResult.onsoundend = function(){
    //   $("#state").text("停止中");
    // };
  }

  function ttsRecognition(){
    recognitionResult.lang = "en-EN";
    recognitionResult.start();
    recognitionResult.continuous = true;
    recognitionResult.interimResults = true;

    console.log("I am here.");
    // recognitionResult.onsoundstart = function(){
    //   $("#state").text("認識中");
    // };
    // recognitionResult.onsoundend = function(){
    //   $("#state").text("停止中");
    // };
    recognitionResult.onresult = function(event){
      var results = event.results;
      for (var i = event.resultIndex; i<results.length; i++){
          if(results[i].isFinal){
            var thisTime 
            for (var i = 0; i < results.length; i++) {   
              thisTime = results[i][0].transcript;
              //console.log(i+" "+results[i].length+" "+results[i][0].transcript);
            };
            console.log(thisTime.replace(/^\s+|\s+$/g, ""));//.split(" "));
            //alert("next");
            //repeatNext();


            //ここでエラー
            document.getElementById("recognition_result").innerHTML = thisTime.replace(/^\s+|\s+$/g, "");
            //resultCheck(chosenWords.replace(/^\s+|\s+$/g, ""), thisTime.replace(/^\s+|\s+$/g, ""));
            //最初の要素が空だと除去

            // $("#recognizedText").text(results[i][0].transcript);  
            // if(chosenWords.replace(/^\s+|\s+$/g, "") == results[0][0].transcript){
            //   console.log("◯ " + results[0][0].transcript);
            // }else{
            //   console.log("× " + results[0][0].transcript);
            // }
             
          }else{
            $("#recognizedText").text(results[i][0].transcript);
            //リアルタイムの結果を表示
            //$("#recognition_result").val(results[i][0].transcript);
            document.getElementById("recognition_result").innerHTML = results[i][0].transcript;
            console.log(results[i][0].transcript);
            // for (var i = 0; i < results.length; i++) {
            //      if(results[i][0].transcript == chosenWords.replace(/^\s+|\s+$/g, "")){
            //       console.log("◯");
            //  console.log(results[i][0].transcript);
            //       stopRecognition();
            //      }
            // };
          }
      }
    };
  }

  function resultCheck(word, voiceResult){
    var a = word.split(" ");
    var b = voiceResult.toLowerCase().split(" ");
    var c = "";

    for (var i = 0; i < a.length; i++) {
      if(a[i] == b[i]){
        //console.log(a[i]);
        c += "◯ ";
      }else{
        c += "× "; 
      }
    };
    alert(word+'\n'+c+'\n'+voiceResult.toLowerCase());
  }


  //" "で分けられる単語　→　符号なし単語
  var splitWord;
  //句を入れるため(記号付き)
  var result = new Array();
  //句を数えるカウント
  var sentenceCount = 0;

  function firstStep(text){

    var resultCount = 0;
    result.length = 0;
    sentenceCount = 0;

    text = text.replace(/[\ \n]/g, "<>");
    splitWord = text.split("<>");

    for (var i = 0; i < splitWord.length; i++) {  
      //splitWordの中の""を除去する、show-textに表示される前に処理をしたほうが良い
      if(splitWord[i]==""){ 
        splitWord.splice(i, 1);
        //要素を減らすので、一個前に戻る必要がある
        i--;
        continue;
      }

      if(result[sentenceCount] == undefined){
          result[sentenceCount] = "";
      }
      //句ごとに分ける
      if(splitWord[i][splitWord[i].length-1] == '.' || splitWord[i][splitWord[i].length-1] ==  '!' || splitWord[i][splitWord[i].length-1] ==  '?' || (splitWord[i][splitWord[i].length-1] ==  '”' && splitWord[i][splitWord[i].length-2] ==  '.') || splitWord[i][splitWord[i].length-1] == '\n'){
        result[sentenceCount] += splitWord[i];
        sentenceCount++;
      }else{
          //単語ごと追加する
          result[sentenceCount] += splitWord[i] + " ";
      }
    }

    for (var i = 0; i < result.length; i++) {
      //二重ループから抜けるため、三つが絶対必要
      var comma_flag = false;
      var colon_flag = false;
      var space_flag = false;

      //200文字を超えているか
      if(result[i].length >= 200){
        //それぞれの場所の番号
        var commaMark;
        var colonMark;
        var spaceMark;

        //記号を後ろから探す
        for (var b = 200; b >= 0; b--){
          //まず,;　次に:)]} これらがなければ、最後に" "
          if((result[i][b] == ',' || result[i][b] == ';') && comma_flag == false){
            commaMark = b;
            comma_flag = true;
            break;
          }else if((result[i][b] == ':' || result[i][b] == ')' || result[i][b] == ']' || result[i][b] == '}') && colon_flag == false){
            colonMark = b;
            colon_flag = true;
          }else if(result[i][b] == ' ' && space_flag == false){
            spaceMark = b;
            space_flag = true;
          }
        }

        // commaMark colonMark spaceMark がそれぞれ異なる場所なので、三つに分けたほうが良い。/それか以下の一つのfunctionにまとめる
        if(comma_flag == true){
            //上の記号よりあとの文字列を切り取る、bがその場所。先に後半の句を引き出すために、secondOneは先に書く
            var secondOne = result[i].substr(commaMark+1, result[i].length).replace(/^\s+|\s+$/g, "");    
            //secondOneをiの次に追加する
            result.splice(i+1,0,secondOne);
            //resultの中身が増やすため
            resultCount++;
            //firstOneをこう書かないと中身を変更できない
            var firstOne = result[i].slice(0, commaMark+1);
            result[i] = firstOne;
        }else if(colon_flag == true){
          //上の記号よりあとの文字列を切り取る、bがその場所。先に後半の句を引き出すために、secondOneは先に書く
            var secondOne = result[i].substr(colonMark+1, result[i].length).replace(/^\s+|\s+$/g, "");    
            //secondOneをiの次に追加する
            result.splice(i+1,0,secondOne);
            //resultの中身が増やすため
            resultCount++;
            //firstOneをこう書かないと中身を変更できない
            var firstOne = result[i].slice(0, colonMark+1);
            result[i] = firstOne;
        }else if(space_flag == true){
            //上の記号よりあとの文字列を切り取る、bがその場所。先に後半の句を引き出すために、secondOneは先に書く
            var secondOne = result[i].substr(spaceMark+1, result[i].length).replace(/^\s+|\s+$/g, "");    
            //secondOneをiの次に追加する
            result.splice(i+1,0,secondOne);
            //resultの中身が増やすため
            resultCount++;
            //firstOneをこう書かないと中身を変更できない
            var firstOne = result[i].slice(0, spaceMark+1);
            result[i] = firstOne;
        }  
      }
    }

    markDel();
    
    sentenceCount = 0;

    var hiduke=new Date(); 

    var month = hiduke.getMonth()+1;
    var day = hiduke.getDate();
    var hour = hiduke.getHours();
    var minute = hiduke.getMinutes();
    var second = hiduke.getSeconds();

    console.log(month+"/"+day+" "+hour+":"+minute+":"+second+"\n"+result+"\n"+splitWord.length);
    if(splitWord.length == 0){
      console.log("no word!");
    }else{
    playAudio();
    }
  } 

 

  var msg = new SpeechSynthesisUtterance();

  var stopFlag = false;

    //音声を止める
  function stopTTS(){
    speechSynthesis.cancel();
    stopFlag = true;
  }





  // function play1(){

  //   msg.rate = 1;
  //   msg.text = "moderate exercise improves "; 
  //   msg.lang = document.querySelector('input[type=radio]:checked').value;


  //   msg.onend = function (event) {   
  //     play2();
  //   }
  //   speechSynthesis.speak(msg);
  // }

  // function play2(){

  //   var voices = speechSynthesis.getVoices();

  //   msg.volume = 1;
  //   msg.rate = 1;
  //   msg.pitch = 1


  //   if(window.navigator.platform=="MacIntel"){
   
  //       msg.voice = voices[65];
     
  //   }else{

  //       msg.voice = voices[2];
      
  //   }
  //   // msg.lang = "en-US";
  //   msg.text = "this is my text-to-speech"; 
  //   speechSynthesis.speak(msg);
  // }


  function firstTest(){
    // win32 / MacIntel /
    console.log(window.navigator.platform);
    if(msg.voice == null){
      console.log("初回終了");
    }

  }

  var langflag = false;

  //音声を再生
  function playAudio() {

    // unsupported.
    if (!'SpeechSynthesisUtterance' in window) {
        alert('Web Speech API には未対応です.');
        return;
    }

    var voices = speechSynthesis.getVoices();

    // 4/26変更  
    // msg.volume = document.getElementById('volume').value;
    // msg.rate = document.getElementById('rate').value;
    // msg.pitch = document.getElementById('pitch').value;

    msg.rate = 0.8;
    var langhere = "en-US";
    // document.querySelector('input[type=radio]:checked').value;

    
    
    
    // if(langflag == true){
        
    //   for (var i = 0; i < 4; i++) {
    //     console.log(voices[i].lang);
    //   }
    // }


    if(window.navigator.platform=="MacIntel"){
      if(langhere == "en-US"){
        msg.voice = voices[65];
      }else{
        msg.voice = voices[67];
      }
    }else if(window.navigator.platform=="Win32" && langflag==true){

      if(langhere == "en-US"){
        // msg.voice = voices[1];
        for (var i = 0; i < 10; i++) {
          if(voices[i].lang=="en-US"){
            msg.voice = voices[i];
          }
        };
      }else{
        for (var i = 0; i < 10; i++) {
          if(voices[i].lang=="en-GB"){
            msg.voice = voices[i];
          }
        };
        // msg.voice = voices[3];
      }

      console.log(voices);
      

    }else{
      console.log("OS : "+window.navigator.platform);
      console.log(voices);
    }
    msg.text = result[sentenceCount]; 

    if(msg.voice == null){
      console.log("初回終了");
      langflag=true;
      return;
    }

    

    msg.onend = function (event) {
        
      if(sentenceCount < result.length-1 && stopFlag == false){
        sentenceCount++;
        playAudio();
      }else{
        stopFlag = false;
        sentenceCount=0;
        console.log("発音再生はここまで");
      }
    }

    
    //console.log("再生全単語数 : "+splitWord.length);
        
    //" "で終わる句では-1をすべき
    // if(result[sentenceCount][result[sentenceCount].length-1] == " "){
    //   var t = result[sentenceCount].split(" ").length - 1;
    //   console.log(sentenceCount+" : "  + msg.text.length +" 文字、 "+ t +" 単語\n"+ msg.text);
    // }else{
    //   console.log(sentenceCount+" : "  + msg.text.length +" 文字、 "+ result[sentenceCount].split(" ").length +" 単語\n"+ msg.text);
       
    // }
    speechSynthesis.speak(msg);
  }

  // var sample1 = "Some people would say that Japan is rich in cultural traditions. That isn’t always obvious in Tokyo. Nevertheless, cultural traditions still play an important role in our lives and in our behavior.<br><br> First of all, the traditional arts and ceremonies provide entertainment for people. They also make us proud of our culture and our nation. For example, kabuki, noh, sumo and even the tea ceremony are enjoyed by many people in Japan and even overseas.<br><br> Secondly, I’d like to mention the role of religion in modern society. Religion guides people on the proper rules of behavior in society. In Japan, Confucianism and Buddhism continue to play important roles.";

  // var sample1 = "It can be difficult for parents with young children to go shopping in crowded places. For this reason, more shopping centers have started offering their customers childcare services. Some customers with children choose shopping centers that provide these services. In this way, they do their shopping more easily. Such services are becoming available even in places such as theaters and hospitals.";
  // var sample1 = "In Shanghai, government officers invest heavily in the education system. And teachers earn high salaries to improve the students records in an international achievement test. However, some people claim that the method used focuses too much on tests. As a result, the students are found to be lack of the ability to create.";
  // var sample1 = "Triclosan is a material that was created for killing bacteria in hospitals. And makers add it to a wide range of household products. However, recent research has shown that triclosan can have a bad effect on human health and the environment. So some governments are limiting its use.";

  // document.getElementById("show-text").innerHTML = sample1;
  

  //現在選択されているresultの中の単語や句の番号
  var count = 0;
  var audio = new Audio();
  var recognitionResult = new webkitSpeechRecognition();
  //" "で分けられる単語　→　符号なし単語
  var splitWord;
  //句を入れるため(記号付き)
  var result = new Array();
  //リピートする番号が入る配列
  var repeatArray = new Array();
  //選択されている句
  var chosenWords;

  var markCount = new Array();

  var allResult = new Array();
  var allResultCount = new Array();

  function showResult(){
    var win1 = window.open('untitled.html',"window_name", "width=auto,height=auto,scrollbars=yes");
    allResult.length = 0;
    for (var i = 0; i < allColored.length; i++) {
      if(allColored[i]!=0){
        allResult.push("\n" + splitWord[i]);
        allResult.push(" "+allColored[i]);
        //whenClicked(i);
      }
    };
    
    //alert(allResult);
    
    //console.log(allResult);
    //console.log(allResultCount);
  }

  //単語ごとにタグを生成
  function allwordColored(eachWord, wordNum) {
    if (!document.createElement || !document.getElementById) return;
      var ele = document.createElement("a");

    if(select_pattern.options.selectedIndex != 2){
      
      //クリックのとき、単語の番号で関数を呼び出す
      ele.href = "javascript:whenClicked("+wordNum+")";
    }
      //未選択時の色の指定
      ele.style.color = "black";
      //エレメント作成
      var str = document.createTextNode(eachWord);
      //スペースが単語の一部として認識してしまう。
      ele.appendChild(str);
      str = document.createTextNode(" ");
      ele.appendChild(str);
      if(eachWord[eachWord.length-1]=="\n"){
        ele.appendChild( document.createElement( 'br' ) );
        ele.appendChild( document.createElement( 'br' ) );
      }
      document.getElementById("show-text").appendChild(ele);  
  }

 //単語内の余分の記号を消す
  function markDel(){
    //改行を消す
    //splitWord[i] = splitWord[i].replace(/\f\n\r\t\v/g,"");
    //数字とアルファベットの判別
    //if(splitWord[i].charAt(splitWord[i].length-1).match( /[^\w]/gi)&&splitWord[i].length!=1){// /[^0-9a-z]/gi)){ 
    //resultSentence = stringToSentence.value.replace(/\.|\?|\!|\,|\'|\"|\-|\:|\;|\/|\_|\[|\]|\{|\}|\(|\)/g,'').split(" ");

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

      //""除去(結果を照会するために、消さないほうが順序が正しい？)
      // if(splitWord[i]==""){ 
      //   splitWord.splice(i, 1);
      //   //要素を減らすので、一個前に戻る必要がある
      //   i--;
      // }
      // }else if(splitWord[i][0] == '\n'){
      //   console.log(i+"ここにあるぞ！！");
      // }
      //記号なしの単語
      //console.log(i+" "+splitWord[i]);
    }
    
  }

  var firstFlag = true;
  var allSentence;
  var allColored = new Array();

  

   //文を単語ごとに分ける
  function splitString (stringToSplit) {

    //リピートボタン、ダウンロードボタンを無効に
    document.getElementById("repeat-btn").disabled=true;
    //document.getElementById("repeatPre-btn").disabled=true;
    document.getElementById("ttsRec-btn").disabled=true;
    document.getElementById("recStop-btn").disabled=true;
    //show-textの初期化
    document.getElementById("show-text").innerHTML = "";
    //リピート配列を初期化
    repeatArray.length = 0;
    //記号で文を区切る
    result.length = 0;
    var resultCount = 0;
    //最初はnextを押して、0にする必要がある
    count = -1;

    //改行で分ける(各単語間に" "がないとき、\nで分ける)
    var kaigyou = new Array();
    kaigyou.length = 0;
    splitWord = stringToSplit.split("\n");
    //語尾に\nを追加
    for (var i = 0; i < splitWord.length; i++) {
      splitWord[i] += "\n";
      //空白で分ける
      kaigyou = kaigyou.concat(splitWord[i].split(" "));
    };
    splitWord.length = 0;
    splitWord = kaigyou;
 
    for (var i = 0; i < splitWord.length; i++) {  
      //splitWordの中の""を除去する、show-textに表示される前に処理をしたほうが良い
      if(splitWord[i]==""){ 
        splitWord.splice(i, 1);
        //要素を減らすので、一個前に戻る必要がある
        i--;
      }else{
        //単語ごとタグ生成(記号つき)
        wordTag(splitWord[i], i);
        //句を入れるための各配列に入ってるundefinedを消す(初期化？)
        if(result[resultCount] == undefined){
          result[resultCount] = "";
        }
        //句ごとに分ける
        if(splitWord[i][splitWord[i].length-1] == '.' || splitWord[i][splitWord[i].length-1] ==  '!' || splitWord[i][splitWord[i].length-1] ==  '?' || splitWord[i][splitWord[i].length-1] == '\n'){
          result[resultCount] += splitWord[i];
          resultCount++;
        }else{
          //単語ごと追加する
          result[resultCount] += splitWord[i] + " ";
        }
      }
    };
         
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
      //200文字以上の文を確認
      //console.log("["+result[i].length+"]"+"\n"+result[i]);
    };

    //resultの中身を確認
    //markCountを初期化
    markCount.length = 0;
    for (var i = 0; i < result.length; i++) {
      console.log("第" + i + "句\n" + result[i]);
      console.log("全" + result[i].length + "文字");

      //" "で終わる句では-1をすべき
      if(result[i][result[i].length-1] == " "){
        console.log("全" + result[i].split(" ").length - 1 + "単語");
        //各句の単語数を格納
        markCount[i] = result[i].split(" ").length - 1;
      // }else if(result[i][0]=="\n"){
      //   markCount[i] = 1;
      //   console.log("dfaksjflkajsflajsldfkjalksfjaklfdjalksfjda");
      // }
      }else{
        //各句の単語数
        console.log("全" + result[i].split(" ").length + "単語");
        markCount[i] = result[i].split(" ").length;
      }
      //console.log(markCount);
    };
    //console.log(markCount);
    //余分な記号を消す
    markDel();
    //console.log(splitWord);
    //console.log(result);

    if(firstFlag == true){
      allSentence = stringToSplit;
      for (var i = 0; i < splitWord.length; i++) {
          allColored[i]=0;
          //console.log(allColored[i]);
      };
      firstFlag = false;
    }else if(firstFlag == false){
      if(stringToSplit==allSentence){
        console.log("同じだ");
      }else{
        allSentence = stringToSplit;
        allColored.length = 0;
        for (var i = 0; i < splitWord.length; i++) {
          allColored[i]=0;
          //console.log(allColored[i]);
        };
      }
    }
           
  }

  //例文を格納
  var selectedText;
  //文章の選択
  select_example.options[0] = new Option("Input");
  for (var i = 1; i < 5; i++) {
    select_example.options[i] = new Option("Example "+ i);//(langs[i][0], i);
  }

  //パターンの選択
  select_pattern.options[0] = new Option("選択");
  select_pattern.options[1] = new Option("単語");
  select_pattern.options[2] = new Option("句");

  //パターンを選択するときのボタンの設定
  function updatePattern (){
    selectedText = [
    document.getElementById('text').value, 
    "Some people would say that Japan is rich in cultural traditions. That isn’t always obvious in Tokyo. Nevertheless, cultural traditions still play an important role in our lives and in our behavior.\n First of all, the traditional arts and ceremonies provide entertainment for people. They also make us proud of our culture and our nation. For example, kabuki, noh, sumo and even the tea ceremony are enjoyed by many people in Japan and even overseas.\n Secondly, I’d like to mention the role of religion in modern society. Religion guides people on the proper rules of behavior in society. In Japan, Confucianism and Buddhism continue to play important roles. They have taught us to respect our seniors and to strive for harmony in our communities.\n My third point is the Japanese tendency to work long hours. This may have allowed Japan to become the world’s second largest economy, but it also has negative effects in modern society. As men work long hours, their wives are completely responsible for child-care. As more women have careers now, they delay marriage and giving birth. The result is a declining birth rate.\n In conclusion, we can see that cultural traditions play an important role in modern society. Thank you.",
    "The media is one of the best mediums to inform people about things that matter like changes in the environment and to encourage the public to generate actions, thus, media coverage brings forth irrefutably beneficial effects.\n Foremost, with extensive media coverage people get concrete news of what’s happening as they happen. Being updated with the most current event would help prepare people for whatever it could bring their way.\nFor instance, in many parts of the world, flooding has been quite rampant. In fact, many have been reported dead or missing because people were caught off guard. Through this encompassing media coverage, people will be aware and would know what to do.\n In addition, this awareness will bring about positive reactions. As people learn more about the environment and the negative changes Mother Nature has been portraying, actions will be made to address the environmental issues.\n In an article, I’ve read, many localities have implemented stricter rules on garbage disposals and cutting down of trees and as a result of their more educated views, the people in that localities were actively participating in the implementation of these rules.\nEnvironmental problems such as climate change pose great threats to humanity. Addressing these problems will never be easy, however, through awareness and education that the media contribute it would seem that the threat would be contained and worsening of the situation would be minimized.",
    "",
    ""];

    //Inputのとき
    if(select_example.options.selectedIndex == 0){
      //textとSETボタンを編集可能に
      document.getElementById("text").disabled = false;
      document.getElementById("setButton").disabled=false;

      //選択、単語
      if(select_pattern.options.selectedIndex == 0 || select_pattern.options.selectedIndex == 1){
        document.getElementById("repeatPre-btn").disabled = true;
        document.getElementById("repeatNext-btn").disabled= true;
     
      }
      //句
      else if(select_pattern.options.selectedIndex == 2){
        document.getElementById("repeatPre-btn").disabled = true;
        document.getElementById("repeatNext-btn").disabled= false;
      }
      //Inputをセットする
      splitString(document.getElementById('text').value);

    //定型文のとき
    }else{
      //textとSETボタンを編集不可能に
      document.getElementById("text").disabled = true;
      document.getElementById("setButton").disabled=true;

      if(select_pattern.options.selectedIndex == 0 || select_pattern.options.selectedIndex == 1){
        document.getElementById("repeatPre-btn").disabled = true;
        document.getElementById("repeatNext-btn").disabled= true;
      }else if(select_pattern.options.selectedIndex == 2){
        document.getElementById("repeatPre-btn").disabled = true;
        document.getElementById("repeatNext-btn").disabled= false;
      }
      //定型文をセットする
      splitString(selectedText[select_example.options.selectedIndex]);
    }
  }

  function repeatPre(){
    //whenClickedを初期化する必要がある
    for (var i = 0; i < splitWord.length; i++) {
     if(document.getElementById("show-text").childNodes[i].style.color == "red"){
      whenClicked(i);
     }
    };

    if(count > 0){
      count--;
    }

    if(count == 0){
      document.getElementById("repeatPre-btn").disabled = true;
    }else if(count == result.length - 1){
      document.getElementById("repeatNext-btn").disabled=true;
    }else{
      document.getElementById("repeatPre-btn").disabled=false;
      document.getElementById("repeatNext-btn").disabled=false;
    }

    var sum = 0;
    for (var i = 0; i < count; i++) {
      sum += markCount[i];
    };
    for (var i = sum; i < sum + markCount[count]; i++) {
      whenClicked(i);
    };
  }

  function repeatNext(){
    //この処理順でないといけない、変更不可
    //whenClickedを初期化する必要がある
    for (var i = 0; i < splitWord.length; i++) {
     if(document.getElementById("show-text").childNodes[i].style.color == "red"){
      whenClicked(i);
     }
    };

    //countで句番号を指定
    if(count < result.length-1){
      count++;
    }

    if(count == 0){
      document.getElementById("repeatPre-btn").disabled = true;
    }else if(count == result.length - 1){
      document.getElementById("repeatNext-btn").disabled=true;
    }else{
      document.getElementById("repeatPre-btn").disabled=false;
      document.getElementById("repeatNext-btn").disabled=false;
    }

    //選択された句を赤色にする
    var sum = 0;
    for (var i = 0; i < count; i++) {
      sum += markCount[i];
    };
    for (var i = sum; i < sum + markCount[count]; i++) {
      whenClicked(i);
    };
  }



  var msg = new SpeechSynthesisUtterance();
  var playNow = 0;
  var playAllWordFlag = false;

    //音声を止める
  function stopTTS(){
    speechSynthesis.cancel();

    if(playAllWordFlag == true){
      playNow = result.length-1;
      playAllWordFlag = false;
    }
  }

  

  function playAllWord(){

    if(playAllWordFlag == false){
      playNow = 0;
    }
    playAllWordFlag = true;

    msg.volume = document.getElementById('volume').value;
    msg.rate = document.getElementById('rate').value;
    msg.pitch = document.getElementById('pitch').value;
    msg.lang = document.querySelector('input[type=radio]:checked').value;
    msg.text = result[playNow]; 

    msg.onend = function (event) {
        if(playNow < result.length-1){
         playNow++;
         playAllWord();
        }else{
          playNow=0;
        }
    }
    speechSynthesis.speak(msg);
  }

  //音声を再生
  function playAudio(id, text) {
    window.sessionStorage.setItem("res", repeatArray);
    
    // unsupported.
    if (!'SpeechSynthesisUtterance' in window) {
        alert('Web Speech API には未対応です.');
        return;
    }


    //方案1   
    // msg.volume = 1;
    // msg.rate = 1;
    // msg.pitch = 1;
    //msg.text = document.querySelector('#text1').value;
    //msg.lang = document.querySelector('#selectVoice').value;
    msg.volume = document.getElementById('volume').value;
    msg.rate = document.getElementById('rate').value;
    msg.pitch = document.getElementById('pitch').value;
    // msg.lang="en-GB";
    console.log(document.querySelector('input[type=radio]:checked').value);
    msg.lang = document.querySelector('input[type=radio]:checked').value;
    msg.text = text; 
   

    msg.onend = function (event) {
        console.log(msg.text + ' ' + msg.text.length);
        // if(playNow < result.length-1){
        //  playNow++;
        //  playAudio('audio1','');
        // }else{
        //   playNow=0;
        // }
    }
    speechSynthesis.speak(msg);

    //console.log(result.length);
    checkTheRed();
  }

  
  function checkTheRed(){
    for (var i = 0; i < repeatArray.length; i++) {
      //console.log(repeatArray[i]);
      allColored[repeatArray[i]]++;
    };
      console.log(allColored);
    //document.getElementById("show-text").childNodes[n].style.color="red";
  }

  function stopRecognition(){
    recognitionResult.stop();
    // recognitionResult.onsoundend = function(){
    //   $("#state").text("停止中");
    // };
  }

  function ttsRecognition(){
    //var win1 = window.open('',"window_name", "width=350,height=250,scrollbars=yes");
    //console.log(chosenWords);

    recognitionResult.lang = "en-EN";
    recognitionResult.start();
    recognitionResult.continuous = true;
    recognitionResult.interimResults = true;
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

            document.getElementById("recognition_result").innerHTML = thisTime.replace(/^\s+|\s+$/g, "");
            resultCheck(chosenWords.replace(/^\s+|\s+$/g, ""), thisTime.replace(/^\s+|\s+$/g, ""));
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

  //選択された単語の番号を配列に代入
  function chageRepeatArray(num, color){
    chosenWords = "";
    //色判定:赤(選択された場合)
    if(color=="red"){
      //リピート配列が空判定
      if(repeatArray.length==0){
        //最初のデータを代入
        repeatArray.push(num);
        //リピートボタンを出す
        document.getElementById("repeat-btn").disabled=false;
        document.getElementById("ttsRec-btn").disabled=false;
        document.getElementById("recStop-btn").disabled=false;
      }else{
        //データの追加
       repeatArray.push(num);
       //順番のソート
       repeatArray.sort(function(a, b) {
        return (parseInt(a) > parseInt(b)) ? 1 : -1;
      });
     } 
  //白(選択を取り消す)
   }else if(color ="white"){
    //配列から消去
    repeatArray.splice(repeatArray.indexOf( num ), 1);
    //選択されるものがないと、リピートボタンを消す
    if(repeatArray.length==0){
      document.getElementById("repeat-btn").disabled=true;
      document.getElementById("ttsRec-btn").disabled=true;
      document.getElementById("recStop-btn").disabled=true;
    }
   }
    //選択された単語を文に
    for(i=0;i<repeatArray.length;i++){
      chosenWords += splitWord[repeatArray[i]] + " ";
    }
    
  }

  //クリックで色変更(番号による指定)
  function whenClicked(n){
    if(select_pattern.options.selectedIndex == 1){
      repeatArray.length = 0;
      repeatArray.push(n);
      playAudio('audio1', splitWord[n]);
    }else{

     //白→赤
      if(document.getElementById("show-text").childNodes[n].style.color=="black"){
        document.getElementById("show-text").childNodes[n].style.color="red";
        chageRepeatArray(n, "red");
      }else{
        //赤→白
        document.getElementById("show-text").childNodes[n].style.color="black";
        chageRepeatArray(n, "black");
      }
    }

  }

  //単語ごとにタグを生成
  function wordTag(eachWord, wordNum) {
    if (!document.createElement || !document.getElementById) return;
      var ele = document.createElement("a");

    if(select_pattern.options.selectedIndex != 2){
      
      //クリックのとき、単語の番号で関数を呼び出す
      ele.href = "javascript:whenClicked("+wordNum+")";
    }
      //未選択時の色の指定
      ele.style.color = "black";
      //エレメント作成
      var str = document.createTextNode(eachWord);
      //スペースが単語の一部として認識してしまう。
      ele.appendChild(str);
      str = document.createTextNode(" ");
      ele.appendChild(str);
      if(eachWord[eachWord.length-1]=="\n"){
        ele.appendChild( document.createElement( 'br' ) );
        ele.appendChild( document.createElement( 'br' ) );
      }
      document.getElementById("show-text").appendChild(ele);  
  }

  //復唱する
  function repeatWord(){
    //200文字を超えてるか
    if(chosenWords.length > 200){
      alert("200文字を超えてるよ。"+chosenWords.length+"文字である。");
    }else{
      playAudio('audio1', chosenWords);//.replace(/^\s+|\s+$/g, ""));
    }  

    // msg.volume = document.getElementById('volume').value;
    // msg.rate = document.getElementById('rate').value;
    // msg.pitch = document.getElementById('pitch').value;
    // msg.lang = document.querySelector('input[type=radio]:checked').value;
    // msg.text = "Welcome, this is my Text To Speech." 

  
    // speechSynthesis.speak(msg);
  }

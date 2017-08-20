
(function(){

      var repeatArray = new Array();
      var repeatArrayCount = 0;
      var repeatString;
      var repeatCount = 0;
      var allWord;
      var allWordSize;
      var existenceCheckArray = new Array();
      var checkRepeatArray = new Array();
      var positionOfWorryWord = new Array();
      var whichPlayMode = "FULL";

      var msg = new SpeechSynthesisUtterance();


      //================================================  Menu

      function populateVoiceList() {
        if(typeof speechSynthesis === 'undefined') {
          return;
        }

        voices = speechSynthesis.getVoices();

        for(i = 0; i < voices.length ; i++) {
          var option = document.createElement('option');
          option.textContent = voices[i].name+':'+voices[i].lang;

          if(voices[i].lang == "en-US") {
            option.selected = true;
          }

          option.setAttribute('data-lang', voices[i].lang);
          option.setAttribute('data-name', voices[i].name);
          option.setAttribute('value', voices[i].lang);

          document.getElementById("voiceSelect").appendChild(option);
        } // for

      }

      populateVoiceList();
      if (typeof speechSynthesis !== 'undefined' && speechSynthesis.onvoiceschanged !== undefined) {
          speechSynthesis.onvoiceschanged = populateVoiceList;
      }

      //================================================  Button event

      var startButton = document.getElementById('startButton');
      var stopButton = document.getElementById('stopButton');

      startButton.addEventListener('click', function() {
        whichPlayMode="FULL";
        playSound();
        modeCall(0, 1);
        setTimeout( function() {
          firstStep(document.getElementById('newTextArea').value);
        }, 1000 );
      });

      stopButton.addEventListener('click', function() {
        stop();
      });

      //================================================  Shortcut

      shortcut.add("shift+enter",function() {
        whichPlayMode="FULL";
        modeCall(0, 1);
        setTimeout( function() {
          firstStep(document.getElementById('newTextArea').value);
        }, 1000 );
      });

      shortcut.add("shift+s",function() {
          stop();
      });

      shortcut.add("shift+c",function() {
          wordCount(document.getElementById('newTextArea').value.split(" ").length);
      });

      shortcut.add("shift+w",function() {
        whichPlayMode="WORD";
        modeCall(3, 1);
        setTimeout( function() {
          firstStep(document.getElementById('newTextArea').value);
        }, 1000 );
      });

      //================================================  init()

      //音声初期設定
      function voiceLoad(){
        checkStatus();
        // win32 / MacIntel /
        console.log(window.navigator.platform);

        if(msg.voice == null){
          console.log("初回終了");
        }
        // playSound();
      }

      //音声を再生
      function playSound() {
            checkStatus();
            var text = document.getElementById('newTextArea').value.trim();
            var select = document.getElementById("voiceSelect");
            var options = select.options;

            var voi = speechSynthesis.getVoices();
            for(var i=0; i<options.length; i++){
                var option = options[i];
                if (option.selected){
                    msg.voice = voi[i];
                }
            }
            console.log(msg.voice);

            if(textObjList[repeatCount].num != 10000 && text.split(" ").length == 1){
              msg.text = textObjList[repeatCount].text.split('');
              msg.voice = voi[4];
            }else{
              msg.text = text;
            }

            console.log(msg.text);

            msg.onend = function (event) {
              if(repeatCount < textObjList.length-1){
                repeatCount++;
                playSound(textObjList[repeatCount].text);
                //initialBoard

              }else{
                console.log("fullTextの再生終了");
                repeatCount = 0;
                //initialborad; いらんかも
              }

            }
            speechSynthesis.speak(msg);
      }

      var wordObjList = [];

      function wordObject(wordOriginal, wordChanged, num, rightOrWrong){
        this.wordOriginal = wordOriginal;
        this.wordChanged = wordChanged;
        this.num = num;
        this.rightOrWrong = rightOrWrong;
      }

      function textObject(text, num){
        this.text = text;
        this.num = num;
      }


      function firstStep(text){
        repeatArray.length = 0;
        existenceCheckArray.length = 0;
        wordObjList.length = 0;

       // console.log("Reset - "+textObjList);
        allWord = "";
        repeatString = "";
        repeatCount = 0;

        googleNLP(text);

        //半角スペースで単語ごとに分ける
        //allWord = text.split(" ");
        //単語数
        //allWordSize = allWord.length;
        //repeatArrayCount = 0;

        //console.log("全 "+allWord.length+" ワード");

        //単語検索
        // for(var i = 0; i < allWord.length; i++){
        //   wordObjList[i] = new wordObject(allWord[i], wordTransform(allWord[i]), i, "yet");
        //   googleNLP(wordObjList[i].wordOriginal);
        //   //getList('EJdict',wordObjList[i].wordChanged,i);

        // }
      }

      function wordTransform(_txt){
         for (var i = 0; i < _txt.length; i++) {
            if(_txt[_txt.length-1] == "."
               || _txt[_txt.length-1] ==  '!'
               || _txt[_txt.length-1] ==  '?'
               || _txt[_txt.length-1] ==  ','
               || _txt[_txt.length-1] ==  ':'
               || _txt[_txt.length-1] ==  ';'
               || _txt[_txt.length-1] ==  '('
               || _txt[_txt.length-1] ==  ')'
               || _txt[_txt.length-1] ==  '['
               || _txt[_txt.length-1] ==  ']'
               || _txt[_txt.length-1] ==  '\"'
               || _txt[_txt.length-1] ==  '\n'){
               // || _txt[_txt.length-1] ==  's'
               // || _txt[_txt.length-1] ==  'd'
               // || _txt[_txt.length-1] ==  'e'){

              //console.log("複数形 -> "+_txt+" -> "+_txt.substr( 0, _txt.length-1 ));
              _txt = _txt.substr( 0, _txt.length-1);
             //要素を削除したため、一個前に戻るべき
              i--;
            }
          }

          return _txt;
     }







      //FUll Call
      function modeCall(mode, num){
          // unsupported.
          if (!'SpeechSynthesisUtterance' in window) {
              alert('Web Speech API には未対応です.');
              return;
          }
          var voi = speechSynthesis.getVoices();
          for (var i = 0; i < 20; i++) {
              if(voi[i].lang=="ja-JP"){
                msg.voice = voi[i];
              }
          };
          if(mode==0){
            msg.text = "全文再生";
          }else if(mode==1){
            msg.text = "訂正なし";
          }else if(mode==2){
            msg.text = num+"単語";
          }else if(mode==3){
            msg.text = "単語再生";
          }else if(mode==4){
            msg.text = "再生終了";
          }else if(mode ==5){
            msg.text = "誤りが"+num+"箇所あります";
          }
          msg.onend = function (event) {
              // console.log("再生終了");
          }
          speechSynthesis.speak(msg);
      }

      //ワード数をカウントする
      function wordCount(text){
          // unsupported.
          if (!'SpeechSynthesisUtterance' in window) {
              alert('Web Speech API には未対応です.');
              return;
          }
          var voi = speechSynthesis.getVoices();
          msg.voice = voi[11];
          msg.text = text+"ワードです";
          msg.onend = function (event) {
              console.log("再生終了");
          }
          speechSynthesis.speak(msg);
      }

      var nowdic = 'EJdict';
      //単語の検索
      function getList(_dic,_txt,_num){
        //候補数
          var howMany = 0;

          var reqPath = "http://public.dejizo.jp/NetDicV09.asmx/SearchDicItemLite?Dic="+nowdic+"&Word="+encodeURI(_txt)+"&Scope=HEADWORD&Match=CONTAIN&Merge=AND&Prof=XHTML&PageSize=20&PageIndex=0";
          //console.log(reqPath);
          $('#result2').html('');
          $.ajax({
              type: "get",
              url: "ajax.php",
              data:{
                  url:reqPath
              },
              dataType: 'xml',
              cache: false,
              timeout: 5000,
              success: function(xml) {
                //console.log(_num+" - "+_txt);
                      howMany = $(xml).find("DicItemTitle").length;

                      //console.log(allWord[_num]+" - "+isNaN(allWord[_num]));

                      //候補なしの時、数字判定
                      if(howMany == 0 && isNaN(allWord[_num])){
                        wordObjList[_num].rightOrWrong = "X";
                                      //console.log(wordObjList[_num].wordOriginal+" - "+wordObjList[_num].wordChanged+" - "+wordObjList[_num].num+" - "+wordObjList[_num].rightOrWrong);



                      }

                      //最後
                      if(_num >= allWordSize - 1){
                          addToRepeatString();
                       }
              },
              error: function(XMLHttpRequest, textStatus, errorThrown){

                    //console.log("error - "+_num+" - "+_txt);
                    //候補なしの時
                      if(isNaN(allWord[_num])){
                        wordObjList[_num].rightOrWrong = "X";
                                      //console.log(wordObjList[_num].wordOriginal+" - "+wordObjList[_num].wordChanged+" - "+wordObjList[_num].num+" - "+wordObjList[_num].rightOrWrong);


                      }

                      //最後
                      if(_num >= allWordSize - 1){
                          addToRepeatString();
                       }
              }
          });
      }

      var textObjList = [];
      var countForTextObj = 0;

      //文に結合
      function addToRepeatString(){




         reString = "";
        textObjList.length = 0;


         for (var i = 0; i < wordObjList.length; i++) {

          if(wordObjList[i].rightOrWrong=="X"){
            if(wordObjList[i].num == 0){
              textObjList[countForTextObj] = new textObject(wordObjList[0].wordOriginal, 0);
            }else{
              if(reString != ""){
                textObjList[countForTextObj] = new textObject(reString, 10000);
                countForTextObj++;
              }
              textObjList[countForTextObj] = new textObject(wordObjList[i].wordOriginal, wordObjList[i].num);
            }
            countForTextObj++;
            reString = "";

          }else{
            reString += wordObjList[i].wordOriginal+" ";

            if(i == wordObjList.length-1){
              textObjList[countForTextObj] = new textObject(reString, 10000);
              countForTextObj = 0;
              reString = "";
            }
          }

        }

        var countTheNumOfWrongWord = 0;

        for (var i = 0; i < wordObjList.length; i++) {
          if(wordObjList[i].rightOrWrong=="X"){
            createButton(wordObjList[i].num);
            countTheNumOfWrongWord++;
          }
        }

        //call the number of wrong word before playsound
        modeCall(5, countTheNumOfWrongWord);

        initBoard();

          // initBoard();


          //読み上げる
          // if(howManyWorryWord == 0){
          //   modeCall(1, 0);
          // }else if(howManyWorryWord > 0){
          //   modeCall(2, howManyWorryWord);
          // }

          // howManyWorryWord = 0;
          repeatCount = 0

          if(whichPlayMode=="FULL"){
              setTimeout( function() {
                playSound(textObjList[repeatCount].text);
              }, 1000 );
          }else if(whichPlayMode=="WORD"){
            setTimeout( function() {
                playSoundwithWord(wordObjList[repeatCount].wordOriginal);
              }, 1000 );
          }
      }

      function playSoundwithWord(text){


        // unsupported.
            if (!'SpeechSynthesisUtterance' in window) {
                alert('Web Speech API には未対応です.');
                return;
            }

            var voi = speechSynthesis.getVoices();

            // for (var i = 0; i < 10; i++) {
            //     if(voi[i].lang=="en-US"){
            //       // console.log(voicess[i].lang);
            //       msg.voice = voi[i];
            //     }
            // };

            msg.voice = voi[4];


            //Mac
            // msg.voice = voi[65];

            if(wordObjList[repeatCount].rightOrWrong == "X"){
              msg.text = wordObjList[repeatCount].wordOriginal.split('');
            }else{
              msg.text = '.';
            }

            console.log(msg.text);
            //var answer;

            msg.onend = function (event) {


              if(msg.text!="."){
                console.log("sdfasdfasf");
                whenClicked(repeatCount);
              }

              if(repeatCount < wordObjList.length-1){

                repeatCount++;
                playSoundwithWord(wordObjList[repeatCount]);
              }else{
                modeCall(4, 0);
                console.log("fullTextの再生終了");
                repeatCount = 0;
              }

            }
            speechSynthesis.speak(msg);
      }

      var board = document.getElementById('board');

      function initBoard() {
            var buttons = [];
            // clear child
            while (board.firstChild) {
                board.removeChild(board.firstChild);
            }
            // buttons
            // 0, 1, 2, 3
            for (var i = 0; i < wordObjList.length; i++) {
              //if(existenceCheckArray[i] == "X" && allWord[i] != ""){
              if(wordObjList[i].rightOrWrong=="X"){
                buttons.push(createButton(i));
              }
            }
            for(var i = 0; i < buttons.length; i++){
              board.appendChild(buttons[i]);
            }
        }

        var size = 4;
        var currentNum = 0;


            //initBoard();
            var btns = document.getElementsByClassName('btn');
            for (var i = 0; i < btns.length; i++) {
                btns[i].className = 'btn';
            }


        function createButton(num) {
            var button;
            button = document.createElement('div');
            button.className = 'btn hidden';


            button.style.background = "red";


            button.innerHTML = wordObjList[num].wordOriginal;
            //console.log(wordObjList[i].num+" - "+wordObjList[i].wordOriginal);
            console.log(button.innerHTML);

            button.addEventListener('click', function() {
              whenClicked(num);
            });
            return button;
        }


        function changeBoard(n){
          for(var i = 0; i < board.childNodes.length; i++){
            //console.log(board.childNodes[i]);
            if(board.childNodes[i].innerHTML == n){
              board.removeChild(board.childNodes[i]);
              break;
            }
          }
          //initBoard();
      }

      function whenPlaySound(num, word){

        var whichWord = repeatArray[num];

          repeatArray[num] = word;
          var stringChange = "";
          for(var i = 0; i <  repeatArray.length; i++){
            stringChange += repeatArray[i]+" ";
          }
          document.getElementById('newTextArea').value = stringChange;

          changeBoard(whichWord);
      }

      function stop(){
        speechSynthesis.cancel();
        repeatCount = textObjList.length;
        //repeatCount = repeatArray.length;
      }

      function whenClicked(n){

        var whichWord = wordObjList[n].wordOriginal;

          console.log(n+" -> "+wordObjList[n].wordOriginal);
          wordObjList[n].wordOriginal = window.prompt("単語を入力してください", "");
          //wordObjList[n].wordOriginal = window.nsIPromptService("単語を入力してください", "");
          if(wordObjList[n].wordOriginal == ""){
            wordObjList[n].wordOriginal = whichWord;
          }
          existenceCheckArray[n] = "";

          var stringChange = "";
          for(var i = 0; i < wordObjList.length; i++){
            stringChange += wordObjList[i].wordOriginal+" ";
          }

          document.getElementById('newTextArea').value = stringChange;

          changeBoard(whichWord);
      }
        //googleNLP();
      voiceLoad();
}());

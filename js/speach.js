

//FUll Call
function modeCall(mode, num){
    checkStatus();
    
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

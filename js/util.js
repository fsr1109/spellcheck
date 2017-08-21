
//ワード数をカウントする
function wordCount(text){
    checkStatus();

    var voi = speechSynthesis.getVoices();
    msg.voice = voi[11];
    msg.text = text+"ワードです";
    msg.onend = function (event) {
        console.log("再生終了");
    }
    speechSynthesis.speak(msg);
}

function checkStatus(){
  var text = document.getElementById('newTextArea').value;
  if (!'SpeechSynthesisUtterance' in window) {
      alert('Web Speech API には未対応です.');
      return;
  }
}

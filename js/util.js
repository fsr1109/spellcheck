
function checkStatus(){
  var text = document.getElementById('newTextArea').value;
  if (!'SpeechSynthesisUtterance' in window) {
      alert('Web Speech API には未対応です.');
      return;
  }
}

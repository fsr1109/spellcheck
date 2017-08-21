
function googleNLP(text){

    var content = {
      // "data": "A record number of high school students across Japan have signed a petition addressed to the United Nations calling for the abolition of nuclear weapons."
      "data": text
    }

    $.get('ajax_nlp2.php',content, function(data) {
      //$('#result').html(data);
      console.log(data);
      var tokens = data['tokens']

      $.each(tokens, function(i, item){
        /// do stuff
        console.log(i);
        console.log(item['lemma']);
        console.log(item['partOfSpeech']['tag']);

        if(item['partOfSpeech']['tag']=="PUNCT"){
          console.log('記号');
        }

        if(item['partOfSpeech']['tag']=="NOUN"){
            if(item['partOfSpeech']['proper'] =="PROPER_UNKNOWN"){
              console.log('固有名詞');
            }else{
              console.log('普通名詞');
            }
        }
      });
    });
}

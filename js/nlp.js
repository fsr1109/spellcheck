
function googleNLP(text){

    var content = {

      // "data": "A record number of high school students across Japan have signed a petition addressed to the United Nations calling for the abolition of nuclear weapons."
      "data": text

    }

    $.get('ajax_nlp2.php',content, function(data) {
    //$('#result').html(data);
      //console.log(data);

      allWord = data.split("/fsr/");
      allWordSize = allWord.length;
      console.log(allWordSize);

      var wordSplit = "";

      for(var i = 0; i < allWord.length; i++){

        wordSplit = allWord[i].split("&fsr&");

        if(wordSplit[0]!= undefined && wordSplit[1] != undefined){


          //console.log(wordSplit[0] + " - " + wordSplit[1]);

          wordSplit[0] = wordSplit[0].slice(1);
          wordSplit[0] = wordSplit[0].slice(0, -1);

          wordSplit[1] = wordSplit[1].slice(1);
          wordSplit[1] = wordSplit[1].slice(0, -1);

          wordObjList[i] = new wordObject(wordSplit[0], wordSplit[1], i, "yet");
          getList('EJdict',wordObjList[i].wordChanged,i);
          console.log(i+" - "+wordObjList[i].wordOriginal);
        }else{
          allWordSize--;
        }
          //console.log(wordObjList[i]);

         //googleNLP(wordObjList[i].wordOriginal);


      }

      //allWordSize = allWord.length;
      //repeatArrayCount = 0;
    });

  // $.get('ajax_nlp.php',content, function(data) {
  //   //$('#result').html(data);
  //     //console.log(data);

  //     allWord = data.split("/fsr/");
  //     allWordSize = allWord.length;
  //     console.log(allWordSize);

  //     var wordSplit = "";

  //     for(var i = 0; i < allWord.length; i++){

  //       wordSplit = allWord[i].split("&fsr&");

  //       if(wordSplit[0]!= undefined && wordSplit[1] != undefined){


  //         //console.log(wordSplit[0] + " - " + wordSplit[1]);

  //         wordSplit[0] = wordSplit[0].slice(1);
  //         wordSplit[0] = wordSplit[0].slice(0, -1);

  //         wordSplit[1] = wordSplit[1].slice(1);
  //         wordSplit[1] = wordSplit[1].slice(0, -1);

  //         wordObjList[i] = new wordObject(wordSplit[0], wordSplit[1], i, "yet");
  //         getList('EJdict',wordObjList[i].wordChanged,i);
  //         console.log(i+" - "+wordObjList[i].wordOriginal);
  //       }else{
  //         allWordSize--;
  //       }
  //         //console.log(wordObjList[i]);

  //        //googleNLP(wordObjList[i].wordOriginal);


  //     }

  //     //allWordSize = allWord.length;
  //     //repeatArrayCount = 0;
  //   });

    //console.log("-> "+text);

  // $.ajax({
  //       type: "GET",
  //       url: "ajax_nlp.php",
  //       data: encodeURI("A record number of high school students across Japan have signed a petition addressed to the United Nations calling for the abolition of nuclear weapons."),
  //       //dataType: 'json',
  //       cache: false,
  //       //timeout: 5000,
  //       success: function(data) {
  //         console.log(data);
  //         data = JSON.parse(data);
  //         console.log(data['sentences']);
  //         console.log(data['tokens']);

  //       },
  //       error: function(XMLHttpRequest, textStatus, errorThrown){
  //           console.log("-------------");
  //            console.log(XMLHttpRequest);
  //            console.log(textStatus);
  //            console.log(errorThrown);
  //       }
  //   });
}

/**********************************************************
 *                   getBlank(string)
 *
 * DESC: "gets" a blank object of the specified type.
 * INPUTS: Option string. Used to determine which object
 *       to return.
 * RETURNS: a blank template of the specified object.
 ***********************************************************/
function getBlank() {
    var tempuuid = uuidv5("EC_POC", uuidv4())
    return {
        id: tempuuid,
        passagenum:"",
        skill: "",
        level: "",
        topic: "",
        difficultylevel: "",
        function: "",
        passagetext: "",
        passagecorevocabularyused: "",
        passagetexteditorcomments: "",
        passagetextcommonissuestheme: "",
        passageaudio: "",
        passageimagedescription: "",
        questionname: "",
        questionfunction: "",
        questioncando: "",
        questiontext: "",
        questiontextcommonissuestheme: "",
        questionlevelfeedback: "",
        questiontype: "",
        questiontexteditorcomments: "",
        questionaudio: "",
        questionimagedescription: "",
        questionrubric: "",
        answertext1: "",
        answer1feedback: "",
        answer1audio: "",
        answer1imagedescription: "",
        answertext2: "",
        answer2feedback: "",
        answer2audio: "",
        answer2imagedescription: "",
        answertext3: "",
        answer3feedback: "",
        answer3audio: "",
        answer3imagedescription: "",
        answertext4: "",
        answer4feedback: "",
        answer4audio: "",
        answer4imagedescription: "",
        answertext5: "",
        answer5feedback: "",
        answer5audio: "",
        answer5imagedescription: "",
        answertext6: "",
        answer6feedback: "",
        answer6audio: "",
        answer6imagedescription: "",
        answereditorcomments: "",
        references: "",
        ERCentralLevel: "",
        ECCentralScore: "",
        Clausespersentence: "",
        wordcount: "",
        writername: "",
        peerreviewname: "",
        editorname: ""
    };
}

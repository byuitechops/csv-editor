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
        passageaudiofilename: "",
        passageimagename: "",
        questionname: "",
        questionfunction: "",
        questioncando: "",
        questiontext: "",
        questiontextcommonissuestheme: "",
        questionlevelfeedback: "",
        questiontype: "",
        questiontexteditorcomments: "",
        questionaudiofilename: "",
        questionimagename: "",
        questionrubric: "",
        answertext1: "",
        answer1feedback: "",
        answer1audiofilename: "",
        answer1imagename: "",
        answertext2: "",
        answer2feedback: "",
        answer2audiofilename: "",
        answer2imagename: "",
        answertext3: "",
        answer3feedback: "",
        answer3audiofilename: "",
        answer3imagename: "",
        answertext4: "",
        answer4feedback: "",
        answer4audiofilename: "",
        answer4imagename: "",
        answertext5: "",
        answer5feedback: "",
        answer5audiofilename: "",
        answer5imagename: "",
        answertext6: "",
        answer6feedback: "",
        answer6audiofilename: "",
        answer6imagename: "",
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


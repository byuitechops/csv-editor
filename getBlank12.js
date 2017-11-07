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
        level: "",
        lesson: "",
        section: "",
        skill: "",

        activitytype: "",
        itemtype: "",
        texttype: "",

        questiontype: "",
        questionname: "",

        passagetext: "",
        passagetexteditorcomments: "",
        passageaudio: "",
        passageimagedescription: "",

        questiontext: "",
        questiontexteditorcomments: "",
        questionaudio: "",
        questionimagedescription: "",
        questionrubric: "",

        answer1: "",
        answer1feedback: "",
        answer1audio: "",
        answer1imagedescription: "",
        answer2: "",
        answer2feedback: "",
        answer2audio: "",
        answer2imagedescription: "",
        answer3: "",
        answer3feedback: "",
        answer3audio: "",
        answer3imagedescription: "",
        answer4: "",
        answer4feedback: "",
        answer4audio: "",
        answer4imagedescription: "",
        answereditorcomments: "",
        references: ""

    };
}

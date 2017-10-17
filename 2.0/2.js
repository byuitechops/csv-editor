//I'm adding this line so I can commit
if (window.location.search.indexOf('?css=fun') === 0) {
    document.write('<link rel="stylesheet" href="./fun.css" />');
} else {
    document.write('<link rel="stylesheet" href="./2.css" />');
}

var file = [];
var reordered_data = [];
var spaces;
var file_name = "default.csv";
var template = Handlebars.compile(document.querySelector('#template').innerHTML);
document.querySelector('input').addEventListener('change', getFile);
var templatequestion = Handlebars.compile(document.querySelector('#templatequestion').innerHTML);

function getBlankQuestion() {
    var tempuuid = uuidv5("EC_POC", uuidv4())
    return {
        uuid: tempuuid,
        questionnum: "",
        questionname: "",
        questionfunction: "",
        questiontext: "",
        questiontype: "",
        answertext1: "",
        answertext2: "",
        answertext3: "",
        answertext4: "",
        answertext5: "",
        answertext6: "",
        questiontexteditorcomments: "",
        questionaudio: "",
        questionimagedescription: "",
        questionrubric: "",
        answer1feedback: "",
        answer1audio: "",
        answer1imagedescription: "",
        answer2feedback: "",
        answer2audio: "",
        answer2imagedescription: "",
        answer3feedback: "",
        answer3audio: "",
        answer3imagedescription: "",
        answer4feedback: "",
        answer4audio: "",
        answer4imagedescription: "",
        answer5feedback: "",
        answer5audio: "",
        answer5imagedescription: "",
        answer6feedback: "",
        answer6audio: "",
        answer6imagedescription: "",
        answereditorcomments: "",
        Clausespersentence: "",
        wordcount: ""
    }
}

function getBlank() {
    return {
        passagenum: "",
        skill: "",
        level: "",
        function: "",
        topic: "",
        difficultylevel: "",
        passagetext: "",
        passagetexteditorcomments: "",
        passageaudio: "",
        passageimagedescription: "",
        references: "",
        ERCentralLevel: "",
        ECCentralScore: "",
        questions: [getBlankQuestion()]
    }
}

function addAceEditor(stringIn, index) {
    return '<div class="editor" id="editor' + (index + 1) + '" ><textarea>' + stringIn + '</textarea></div>';
}

function addTinyMCE() {

    tinymce.init({
        selector: 'textarea.editor',
        height: 300,
        width: '100%',
        menubar: false,
        plugins: [
                    'advlist autolink lists link image charmap print preview anchor textcolor',
                    'searchreplace visualblocks code fullscreen',
                    'insertdatetime media table contextmenu paste table hr code help'
                ],
        toolbar: 'insert | undo redo |  styleselect | bold italic backcolor  | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | code | table | hr | help',
        convert_urls: false,
        init_instance_callback: function (editor) {
            editor.on('KeyUp', function (e) {
                //console.log(editor.getContent(), this.id);
                var textarea = document.querySelector("#" + this.id)
                textarea.dataset.editortext = (editor.getContent({
                    format: 'raw'
                }));
                saveData(textarea);
                //console.log(textarea.dataset.editortext);
            });
        }
    });
}

function makeUI(data) {
    file = data;
    var unique_passages = [new Set(file.map(item => item.passagenum))];
    console.log(unique_passages);
    for (var i = 0; i < file.length; i++) {
        if (!file[i].uuid) {
            file[i].uuid = uuidv5("EC_POC", uuidv4());
            console.log(file[i]);
        }

        var questionformat = {
            uuid: file[i].uuid,
            questionnum: file[i].questionnum,
            questionname: file[i].questionname,
            questionfunction: file[i].questionfunction,
            questiontext: file[i].questiontext,
            questiontype: file[i].questiontype,
            answertext1: file[i].answertext1,
            answertext2: file[i].answertext2,
            answertext3: file[i].answertext3,
            answertext4: file[i].answertext4,
            answertext5: file[i].answertext5,
            answertext6: file[i].answertext6,
            questiontexteditorcomments: file[i].questiontexteditorcomments,
            questionaudio: file[i].questionaudio,
            questionimagedescription: file[i].questionimagedescription,
            questionrubric: file[i].questionrubric,
            answer1feedback: file[i].answer1feedback,
            answer1audio: file[i].answer1audio,
            answer1imagedescription: file[i].answer1imagedescription,
            answer2feedback: file[i].answer2feedback,
            answer2audio: file[i].answer2audio,
            answer2imagedescription: file[i].answer2imagedescription,
            answer3feedback: file[i].answer3feedback,
            answer3audio: file[i].answer3audio,
            answer3imagedescription: file[i].answer3imagedescription,
            answer4feedback: file[i].answer4feedback,
            answer4audio: file[i].answer4audio,
            answer4imagedescription: file[i].answer4imagedescription,
            answer5feedback: file[i].answer5feedback,
            answer5audio: file[i].answer5audio,
            answer5imagedescription: file[i].answer5imagedescription,
            answer6feedback: file[i].answer6feedback,
            answer6audio: file[i].answer6audio,
            answer6imagedescription: file[i].answer6imagedescription,
            answereditorcomments: file[i].answereditorcomments,
            Clausespersentence: file[i].Clausespersentence,
            wordcount: file[i].wordcount
        };
        if (!reordered_data.some(function (item) {
                return item.passagenum === file[i].passagenum
            })) {
            reordered_data.push({

                skill: file[i].skill,
                level: file[i].level,
                passagenum: file[i].passagenum,
                function: file[i].function,
                topic: file[i].topic,
                difficultylevel: file[i].difficultylevel,
                passagetext: file[i].passagetext,
                passagetexteditorcomments: file[i].passagetexteditorcomments,
                passageaudio: file[i].passageaudio,
                passageimagedescription: file[i].passageimagedescription,
                references: file[i].references,
                ERCentralLevel: file[i].ERCentralLevel,
                ECCentralScore: file[i].ECCentralScore,
                questions: [questionformat]
            })
        } else {
            for (var j = 0; j < reordered_data.length; j++) {
                if (reordered_data[j].passagenum === file[i].passagenum) {
                    reordered_data[j].questions.push(questionformat)
                }
            }
        }

    } /*END FOR*/

    for (var i = 0; i < reordered_data.length; i++) {
        if (reordered_data[i].passagenum === "") {
            reordered_data[i].passagenum = 9999;
        } else {
            // NO ZEROES FOR PASSAGES
            reordered_data[i].passagenum = i + 1;
        }
        for (var j = 0; j < reordered_data[i].questions.length; j++) {
            console.log(reordered_data[i].questions[j].uuid);

            if (reordered_data[i].questions[j].questionnum === "") {
                reordered_data[i].questions[j].questionnum = 9000 + j;
            }
        }

    }

    console.log(reordered_data);


    //document.querySelector('#UI').innerHTML = template(data);
    document.querySelector('#UI').innerHTML = template(reordered_data);

    addTinyMCE();

    addListeners();
/*
    var add_another = document.createElement('div');
    add_another.addEventListener('click', function (event) {
        add_passage();
    }, false);

    add_another.classList.add("new_row");
    add_another.innerHTML = "<p class='plus'>+</p><p> add another passage</p>";
    document.querySelector("#UI").appendChild(add_another); */
}

// Flattens a passage
function flatten(passage) {
    var rows_to_push = []
    for (var i = 0; i < passage.questions.length; i++) {
        rows_to_push.push({
            skill: passage.skill,
            level: passage.level,
            passagenum: passage.passagenum,
            function: passage.function,
            topic: passage.topic,
            difficultylevel: passage.difficultylevel,
            passagetext: passage.passagetext,
            passagetexteditorcomments: passage.passagetexteditorcomments,
            passageaudio: passage.passageaudio,
            passageimagedescription: passage.passageimagedescription,
            references: passage.references,
            ERCentralLevel: passage.ERCentralLevel,
            ECCentralScore: passage.ECCentralScore,
            uuid: passage.questions[i].uuid,
            questionnum: passage.questions[i].questionnum,
            questionname: passage.questions[i].questionname,
            questionfunction: passage.questions[i].questionfunction,
            questiontext: passage.questions[i].questiontext,
            questiontype: passage.questions[i].questiontype,
            answertext1: passage.questions[i].answertext1,
            answertext2: passage.questions[i].answertext2,
            answertext3: passage.questions[i].answertext3,
            answertext4: passage.questions[i].answertext4,
            answertext5: passage.questions[i].answertext5,
            answertext6: passage.questions[i].answertext6,
            questiontexteditorcomments: passage.questions[i].questiontexteditorcomments,
            questionaudio: passage.questions[i].questionaudio,
            questionimagedescription: passage.questions[i].questionimagedescription,
            questionrubric: passage.questions[i].questionrubric,
            answer1feedback: passage.questions[i].answer1feedback,
            answer1audio: passage.questions[i].answer1audio,
            answer1imagedescription: passage.questions[i].answer1imagedescription,
            answer2feedback: passage.questions[i].answer2feedback,
            answer2audio: passage.questions[i].answer2audio,
            answer2imagedescription: passage.questions[i].answer2imagedescription,
            answer3feedback: passage.questions[i].answer3feedback,
            answer3audio: passage.questions[i].answer3audio,
            answer3imagedescription: passage.questions[i].answer3imagedescription,
            answer4feedback: passage.questions[i].answer4feedback,
            answer4audio: passage.questions[i].answer4audio,
            answer4imagedescription: passage.questions[i].answer4imagedescription,
            answer5feedback: passage.questions[i].answer5feedback,
            answer5audio: passage.questions[i].answer5audio,
            answer5imagedescription: passage.questions[i].answer5imagedescription,
            answer6feedback: passage.questions[i].answer6feedback,
            answer6audio: passage.questions[i].answer6audio,
            answer6imagedescription: passage.questions[i].answer6imagedescription,
            answereditorcomments: passage.questions[i].answereditorcomments,
            Clausespersentence: passage.questions[i].Clausespersentence,
            wordcount: passage.questions[i].wordcount
        })
    }
    return rows_to_push;

}

function add_row_to_file(p_id, row_data) {
    var p_num = p_id.split("passage")[1];
    var passage_hit;
    for (var i = 0; i < file.length; i++) {
        if (file[i].passagenum == p_num) {
            console.log(file[i]);
            passage_hit = file[i];
            i = file.length;
        }
    }
    file.push({
        skill: passage_hit.skill,
        level: passage_hit.level,
        passagenum: passage_hit.passagenum,
        function: passage_hit.function,
        topic: passage_hit.topic,
        difficultylevel: passage_hit.difficultylevel,
        passagetext: passage_hit.passagetext,
        passagetexteditorcomments: passage_hit.passagetexteditorcomments,
        passageaudio: passage_hit.passageaudio,
        passageimagedescription: passage_hit.passageimagedescription,
        references: passage_hit.references,
        ERCentralLevel: passage_hit.ERCentralLevel,
        ECCentralScore: passage_hit.ECCentralScore,
        uuid: row_data.uuid,
        questionnum: row_data.questionnum,
        questionname: row_data.questionname,
        questionfunction: row_data.questionfunction,
        questiontext: row_data.questiontext,
        questiontype: row_data.questiontype,
        answertext1: row_data.answertext1,
        answertext2: row_data.answertext2,
        answertext3: row_data.answertext3,
        answertext4: row_data.answertext4,
        answertext5: row_data.answertext5,
        answertext6: row_data.answertext6,
        questiontexteditorcomments: row_data.questiontexteditorcomments,
        questionaudio: row_data.questionaudio,
        questionimagedescription: row_data.questionimagedescription,
        questionrubric: row_data.questionrubric,
        answer1feedback: row_data.answer1feedback,
        answer1audio: row_data.answer1audio,
        answer1imagedescription: row_data.answer1imagedescription,
        answer2feedback: row_data.answer2feedback,
        answer2audio: row_data.answer2audio,
        answer2imagedescription: row_data.answer2imagedescription,
        answer3feedback: row_data.answer3feedback,
        answer3audio: row_data.answer3audio,
        answer3imagedescription: row_data.answer3imagedescription,
        answer4feedback: row_data.answer4feedback,
        answer4audio: row_data.answer4audio,
        answer4imagedescription: row_data.answer4imagedescription,
        answer5feedback: row_data.answer5feedback,
        answer5audio: row_data.answer5audio,
        answer5imagedescription: row_data.answer5imagedescription,
        answer6feedback: row_data.answer6feedback,
        answer6audio: row_data.answer6audio,
        answer6imagedescription: row_data.answer6imagedescription,
        answereditorcomments: row_data.answereditorcomments,
        Clausespersentence: row_data.Clausespersentence,
        wordcount: row_data.wordcount
    })

}
// Finds out what the last row in the UI is and then adds another row to the end.
function add_passage() {
    //var new_row = document.createElement('div');
    var ui = document.querySelector("#UI");
    var divs = document.querySelectorAll('#UI > div');
    var index;
    if (divs.length < 2) {
        index = 1;
    } else {
        index = parseInt(divs[divs.length - 2].id.split("passage")[1]);
        index++;
    }
    //TODO: function that g
    var new_row_data = getBlank()
    var new_rows = template([new_row_data]);
    var parser = new DOMParser();


    //    console.log(file);
    new_rows = parser.parseFromString(new_rows, "text/html").querySelector("#passage0");
    //            console.log(new_rows);
    new_rows.id = "passage" + index;
    new_rows.querySelectorAll(".new_row")[0].onclick = function () {
            add_question(document.querySelector("#passage" + index));
        }
        // Sets the passage number and question 0 of newly added passages.
    new_rows.querySelector('h2').innerHTML = "PASSAGE #" + index;
    new_rows.querySelectorAll('h2')[1].innerHTML = "QUESTION #1";

    //        ADDS THE NEW PASSAGE TO THE MODEL DATA
    new_row_data.passagenum = index;
    var flat = flatten(new_row_data);
    for (var i = 0; i < flat.length; i++) {
        file.push(flat[i]);
        //console.log(file);
    }

    ui.insertBefore(new_rows, divs[divs.length - 1]);
    fixNewRow(new_rows.id);
}

function add_question(passage) {

    //    console.log(passage.id);

    var divs = passage.querySelectorAll('.question');
    console.log(divs, divs.length);
    var cur_index = divs.length - 1;
    var next_index = divs.length;
    var new_row_data = getBlankQuestion();
    var new_row = templatequestion([new_row_data]);
    add_row_to_file(passage.id, new_row_data);

    var parser = new DOMParser();
    new_row = parser.parseFromString(new_row, "text/html").querySelector("#question0");
    new_row.id = "question" + (next_index + 1);
    // row ids start at zero, but questions start at 1.
    new_row.querySelector('h2').innerHTML = "QUESTION #" + (next_index + 1);
    $(new_row).insertAfter(divs[cur_index]);
    fixNewRow(new_row.id);
}

function addListeners() {
    //add change event listener to inputs
    var inputs = document.getElementsByTagName("input");

    for (var i = 0; i < inputs.length; i++) {
        inputs[i].addEventListener('keyup', function (event) {
            saveData(this);
        }, false);
    }

    //add change event listener to editors
    var editors = document.querySelectorAll("textarea");
    for (var i = 0; i < editors.length; i++) {
        editors[i].addEventListener('keyup', function (event) {
            saveData(this);
        }, false);
    }
    var closers = document.querySelectorAll(".remove");
    for (var i = 0; i < closers.length; i++) {
        closers[i].addEventListener('click', function (event) {
            removeRow(this.parentElement.id);
        }, false);
    }

}


function removeRow(id) {
    ////////////////////////////////////////////////////////////////////
    //////////// UNDER CONSTRUCTION ////////////////////////////////////
    ////////////////////////////////////////////////////////////////////
    var whole_passage = false,
        question, passage;
    if (id.includes("passage")) {
        console.log("passage detected");
        whole_passage = true;
    } else {
        var question_html = $('#' + id).closest('.question')[0];
        question = question_html.querySelectorAll('h2')[0].dataset.uuid;
        console.log(question_html);
    }
    passage = $('#' + id).closest('.row')[0];
    if (!whole_passage) {
        console.log("removing one question");
        if (confirm("Are you sure you want to remove " + question + "? Click \"OK\" to continue.") == true) {
            var toRemove = document.querySelector("#" + id);
            toRemove.parentElement.removeChild(toRemove);
            clear_row(question);

        }
    } else {
        // REMOVE ALL PASSAGE QUESTIONS!
        console.log("removing whole passage");
        var temp = passage.querySelectorAll('h2');
        var questions = [];
        for (var i = 0; i < temp.length; i++) {
            if (temp[i].dataset.uuid) {
                questions.push(temp[i].dataset.uuid);
            }
        }
        if (confirm("Are you sure you want to remove the questions in" + passage + "? Click \"OK\" to continue.") == true) {
            var toRemove = document.querySelector("#" + passage.id);
            toRemove.parentElement.removeChild(toRemove);
            for (var i = 0; i < questions.length; i++) {
                clear_row(questions[i]);
            }
        }
    }

    function clear_row(uuid){
        console.log(uuid);
        empty = flatten(getBlank())[0];
        console.log(empty, empty.uuid);
        empty.uuid = uuid;
        console.log(empty, empty.uuid);

        for (var i = 0; i < file.length; i++){
            if (file[i].uuid === empty.uuid){
                pnum = file[i].passagenum;
                file[i] = empty;
                // Need to keep this or bad things happen.
//                file[i].passagenum = pnum;
            }
        }
    }

    ////////////////////////////////////////////////////////////////////
    //////////// UNDER CONSTRUCTION ////////////////////////////////////
    ////////////////////////////////////////////////////////////////////

        //        var row = parseInt(id.split("row")[1]);
        //        //replace that row with blank values
        //        file[row] = getBlank();
        //        file[row].toDelete = true;
        //        console.log(file[row]);
        //        var toRemove = document.querySelector("#" + id);
        //        toRemove.parentElement.removeChild(toRemove);

}


//New rows need listeners added to their editors and "remove" buttons.
function fixNewRow(id) {
    var row = document.querySelector("#" + id);
    var inputs = row.getElementsByTagName("input");

    for (var i = 0; i < inputs.length; i++) {
        inputs[i].addEventListener('keyup', function (event) {
            saveData(this);
        }, false);
    }
    addTinyMCE();
    //add change event listener to editors
    var editors = row.querySelectorAll("textarea");
    for (var i = 0; i < editors.length; i++) {
        editors[i].addEventListener('keyup', function (event) {
            saveData(this);
        }, false);
    }
    var closers = row.querySelectorAll(".remove");
    for (var i = 0; i < closers.length; i++) {
        closers[i].addEventListener('click', function (event) {
            removeRow(this.parentElement.id);
        }, false);
    }
}

function getFile() {
    var file = this.files[0]
    var reader = new FileReader();
    reader.onload = function (e) {
        var fileData = e.target.result;
        //need to fix the spaces in the obj props
        makeUI(d3.csvParse(fileData).map(function (item) {
            spaces = Object.keys(item);
            return Object.keys(item).reduce(function (objOut, key) {
                objOut[key.replace(/ /g, '')] = item[key];
                return objOut;
            }, {});
        }));
        file_name = document.querySelector("#file").value;
        //This should work the first time but it doesn't
        file_name = file_name.split("fakepath")[1].replace("\\", "");
    };
    reader.readAsText(file);
}

function saveData(element) {
    //Get which row of the CSV to change
    var only_passage = false,
        question, passage;
    if ($(element).closest('.question')[0] == undefined) {
        only_passage = true;
    } else {
        var question_html = $(element).closest('.question')[0];
        question = question_html.querySelectorAll('h2')[0].dataset.uuid;
    }
    passage = $(element).closest('.row')[0];
    if (!only_passage) {
        //UPDATES ONE QUESTION
        update_row(question);
    } else {
        //UPDATE ALL THE QUESTIONS!

        var temp = passage.querySelectorAll('h2');
        var questions = [];
        for (var i = 0; i < temp.length; i++) {
            if (temp[i].dataset.uuid) {
                questions.push(temp[i].dataset.uuid);
            }
        }
        for (var i = 0; i < questions.length; i++) {
            update_row(questions[i]);
        }
    }


    function update_row(question) {
        for (var i = 0; i < file.length; i++) {
            if (file[i].uuid == question) {
                // console.log(file[i], element.value);
                if (element.classList.contains("editor")) {
                    // DO IT TWICE, BECAUSE MCE
                    var columnName = element.previousElementSibling.previousElementSibling.innerHTML.replace(/ /g, '');
                    file[i][columnName] = element.dataset.editortext;
                    //console.log(file[i][columnName]);
                } else {
                    var columnName = element.previousElementSibling.innerHTML.replace(/ /g, '');
                    file[i][columnName] = element.value;
                    //console.log(file[i][columnName]);
                }
            }
        }
    }

    document.querySelector("#savemsg").classList.remove("run-animation");
    void document.querySelector("#savemsg").offsetWidth;
    document.querySelector("#savemsg").classList.add("run-animation");
}


function downloadit() {
    // filter out the rows that you have deleted.
    file = file.filter(function (row) {
        return typeof row.toDelete === 'undefined';
    });
    //console.log(file);
    var exported = d3.csvFormat(file);

    var validity = validate();
    if (!validity.valid) {
        var issuesmsg = "This quiz has the following issues:\n";
        for (var i = 0; i < validity.issues.length; i++) {
            issuesmsg += "\n [" + validity.issues[i].location + ": " + validity.issues[i].issue + "]";
        }
        issuesmsg += "\n\n Click \"OK\" to download anyway."
        if (confirm(issuesmsg) == true) {
            download(exported, file_name, "text/plain");
        }
    } else {
        download(exported, file_name, "text/plain");
    }
}

/*************************************************
Looks for any reason the user should NOT download
the file, and marks it in the document. All issues
are pushed to the "validity" object which is
returned and presented to the user for review
before choosing to correct the errors or continue
to download.
*************************************************/
function validate() {
    var validity = {
        valid: true,
        issues: []
    };
    //simplify adding issues to validity
    function add_issue(l, i) {
        validity.issues.push({
            location: l,
            issue: i
        })
    }
    //Test issue
    //add_issue("passage1", "numbering");
    //Mark the header by adding the "invalid" class to the header
    for (var i = 0; i < file.length; i++) {
        if (file[i].passagetext.length > 4000) {
            console.log(file[i].passagetext.length)
            add_issue("passage" + file[i].passagenum, "passagetext too long. It is " + file[i].passagetext.length + " characters long.")
        }
        if (file[i].questiontext.length > 4000) {
            console.log(file[i].questiontext.length)
            add_issue(file[i].uuid, "questiontext too long")
        }
    }

    function onlyUnique(value, index, self) {
        return self.indexOf(value) === index;
    }
    validity.issues = validity.issues.filter((thing, index, self) => self.findIndex((t) => {
        return t.location === thing.location && t.issue === thing.issue;
    }) === index);

    if (validity.issues.length > 0) {
        validity.valid = false;
    }
    return validity;
}

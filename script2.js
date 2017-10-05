//I'm adding this line so I can commit

if (window.location.search.indexOf('?css=fun') === 0) {
    document.write('<link rel="stylesheet" href="./fun.css" />');
} else {
    document.write('<link rel="stylesheet" href="./default2.css" />');
}
var file = [];
var reordered_data = [];
var spaces;
var file_name = "default.csv";
var template = Handlebars.compile(document.querySelector('#template').innerHTML);
document.querySelector('input').addEventListener('change', getFile);
var templatequestion = Handlebars.compile(document.querySelector('#templatequestion').innerHTML);

function getBlankQuestion() {
    var tempuuid =  uuidv5("EC_POC", uuidv4())
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
        if(!file[i].uuid){
            file[i].uuid = uuidv5("EC_POC", uuidv4());
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

    var add_another = document.createElement('div');
    add_another.addEventListener('click', function (event) {
        add_passage();
    }, false);

    add_another.classList.add("new_row");
    add_another.innerHTML = "<p class='plus'>+</p><p> add another passage</p>";
    document.querySelector("#UI").appendChild(add_another);
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
    var new_rows = template([getBlank()]);
    var parser = new DOMParser();
    new_rows = parser.parseFromString(new_rows, "text/html").querySelector("#passage0");
    //            console.log(new_rows);
    new_rows.id = "passage" + index;
    new_rows.querySelectorAll(".new_row")[0].onclick = function () {
            add_question(document.querySelector("#passage" + index));
        }
        // Sets the passage number and question 0 of newly added passages.
    new_rows.querySelector('h2').innerHTML = "PASSAGE #" + index;
    new_rows.querySelectorAll('h2')[1].innerHTML = "QUESTION #1";
    ui.insertBefore(new_rows, divs[divs.length - 1]);
    fixNewRow(new_rows.id);
}

function add_question(passage) {
    console.log(passage.id);
    var divs = passage.querySelectorAll('.question');
    console.log(divs, divs.length);
    var cur_index = divs.length - 1;
    var next_index = divs.length;
    var new_row = templatequestion([getBlankQuestion()]);
    var parser = new DOMParser();
    new_row = parser.parseFromString(new_row, "text/html").querySelector("#question0");
    new_row.id = "question" + next_index;
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
    if (confirm("Are you sure you want to remove this row? Click \"OK\" to continue.") == true) {
        var row = parseInt(id.split("row")[1]);
        //replace that row with blank values
        file[row] = getBlank();
        file[row].toDelete = true;
        console.log(file[row]);
        var toRemove = document.querySelector("#" + id);
        toRemove.parentElement.removeChild(toRemove);
    }
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
    var passage_id =  $(element).closest('.row')[0].id;
    var question_to_edit;
    if ($(element).closest('h2')[0].innerHTML.includes('PASSAGE')){
        console.log('passage edited');
    }
    else{
        console.log('question edited');
        question_to_edit =  $(element).closest('h2')[0].dataset.uuid;
    }


    var uuid = $(element).closest('.row')[0].querySelectorAll('h2')[1].dataset.uuid;

    console.log(row, question_to_edit ,uuid);
    //console.log(row);
/*    var columnName = element.previousElementSibling.innerHTML.replace(' ', '');
    //Adds a new row to the file data if it doesn't exist yet.
    if (!file[row]) {
        //console.log("this is a new row, the last row is:", file[row - 1]);
        file.push(getBlank());
        //console.log(file[row]);
    }

    //console.log(row, columnName);
    //console.log(file[row][columnName]);
    if (element.classList.contains("editor")) {
        // DO IT TWICE, BECAUSE MCE
        var columnName = element.previousElementSibling.previousElementSibling.innerHTML.replace(' ', '');
        //console.log(element.dataset.editortext);
        //console.log(file[row][columnName]);
        file[row][columnName] = element.dataset.editortext;
        //console.log(file[row][columnName]);
    } else {
        var columnName = element.previousElementSibling.innerHTML.replace(' ', '');
        file[row][columnName] = element.value;
        // console.log(file[row][columnName])
    }
    //console.log(file[row][columnName]);
*/
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
        for (var i = 0;i < validity.issues.length; i++){
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
function validate(){
    var validity = {valid: true, issues: []};
    //simplify adding issues to validity
    function add_issue(l, i){
        validity.issues.push({location: l, issue: i})
    }
    //Test issue
    //add_issue("passage1", "numbering");




    if (validity.issues.length > 0){
        validity.valid = false;
    }
    return validity;
}

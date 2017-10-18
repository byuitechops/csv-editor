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

/**********************************************************
 *                   getBlank(string)
 *
 * DESC: "gets" a blank object of the specified type.
 * INPUTS: Option string. Used to determine which object
 *       to return.
 * RETURNS: a blank template of the specified object.
 ***********************************************************/
function getBlank(option) {
    if (option === "question") {
        return {
            /*add necessary fields*/
            question_fields: ""
        }
    } else if (option === "passage") {
        return {
            /*add necessary fields*/
            passage_fields: "",
            questions: [getBlank("question")]
        }
    } else {
        getBlank(prompt("Please type either 'passage' or 'question'"));
    }
}

/**********************************************************
 *                   addTinyMCE()
 *
 * DESC: Replaces all fields with the ".editor" class with
 *       a TinyMCE editor. (Editor code is already done).
 * INPUTS: None
 * RETURNS: Void
 ***********************************************************/
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

/**********************************************************
 *                   makeUI(JSON)
 *
 * DESC: Reads input data and builds the User Interface
 * INPUTS: JSON data of passages and questions
 * RETURNS: Void.
 ***********************************************************/
function makeUI(data) {
    /* make sure data is formatted properly first*/
    document.querySelector('#UI').innerHTML = template(data);
    addTinyMCE();
    addListeners();
}

/**********************************************************
 *                   flatten(JSON)
 *
 * DESC: Turns nested data into a flat array.
 * INPUTS: JSON data. [{foo, bar,{[{row1},{row2},{row3}]}}]
 * RETURNS: Flat JSON array. [{row1},{row2},{row3}]
 ***********************************************************/
function flatten(passage) {
    return flat_data;
}


/**********************************************************
 *                   add_row_to_file(string, JSON)
 *
 * DESC: Adds a row of data to the model file
 *       this function should no longer be needed
 * INPUTS: A string passage identifier and data to add.
 * RETURNS: void
 ***********************************************************/
function add_row_to_file(p_id, row_data) {
}


/**********************************************************
 *                   add_passage()
 *
 * DESC: Adds a new passage with blank values to UI
 * INPUTS: None
 * RETURNS: Void
 ***********************************************************/
function add_passage() {
    //var new_row = document.createElement('div');
    var ui = document.querySelector("#UI");
    var blank = getBlank("passage");
    /*ui.insertBefore(new_row, ["new row button" div]);*/
    addTinyMCE();
    addListeners();
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

    function clear_row(uuid) {
        console.log(uuid);
        empty = flatten(getBlank())[0];
        console.log(empty, empty.uuid);
        empty.uuid = uuid;
        console.log(empty, empty.uuid);

        for (var i = 0; i < file.length; i++) {
            if (file[i].uuid === empty.uuid) {
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

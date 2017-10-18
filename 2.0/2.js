// SET THE CSS OF THE EDITOR, LOOKS FOR THE "FUN" OPTION AND
// LOADS ALTERNATE STYLES IF IT IS INCLUDED.
if (window.location.search.indexOf('?css=fun') === 0) {
    document.write('<link rel="stylesheet" href="./fun.css" />');
} else {
    document.write('<link rel="stylesheet" href="./2.css" />');
}

// File data, the imported CSV/JSON object
var file = [];
// Data from the file that has been reordered temporarily
var reordered_data = [];
// Spaces in the object names, such as "passage text"
var spaces;
// Default name of the file to be downloaded. Replaced with name of file the user uploads
var file_name = "default.csv";
// The passage handlebars template
var template = Handlebars.compile(document.querySelector('#template').innerHTML);
// The passage question handlebars template
var templatequestion = Handlebars.compile(document.querySelector('#templatequestion').innerHTML);

// Add a change listener to the file input field to upload the file immediately.
document.querySelector('input').addEventListener('change', getFile);


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
 *
 * NOTE: This works, don't touch.
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
 *           add_row_to_file(string, JSON)
 * TODO: DELETE THIS?
 * DESC: Adds a row of data to the model file
 *       this function should no longer be needed
 * INPUTS: A string passage identifier and data to add.
 * RETURNS: void
 ***********************************************************/
function add_row_to_file(p_id, row_data) {}


/**********************************************************
 *                   add_passage()
 *
 * DESC: Adds a new passage with blank values to UI
 * INPUTS: None
 * RETURNS: Void
 ***********************************************************/
function add_passage() {
    // Get the UI
    var ui = document.querySelector("#UI");
    // Get a blank passage
    var blank = getBlank("passage");
    // Find last passage on DOM
    // Use Handlebars template to build the passage element
    // Insert passage into DOM
    /*ui.insertBefore(new_row, ["new row button" div]);*/
    // Add Editors
    addTinyMCE();
    // Add listeners
    addListeners();
}

/**********************************************************
 *                   add_question(string/id)
 *
 * DESC: Adds a new question with blank values to the UI
 *       under an existing passage.
 * INPUTS: String passage id, or passage element to append
 * RETURNS: Void
 ***********************************************************/
function add_question(passage) {
    // Get the passage questions and find the last spot
    // Get a blank question
    // Create new element using Handlebars template and
    //      blank question values
    // Append to DOM in last-spot position
}

/**********************************************************
 *                   add_listeners()
 *
 * DESC: Put the appropriate listeners on the elements that
 *       have been added to the DOM
 * INPUTS: None (scrapes the page)
 * RETURNS: Void
 ***********************************************************/
function addListeners() {
    //add change event listener all input fields

    //  var inputs = document.getElementsByTagName("input");
    //  var selects = document.getElementsByTagName("select");
    //  var editors = document.querySelectorAll("textarea");
    //  var closers = document.querySelectorAll(".remove");

    //add listener for the "remove" buttons

    //EXAMPLE LOOP FOR LISTENERS
    /*for (var i = 0; i < inputs.length; i++) {
    for (var i = 0; i < closers.length; i++) {
        closers[i].addEventListener('click', function (event) {
            removeRow(this.parentElement.id);
        }, false);
    }
    */
}

/**********************************************************
 *                   remove_row(string/element)
 *
 * DESC: Deletes the content of the input row from both the
 *       UI and the data to be exported
 * INPUTS: String id OR entire element (such as a 'this')
 * RETURNS: Void
 ***********************************************************/
function removeRow(id) {
    // Determine if it is a question or passage being removed
    // If it's a question, delete it from the appropriate
    //      passage in the file data (JSON to export).
    // If it's a passage, remove the entire passage.
    // Delete the question or passage from the DOM
}


/**********************************************************
 *                   getFile()
 *
 * DESC: Grabs the input file, creates the data structure
 *       Calls "makeUI" to build the page
 * INPUTS: None, triggered by a file change listener
 * RETURNS: Void
 *
 * NOTE: This works, don't touch.
 ***********************************************************/
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


/**********************************************************
 *                saveData()
 *
 * DESC: Scrapes the fields on the page and updates the
 *       data that is going to be exported. Is called
 *       every two minutes, or when the user downloads
 *       the file.
 * INPUTS: None
 * RETURNS: Void
 ***********************************************************/
function saveData() {
    // Read data from the UI
    // All information under a "row" or "passage" is one row of
    //      the export data. All questions in a "passage" are
    //      rows of the passage.questions array.
    // Tell the user that content has been saved
    document.querySelector("#savemsg").classList.remove("run-animation");
    void document.querySelector("#savemsg").offsetWidth;
    document.querySelector("#savemsg").classList.add("run-animation");
}

/**********************************************************
 *                downloadit()
 *
 * DESC: Exports the page data to a JSON file.
 * INPUTS: None
 * RETURNS: Void
 ***********************************************************/
function downloadit() {
    // Save user's progress
    saveData();
    // Check the items for validation issues and flag it.
    var validity = validate();
    // Finalize the file to be exported

    // If there are issues with the file, mark them and alert
    //      the user. Allow the user to proceed with the
    //      faulty download at their own risk.
    // If there are no issues with the file, just download it.
    /* //EXAMPLE:
    if (!validity.valid) {
        var issuesmsg = "This quiz has the following issues:\n";
        for (var i = 0; i < validity.issues.length; i++)
            issuesmsg += "\n [" + validity.issues[i].location + ": " + validity.issues[i].issue + "]";
        issuesmsg += "\n\n Click \"OK\" to download anyway."
        if (confirm(issuesmsg) == true)
            download(exported, file_name, "text/plain");
        else
            download(exported, file_name, "text/plain");
    }
    */
}

/**********************************************************
 *                validate()
 *
 * DESC: Checks the page for any issues we don't want to
 *       export. Returns a list of issues and marks them
 *       in the DOM to be fixed if the user desires.
 * INPUTS: None
 * RETURNS: {valid: bool, issues:[{issue:"",location,""}]}
 ***********************************************************/
function validate() {
    // Blank returned object.
    var validity = {
        valid: true,
        issues: []
    };
    // Add an issue to the returned object.
    function add_issue(l, i) {
        validity.issues.push({
            issue: i,
            location: l
        })
    }
    // This example issue checks for the length of
    //      passagetext and logs an issue if it is over 4000 chars.
    /*for (var i = 0; i < file.length; i++) {
        if (file[i].passagetext.length > 4000) {
            console.log(file[i].passagetext.length)
            add_issue("passage" + file[i].passagenum, "passagetext too long. It is " + file[i].passagetext.length + " characters long.")
        }
    }*/

    // Mark any invalid inputs with the "invalid" class.

    // Remove duplicate issues, may no longer be needed with JSON output.
    /*function onlyUnique(value, index, self) {
        return self.indexOf(value) === index;
    }
    validity.issues = validity.issues.filter((thing, index, self) => self.findIndex((t) => {
        return t.location === thing.location && t.issue === thing.issue;
    }) === index);*/

    // If there are issues, set "valid" to false.
    if (validity.issues.length > 0) {
        validity.valid = false;
    }
    return validity;
}

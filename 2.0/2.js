/*IT HAS UPDATED*/
if (window.location.search.indexOf('?css=fun') === 0) {
    document.write('<link rel="stylesheet" href="./fun.css" />');
} else {
    document.write('<link rel="stylesheet" href="./2.css" />');
}

var file = [];
var spaces;
var file_name = "default.csv";
var template = Handlebars.compile(document.querySelector('#template').innerHTML);
document.querySelector('input').addEventListener('change', getFile)

/*******************************
internet boi handlebars helper
*******************************/
window.Handlebars.registerHelper('select', function( value, options ){
        var $el = $('<select />').html( options.fn(this) );
        $el.find('[value="' + value + '"]').attr({'selected':'selected'});
        return $el.html();
});

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
        skill: "",
        level: "",
        topic: "",
        difficultylevel: "",
        passagefunction: "",
        passagetext: "",
        passagecorevocabularyused: "",
        passagetextcommentsforwriter: "",
        passagetextcommonissuestheme: "",
        passageaudiofilename: "",
        passageimagedescription: "",
        questionname: "",
        questionfunction: "",
        questioncando: "",
        questiontext: "",
        questiontextcommonissuestheme: "",
        questionlevelfeedback: "",
        questiontype: "",
        questiontextcommentsforwriter: "",
        questionaudiofilename: "",
        questionimagedescription: "",
        questionrubric: "",
        answertext1: "",
        answer1feedback: "",
        answer1audiofilename: "",
        answer1imagedescription: "",
        answertext2: "",
        answer2feedback: "",
        answer2audiofilename: "",
        answer2imagedescription: "",
        answertext3: "",
        answer3feedback: "",
        answer3audiofilename: "",
        answer3imagedescription: "",
        answertext4: "",
        answer4feedback: "",
        answer4audiofilename: "",
        answer4imagedescription: "",
        answertext5: "",
        answer5feedback: "",
        answer5audiofilename: "",
        answer5imagedescription: "",
        answertext6: "",
        answer6feedback: "",
        answer6audiofilename: "",
        answer6imagedescription: "",
        answercommentsforthewriter: "",
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
        height: 200,
        width: '100%',
        menubar: false,
        plugins: [
                    'advlist autolink lists link image charmap print preview anchor textcolor',
                    'searchreplace visualblocks code fullscreen wordcount',
                    'insertdatetime media table contextmenu paste table hr code help'
                ],
        toolbar: 'insert | undo redo |  styleselect | bold italic backcolor  | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | code | table | hr | help',
        convert_urls: false,
        content_css: "./tinymcestyle.css",
        init_instance_callback: function (editor) {
            function saveit() {
                //console.log(editor.getContent(), this.id);
                var textarea = document.querySelector("#" + this.id)
                textarea.dataset.editortext = (editor.getContent({
                    format: 'html'
                }));
                saveData(textarea);
                //console.log(textarea.dataset.editortext);
            }
            editor.on('KeyUp', saveit);
            editor.on('Change', saveit);
            editor.on('PastePostProcess', saveit);
            editor.on('ExecCommand', saveit);
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
    file = data;
    document.querySelector('#UI').innerHTML = template(data);


    addTinyMCE();

    addListeners();

    var add_another = document.createElement('div');
    add_another.addEventListener('click', function (event) {
        add_row();
    }, false);

    add_another.classList.add("new_row");
    add_another.innerHTML = "<p class='plus'>+</p><p> add another question</p>";
    document.querySelector("#UI").appendChild(add_another);
}


/**********************************************************
 *           add_row()
 *
 ***********************************************************/
function add_row() {
    var ui = document.querySelector("#UI");
    var divs = document.querySelectorAll('#UI > div');
    var index;
    if (divs.length < 2) {
        index = 0;
    } else {
        index = parseInt(divs[divs.length - 2].id.split("row")[1]);
        index++;
    }

    var new_rows = template([getBlank()]);
    var parser = new DOMParser();
    new_rows = parser.parseFromString(new_rows, "text/html").querySelector("#row0");
    //            console.log(new_rows);
    new_rows.id = "row" + index;

    ui.insertBefore(new_rows, divs[divs.length - 1]);
    //    fixNewRow(new_rows.id);
    addTinyMCE();
    addListeners();
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
    //add change event listener to inputs
    var inputs = document.getElementsByTagName("input");
    var selects = document.getElementsByTagName("select");
//    var events;
    for (var i = 0; i < inputs.length; i++) {
        if (!inputs[i].dataset.listener) {
            inputs[i].addEventListener('keyup', function (event) {
                saveData(this);
            }, false);
            inputs[i].dataset.listener = true;
        }
    }
    for (var i = 0; i < selects.length; i++) {
        if (!selects[i].dataset.listener) {
            selects[i].addEventListener('change', function (event) {
                saveData(this);
            }, false);
            selects[i].dataset.listener = true;
        }
    }

    //add change event listener to editors
    var editors = document.querySelectorAll("textarea");
    for (var i = 0; i < editors.length; i++) {
        if (!editors[i].dataset.listener) {
            editors[i].addEventListener('keyup', function (event) {
                saveData(this);
            }, false);
            inputs[i].dataset.listener = true;
        }
    }
    var closers = document.querySelectorAll(".remove");
    for (var i = 0; i < closers.length; i++) {
        if (!closers[i].dataset.listener) {
            closers[i].addEventListener('click', function (event) {
                removeRow(this.parentElement.id);
            }, false);
            closers[i].dataset.listener = true;
        }
    }



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

        //Map the columns to have a key for each property of the getblank object.
//      IGNORE FOR NOW
//        var blankKeys = Object.keys(getBlank());
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
function saveData(element) {
    // Get which row of the CSV to change
    var row = parseInt(element.parentElement.parentElement.parentElement.id.split("row")[1]);
    console.log(row);
    var columnName = element.previousElementSibling.innerHTML.replace(/ /g, '');
    // Adds a new row to the file data if it doesn't exist yet.
    if (!file[row]) {
        //console.log("this is a new row, the last row is:", file[row - 1]);
        file.push(getBlank());
        //console.log(file[row]);
    }

    //console.log(row, columnName);
    //console.log(file[row][columnName]);
    if (element.classList.contains("editor")) {
        // DO IT TWICE, BECAUSE MCE
        var columnName = element.previousElementSibling.previousElementSibling.innerHTML.replace(/ /g, '');
        //console.log(element.dataset.editortext);
        //console.log(file[row][columnName]);
        file[row][columnName] = element.dataset.editortext;
        //console.log(file[row][columnName]);
    } else {
        var columnName = element.previousElementSibling.innerHTML.replace(/ /g, '');
        file[row][columnName] = element.value;
        //console.log(file[row][columnName])
    }
    // just in case the row decides it was supposed to be deleted.
    if (file[row].toDelete) {
        delete file[row].toDelete;
    }
    //console.log(file[row][columnName]);
    document.querySelector("#savemsg").classList.remove("run-animation");
    void document.querySelector("#savemsg").offsetWidth;
    document.querySelector("#savemsg").classList.add("run-animation");
}

/**********************************************************
 *                downloadit()
 *
 * DESC: Exports the page data to a CSV
 * INPUTS: None
 * RETURNS: Void
 ***********************************************************/
function downloadit() {
    var valid = validate();
    // filter out the rows that you have deleted.
    if (valid.valid) {
        file = file.filter(function (row) {
            return typeof row.toDelete === 'undefined';
        });

        console.log(file);
        /*ADD THE COLUMNS!*/
        var exported = d3.csvFormat(file, Object.keys(getBlank())); //var exported = d3.csvFormat(file, ["col","col"]);
        download(exported, file_name, "text/plain");
    } else {
        console.log(valid.issues);
        if (confirm("Issues have been found. Prese \"OK\" to ignore and download anyway.")) {
            file = file.filter(function (row) {
                return typeof row.toDelete === 'undefined';
            });
            console.log(file);
            var exported = d3.csvFormat(file);
            download(exported, file_name, "text/plain");
        }
    }
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
    for (var i = 0; i < file.length; i++) {
        if (file[i].passagetext.length > 4000) {
            console.log(file[i].passagetext.length)
            add_issue(file[i].id, "passagetext too long. It is " + file[i].passagetext.length + " characters long.")
        }
        if (file[i].passagefunction == "")
            add_issue(file[i].id, "passagefunction cannot be blank.");
        if (file[i].topic == "")
            add_issue(file[i].id, "topic cannot be blank.");
        if (file[i].difficultylevel == "")
            add_issue(file[i].id, "difficultylevel cannot be blank.");
        if (file[i].skill == "")
            add_issue(file[i].id, "skill cannot be blank.");
        if (file[i].level == "")
            add_issue(file[i].id, "level cannot be blank.");
        if (file[i].questiontype == "")
            add_issue(file[i].id, "questiontype cannot be blank.");
        if (file[i].questionfunction == "")
            add_issue(file[i].id, "questionfunction cannot be blank.");
    }

    // Mark any invalid inputs with the "invalid" class.

    // If there are issues, set "valid" to false.
    if (validity.issues.length > 0) {
        validity.valid = false;
    }
    return validity;
}

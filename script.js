if (window.location.search.indexOf('?css=fun') === 0) {
    document.write('<link rel="stylesheet" href="./fun.css" />');
} else {
    document.write('<link rel="stylesheet" href="./default.css" />');
}

var file = [];
var spaces;
var file_name = "default.csv";
var template = Handlebars.compile(document.querySelector('#template').innerHTML);
document.querySelector('input').addEventListener('change', getFile)



function getBlank() {
    return {
        passagenum: "",
        questionnum: "",
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
    };
}

function addTinyMCE() {

    tinymce.init({
        selector: 'textarea.editor',
        height: 300,
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

// Finds out what the last row in the UI is and then adds another row to the end.
function add_row() {
    //            var new_row = document.createElement('div');
    var ui = document.querySelector("#UI");
    var divs = document.querySelectorAll('#UI > div');
    var index;
    if (divs.length < 2) {
        index = 0;
    } else {
        index = parseInt(divs[divs.length - 2].id.split("row")[1]);
        index++;
    }


    //TODO: function that g
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

function addListeners() {
    //add change event listener to inputs
    var inputs = document.getElementsByTagName("input");
    var events;
    for (var i = 0; i < inputs.length; i++) {
        if (!inputs[i].dataset.listener) {
            inputs[i].addEventListener('keyup', function (event) {
                saveData(this);
            }, false);
            inputs[i].dataset.listener = true;
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


    // Get which row of the CSV to change
    var row = parseInt(element.parentElement.parentElement.parentElement.id.split("row")[1]);
    //    console.log(row);
    var columnName = element.previousElementSibling.innerHTML.replace(' ', '');
    // Adds a new row to the file data if it doesn't exist yet.
    if (!file[row]) {
        //        console.log("this is a new row, the last row is:", file[row - 1]);
        file.push(getBlank());
        //        console.log(file[row]);
    }

    //            console.log(row, columnName);
    //            console.log(file[row][columnName]);
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
    // just in case the row decides it was supposed to be deleted.
    if (file[row].toDelete) {
        delete file[row].toDelete;
    }
    //            console.log(file[row][columnName]);
    document.querySelector("#savemsg").classList.remove("run-animation");
    void document.querySelector("#savemsg").offsetWidth;
    document.querySelector("#savemsg").classList.add("run-animation");

    //     document.querySelector("#savemsg").classList.remove("run-animation");
}


function downloadit() {
    // filter out the rows that you have deleted.
    file = file.filter(function (row) {
        return typeof row.toDelete === 'undefined';
    });

    console.log(file);
    var exported = d3.csvFormat(file);
    download(exported, file_name, "text/plain");
}

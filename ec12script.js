
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
        init_instance_callback: function (editor) {
              function saveit(){
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


// Finds out what the last row in the UI is and then adds another row to the end.

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
    // Get which row of the CSV to change
    var row = parseInt(element.parentElement.parentElement.parentElement.id.split("row")[1]);
    //    console.log(row);
    var columnName = element.previousElementSibling.innerHTML.replace(/ /g, '');
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
        var columnName = element.previousElementSibling.previousElementSibling.innerHTML.replace(/ /g, '');
        //console.log(element.dataset.editortext);
        //console.log(file[row][columnName]);
        file[row][columnName] = element.dataset.editortext;
        //console.log(file[row][columnName]);
    } else {
        // Wow dude, lazy much? This replace needs to replace ALL of the sapces.
        var columnName = element.previousElementSibling.innerHTML.replace(/ /g, '');

        file[row][columnName] = element.value;
        // console.log(file[row][columnName])
    }


    document.querySelector("#savemsg").classList.remove("run-animation");
    void document.querySelector("#savemsg").offsetWidth;
    document.querySelector("#savemsg").classList.add("run-animation");

    //            console.log(file[row][columnName]);
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

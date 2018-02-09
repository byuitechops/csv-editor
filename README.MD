# JOSHI - The EnglishConnect Quiz Question Editor
## Table of Contents
* [What it is](#is)
* [What it does](#does)
* [How it does it](#how)

<a name="is"></a>
## WHAT IT IS 
Joshi is a tool for editing EnglishConnect quiz questions. At first, it was built to be a GUI for importing existing questions and making changes, but quickly evolved to be an editor/generator where you can create *new* quizzes and export them. Before Joshi, students needed to sort through a Word document, copy and paste content into a spreadsheet, and make their edits in tiny cells without a preview of their work. With Joshi (and the help of TinyMCE) these questions are now easy to edit and view as the student would see them. This editor has significantly sped up the process of building EnglishConnect quizzes.

<a name="does"></a>
## WHAT IT DOES

The Johsi editor uses 3 main steps: Uploading existing quiz CSVs, modifying these uploaded or new quizzes, and validating the changes on export.

1. **Uploading existing quiz CSVs**. When you load the editor, you first choose which quiz type you would like to work with (either EC1&2 or EC3). You are then brought to a screen where you can upload your existing quiz file, which will populate the GUI with your quiz questions. Simply make the changes you wish to see and click "download" to get your updated file.
2. **Modifying these uploaded or new quizzes.** From the GUI menu you will see an "add question" button. You can use this to start a new quiz, or add questions to your existing quiz. Similarly, each question can be removed with the X in the top right corner. Each question has its own space where you can select the options or edit the text necessary to fix or create your quiz.
3. **Exporting freshly updated quizzes**. The download functionality doesn't simply dump your data into a CSV, it checks your work to confirm that there are no fields missing or other issues in your code. After alerting you to these potential issues you can then continue to make edits, or download the file anyway. 

<a name="how"></a>
## HOW IT DOES IT

Third party libraries:
* **jquery 3.2.1**: Used for selectors and handlebars helpers
* **handlebars 4.0.10**: Predefined question templates are used when importing files or creating new questions. Imports will add a new question for each row in the CSV, and clicking "Add Question" will run the question template with a blank object.
* **d3-dsv 1.0.7**: Parses the input and output of the tool. Makes working with CSVs a breeze.
* **tinymce 4.6.6**: Passage and Question text boxes often use special custom HTML. TinyMCE makes editing this text- and previewing how it will look on a quiz page- easy. 
* **downloadjs 1.4.7**: Simplifies the download process.
* **uuid v4**: When needed, this provides UUIDs for each new quiz question if importing them into a database. This allows question editors without database access to be sure they are editing the correct question.

Scripts files: 
* [getBlank*.js](#getblank)
* [validate*.js](#validate)
* [script.js](#script)

<a name="getblank"></a>
### getBlank*.js
```javascript
/* 
    There are two getBlank files, one for each editor, and 
    they are named as such. The blank question objects for
    EC1&2 and EC3 are different, so theis functionality 
    Had to be isolated from the main script, which works
    on both editors.
*/
/**********************************************************
 *                   getBlank(string)
 *
 * DESC: "gets" a blank object of the specified type.
 * INPUTS: Option string. Used to determine which object
 *       to return.
 * RETURNS: a blank template of the specified object.
 ***********************************************************/
function getBlank() { ... }

```
<a name="validate"></a>
### validate*.js
```javascript
/* 
    See notes on getBlank. Validation for the two editors 
    follows different rules. This function also needed to be 
    isolated.
*/
///******************************************************************
// *                validate()
// *
// * DESC: Checks the page for any issues we don't want to
// *       export. Returns a list of issues and marks them
// *       in the DOM to be fixed if the user desires.
// * INPUTS: None
// * RETURNS: {valid: bool, issues:[{issue:"",location:"",field:""}]}
// *****************************************************************/
function validate() { ... }

```
<a name="script"></a>
### Script.js
```javascript
// Initialize Saves, handlebars templates, and "upload" button
var saves = 0;
va= Handlebars.compile(document.querySelector('#template').innerHTML);
document.querySelector('input').addEventListener('change', getFile);

/**********************************************************
 *                   addTinyMCE()
 *
 * DESC: Replaces all fields with the ".editor" class with
 *       a TinyMCE editor. (Editor code is already done).
 * INPUTS: None
 * RETURNS: Void
 ***********************************************************/
function addTinyMCE() { ... }

/**********************************************************
 *                   makeUI(JSON)
 *
 * DESC: Reads input data and builds the User Interface
 * INPUTS: JSON data of passages and questions
 * RETURNS: Void.
 ***********************************************************/
function makeUI(data) { ... }


/**********************************************************
 *           add_row()
 *
 * DESC: Adds a row to the DOM and to the file. First makes
 *       the new row data, then inserts it where it belongs
 *       from there it calls addTinyMCE() and addListeners()
 *       to make sure the new row works like all the others.
 * INPUTS: None
 * RETURNS: Void
 ***********************************************************/
function add_row() { ... }


/**********************************************************
 *                   add_listeners()
 *
 * DESC: Put the appropriate listeners on the elements that
 *       have been added to the DOM
 * INPUTS: None (scrapes the page)
 * RETURNS: Void
 ***********************************************************/
function addListeners() { ... }


/**********************************************************
 *                   remove_row(string/element)
 *
 * DESC: Deletes the content of the input row from both the
 *       UI and the data to be exported
 * INPUTS: String id OR entire element (such as a 'this')
 * RETURNS: Void
 ***********************************************************/
function removeRow(id) { ... }

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
function getFile() { ... }


/**********************************************************
 *                saveData()
 *
 * DESC: Scrapes the fields on the page and updates the
 *       data that is going to be exported. Is called
 *       every two minutes, or when the user downloads
 *       the file. Sets saves to "1" or "true".
 * INPUTS: None
 * RETURNS: Void
 ***********************************************************/
function saveData(element) { ... }

/**********************************************************
 *                downloadit()
 *
 * DESC: Exports the page data to a CSV. Calls validation
 *       and makes the user confirm if certain errors are
 *       found. If no changes have been made, or there are
 *       validation issues, a warning is offered first.
 *          Also injects the custom CSS <link> tags that
 *          TinyMCE likes to remove from the passagetext.
 * INPUTS: None
 * RETURNS: Void
 ***********************************************************/
function downloadit() { ... }
```


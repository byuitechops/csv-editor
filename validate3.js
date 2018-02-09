///******************************************************************
// *                validate()
// *
// * DESC: Checks the page for any issues we don't want to
// *       export. Returns a list of issues and marks them
// *       in the DOM to be fixed if the user desires.
// * INPUTS: None
// * RETURNS: {valid: bool, issues:[{issue:"",location:"",field:""}]}
// *****************************************************************/
function validate() {
    // Blank returned object.
    var validity = {
        valid: true,
        issues: []
    };
    // Add an issue to the returned object.
   /* function add_issue(l, f, i) {
        validity.issues.push({
            issue: i,
            location: l,
            field: f
        })
    }
    // This example issue checks for the length of
    //      passagetext and logs an issue if it is over 4000 chars.
    for (var i = 0; i < file.length; i++) {
        //If the row is being removed, don't worry about it.
        if (!file[i].toDelete) {

            if (file[i].passagetext.length > 4000) {
                console.log(file[i].passagetext.length)
                add_issue(file[i].id, "passage text", "passagetext too long. It is " + file[i].passagetext.length + " characters long.")
            }
            if (file[i].function == "")
                add_issue(file[i].id, "function", "function cannot be blank.");
            if (file[i].topic == "")
                add_issue(file[i].id, "topic", "topic cannot be blank.");
            if (file[i].difficultylevel == "")
                add_issue(file[i].id, "difficulty level", "difficultylevel cannot be blank.");
            if (file[i].skill == "")
                add_issue(file[i].id, "skill", "skill cannot be blank.");
            if (file[i].level == "")
                add_issue(file[i].id, "level", "level cannot be blank.");
            if (file[i].questiontype == "")
                add_issue(file[i].id, "question type", "questiontype cannot be blank.");
            if (file[i].questionfunction == "")
                add_issue(file[i].id, "question function", "questionfunction cannot be blank.");
        }
    }
    // Mark any invalid inputs with the "invalid" class.
    for (var i = 0; i < validity.issues.length; i++) {
        var issue = validity.issues[i];
        var idTags = document.querySelectorAll(".uuid");
        var location;
        for (var j = 0; j < idTags.length; j++) {
            if (idTags[j].dataset.uuid == issue.location) {
                location = idTags[j];
            }
        }
        location = location.closest('.row').querySelector('[data-label="' + issue.field + '"]');
        location.classList.add('invalid');
    }
    // If there are issues, set "valid" to false.
    if (validity.issues.length > 0) {
        validity.valid = false;
    }*/
    return validity;
}

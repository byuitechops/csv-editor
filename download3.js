function downloadit() {
    var valid = validate();

//    console.log(file);
    /* ADD THE CUSTOM CSS LINKS THAT TINYMCE DOESN'T LIKE TO PASSAGETEXT*/
    var link_tag_string = '';
    if(window.location.href.indexOf("EC3") >= 0){
            link_tag_string="<link href='https://byuitechops.github.io/ec3-quiz-design/icons.css' rel='stylesheet'type='text/css'><link href='https://byuitechops.github.io/ec3-quiz-design/new_style.css' rel='stylesheet'type='text/css'><link href='https://byuitechops.github.io/ec3-quiz-design/components/all.css' rel='stylesheet'type='text/css'><link href='https://fonts.googleapis.com/css?family=Open+Sans:400,300,300italic,400italic,600,600italic,700,700italic,800,800italic'rel='stylesheet' type='text/css'><link rel='stylesheet' href='./jquery.fancybox.css?v=2.1.5' type='text/css' media='screen'>";
    }
    file.forEach(function(item){
        item.passagetext = link_tag_string + item.passagetext;
    })

    // Used to specify which specific columns to export in which order
    // previously used Object.keys(getBlank()) to get ALL columns from
    // getblank, but these are hardcoded for a temporary solution
    var cols_to_export = ["id","skill","level","topic","difficulty level","function","passage text","passage core vocabulary used","passage text type","passage audio file name",
"passage image name","question name","question function","question cando","question text","question level feedback","question type","question audio file name","question image name",
"question rubric","answertext1","answer 1 feedback","answer 1 audio file name","answer 1 image name","answertext2","answer 2 feedback","answer 2 audio file name","answer 2 image name","answertext3",
"answer 3 feedback","answer 3 audio file name","answer 3 image name","answertext4","answer 4 feedback","answer 4 audio file name","answer 4 image name","answertext5","answer 5 feedback","answer 5 audio file name",
"answer 5 image name","answertext6","answer 6 feedback","answer 6 audio file name","answer 6 image name"];
    // filter out the rows that you have deleted.
    if (valid.valid && saves != 0) {
        file = file.filter(function (row) {
            return typeof row.toDelete === 'undefined';
        });
        console.log(file);
        /*ADD THE COLUMNS!*/

        var exported = d3.csvFormat(file, cols_to_export);
        download(exported, file_name, "text/plain");
    } else if (saves === 0) {
        if (confirm("Warning: No changes have been saved. Prese \"OK\" to ignore and download anyway.")) {
            file = file.filter(function (row) {
                return typeof row.toDelete === 'undefined';
            });
            console.log(file);
            var exported = d3.csvFormat(file,cols_to_export);
            download(exported, file_name, "text/plain");
        }
    } else {
        console.log(valid.issues);
        if (confirm("Warning: Issues have been found. Prese \"OK\" to ignore and download anyway.")) {
            file = file.filter(function (row) {
                return typeof row.toDelete === 'undefined';
            });
            console.log(file);
            var exported = d3.csvFormat(file, cols_to_export);
            download(exported, file_name, "text/plain");
        }
    }
}

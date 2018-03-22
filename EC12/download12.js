function downloadit() {
    var valid = validate();
    // filter out the rows that you have deleted.
    if (valid.valid && saves != 0) {
        file = file.filter(function (row) {
            return typeof row.toDelete === 'undefined';
        });
        console.log(file);
        /*ADD THE COLUMNS!*/
        var exported = d3.csvFormat(file, Object.keys(getBlank()));
        download(exported, file_name, "text/plain");
    }
    else if (saves === 0){
        if (confirm("Warning: No changes have been saved. Prese \"OK\" to ignore and download anyway.")) {
            file = file.filter(function (row) {
                return typeof row.toDelete === 'undefined';
            });
            console.log(file);
            var exported = d3.csvFormat(file, Object.keys(getBlank()));
            download(exported, file_name, "text/plain");
        }
    }
    else {
        console.log(valid.issues);
        if (confirm("Warning: Issues have been found. Prese \"OK\" to ignore and download anyway.")) {
            file = file.filter(function (row) {
                return typeof row.toDelete === 'undefined';
            });
            console.log(file);
            var exported = d3.csvFormat(file, Object.keys(getBlank()));
            download(exported, file_name, "text/plain");
        }
    }
}

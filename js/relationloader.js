function RegisterRelations(rJson)
{
    try {
    let NewRelation = JSON.parse(rJson);
    } catch (err) {
        alert("The json wasn't valid");
        return;
    }
}

let dropArea = document.getElementById("dropArea");

;['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    dropArea.addEventListener(eventName, preventDefaults, false)
    document.body.addEventListener(eventName, preventDefaults, false)
})

;['dragenter', 'dragover'].forEach(eventName => {
    dropArea.addEventListener(eventName, hightlight, false);
})

;['dragleave, drop'].forEach(eventName => {
    dropArea.addEventListener(eventName, unhighlight, false);
})

function hightlight() {
    dropArea.style.opacity = 1;
}

function unhighlight() {
    dropArea.style.opacity = 0;
}

document.addEventListener('keydown', function(e) {
    if (e.code === "F2") {
        if (dropArea.style.display === "none") {
            dropArea.style.display = "block";
        } else {
            dropArea.style.display = "none";
        }
    }
}, false);

dropArea.addEventListener('drop', function (e)
{
    console.log('Dropped into');
    e.preventDefault();

    console.log('Start processing file');
    var dt = e.dataTransfer;
    var files = dt.files;

    HandleFiles(files);
    dropArea.style.opacity = 0;

}, false);

function preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
}

function HandleFiles(files) {
    files = [...files]
    files.forEach(ReadJson)

}

function ReadJson(file) {
    let reader = new FileReader();
    reader.readAsText(file);
    reader.onloadend = function() {
        console.log(reader.result);
        CreateNodesFromJson(reader.result);
    }
}
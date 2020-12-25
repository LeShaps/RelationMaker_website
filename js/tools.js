function IsValidJson(json) {
    try {
        JSON.parse(json);
        return true;
    } catch (err) {
        return false;
    }
}

function GetJsonSection(json, path) {
    if (!IsValidJson(json)) {
        return undefined;
    }
    let parsedjson = JSON.parse(json);
    let temporary = parsedjson;

    let pathParts = path.split('/');

    pathParts.forEach(element => {
        temporary = temporary[element];
        if (temporary === undefined) {
            return undefined;
        }
    });

    return temporary;
}
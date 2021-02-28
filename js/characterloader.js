function LoadCharacter(CharacterRaw) {

    let Json = JSON.parse(CharacterRaw);
    let Relations = Json.Relations;

    let CharacName = document.getElementById('MainCharacterName');
    CharacName.value = Json.Name;

    for (let item in Relations) {
        LoadRelationsZone(item, Relations[item]);
    }
}

function LoadRelationsZone(ZoneName, ZoneInfos) {
    let RelationZone = CreateRelationZone(ZoneName, false);

    let Color = RelationZone.getElementsByClassName('ColorPickBase')[0];
    let HighColor = RelationZone.getElementsByClassName('ColorPickHigh')[0];

    Color.value = ZoneInfos.Color;
    HighColor.value = ZoneInfos.HighColor;

    let CharUL = RelationZone.getElementsByClassName('Charlist')[0];
    
    let Zone  = LoadCharacterList(ZoneInfos.Peoples, CharUL);

    RelZone.insertAdjacentElement('afterend', RelationZone);
}

function LoadCharacterList(Characters, CharacterList) {

    for (let item in Characters) {
        AddCharacterToUL(CharacterList, Characters[item]);
    }

    return CharacterList;
}

function OnInputChange(e) {
    if (e === undefined) return;

    var file = e.target.files[0];

    //Setting up reader
    var reader = new FileReader();
    reader.readAsText(file);
    
    reader.onloadend = readerEvent => {
        var content = readerEvent.target.result;
        LoadCharacter(content);
    }
}
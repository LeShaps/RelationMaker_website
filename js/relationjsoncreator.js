var RelZone = document.getElementById('relation-nametype');
var RelTypeName = document.getElementById('RelationNameZone');
var JsonToMake = {};

function AddRelation() {
    if (RelationExist(RelTypeName.value) || IsEmptyOrUndefined(RelTypeName.value)) {
        return;
    }

    let Relation = CreateRelationZone(RelTypeName.value);

    RelZone.insertAdjacentElement('afterend', Relation);
}

function CreateRelationZone(ZoneName, BaseCharacter = true) {
    let charlist = CreateCharacterUL(BaseCharacter);
    let NewRelationZone = CreateElem('Relation-zone', 'div', 'Relation');

    let Title = CreateElem(ZoneName, 'h3', 'RelationName', {innerHTML: ZoneName});

    let ColorPickBase = CreateElem('ColorSelect', 'input', 'ColorPickBase', {type: "color"});
    let ColorPickHighlight = CreateElem('ColorSelect', 'input', 'ColorPickHigh', {type: "color"});

    let CharacName = CreateElem('Charac', 'input', 'CharacName', {placeholder: "Character name"});
    let Button = CreateElem('character-add', 'button', 'CharacterAdd', {innerHTML: "Add Character"});
    Button.addEventListener('click', AddCharacterToList);

    let DelButtn = CreateElem('section-delete', 'button', 'SectionDelete', {innerHTML: "Delete relation type"});
    DelButtn.addEventListener('click', DeleteSection);

    CreateZone(NewRelationZone,
        [Title, ColorPickBase, ColorPickHighlight, charlist, Button, DelButtn]);

    return NewRelationZone;
}

function AddCharacterToList() {
    let RelationPut = this.parentNode;
    let CharacterRelationList = RelationPut.getElementsByClassName('Charlist')[0];
    
    AddCharacterToUL(CharacterRelationList);
}

function CreateCharacterUL(AddBaseCharac) {
    let CharacterList = CreateElem('character-list', 'ul', 'Charlist', {style: "list-style-type: none", innerText: "Peoples"});

    let ListPart = document.createElement('li');
    if (AddBaseCharac) {
        let CharacterInput = CreateElem('charac-input', 'input', 'CharacName', {placeholder: "Character's name"});

        ListPart.appendChild(CharacterInput);
    }
    CharacterList.appendChild(ListPart);

    return CharacterList;
}

function AddCharacterToUL(CharList, CharacterName = undefined) {
    let ListPart = document.createElement('li');
    let CharacterInput = CreateElem('charac-input', 'input', 'CharacName', {placeholder: "Character's name"});

    if (CharacterName !== undefined) {
        CharacterInput.value = CharacterName;
    }

    ListPart.appendChild(CharacterInput);
    CharList.appendChild(ListPart);
}

/* Utilities */
function CreateRelationObject(Tab) {
    let NewRelation = {};

    let Characters = Tab.getElementsByClassName('CharacName');
    let ColorBase = Tab.getElementsByClassName('ColorPickBase');
    let ColorHigh = Tab.getElementsByClassName('ColorPickHigh');

    NewRelation.Color = ColorBase[0].value;
    NewRelation.HighlightColor = ColorHigh[0].value;
    NewRelation.Peoples = [];

    for (let i = 0; i < Characters.length; i++) {

        if (IsEmptyOrUndefined(Characters.item(i).value)) {
            continue;
        }
        NewRelation.Peoples.push(Characters.item(i).value);
    }
    
    return NewRelation;
}

function CreateJsonFromInfos() {
    JsonToMake = {};

    let AllZones = document.getElementsByClassName('Relation');
    JsonToMake.Name = document.getElementById('MainCharacterName').value;

    if (IsEmptyOrUndefined(JsonToMake.Name)) {
        console.error("Can't create a json without name");
        return;
    }

    JsonToMake.Relations = {};

    for (let i = 0; i < AllZones.length; i++) {
        JsonToMake.Relations[GetZoneName(AllZones.item(i))] = CreateRelationObject(AllZones.item(i))
    }

    DonwloadFile(JsonToMake.Name + ".json", 'application/json;charset=utf-8', JsonToMake);
}

function GetZoneName(Tab) {
    return Tab.getElementsByClassName('RelationName')[0].innerText;
}

function RelationExist(RelationName) {
    let AllZones = document.getElementsByClassName('Relation');

    for (let i = 0; i < AllZones.length; i++) {
        if (AllZones.item(i).getElementsByClassName('RelationName')[0].innerHTML === RelationName) {
            return true;
        }
    }

    return false;
}

function DonwloadFile(Filename, type, FileData) {
    
    let blob1 = new Blob([JSON.stringify(FileData, null, 2)], {type: type});
    console.log(blob1);

    let url = window.URL || window.webkitURL;
    link = url.createObjectURL(blob1);
    let a = document.createElement('a');
    a.download = Filename;
    a.href = link;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

function DeleteSection() {
    this.parentNode.remove();
}
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

function CreateRelationZone(ZoneName) {
    let NewRelationZone = CreateElem('Relation-zone', 'div', 'Relation');

    let Title = CreateElem(ZoneName, 'h3', 'RelationName', {innerHTML: ZoneName});

    let ColorPickBase = CreateElem('ColorSelect', 'input', 'ColorPickBase', {type: "color"});
    let ColorPickHighlight = CreateElem('ColorSelect', 'input', 'ColorPickHigh', {type: "color"});

    let CharacName = CreateElem('Charac', 'input', 'CharacName', {placeholder: "Character name"});
    let Button = CreateElem('character-add', 'button', 'CharacterAdd', {innerHTML: "Add Character"});
    Button.addEventListener('click', AddCharacterToList);

    CreateZone(NewRelationZone,
        [Title, ColorPickBase, ColorPickHighlight, CharacName, Button]);

    return NewRelationZone;
}

function AddCharacterToList() {
    let NInput = CreateElem('Charac', 'input', 'CharacName', {placeholder: "Character name"});
    let RelationPut = this.parentNode;

    let Button = CreateElem('character-add', 'button', 'CharacterAdd', {innerHTML: 'Add Character'});
    Button.addEventListener('click', AddCharacterToList);

    this.remove();

    RelationPut.insertAdjacentElement('beforeend', NInput);
    RelationPut.insertAdjacentElement('beforeend', document.createElement('br'));
    RelationPut.insertAdjacentElement('beforeend', Button);
}

/* Utilities */
function CreateElem(Name, Elem, Class, ParamList = {}) {
    let NewElem = document.createElement(Elem);
    NewElem.id = Name;
    NewElem.className = Class;

    for (let param in ParamList) {
        NewElem[param] = ParamList[param];
    }

    return NewElem;
}

function CreateZone(zone, elemlist) {
    let LastBr;

    elemlist.forEach(element => {
        zone.insertAdjacentElement('beforeend', element);
        LastBr = zone.insertAdjacentElement('beforeend', document.createElement('br'));
    });

    LastBr.remove();
}

function CreateRelationObject(Tab) {
    let NewRelation = {};

    let Characters = Tab.getElementsByClassName('CharacName');
    let ColorBase = Tab.getElementsByClassName('ColorPickBase');
    let ColorHigh = Tab.getElementsByClassName('ColorPickHigh');

    NewRelation.Color = ColorBase[0].value;
    NewRelation.HighlightColor = ColorHigh[0].value;
    NewRelation.Peoples = [];

    for (let i = 0; i < Characters.length; i++) {

        if (IsEmptyOrUndefined(Characters.item(i))) {
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
    return Tab.getElementsByClassName('RelationName').innerText;
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
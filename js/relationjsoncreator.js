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
    let RelationName = Tab.getElementsByClassName('RelationName');

    NewRelation.Name = RelationName[0].innerText;
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

    JsonToMake.Relations = [];

    for (let i = 0; i < AllZones.length; i++) {
        JsonToMake.Relations.push(
            CreateRelationObject(AllZones.item(i))
        );
    }

    console.log(JsonToMake);
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
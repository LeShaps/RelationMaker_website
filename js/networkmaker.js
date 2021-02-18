var nodes = new vis.DataSet([]);
var edgets = new vis.DataSet([]);
var RegisteredRelations = {};

var RegisteredNodes = {};
var DefaultImage = "https://none.com/vincent.png";

function CreateNodesFromJson(json)
{
    let rJson = JSON.parse(json);
    let Relations = rJson.Relations;
    var options = {};

    let MotherNode = CreateMotherNode(rJson);
    console.log(MotherNode);

    for (var part in Relations) {
        AddCharacterNode(Relations[part]["Peoples"]);
    }

    for (var part in Relations) {
        CreateRelationlinkFromNode(Relations[part], MotherNode);
    }

    var container = document.getElementById('relation-network');

    console.log(nodes.getIds());
    var data = {
        nodes: nodes,
        edges: edgets
    }
    var network = new vis.Network(container, data, options);
}

function AddCharacterNode(RelationArray) {
    for (var Character in RelationArray) {
        if (RegisteredNodes[RelationArray[Character]] !== undefined) {
            return;
        }
        nodes.add([
            {id: nodes.length + 1, text: RelationArray[Character], label: RelationArray[Character], shape: "circularImage", image: DefaultImage}
        ]);
        RegisteredNodes[RelationArray[Character]] = nodes.length;
    }
}

function CreateMotherNode(rJson) {
    if (RegisteredNodes[rJson.Name] !== undefined) {
        return RegisteredNodes[rJson.Name];
    }

    nodes.add([
        {id: nodes.length + 1, text: rJson.Name, label: rJson.Name, shape: "circularImage", image: DefaultImage}
    ]);
    RegisteredNodes[rJson.Name] = nodes.length;

    return RegisteredNodes[rJson.Name];
}

function CreateRelationlinkFromNode(RelationObject, Mothernode) {
    for (var Character in RelationObject["Peoples"]) {
        edgets.add([
            {from: RegisteredNodes[RelationObject["Peoples"][Character]], to: Mothernode,
            color: {color: RelationObject.Color, highlight: RelationObject.HighlightColor}}
        ]);
    }
}
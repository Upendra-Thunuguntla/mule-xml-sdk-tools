var xmlSer = new XMLSerializer();
var root = document.implementation.createDocument("", "", null);


class Field{
    constructor(field, name, isRequired){
        this.field = field;
        this.name = name;
        this.isRequired = isRequired;
    }
    getFieldName(){ return this.field; }
    getName(){ return this.name; }
    getIsRequired(){ return this.isRequired; }
    getField(){ return document.getElementById(this.field); }
}


//Operation and Parameter Tags for Mule XML SDK
var param_field_arr = [
    new Field('param_order', 'order', false),
    new Field('param_tab', 'tab', false),
    new Field('param_use', 'use', true),
    new Field('param_name', 'name', true),
    new Field('param_displayName', 'displayName', true),
    new Field('param_defaultValue', 'defaultValue', false),
    new Field('param_summary', 'summary', false),
    new Field('param_example', 'example', false),
    new Field('param_description', 'doc:description', false),
    new Field('param_role', 'role', true),
    new Field('param_type', 'type', true),
    new Field('param_type_text', 'type', true),
    new Field('param_password', 'password', false)
];


var operation = root.createElement("operation");
var params = root.createElement("parameters");
operation.appendChild(params);

function loadPage(){
    console.log('loadPage()');
    param_show_optionals(true);
}

// Parameter related functions
function param_CheckType(val) {
    var text_element = document.getElementById('param_type_text');
    var text_element_close = document.getElementById('param_type_text_close');
    var dd_element = document.getElementById('param_type');
    if (val == 'other') {
        text_element_close.style.display = 'block';
        text_element.style.display = 'block';
        dd_element.style.display = "none";
    } else {
        text_element.style.display = 'none';
        text_element_close.style.display = 'none';
        dd_element.style.display = "block";
    }
}

function param_convert(){
    console.log('convert()');
    param_validateInputs();
    if (error.hidden) {
        var param = root.createElement("parameter");
        for (var f of param_field_arr){
            val = f.getField().value;
            if (val != '') {
                param.setAttribute(f.getName(),val);
            }
        }
        params.appendChild(param);
        displayOutput();
        param_clearContents();
    }
}

function param_validateInputs(){
    if (param_name.value == '') {
        param_name.focus();
        error.hidden = false;
        error.innerHTML = 'Name is not specified';
    }else if (param_displayName.value == '') {
        param_displayName.focus();
        error.hidden = false;
        error.innerHTML = 'DisplayName is not specified';
    }else if (param_role.value == '') {
        param_role.focus();
        error.hidden = false;
        error.innerHTML = 'Role is not specified';
    }else{
        error.hidden = true;
    }
}

function param_show_optional(){
    var bool = ! (document.getElementById('btn_optional').innerHTML == "Show Optional");
    console.log(bool);
    param_show_optionals(bool);
}

function param_show_optionals(bool){
    for (var f of param_field_arr){
        if (!f.getIsRequired()){
            f.getField().hidden = bool;
        }
    }
    document.getElementById('btn_optional').innerHTML = bool? "Show Optional" : "Hide Optional";
}

function param_clearContents(){
    for (var f of param_field_arr){
        f.getField().value = '';
    }
    error.hidden =true;
    param_show_optionals(true);
}

function param_disable_default(data){
    document.getElementById('param_defaultValue').disabled = (data == 'REQUIRED');
}

//Property related functions

/*
Below Functions are related to Creating 
Property Tags for Connector in Mule XML SDK 
*/

var prop_field_arr = [
    new Field('prop_order', 'order', false),
    new Field('prop_tab', 'tab', false),
    new Field('prop_use', 'use', true),
    new Field('prop_name', 'name', true),
    new Field('prop_displayName', 'displayName', true),
    new Field('prop_defaultValue', 'defaultValue', false),
    new Field('prop_summary', 'summary', false),
    new Field('prop_example', 'example', false),
    new Field('prop_description', 'doc:description', false),
    new Field('prop_type', 'type', true),
    new Field('prop_type_text', 'type', true),
    new Field('prop_password', 'password', false)
];

var prop_dummy = root.createElement("dummy");

function loadPropPage(){
    console.log('loadPage()');
    prop_show_optionals(true);
}

function prop_CheckType(val) {
    var text_element = document.getElementById('prop_type_text');
    var text_element_close = document.getElementById('prop_type_text_close');
    var dd_element = document.getElementById('prop_type');
    if (val == 'other') {
        text_element_close.style.display = 'block';
        text_element.style.display = 'block';
        dd_element.style.display = "none";
    } else {
        text_element.style.display = 'none';
        text_element_close.style.display = 'none';
        dd_element.style.display = "block";
    }
}

function prop_convert(){
    console.log('convert()');
    prop_validateInputs();
    if (error.hidden) {
        var prop = root.createElement("property");
        for (var f of prop_field_arr){
            val = f.getField().value;
            if (val != '') {
                prop.setAttribute(f.getName(),val);
            }
        }
        prop_dummy.appendChild(prop);
        prop_displayOutput(prop_dummy);
        prop_clearContents();
    }
}



function prop_validateInputs(){
    if (prop_name.value == '') {
        prop_name.focus();
        error.hidden = false;
        error.innerHTML = 'Name is not specified';
    }else if (prop_displayName.value == '') {
        prop_displayName.focus();
        error.hidden = false;
        error.innerHTML = 'DisplayName is not specified';
    }else{
        error.hidden = true;
    }
}

function prop_show_optional(){
    var bool = ! (document.getElementById('btn_optional').innerHTML == "Show Optional");
    console.log(bool);
    prop_show_optionals(bool);
}

function prop_show_optionals(bool){
    for (var f of prop_field_arr){
        // console.log(f);
        if (!f.getIsRequired()){
            console.log(f);
            f.getField().hidden = bool;
        }
    }
    document.getElementById('btn_optional').innerHTML = bool? "Show Optional" : "Hide Optional";
}

function prop_clearContents(){
    for (var f of prop_field_arr){
        f.getField().value = '';
    }
    error.hidden =true;
    prop_show_optionals(true);
}


function prop_disable_default(data){
    document.getElementById('prop_defaultValue').disabled = (data == 'REQUIRED');
}

function prop_displayOutput(output){
    op = xmlSer.serializeToString(output);
    console.log(op);
    editor.setCode(vkbeautify.xml(op.replace("<dummy>","").replace("</dummy>",""))); 
}

// function prop_clearContents(){
//     for (var i = 0; i < prop_fields.length; i++) {
//         document.getElementById(prop_fields[i]).value = '';
//         console.log("cleared " + prop_fields[i]);
//     }
// }

//operation methods
function op_name_change(data){
    op_name.value = v.kebabCase(data);
    operation.setAttribute('name', v.kebabCase(data));
    displayOutput();
}

function op_desc_change(data){
    operation.setAttribute('doc:description', data);
    displayOutput();
}

function displayOutput(){
    op = xmlSer.serializeToString(operation);
    console.log(op);
    editor.setCode(vkbeautify.xml(op)); 
}

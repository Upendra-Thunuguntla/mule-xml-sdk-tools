// <parameter name="string" defaultValue="string" use="REQUIRED" type="string" password="true" role="PRIMARY" summary="string" example="string" displayName="string" order="-2055" tab="string"/>

var xmlSer = new XMLSerializer();

// fields for reset operation
var param_fields = ['param_order', 'param_tab', 'param_use', 'param_name', 'param_displayName', 'param_defaultValue', 'param_summary', 'param_example', 'param_description', 'param_role', 'param_type', 'param_type_text', 'param_password'];

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

// var param_field_map = new Map([
//     // ['param_order', 'order'],
//     // ['param_tab', 'tab'],
//     // ['param_use', 'use'],
//     // ['param_name', 'name'],
//     // ['param_displayName', 'displayName'],
//     // ['param_defaultValue', 'defaultValue'],
//     // ['param_summary','summary'],
//     // ['param_example', 'example'],
//     // ['param_description', 'doc:description'],
//     // ['param_role', 'role'],
//     // ['param_type', 'type'],
//     // ['param_type_text', 'type'],
//     // ['param_password', 'password'],
//     ['param_order', new Field('param_order','order',false)],
//     ['param_tab', new Field('param_tab','tab',false)],
//     ['param_use', new Field('param_use','use',true)],
//     ['param_name', new Field('param_name','name',true)],
//     ['param_displayName', new Field('param_displayName','displayName',true)],
//     ['param_defaultValue', new Field('param_defaultValue','defaultValue',false)],
//     ['param_summary',new Field('param_summary','summary',false)],
//     ['param_example', new Field('param_example','example',false)],
//     ['param_description', new Field('param_description','doc:description',false)],
//     ['param_role', new Field('param_role', 'role',true)],
//     ['param_type', new Field('param_type', 'type',true)],
//     ['param_type_text', new Field('param_type_text', 'type',true)],
//     ['param_password', new Field('param_password', 'password',false)],
// ]);

var root = document.implementation.createDocument("", "", null);
var operation = root.createElement("operation");
var params = root.createElement("parameters");
operation.appendChild(params);

function loadPage(){
    console.log('loadPage()');
    param_show_optional(true);
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

function param_show_optional(bool){
    for (var f of param_field_arr){
        if (!f.getIsRequired()){
            f.getField().hidden = bool;
        }
    }
}

function param_clearContents(){
    for (var f of param_field_arr){
        f.getField().value = '';
    }
    error.hidden =true;
    param_show_optional(true);
}


//Property related functions
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
    }else if (prop_role.value == '') {
        prop_role.focus();
        error.hidden = false;
        error.innerHTML = 'Role is not specified';
    }else{
        error.hidden = true;
    }
}

function prop_clearContents(){
    for (var i = 0; i < prop_fields.length; i++) {
        document.getElementById(prop_fields[i]).value = '';
        console.log("cleared " + prop_fields[i]);
    }
}

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

function processRequired(data){
        document.getElementById('param_defaultValue').disabled = (data == 'REQUIRED');
}
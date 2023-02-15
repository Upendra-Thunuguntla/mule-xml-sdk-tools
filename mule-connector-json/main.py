import os, genson,json
from re import sub
import xml.etree.ElementTree as ele


schemaLocation = "./schema/"


root = ele.Element("catalogs")
root.attrib["xmlns"] = ("http://www.mulesoft.org/schema/mule/types")  

def camel(s):
  s = sub(r"(_|-)+", " ", s).title().replace(" ", "")
  return ''.join([s[0].lower(), s[1:]])

def remove(t, *paths):
  for p in paths:
    t = remove1(t, p)
  return t

def remove1(t, path):
  if not path:
    # print(True)
    return t
  elif isinstance(t, list):
    # print(True)
    return list(remove1(e, path) for e in t)
  elif isinstance(t, dict):
    # print(True)
    if len(path) == 1:
      return {k:remove1(v, path) for (k,v) in t.items() if not k == path[0] }
    else:
      return {k:remove1(v, path[1:]) if k == path[0] else remove1(v, path) for (k,v) in t.items()}
  else:
    # print(True)
    return t

def convert_json():
    input_files =  os.listdir("input")
    for file_name in input_files :
        f = open("input/" + file_name, "r")
        w = open("output/schema-" + file_name, "w")
        json_inp = f.read()
        builder = genson.SchemaBuilder()
        builder.add_object(json.loads(json_inp))
        op_schema =  json.loads(builder.to_json(indent=2))
        w.write(json.dumps(remove(op_schema,("required",)),indent=2))
        create_catalog(file_name)
        
    eleTree = ele.ElementTree(root)
    ele.indent(eleTree)
    with open("output/catalog.xml", "wb") as xml:
        eleTree.write(xml,encoding='UTF-8', xml_declaration=True) 




def create_catalog(fileName):
   
    cat = ele.Element("catalog")
    cat.attrib["name"] = camel(fileName.split(".")[0])
    cat.attrib["format"] = "application/json"
    
    schema = ele.Element("schema")
    schema.attrib["format"] = "application/json+schema"
    schema.attrib["location"] = schemaLocation + "schema-" + fileName
    
    cat.append(schema)
    
    root.append(cat)
    print(ele.dump(root) )
    
    
# create_catalog("get-task-response.json")
convert_json()
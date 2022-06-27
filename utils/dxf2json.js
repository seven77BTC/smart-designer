const DxfParser = require("dxf-parser");
const fs = require("fs");
const path = require("path")

// Create a Promise convert dxf file to json file
async function dxfConvertor(dxf_file, json_file){
    var fileStream = fs.createReadStream(dxf_file);
    var parser = new DxfParser();
    const dxf = await parser.parseStream(fileStream);
    fs.writeFileSync(json_file, JSON.stringify(dxf, null, 3));
    console.log("Done writing output to " + json_file);
}

// Load dxf file
const DXF_DIR = "../dxf/";
const JSON_DIR = "../json/";

var readDir = fs.readdirSync(DXF_DIR);
for (dxf_file of readDir) {
    dxf_path = DXF_DIR + dxf_file;
    json_path = JSON_DIR + dxf_file.split(".")[0] + ".json";
    convertor = dxfConvertor(dxf_path, json_path);
    convertor.then();
}
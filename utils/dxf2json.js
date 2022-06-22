const DxfParser = require("dxf-parser");
const fs = require("fs");
const path = require("path")

var DXF_FILE_PATH = "../dxf/0.dxf";
var OUTPUT_FILE_NAME = "out.json";

async function dxfConvertor(){
    var fileStream = fs.createReadStream(DXF_FILE_PATH);
    var parser = new DxfParser();
    const dxf = await parser.parseStream(fileStream);
    fs.writeFileSync(OUTPUT_FILE_NAME, JSON.stringify(dxf, null, 3));
    console.log("Done writing output to " + OUTPUT_FILE_NAME);
}

dxfConvertor()
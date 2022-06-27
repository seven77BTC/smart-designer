const DxfParser = require("dxf-parser");
const fs = require("fs");
const path = require("path")


function layerFilter(json_dir, json_file, layer, txt_dir){
    var drawing_file = json_dir + json_file;
    var write_file = txt_dir + json_file.split(".")[0] + ".txt";
    var drawing = require(drawing_file);
    var writerStream = fs.createWriteStream(write_file);
    console.log("Parsing json " + json_file);

    // xxx.blocks[name].entities[i].vertices [{x:,y:,z:}, {...}]
    for (var name in drawing.blocks){
        entities = drawing.blocks[name].entities;
        for (var i in entities){
            if (entities[i].layer === layer && entities[i].type === "LINE"){
                line = [
                    entities[i].vertices[0].x, 
                    entities[i].vertices[0].y, 
                    entities[i].vertices[1].x, 
                    entities[i].vertices[1].y
                ];
                line = line.join(",") + "\n";
                writerStream.write(line, "UTF-8");
            }
        }
    }

    // xxx.entities[i].vertices
    for (var name in drawing.entities){
        entity = drawing.entities[name];
        if (entity.layer === layer && entity.type === "LINE"){
            line = [
                entity.vertices[0].x, 
                entity.vertices[0].y, 
                entity.vertices[1].x, 
                entity.vertices[1].y
            ];
            line = line.join(",") + "\n";
            writerStream.write(line, "UTF-8");
        }
    }

    // End of writer stream
    writerStream.end();
    writerStream.on('finish', function() {
        console.log("Write done.");
    });
    writerStream.on('error', function(err){
    console.log(err.stack);
    });
}

// Load dxf file
const JSON_DIR = "../json/";
const TXT_DIR = "../txt/";
var readDir = fs.readdirSync(JSON_DIR);

for (json_file of readDir) {
    layerFilter(JSON_DIR, json_file, "WALL", TXT_DIR);
}
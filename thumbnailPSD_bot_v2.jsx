#include json2.js


// Get texts group
var doc = app.activeDocument;
var mainTexts = doc.layerSets.getByName('Texts');
var text1, text2, text3, text4;
var jsonData = readJSON('data.json');

// var k = 'text';
// for(i = 1; i <= mainTexts.layers.length; i++) { 
//     eval('var ' + k + i + '= ' + 'mainTexts.layers[' + (i-1) + '];'); 
// } 

text1 = mainTexts.layers[0];
text2 = mainTexts.layers[1];
text3 = mainTexts.layers[2];
text4 = mainTexts.layers[3];
text5 = mainTexts.layers[4];


for (var i = 0; i < jsonData.length; i++){
	var productID = jsonData[i].prodcutID;
	updateTexts(jsonData[i].texts);
	placeImage(productID);
	savePSD(productID);
	hideTexts();
}

function hideTexts(){
	text1.visible = false;
	text2.visible = false;
	text3.visible = false;
	text4.visible = false;
	text5.visible = false;
}


function readJSON(relativePath){
	var script = new File($.fileName);
	var jsonFile = new File(script.path + '/' + relativePath);

	jsonFile.open('r');
	var str = jsonFile.read();
	jsonFile.close();

	return JSON.parse(str);
}

// text1.visible = true;
// text1.textItem.contents = texts[0];
// text1.textItem.size = new UnitValue(45.04,  "pt");
function updateTexts(texts){
	var k = '.textItem.contents = texts[';
	var l = '.textItem.size = new UnitValue(45.04,  "pt");';
	for(j = 1; j <= texts.length; j++) { 
	    eval('text' + j + '.visible = true;'); 
	    eval('text' + j + k + (j-1) + '];'); 
	    eval('text' + j + l); 
	}
}

function savePSD(productID){
	var file = new File(doc.path + '/' + productID + '/' + 'thumbnail.psd');
	var options = new PhotoshopSaveOptions();
	options.layers = true;

	doc.saveAs(file, options, true);
}

function placeImage(productID){
	var newImage = doc.artLayers.getByName('Background');

	newImage.remove();
	pTargetDocument = app.activeDocument;
	var file = new File(doc.path + '/' + productID + '/' + 'imagex.jpg');
	app.open(file);
	pSourceDocument = app.activeDocument;
	pSourceDocument.artLayers[0].duplicate(pTargetDocument);
	pSourceDocument.close();

	var newImage = doc.artLayers.getByName('Background');
	var originalImage = doc.artLayers.getByName('image0');
	
	newImage.move(originalImage, ElementPlacement.PLACEBEFORE);
}
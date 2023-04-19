#include json2.js


// Get texts group
var script = new File($.fileName);
var jsonData = readJSON('data.json');

for (var i = 0; i < jsonData.length; i++){
	var productID = jsonData[i].prodcutID;
	openPSD(productID);
	saveJPG(productID);
}



function readJSON(relativePath){
	var jsonFile = new File(script.path + '/' + relativePath);

	jsonFile.open('r');
	var str = jsonFile.read();
	jsonFile.close();

	return JSON.parse(str);
}

function saveJPG(productID){
	var doc = app.activeDocument;
	var file = new File(doc.path + '/' + 'thumbnail.jpg');
	var options = new JPEGSaveOptions();
	options.quality = 10;
	doc.saveAs(file, options, true);
	doc.close();
}

function openPSD(prodcutID){
	var file = new File(script.path + '/' + productID + '/' + 'thumbnail.psd');
	open(file);
}
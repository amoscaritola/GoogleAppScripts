/*
*   dataValidation.js
*   Allows you to programmatically add data validation to a google sheet by setting the value source
*	and destination
*   https://github.com/amoscaritola
*   2018
*/

// Create function with data validation rules
function dataVal(destSheetName, destSheetRange, sourceSheetName, sourceSheetRange) {
	var destinationRange = SpreadsheetApp.getActive().getSheetByName(destSheetName).getRange(destSheetRange);
	var sourceRange = SpreadsheetApp.getActive().getSheetByName(sourceSheetName).getRange(sourceSheetRange);
	var rule = SpreadsheetApp.newDataValidation().requireValueInRange(sourceRange).setAllowInvalid(false).build();
	var rules = destinationRange.getDataValidations();
	for (var i = 0; i < rules.length; i++) {
		for (var j = 0; j < rules[i].length; j++) {
			rules[i][j] = rule;
		}
	}
	destinationRange.setDataValidations(rules);
}

//Run the function when the sheet it opened
function onOpen() {
	var sourceSheet = "Enums" //Enter name of sheet that has the criteria for data validation
	var destinationSheet1 = "My Worksheet" // Enter the name of the sheet to apply the data validation
	var sourceData1 = "B2:B6" // Enter the range of the criteria data that is on the source sheet
	var targetData1 = "P2:Q" // Enter the range to apply data validation rules

	var destinationSheet2 = "My other Worksheet" // Enter the name of the sheet to apply the data validation
	var sourceData2 = "C2:C10" // Enter the range of the criteria data that is on the source sheet
	var targetData2 = "A2:A" // Enter the range to apply data validation rules

	dataVal(destinationSheet1, targetData1, sourceSheet, sourceData1);
	dataVal(destinationSheet2, targetData2, sourceSheet, sourceData2);

}

function moveRowsButton() {
	var ss = SpreadsheetApp.getActiveSpreadsheet();
	var currentSheet = SpreadsheetApp.getActiveSheet();
	var currentSheetName = currentSheet.getName();
	
//Get the sheets by name and set to variables
	var subSheet = ss.getSheetByName("Submitted");
	var inProgressSheet = ss.getSheetByName("Repair In Progress");
	var completedSheet = ss.getSheetByName("Repair Complete");
	var closedSheet = ss.getSheetByName("Repair Closed");
	var holdSheet = ss.getSheetByName("Hold");
	var claimSubmittedSheet = ss.getSheetByName("Claim Submitted");
	
//This should be the column that has the status of the repair
	var columnToCheck = "K";
	
	var rowsToCheck = currentSheet.getLastRow();
	var destSheet;
	var destSheetName;

// Loop through rows that contain data
	for(var i=1;i<=rowsToCheck;i++){
	var currentRange = currentSheet.getRange(columnToCheck+i);
	var currentRow = currentRange.getRow();
	var repairStatusValue = currentRange.getValue();
	
// Use repair status value of cell to determine destination sheet
		switch(repairStatusValue){
			case "Picked Up":
			case "Repair In Progress":
				destSheet = inProgressSheet;
				destSheetName = "Repair In Progress";
				break;
			case "Claim Submitted":
				destSheet = claimSubmittedSheet;
				destSheetName = "Claim Submitted";
				break;
			case "Hold":
				destSheet = holdSheet;
				destSheetName = "Hold";
				break;
			case "Repair Closed":
				destSheet = closedSheet;
				destSheetName = "Repair Closed";
				break;
			case "Repair Complete":
				destSheet = completedSheet;
				destSheetName = "Repair Complete";
				break;
			default:
				destSheetName = "none";
		}
// Copy the row if the destination sheet does not equal the current sheet or an invalid sheet.
// Remove the row from source sheet after copied
		if (destSheetName != currentSheetName && destSheetName != "none") {
			var destinationSheetLastRow = destSheet.getLastRow();
			var targetRange = destSheet.getRange(destSheet.getLastRow() + 1, 1);
			
		if (destinationSheetLastRow) destSheet.insertRowAfter(destinationSheetLastRow);
			currentSheet.getRange(currentRow, 1, 1, currentSheet.getLastColumn()).copyTo(targetRange);
			currentSheet.deleteRow(currentRow);
			i--;
		}
	}
}
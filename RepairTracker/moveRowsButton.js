function moveRowsButton() {
	var ss = SpreadsheetApp.getActiveSpreadsheet();
	var currentSheet = SpreadsheetApp.getActiveSheet();
	var currentSheetName = currentSheet.getName();
	var subSheet = ss.getSheetByName("Submitted");
	var ripSheet = ss.getSheetByName("Repair In Progress");
	var completedSheet = ss.getSheetByName("Repair Complete");
	var closedSheet = ss.getSheetByName("Repair Closed");
	var holdSheet = ss.getSheetByName("Hold");
	var claimSubmittedSheet = ss.getSheetByName("Claim Submitted");
	var status_column = "K";
	var rowsToCheck = currentSheet.getLastRow();
	var destSheet;
	var destSheetName;

	for(var i=1;i<=rowsToCheck;i++){
	var currentRange = currentSheet.getRange(status_column+i);
	var currentRow = currentRange.getRow();
	var currentValue = currentRange.getValue();
	
		switch(currentValue){
			case "Picked Up":
			case "Repair In Progress":
				destSheet = ripSheet;
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
	
		if (destSheetName != currentSheetName && destSheetName != "none") {
			var lastRow = destSheet.getLastRow();
			var targetRange = destSheet.getRange(destSheet.getLastRow() + 1, 1);
			
		if (lastRow) destSheet.insertRowAfter(lastRow);
			currentSheet.getRange(currentRow, 1, 1, currentSheet.getLastColumn()).copyTo(targetRange);
			currentSheet.deleteRow(currentRow);
			i--;
		}
	}
}
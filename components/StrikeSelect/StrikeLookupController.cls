public with sharing class StrikeLookupController {
	
	@AuraEnabled
	public static String getRecords(String searchTerm, String sObjectToSearch, String searchField, String whereClause, String returnedRecordLimit, String orderBy, Boolean recentEnabled) {
		
		String query = 'SELECT Id,' + String.escapeSingleQuotes(searchField) + ' FROM ' + String.escapeSingleQuotes(sObjectToSearch) + ' WHERE ';
		System.debug(query);

		if(recentEnabled == true && (searchTerm == null || searchTerm == '')) {
			query = query + 'LastViewedDate != NULL ORDER BY LastViewedDate DESC LIMIT 5';
		} else if (searchTerm != null || searchTerm != '') {
			
			query = query + String.escapeSingleQuotes(searchField) + ' LIKE \'%' + String.escapeSingleQuotes(searchTerm) + '%\'';
			
			if(whereClause != null){
				query = query + ' AND ' + String.escapeSingleQuotes(whereClause); 
			}
		 
			if(orderBy != null){
				query = query + 'ORDER BY ' + String.escapeSingleQuotes(orderBy);

			}

			if (returnedRecordLimit != null){
				query = query + ' LIMIT ' + String.escapeSingleQuotes(returnedRecordLimit);
			}
		} 
		List<sObject> records = Database.query(query);
		
		System.debug(records);
		return JSON.serialize(records);
	}
}
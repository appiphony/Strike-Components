({
	formatData : function(component, event, helper) {
		var data = component.get("v.data");
		if(data){
			var formattedData = {};
			var columns = data.columns;
			var dataTypeByName = {};
			columns.forEach(function(column){
				dataTypeByName[column.name] = column.dataType
			});
			var rows = data.rows;
			var formattedRows = [];
			rows.forEach(function(row){
				var formattedRow = {};
				var fields = [];
				var type = '';
				for(var key in row){
					if(dataTypeByName[key]){
						var value = '';
						if(dataTypeByName[key] != 'BOOLEAN' &&
							dataTypeByName[key] != 'CURRENCY' &&
							dataTypeByName[key] != 'DATE' &&
							dataTypeByName[key] != 'DATETIME' &&
							dataTypeByName[key] != 'EMAIL' &&
							dataTypeByName[key] != 'NUMBER' &&
							dataTypeByName[key] != 'PERCENT' &&
							dataTypeByName[key] != 'PHONE' &&
							dataTypeByName[key] != 'URL' &&
							dataTypeByName[key] != 'COMPONENT'){
						   	if(dataTypeByName[key] == 'ADDRESS'){
						   		if(row[key].street){
						   			value += row[key].street + ' ';
						   		}
						   		if(row[key].city){
						   			value += row[key].city + ' ';
						   		}
						   		if(row[key].state){
						   			value += row[key].state + ' ';
						   		}
						   		if(row[key].postalCode){
						   			value += row[key].postalCode + ' ';
						   		}
						   		if(row[key].country){
						   			value += row[key].country;
						   		}
						   	}
							type = 'STRING';
						} else {
							type = dataTypeByName[key]
						}
						if(!value){
							value = row[key];
						}
						if(type == 'URL' && value){
							if(!value.startsWith('http://') && !value.startsWith('https://')){
								value = 'http://' + value;
							}
						}
						var field = {
							"name":key,
							"value":value,
							"dataType":type,
							"label":''
						}
						fields.push(field);
					}
				}
				var sortedFields = [];
				columns.forEach(function(column, i){
					fields.forEach(function(field){
						if(field.name === column.name){
							field.label = column.label;
							sortedFields[i] = field;
						}
					})
				})
				formattedRow.fields = sortedFields;
				formattedRows.push(formattedRow);
			});
			formattedData.rows = formattedRows;
			formattedData.columns = columns;
			component.set('v.formattedData', formattedData);
			helper.createRowComponents(component, event, helper);
		}
	},
	createRowComponents : function(component, event, helper){
		var formattedData = component.get('v.formattedData');
		var body = [];

		var createRowCallback = function(newCmp, status, errorMessage){
			if(status === 'SUCCESS'){
				body.push(newCmp);
				component.set('v.body', body);
				component.set('v.showTable', true);
			}
		}

		formattedData.rows.forEach(function(row){
			$A.createComponent(
				"c:strike_row",
				{
					"fields": row.fields
				},
				createRowCallback
			)
		});

		helper.sortTable(component, null, helper);
	},
	sortTable : function(component, event, helper){
		var selectedColumnName;

		if (event === null) {
			selectedColumnName = component.get('v.currentSortColumn');
		} else {
			selectedColumnName = event.currentTarget.dataset.columnName || component.get('v.currentSortColumn');
		}

		var body = component.get('v.body');

		body.forEach(function(row){
			var fields = row.get('v.fields');

			fields.forEach(function(field){
				if(field.name === selectedColumnName){
					row.set('v.sortFieldValue', field.value);
				}
			});
		});

		var ascending = component.get('v.ascending');

		if(event !== null) {
			if(selectedColumnName != component.get('v.currentSortColumn')){
				component.set('v.ascending', true);
				ascending = true;
			} else {
				ascending = !ascending;
				component.set('v.ascending', ascending);
			}
		}

		body.sort(function(a,b){
			var aValue = typeof(a) === 'string' ? a.get('v.sortFieldValue').toUpperCase() : a.get('v.sortFieldValue');
			var bValue = typeof(b) === 'string' ? b.get('v.sortFieldValue').toUpperCase() : b.get('v.sortFieldValue');

			if(ascending){
				if (aValue < bValue) {
					return -1;
				}
				if (aValue > bValue) {
					return 1;
				}
			} else{
				if (aValue < bValue) {
					return 1;
				}
				if (aValue > bValue) {
					return -1;
				}
			}
		});

		component.set('v.body', body);
		component.set('v.currentSortColumn', selectedColumnName);
	}
})

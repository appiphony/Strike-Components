/*
Strike by Appiphony

Version: 1.0.0
Website: http://www.lightningstrike.io
GitHub: https://github.com/appiphony/Strike-Components
License: BSD 3-Clause License
*/
({
	formatData: function(component, event, helper) {
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

						if(dataTypeByName[key] !== 'BOOLEAN' &&
							dataTypeByName[key] !== 'CURRENCY' &&
							dataTypeByName[key] !== 'DATE' &&
							dataTypeByName[key] !== 'DATETIME' &&
							dataTypeByName[key] !== 'EMAIL' &&
							dataTypeByName[key] !== 'NUMBER' &&
							dataTypeByName[key] !== 'PHONE' &&
							dataTypeByName[key] !== 'URL' &&
							dataTypeByName[key] !== 'COMPONENT'){
						   	if(dataTypeByName[key] === 'ADDRESS'){

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
						if(type === 'URL' && value){
							if(!value.startsWith('http://') && !value.startsWith('https://')){
								value = 'http://' + value;
							}
						}
						var fieldsToAdd = {
							"name":key,
							"value":value,
							"dataType":type,
							"label":''
						}
						fields.push(fieldsToAdd);
					}
				}
				var sortedColumnFields = [];
				columns.forEach(function(column, i){
					fields.forEach(function(columnField){
						if(columnField.name === column.name){
							columnField.label = column.label;
							sortedColumnFields[i] = columnField;
						}
					})
				})
				formattedRow.fields = sortedColumnFields;
				formattedRows.push(formattedRow);
			});
			formattedData.rows = formattedRows;
			formattedData.columns = columns;
			component.set('v.formattedData', formattedData);
			component.set('v.showLoadMore', component.get('v.loadMoreAmount') <= formattedRows.length + 1);
			helper.createRowComponents(component, event, helper, false);
		}
	},
	createRowComponents: function(component, event, helper, isLoadMore) {
		var howManyToLoad = component.get('v.loadMoreAmount'); //let this be a design attribute
		var formattedData = component.get('v.formattedData');

		var numberOfVisableRows = component.get('v.body.length');
		var numberOfAllRows = component.get('v.data.rows.length');

		if(numberOfVisableRows > numberOfAllRows) {
			numberOfVisableRows = numberOfAllRows;
		}

		var body = [];
		component.set('v.body', body);

		var rowsToCreate; 
		if(numberOfAllRows > numberOfVisableRows + howManyToLoad){
			rowsToCreate = numberOfVisableRows + howManyToLoad;
			if(!isLoadMore) {
				rowsToCreate = howManyToLoad;
				component.set('v.showLoadMore', true);
			}
		} else if(numberOfAllRows - numberOfVisableRows <= howManyToLoad) {
			rowsToCreate = numberOfAllRows;
			component.set('v.showLoadMore', false);
		}


		var createRowCallback = function(newCmp, status, errorMessage){
			if(status === 'SUCCESS'){
				body.push(newCmp);
				component.set('v.body', body);
				component.set('v.showTable', true);
			}
		}

		for(var i = 0; i < rowsToCreate; i++){
			$A.createComponent(
				"c:strike_row",
				{
					"fields": formattedData.rows[i].fields
				},
				createRowCallback
			)
		}
		component.set('v.currentSortColumn', '');
	},
	sortTable: function(component, event, helper) {
        var selectedColumnName = event.currentTarget.dataset.columnName || component.get('v.currentSortColumn');
		var body = component.get('v.body');
		body.forEach(function(row){
			var fields = row.get('v.fields');
			fields.forEach(function(field){
				if(field.name === selectedColumnName){
					row.set('v.sortFieldValue', field.value !== undefined ? field.value : '');
				}
			});
		});

		var ascending = component.get('v.ascending');

		if(selectedColumnName !== component.get('v.currentSortColumn')){
			component.set('v.ascending', true);
			ascending = true;
		} else {
			ascending = !ascending;
			component.set('v.ascending', ascending);
		}

		body.sort(function(a,b){
			var aValue = typeof(a) === 'string' ? a.get('v.sortFieldValue').toUpperCase() : a.get('v.sortFieldValue');
			if(typeof aValue === 'object'){
				aValue = aValue.sortValue != null ? aValue.sortValue : '';
			}
			var bValue = typeof(b) === 'string' ? b.get('v.sortFieldValue').toUpperCase() : b.get('v.sortFieldValue');
			if(typeof bValue === 'object'){
				bValue = bValue.sortValue != null ? bValue.sortValue : '';
			}

			if(ascending){
				if (aValue === '' || aValue === null) {
					return -1;
				}
				if (bValue === '' || bValue === null) {
					return 1;
				}
				if (aValue < bValue) {
					return -1;
				}
				if (aValue > bValue) {
					return 1;
				}
			} else{
				if (aValue === '' || aValue === null) {
					return 1;
				}
				if (bValue === '' || bValue === null) {
					return -1;
				}
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
	},
	loadMore: function(component, event, helper) {
		helper.createRowComponents(component, event, helper, true);
	}
})
/*
Copyright 2017 Appiphony, LLC

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the 
following conditions are met:

1. Redistributions of source code must retain the above copyright notice, this list of conditions and the following 
disclaimer.
2. Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following 
disclaimer in the documentation and/or other materials provided with the distribution.
3. Neither the name of the copyright holder nor the names of its contributors may be used to endorse or promote 
products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, 
INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE 
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, 
SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR 
SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, 
WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE 
OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/
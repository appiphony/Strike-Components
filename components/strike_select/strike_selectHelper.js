({
	blur : function(component,event,helper) {
				
		if(component.isValid()) {
			var menuIsOpen = component.get('v.menuIsOpen');
			var searchType = component.get('v.searchType');
			if (menuIsOpen){
				if (searchType === 'lookup') {
					
					
					var lookupMenu = component.find('lookupMenu');
					
					$A.util.removeClass(lookupMenu, 'slds-show slds-lookup__menu');
					$A.util.addClass(lookupMenu, 'slds-hide');

					var lookupInput = component.find('lookupInput');
				
					lookupInput.getElement().value = '';
					helper.getLookupRecords(component,event,helper);
					
					lookupInput.getElement().blur();
					component.set('v.lookupInputShouldFocus', false);
					
					
				} else {
					var trigger = component.find('dropdown-trigger');
					var menu = component.find('dropdown-menu');

					$A.util.removeClass(trigger, 'slds-is-open');
					$A.util.removeClass(menu, 'slds-is-open');
					var searchInput = component.find('searchInput');
					if (searchInput) {
						searchInput.getElement().value = '';
						helper.doStaticSearch(component,event,helper);
					}
					
				}
				
				component.set('v.menuIsOpen', false);
			}
		}

	},
	getLookupRecords: function(component,event,helper){

		
		var sObjectToSearch = component.get('v.sObjectToSearch');
		var searchField = component.get('v.searchField');
		var whereClause = component.get('v.whereClause');
		var returnedRecordLimit = component.get('v.returnedRecordLimit');
		var orderBy = component.get('v.orderBy');
		var searchTerm = component.find('lookupInput').getElement().value;

		var showMostRecent = component.get('v.showMostRecent');
		var action = component.get('c.getRecords');
		var recentRecordsLabel = component.find('recentRecordsLabel');

		
		action.setParams({
			searchTerm: searchTerm ? searchTerm : null,
			sObjectToSearch: sObjectToSearch ? sObjectToSearch : null,
			searchField: searchField ? searchField : null,
			whereClause: whereClause ? whereClause : null,
			returnedRecordLimit: returnedRecordLimit ? returnedRecordLimit : null,
			orderBy: orderBy ? orderBy : null,
			recentEnabled: showMostRecent ? showMostRecent : false
			
			
		});

		action.setCallback(this, function(res){
			
			if(res.getState() === "SUCCESS"){
				var returnValue = JSON.parse(res.getReturnValue());
				var returnedRecords = [];
				returnValue.forEach(function(record){
					var thisRecord = {
						Id: record.Id,
						Label: record[searchField]
					}
					returnedRecords.push(thisRecord);
				})
				component.set('v.returnedRecords', returnedRecords);

				if(searchTerm === null || searchTerm === ''){
					
					recentRecordsLabel.showGroup();
				} else {
					recentRecordsLabel.hideGroup();
				}
				console.log(returnedRecords);
			}
		})
		$A.enqueueAction(action);
	},
	doStaticSearch: function(component,event,helper){
		var searchTerm = component.find('searchInput').getElement().value;
		
		var body = component.get('v.body');
		
		body.forEach(function(child){
			
			if(child.checkIfFiltered){
				child.checkIfFiltered(searchTerm);
			} else {
				var optionGroupBody = child.get('v.body');
				var optionIsHiddenArray = [];

				optionGroupBody.forEach(function(option){
					if(option.checkIfFiltered){
						option.checkIfFiltered(searchTerm);
						optionIsHiddenArray.push(option.get('v.isHidden'));
					} 
				});

				
				if(optionIsHiddenArray.indexOf(false) === -1){
					child.hideGroup();
				} else {
					child.showGroup();
				}
			}
		});
	},
	updateValue: function(component,event,helper){
		
		var svgComp = component.find('svgComp');
		
		
		if (svgComp) {
			svgComp.destroy();
		}
		
		component.set('v.value', event.getParam('value'));
		component.set('v.selectedOptionLabel', event.getParam('label'));
		component.set('v.selectedIcon', event.getParam('iconName'));
		component.set('v.iconIsCustom', event.getParam('iconIsCustom'));


		component.set('v.menuIsOpen', false);

		var searchType = component.get('v.searchType');

		if(searchType == 'lookup'){
			var lookupPill = component.find('lookupPillContainer');
			var lookupMenu = component.find('lookupMenu');
			var lookupInput = component.find('lookupInput');
			var doneRendering = component.get('v.doneRendering');
			component.set('v.lookupInputShouldFocus', true);
			if (doneRendering) {
				if(lookupInput){
					lookupInput.getElement().value = '';
					helper.getLookupRecords(component,event,helper);
				}
			}

			$A.util.removeClass(lookupMenu, 'slds-show slds-lookup__menu');
			$A.util.removeClass(lookupInput, 'slds-show');
			$A.util.removeClass(lookupPill, 'slds-hide');
			$A.util.addClass(lookupPill, 'slds-show');
			$A.util.addClass(lookupMenu, 'slds-hide');
			$A.util.addClass(lookupInput, 'slds-hide');
		} else {
			var trigger = component.find('dropdown-trigger');
			var menu = component.find('dropdown-menu');
			$A.util.removeClass(trigger, 'slds-is-open');
			$A.util.removeClass(menu, 'slds-is-open');

			var doneRendering = component.get('v.doneRendering');

			if (doneRendering) {
				var searchInput = component.find('searchInput');
			
				if(searchInput){
			
					searchInput.getElement().value = '';
					helper.doStaticSearch(component,event,helper);
				}
			}
		}


		event.stopPropagation();
	},
	selectChildOptionFromValue: function(component,event,helper,parentValue){
		
		var cmpBody = component.get('v.body');
		
		cmpBody.forEach(function(child){
		
		
			if(!$A.util.isUndefined(child.optionSelected)){
				var childValue = child.get('v.value');
				if(childValue === parentValue){
					
					child.optionSelected();
				}

			} else {
				var optionGroupBody = child.get('v.body');

				optionGroupBody.forEach(function(secondChild){

					
					if(!$A.util.isUndefined(secondChild.optionSelected)){
						var secondChildValue = secondChild.get('v.value');
						if(secondChildValue === parentValue){
							secondChild.optionSelected();
							
						}
					}
					// throw an exception here if still no optionSelected
				})
			}
		});
	}
})
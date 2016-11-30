({
	hideGroup: function(component,event,helper){
		var groupLabel = component.find('optionGroupLabel');

		$A.util.addClass(groupLabel, 'slds-hide');
		$A.util.removeClass(groupLabel, 'slds-show');
	},
	showGroup: function(component,event,helper){
		var groupLabel = component.find('optionGroupLabel');

		$A.util.addClass(groupLabel, 'slds-show');
		$A.util.removeClass(groupLabel, 'slds-hide');
	}
	
})
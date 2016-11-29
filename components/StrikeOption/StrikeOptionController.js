({
	onInit: function(component,event,helper){
		var icon = component.get('v.iconName');

		if(icon){
			var iconArr = icon.split(":");

			
			var standardTypes = ['utility', 'standard', 'doctype', 'custom', 'action'];
			component.set('v.isCustomIcon', standardTypes.indexOf(iconArr[0]) === -1);
		}
	
	},
	checkIfFiltered: function(component,event,helper) {
		var searchTerm = event.getParam('arguments');
		var optionLabel = component.get('v.label');
		var thisOption = component.find('thisOption');
		var optionLabelLc = optionLabel.toLowerCase();
		var searchTermLc = searchTerm[0].toLowerCase();
		var isHidden;

		if(optionLabelLc.indexOf(searchTermLc) === -1){
			$A.util.addClass(thisOption, 'slds-hide');
			$A.util.removeClass(thisOption, 'slds-show');
			isHidden = true;
		} else {
			$A.util.addClass(thisOption, 'slds-show');
			$A.util.removeClass(thisOption, 'slds-hide');
			isHidden = false;
		}
		
		component.set('v.isHidden', isHidden);
		
	},

	optionSelected : function(component, event, helper) {
	

		var compValue = component.get('v.value');
		var compLabel = component.get('v.label');
		var compIcon = component.get('v.iconName');
		var iconIsCustom = component.get('v.isCustomIcon');
		event.stopPropagation();

		var notifyEvent = component.getEvent("notifyParent");
		notifyEvent.setParams({
			"label": compLabel,
			"value": compValue,
			"iconName": compIcon,
			"iconIsCustom": iconIsCustom

		});
		
		notifyEvent.fire();

	}
})
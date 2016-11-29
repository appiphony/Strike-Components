({
	onInit: function(component,event,helper){

		window.addEventListener('click', $A.getCallback(function(){
			helper.blur(component,event,helper);	
		}))

		var initialValue = component.get('v.initialValue');
		if(initialValue){
			helper.selectChildOptionFromValue(component,event,helper, initialValue);
		}

	},
	doneRendering: function(component, event, helper){
		if (!$A.util.isEmpty(component.find('searchInput'))) {
     		component.find('searchInput').getElement().focus();
		};
		if (!$A.util.isEmpty(component.find('lookupInput'))){
			component.find('lookupInput').getElement().focus();
		}

	},
	toggleMenu : function(component, event, helper) {
		var trigger = component.find('dropdown-trigger');
		var menu = component.find('dropdown-menu');
		var menuIsOpen = component.get('v.menuIsOpen');

		var showMostRecent = component.get('v.showMostRecent');

		if(showMostRecent){
			
			helper.getLookupRecords(component,event,helper);

		}

		var appEvent = $A.get("e.c:menuClicked");
		appEvent.fire();

		if (menuIsOpen){
			$A.util.removeClass(trigger, 'slds-is-open');
			$A.util.removeClass(menu, 'slds-is-open');
			component.set('v.menuIsOpen', false);
		} else {
			$A.util.addClass(trigger, 'slds-is-open');
			$A.util.addClass(menu, 'slds-is-open');
			component.set('v.menuIsOpen', true);
		}

		event.stopPropagation();

	},
	handleNotifyParent: function(component,event,helper){
		
		helper.updateValue(component,event,helper);
		

	},
	checkIfOpen: function(component,event,helper){
		helper.blur(component,event,helper);
	},
	stopProp: function(component,event,helper){
		event.stopPropagation();
	},
	inputValueChanged: function(component, event, helper){
		var searchType = component.get('v.searchType');
		if (searchType === 'lookup'){
			helper.getLookupRecords(component,event,helper);
		}
		if(searchType === 'static'){
			helper.doStaticSearch(component,event,helper);
		}
	},
	handleValueChange: function(component,event,helper){
		
		var oldValue = event.getParam('oldValue');
		var newValue = event.getParam('value');
		
		if (oldValue != newValue){

			helper.selectChildOptionFromValue(component,event,helper,newValue);
		}
	},
	clickOpenLookupMenu: function(component,event,helper){
		var pillContainer = component.find('lookupPillContainer');
		var lookupInput = component.find('lookupInput');
		var lookupMenu = component.find('lookupMenu');
		event.stopPropagation();

		$A.util.removeClass(lookupInput, 'slds-hide');
		$A.util.removeClass(lookupMenu, 'slds-hide');
		$A.util.addClass(lookupInput, 'slds-show');
		$A.util.addClass(lookupMenu, 'slds-show slds-lookup__menu');
		$A.util.removeClass(pillContainer, 'slds-show');
		$A.util.addClass(pillContainer, 'slds-hide');

		component.set('v.menuIsOpen', true);
		helper.getLookupRecords(component,event,helper);
	},
	clickAddNewRecord: function(component,event,helper){
		var addRecordEvent = component.getEvent("addNewRecord");
		
		addRecordEvent.fire();
		helper.blur(component,event,helper);

	}
	
})
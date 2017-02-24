({
	destroyComponent: function(component){

		component.destroy();
	},
	notifyParent: function(component){
		
		var notifyEvent = component.getEvent("strike_evt_componentDestroyed");

		notifyEvent.fire();
	}
})
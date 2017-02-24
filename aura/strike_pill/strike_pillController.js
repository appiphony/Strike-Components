({
	onInit: function(component, event, helper) {
		
		
	},
	handleClick: function(component,event,helper){
		helper.notifyParent(component);
		helper.destroyComponent(component);
	}
})
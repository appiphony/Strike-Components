({
	themeChange : function(component, event, helper) {
		component.set('v.theme', component.get('v.theme').toLowerCase());
	}
})
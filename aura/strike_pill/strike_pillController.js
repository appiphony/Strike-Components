({
    destroyPill: function (component, event, helper) {
    	// Check to see if this component is in Strike Fiddler so we stop user from removing it
    	let isNotStrikeDemo = component.getElement().parentElement.classList[0] !== 'strikeDemoOnly';
        if (component.get('v.destroyable') && isNotStrikeDemo) {
            helper.notifyParent(component);
            helper.destroyComponent(component);
        }
    }
})
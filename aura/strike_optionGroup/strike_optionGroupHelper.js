({
	filterBy : function(component, event, helper, currentComponent) {
        var body = currentComponent.get('v.body');
        var searchTerm = event.getParam('arguments');

        body.forEach(function(child) {
            if (!$A.util.isUndefined(child.filterBy)) {
                child.filterBy(searchTerm[0]);
                component.set('v.hidden', component.get('v.hidden') && (child.get('v.hidden') || child.get('v.filtered')));
            } else {
                helper.filterBy(component, event, helper, child);
            }
        });
	}
})
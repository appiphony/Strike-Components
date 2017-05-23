({
    onInit: function(component, event, helper) {
        component.set('v.hidden', $A.util.isEmpty(component.get('v.label')));
    },
    filterBy: function(component, event, helper) {
        component.set('v.hidden', true);
        helper.filterBy(component, event, helper, component);
        component.set('v.hidden', $A.util.isEmpty(component.get('v.label')) || component.get('v.hidden'));
        component.set('v.filtered', component.get('v.hidden'));
    }
})
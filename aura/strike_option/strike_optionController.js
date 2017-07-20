({
    onInit: function(component, event, helper) {
        var icon = component.get('v.iconName');

        if (icon) {
            var iconArr = icon.split(":");
            var standardTypes = ['utility', 'standard', 'doctype', 'custom', 'action'];

            component.set('v.customIcon', standardTypes.indexOf(iconArr[0]) === -1);
        }

        component.set('v.labelHtml', component.get('v.label'));

        component.set('v.hidden', $A.util.isEmpty(component.get('v.label')));
    },
    preventDefault: function(component, event, helper) {
        event.preventDefault();
    },
    filterBy: function(component, event, helper) {
        var optionLabel = component.get('v.label');
        var optionLabelLc = $A.util.isEmpty(optionLabel) ? '' : optionLabel.toLowerCase();
        var searchTerm = event.getParam('arguments');
        
        var searchTermLc = $A.util.isEmpty(searchTerm) ? '' : searchTerm[0].toLowerCase();

        component.set('v.filtered', optionLabelLc.indexOf(searchTermLc) === -1);
        
        component.set('v.labelHtml', optionLabel.replace(new RegExp('(' + searchTerm[0].replace(/(.)/g, function(a) { if (a == '\\') { a = '\\' + a; } return '[' + a + ']' }) + ')', 'i'), '<mark>$1</mark>'));
    }, 
    select: function(component, event, helper) {
        event.stopPropagation();

        if (component.get('v.disabled')) {
            return;
        }

        var notifyEvent = component.getEvent("strike_evt_notifyParent");
        
        notifyEvent.setParams({
            "data": {
                "label": component.get('v.label'),
                "value": component.get('v.value'),
                "iconName": component.get('v.iconName'),
                "customIcon": component.get('v.customIcon')
            }
        });

        notifyEvent.fire();
    }
})
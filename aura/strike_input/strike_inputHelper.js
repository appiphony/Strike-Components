({
    checkIfEmail: function (component, event, helper) {
        var value = component.find('inputField').getElement('value').value

        if (value && value.indexOf('@') === -1) {
            component.set('v.error', true);
            component.set('v.errorMessage', 'Must be a valid email address');
        } else {
            component.set('v.error', false);
            component.set('v.errorMessage', null);
        }
    }
})

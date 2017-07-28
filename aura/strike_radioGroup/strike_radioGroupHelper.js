({
    selectRadioButtonFromValue: function(component, helper) {
        var body = component.get('v.body');
        var radioName = 'sf-radio-button-' + (new Date()).valueOf();

        body.forEach(function(el) {
            if (el.toString().match(/aura:iteration/)) {
                var children = el.get('v.body');

                children.forEach(function(child) {
                    helper.updateEl(child, radioName, component);
                });
            } else {
                helper.updateEl(el, radioName, component);
            }
        });
        component.set('v.radioName', radioName);
    },
    updateEl: function(el, radioName, component) {
        var value = component.get('v.value');

        el.set('v.type', 'radio');
        el.set('v.name', radioName);
        el.set('v.checked', value == el.get('v.value'));

        if (el.addEventHandler) {
            el.addEventHandler('onchange', component.getReference('c.handleClickRadio'), 'bubble', true);
        }

        if (el.addHandler) {
            el.addHandler('onchange', component, 'c.handleClickRadio');
        }
    }
})
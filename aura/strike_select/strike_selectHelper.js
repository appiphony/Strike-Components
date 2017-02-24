({
    blur: function(component, event, helper) {
        component.find('searchTerm').getElement().value = '';
        helper.doSearch(component, event, helper, '');

        component.set('v.openMenu', false);
    },
    getLabelByValue: function(component, event, helper) {
        helper.findChildOptionFromValue(component, event, helper);
    },
    updateValue: function(component, event, helper) {
        var svgComp = component.find('svgComp');

        if (svgComp) {
            svgComp.destroy();
        }

        if (component.get('v.iconIsCustom') != event.getParam('iconIsCustom')) {
            component.set('v.iconIsCustom', event.getParam('iconIsCustom'));
        }

        if (component.get('v.iconName') != event.getParam('iconName')) {
            component.set('v.iconName', event.getParam('iconName'));
        }

        if (component.get('v.valueLabel') != event.getParam('label')) {
            component.set('v.valueLabel', event.getParam('label'));
        }

        if (component.get('v.value') != event.getParam('value')) {
            component.set('v.value', event.getParam('value'));
        }

        component.set('v.openMenu', false);
    },
    doSearch: function(component, event, helper, searchTerm) {
        component.get('v.body').forEach(function(child) {
            if ($A.util.isUndefined(child.strike_filterBy)) {
                helper.doSearch(child, event, helper, searchTerm);
            } else {
                child.strike_filterBy(searchTerm);
            }
        });
    },
    findChildOptionFromValue: function(component, event, helper) {
        var options = helper.getChildOptions(component, event, helper);

        options.forEach(function(option, i) {
            if (option.get('v.value') === component.get('v.value')) {
                option.strike_optionSelected();
                component.set('focusIndex', i);
            }
        });
    },
    removeKeyDownListener: function(component, event, helper) {
        window.removeEventListener('keydown', component.handleKeyDown);
    },
    handleKeyDown: function(component, event, helper) {
        const KEYCODE_TAB = 9;
        const KEYCODE_ENTER = 13;
        const KEYCODE_ESC = 27;
        const KEYCODE_UP = 38;
        const KEYCODE_DOWN = 40;

        var keyCode = event.which || event.keyCode || 0;

        if (keyCode == KEYCODE_TAB || keyCode == KEYCODE_ESC) {
            helper.blur(component, event, helper);
        } else if (keyCode == KEYCODE_ENTER) {
            event.preventDefault();

            helper.updateValueByFocusIndex(component, event, helper);
        } else if (keyCode == KEYCODE_UP) {
            event.preventDefault();

            helper.moveRecordFocusUp(component, event, helper);
        } else if (keyCode == KEYCODE_DOWN) {
            event.preventDefault();

            helper.moveRecordFocusDown(component, event, helper);
        }
    },
    updateValueByFocusIndex: function(component, event, helper) {
        var focusIndex = component.get('v.focusIndex');
        var options = helper.getChildOptions(component, event, helper);

        if (focusIndex == null) {
            component.set('v.openMenu', false);
        } else {
            options[focusIndex].strike_optionSelected();
        }
    },
    moveRecordFocusUp: function(component, event, helper) {
        var focusIndex = component.get('v.focusIndex');
        var options = helper.getChildOptions(component, event, helper);

        if (focusIndex == null) {
            focusIndex = options.length - 1;
        } else {
            focusIndex = (focusIndex + options.length - 1) % options.length;
        }

        component.set('v.focusIndex', focusIndex);

        options.forEach(function(option, i) {
            option.set('v.focused', i == focusIndex);
        });
    },
    moveRecordFocusDown: function(component, event, helper) {
        var focusIndex = component.get('v.focusIndex');
        var options = helper.getChildOptions(component, event, helper);

        if (focusIndex == null) {
            focusIndex = 0;
        } else {
            focusIndex = (focusIndex + 1) % options.length;
        }

        component.set('v.focusIndex', focusIndex);

        options.forEach(function(option, i) {
            option.set('v.focused', i == focusIndex);
        });
    },
    getChildOptions: function(component, event, helper) {
        var options = [];

        component.get('v.body').forEach(function(child) {
            if ($A.util.isUndefined(child.strike_optionSelected)) {

                var childOptions = helper.getChildOptions(child, event, helper);

                options = options.concat(childOptions);
            } else {
                options.push(child);
            }
        });

        return options;
    }
})
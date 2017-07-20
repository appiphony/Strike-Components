({
    blur: function(component, event, helper) {
        var dropdownTrigger = component.find('dropdown-trigger').getElement();
        var searchTerm = component.find('searchTerm').getElement();

        if (!dropdownTrigger || !searchTerm) {
            return;
        }
        
        dropdownTrigger.blur();
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

        if (component.get('v.customIcon') != event.getParams('params').data.customIcon) {
            component.set('v.customIcon', event.getParams('params').data.customIcon);
        }

        if (component.get('v.iconName') != event.getParams('params').data.iconName) {
            component.set('v.iconName', event.getParams('params').data.iconName);
        }

        if (component.get('v.valueLabel') != event.getParams('params').data.label) {
            component.set('v.valueLabel', event.getParams('params').data.label);
        }

        if (component.get('v.value') != event.getParams('params').data.value) {
            component.set('v.value', event.getParams('params').data.value);
        }

        helper.blur(component, event, helper);
    },
    doSearch: function(component, event, helper, searchTerm) {
        var visibleChildren = false;
        var isCorrectBody;
        
        var filterChildren = function(component){ 
            component.get('v.body').forEach(function(child) {
                if ($A.util.isUndefined(child.filterBy)) {
                    filterChildren(child);
                } else {
                    child.filterBy(searchTerm);
                    
                    if (!child.get('v.hidden') && !child.get('v.filtered') && typeof(child.get('v.name')) !== 'undefined') { // Ignore option groups; each option group haa a name attribute
                        visibleChildren = true;
                    }
                }
            });
        }
        
        filterChildren(component);
        
        if (visibleChildren){
            component.set('v.searchTerm', null);
            component.set('v.allChildrenFiltered', false);
        } else {
            component.set('v.searchTerm', searchTerm)
            component.set('v.allChildrenFiltered', true);
        }
    },
    findChildOptionFromValue: function(component, event, helper) {
        var options = helper.getChildOptions(component, event, helper);

        options.forEach(function(option, i) {
            if (option.get('v.value') === component.get('v.value')) {
                option.select();
                component.set('v.focusIndex', i);
                component.getEvent('onchange').fire();
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
            helper.blur(component, event, helper);
        } else {
            options[focusIndex].select();
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
            if ($A.util.isUndefined(child.select)) {

                var childOptions = helper.getChildOptions(child, event, helper);

                options = options.concat(childOptions);
            } else {
                options.push(child);
            }
        });

        return options;
    }
})
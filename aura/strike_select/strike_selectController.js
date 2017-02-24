({
    onInit: function(component, event, helper) {
        component.handleClick = $A.getCallback(function() {
            if (!component.isValid()) {
                window.removeEventListener('click', component.handleClick);

                return;
            }

            helper.blur(component, event, helper);
        });

        component.handleKeyDown = $A.getCallback(function(e) {
            if (!component.isValid() || !component.get('v.openMenu')) {
                helper.removeKeyDownListener(component, event, helper);

                return;
            }

            helper.handleKeyDown(component, e, helper);
        });

        window.addEventListener('click', component.handleClick);
    },
    doneRendering: function(component, event, helper) {
        if (!$A.util.isEmpty(component.get('v.valueLabel'))) {
            return;
        }

        helper.getLabelByValue(component, event, helper);
    },
    toggleMenu: function(component, event, helper) {
        event.preventDefault();
        event.stopPropagation();

        if (component.handleKeyDown) {
            helper.removeKeyDownListener(component, event, helper);
        }

        if (!component.get('v.disabled') && !component.get('v.openMenu') == true) {
            component.set('v.openMenu', true);

            window.addEventListener('keydown', component.handleKeyDown, { capture: true});

            setTimeout($A.getCallback(function() {
                if (!component.isValid()) {
                    return;
                }

                component.find('searchTerm').getElement().focus();
            }), 1);
        } else {
            helper.blur(component, event, helper);
        }
    },
    handleNotifyParent: function(component, event, helper) {
        helper.updateValue(component, event, helper);
    },
    stopProp: function(component, event, helper) {
        event.stopPropagation();
    },
    searchTermChanged: function(component, event, helper) {
        helper.doSearch(component, event, helper, component.find('searchTerm').getElement().value);
    },
    handleValueChange: function(component, event, helper) {
        component.set('v.valueLabel', '');

        if ($A.util.isEmpty(component.get('v.value'))) {
            return;
        } else {
            helper.findChildOptionFromValue(component, event, helper, component);
        }
    },
    showError: function(component, event, helper) {
        var errorMessage = event.getParam('arguments').errorMessage;

        component.set('v.errorMessage', errorMessage);
        component.set('v.error', true);
    },
    hideError: function(component, event, helper) {
        component.set('v.errorMessage', null);
        component.set('v.error', false);
    },
    handleKeyDown: function(component, event, helper) {
        // nothing
    }
})
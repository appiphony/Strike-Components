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
        
        component.set('v.isMobile', $A.get('$Browser.formFactor') == 'DESKTOP' ? false : true);
    },
    doneRendering: function(component, event, helper) {
        if (!$A.util.isEmpty(component.get('v.valueLabel'))) {
            return;
        }

        setTimeout($A.getCallback(function() {
            helper.getLabelByValue(component, event, helper)
        }), 1);
    },
    blur: function(component, event, helper){
        helper.blur(component, event, helper);
    },
    toggleMenu: function(component, event, helper) {
        event.preventDefault();
        event.stopPropagation();

        if (component.handleKeyDown) {
            helper.removeKeyDownListener(component, event, helper);
        }
        
        setTimeout($A.getCallback(function() { // Fixes mobile dropdown closing immediately after it opens
            if (!component.get('v.disabled') && !component.get('v.openMenu') == true && component.get('v.body').length > 0) {
                component.set('v.openMenu', true);
                
                window.addEventListener('keydown', component.handleKeyDown, { capture: true });
                
                setTimeout($A.getCallback(function() { // Fixes dropdown closing immediately after focusing on the search input                    
                    if (component.isValid() && component.get('v.searchable')) {
                        component.find('searchTerm').getElement().focus();
                    }
                }), 1);
            } else {
                helper.blur(component, event, helper);
            }
        }), 1);
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
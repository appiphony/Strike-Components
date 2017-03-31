({
    onInit: function(component, event, helper) {
        // create a pill component with null value and label to enter the markup into cache
        helper.createOptionPill(component, event, helper);

        component.closeMenu = $A.getCallback(function() {
            if (component.isValid()) {

                component.set('v.menuIsOpen', false);

            } else {
                window.removeEventListener('click', component.closeMenu);
            }
        });

        window.addEventListener('click', component.closeMenu);

        var randomNumber = Math.floor(1000 + Math.random() * 9000);

        component.set('v.idNumber', randomNumber);
        
        component.set('v.isMobile', $A.get('$Browser.formFactor') == 'DESKTOP' ? false : true);
        
    },
    handleDoneRendering: function(component,event,helper){
        var value = component.get('v.value');
        var alreadyRendered = component.get('v.alreadyRendered');

        if(!alreadyRendered){
            if(value){
                helper.handleValueOnInit(component,event,helper);
            }
        }
        component.set('v.alreadyRendered', true);
    },
    handleOnfocus: function(component, event, helper) {
        event.stopPropagation();
        helper.openMenu(component);
    },
    handleOnclick: function(component, event, helper) {
        event.stopPropagation();
        helper.openMenu(component);
    },
    handleNotifyParent: function(component, event, helper) {
        helper.addToComponentValue(component, event, helper);
        helper.createOptionPill(component, event, helper);
        helper.removeOptionFromList(component, event, helper);
        helper.closeMenu(component);
    },
    handleComponentDestroyed: function(component, event, helper) {
        helper.removeOptionPill(component, event);
        helper.addOptionToList(component, event, helper);
        helper.removeFromComponentValue(component, event);
    },
    handleOnblur: function(component, event, helper) {
        helper.closeMenu(component);
    },
    handleOnkeyup: function(component, event, helper) {
        const KEYCODE_ENTER = 13;
        const KEYCODE_UP = 38;
        const KEYCODE_DOWN = 40;

        var searchTerm = component.find('inputField').getElement().value;

        var keyCode = event.which || event.keyCode || 0;

        if (keyCode == KEYCODE_ENTER) {
            helper.updateValueByFocusIndex(component, event, helper);
        } else if (keyCode == KEYCODE_UP) {
            helper.moveRecordFocusUp(component, event, helper);
        } else if (keyCode == KEYCODE_DOWN) {
            helper.moveRecordFocusDown(component, event, helper);
        } else {
            helper.doSearch(component, event, helper, searchTerm);
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
    }
})
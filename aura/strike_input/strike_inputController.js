({
    onInit: function (component, event, helper) {
        var randomNumber = Math.floor(1000 + Math.random() * 9000);

        component.set('v.idNumber', randomNumber);
    },
    handleBlur: function(component, event, helper) {
        var type = component.get('v.type');
        var pattern = component.get('v.pattern');
        var value = component.get('v.value');

        component.getEvent('onblur').fire();

        var dateTimeInputTypes = ['date', 'datetime-local', 'month', 'week', 'time'];
        if(dateTimeInputTypes.indexOf(type) !== -1) {
            helper.resetValue(component, event, helper);
        }
    },
    handleTypeChange: function(component, event, helper) {
        var type = component.get('v.type');
        if(type === 'search') {
            component.set('v.error', false);
        }    
    },
    handleChange: function(component, event, helper) {
        component.getEvent('onchange').fire();
    },
    handleFocus: function(component, event, helper) {
        component.getEvent('onfocus').fire();
    },
    handleKeydown: function(component, event, helper) {
        component.getEvent('onkeydown').fire();
    },
    handleKeyup: function(component, event, helper) {
        component.getEvent('onkeyup').fire();
    },
    handleClickHelpText: function(component, evenet, helper) {
        event.preventDefault();
        event.stopPropagation();
    },
    updateValue: function(component, event, helper) {
        var type = component.get('v.type');
        var dateTimeInputTypes = ['date', 'datetime-local', 'month', 'week', 'time'];
        if(dateTimeInputTypes.indexOf(type) === -1) {
            helper.resetValue(component, event, helper);
        }
        
        component.getEvent('oninput').fire();
    },
    updateChecked: function(component, event, helper) {
        if (component.get('v.type') == 'checkbox'
         || component.get('v.type') == 'radio'
         || component.get('v.type') == 'toggle') {
            var inputEl = component.find('inputField').getElement();
            var checked = component.get('v.checked');

            if (inputEl.checked != checked) {
                component.set('v.checked', inputEl.checked);
            }
        }
    },
    handleChangeMaxlength: function(component, event, helper) {
        let maxlength = component.get('v.maxlength');
        if(!$A.util.isEmpty(maxlength)) {  
            component.set('v.maxlength', Math.abs(maxlength));
        }
    },
    focus: function(component, event, helper){
        component.find('inputField').getElement().focus();
    },
    blur: function(component, event, helper){
        component.find('inputField').getElement().blur();
    },
    select: function(component, event, helper){
        component.find('inputField').getElement().select();
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
    clearInput: function(component, event, helper) {
        component.set('v.value', null);
    }
})
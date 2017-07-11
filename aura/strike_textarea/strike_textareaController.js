({
    onInit: function(component, event, helper) {
        var randomNumber = Math.floor(1000 + Math.random() * 9000);
        component.set('v.idNumber', randomNumber);

        helper.setHeight(component, event, helper);

        helper.handleEmptyMaxLength(component, event, helper);
    },
    sizeChanged: function(component, event, helper) {
        helper.setHeight(component, event, helper);
    },
    handleBlur: function(component, event, helper) {
        component.getEvent('onblur').fire();
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
    handleInput: function(component, event, helper){
        var textareaValue = component.find('thisTextarea').getElement().value;
        var currentValue = component.get('v.value');

        if(textareaValue != currentValue){
            component.set('v.value', textareaValue);
        }
        
        component.getEvent('oninput').fire();
    },
    handleChangeMaxlength: function(component, event, helper){
        helper.handleEmptyMaxLength(component, event, helper);
    },
    updateTextAreaValue: function(component, event, helper){
        var textarea = component.find('thisTextarea').getElement();
        if(!$A.util.isEmpty(textarea)){
            var textareaValue = textarea.value;
            var currentValue = component.get('v.value');

            if(textareaValue != currentValue){
                textarea.value = currentValue;
            }
        }
    },
    focus: function(component, event, helper){
        component.find('thisTextarea').getElement().focus();
    },
    blur: function(component, event, helper){
        component.find('thisTextarea').getElement().blur();
    },
    select: function(component, event, helper){
        component.find('thisTextarea').getElement().select();
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
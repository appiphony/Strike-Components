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
    handleInput: function(component, event, helper){
        var textareaValue = component.find('thisTextArea').getElement().value;
        var currentValue = component.get('v.value');

        if(textareaValue != currentValue){
            component.set('v.value', textareaValue);
        }
    },
    handleMaxLengthChange: function(component, event, helper){
        helper.handleEmptyMaxLength(component, event, helper);
    },
    updateTextAreaValue: function(component, event, helper){
        var textarea = component.find('thisTextArea').getElement();
        if(!$A.util.isEmpty(textarea)){
            var textareaValue = textarea.value;
            var currentValue = component.get('v.value');

            if(textareaValue != currentValue){
                textarea.value = currentValue;
            }
        }
    }
})

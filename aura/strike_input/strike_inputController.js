({
    onInit: function (component, event, helper) {
        var randomNumber = Math.floor(1000 + Math.random() * 9000);

        component.set('v.inputId', randomNumber);
    },
    handleBlur: function(component, event, helper) {
        var type = component.get('v.type');
        var pattern = component.get('v.pattern');
        var value = component.get('v.value');
        // component.set('v.error', false);

        if(type == 'email'){
            helper.checkIfEmail(component, event, helper);
        }

        if(!$A.util.isEmpty(pattern) && !$A.util.isEmpty(value)){
            var patternMatcher = new RegExp('^' + pattern + '$');
            if(!value.match(patternMatcher)){
                component.set('v.errorMessage', component.get('v.messageWhenPatternMismatch'));
                component.set('v.error', true);
            }
        }

        component.getEvent('onblur').fire();
    },
    handleChange: function(component, event, helper) {
        component.getEvent('onchange').fire();
    },
    handleFocus: function(component, event, helper) {
        component.getEvent('onfocus').fire();
    },
    updateValue: function(component, event, helper){
        var inputEl = component.find('inputField').getElement();
        var value = component.get('v.value');
        if(inputEl.value != value){
            component.set('v.value', inputEl.value);
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
    focus: function(component, event, helper){
        component.find('inputField').getElement().focus();
    },
    select: function(component, event, helper){
        component.find('inputField').getElement().select();
    }
})

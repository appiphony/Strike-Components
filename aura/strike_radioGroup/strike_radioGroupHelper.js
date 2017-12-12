/*
Strike by Appiphony

Version: 1.0.0
Website: http://www.lightningstrike.io
GitHub: https://github.com/appiphony/Strike-Components
License: BSD 3-Clause License
*/
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
                
            } else if(el.toString().match(/strike_input/)) {
                helper.updateEl(el, radioName, component);
            }
        });
    },
    updateEl: function(el, radioName, component) {
        if(!el.get('v.value')) {
            return;
        }
        var value = component.get('v.value') + '';

        el.set('v.type', 'radio');
        el.set('v.name', radioName);
        el.set('v.checked', value === (el.get('v.value') + ''));

        if (el.addEventHandler) {
            el.removeEventHandler('onchange', component.getReference('c.handleClickRadio'));
            el.addEventHandler('onchange', component.getReference('c.handleClickRadio'), 'bubble', true);
        
        } else if (el.addHandler) {
            el.removeHandler('onchange', component.getReference('c.handleClickRadio'));
            el.addHandler('onchange', component, 'c.handleClickRadio');
        }
    },
    setValueToRadioContentComponents: function(component, event, helper) {
        var body = component.get('v.body');     
        body.forEach(function(el){
            // Setting selectedValue attribute on each strike_radioRadioGroupContent
            // so we don't need to pass it every time in .cmp file
            var isNotStrikeDemo = !el.toString().match(/aura:iteration/);
            var isStrikeRadioGroupContent = el.toString().match(/strike_radioGroupContent/);
            if(isNotStrikeDemo && isStrikeRadioGroupContent) {
                el.set('v.selectedValue', component.get('v.value'));
            }
        });
    }
})
/*
Copyright 2017 Appiphony, LLC

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the 
following conditions are met:

1. Redistributions of source code must retain the above copyright notice, this list of conditions and the following 
disclaimer.
2. Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following 
disclaimer in the documentation and/or other materials provided with the distribution.
3. Neither the name of the copyright holder nor the names of its contributors may be used to endorse or promote 
products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, 
INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE 
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, 
SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR 
SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, 
WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE 
OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/
/*
Strike by Appiphony

Version: 1.0.0
Website: http://www.lightningstrike.io
GitHub: https://github.com/appiphony/Strike-Components
License: BSD 3-Clause License
*/
({
    /*checkIfEmail: function (component, event, helper) {
        var value = component.find('inputField').getElement('value').value

        if (value && value.indexOf('@') === -1) {
            component.set('v.error', true);
            component.set('v.errorMessage', 'Must be a valid email address');
        } else {
            component.set('v.error', false);
            component.set('v.errorMessage', null);
        }
    },*/
    resetValue: function(component, event, helper) {
        var inputEl = component.find('inputField').getElement();
        var value = component.get('v.value');
        if(inputEl.value !== value) {
            component.set('v.value', inputEl.value);
        }
    },

    disableInput: function(component, event, helper) {
        var inputEl = component.find('inputField').getElement();
        
        inputEl.setAttribute('disabled', 'disabled');
    },
    enableInput: function(component, event, helper) {
        var inputEl = component.find('inputField').getElement();
        
        inputEl.removeAttribute('disabled');
    },
    setAddonsAllowed: function(component, event, helper) {
        var type = component.get('v.type');
        
        if (type === 'toggle' || type === 'radio' || type === 'checkbox' || type === 'search' || type === 'range') {
            component.set('v.addonsAllowed', false);
        } else {
            component.set('v.addonsAllowed', true);
        }

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
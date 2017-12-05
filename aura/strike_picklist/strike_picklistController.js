/*
Strike by Appiphony

Version: 1.0.0
Website: http://www.lightningstrike.io
GitHub: https://github.com/appiphony/Strike-Components
License: BSD 3-Clause License
*/
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
            if (!component.isValid() || !component.get('v.menuOpen')) {
                helper.removeKeyDownListener(component, event, helper);

                return;
            }

            helper.handleKeyDown(component, e, helper);
        });

        window.addEventListener('click', component.handleClick);
        
        component.set('v.isMobile', $A.get('$Browser.formFactor') === 'DESKTOP' ? false : true);
    },
    doneRendering: function(component, event, helper) {
        if (!$A.util.isEmpty(component.get('v.valueLabel')) || $A.util.isEmpty(component.get('v.value'))) {
            return;
        }

        setTimeout($A.getCallback(function() {
            helper.getLabelByValue(component, event, helper)
        }), 1);
    },
    blur: function(component, event, helper){
        helper.blur(component, event, helper);
    },
    showMenu: function(component, event, helper) {
        var dropdownTrigger = component.find('dropdown-trigger').getElement();
        var container = component.find('sp-container').getElement();

        setTimeout($A.getCallback(function() { // Fixes mobile dropdown closing immediately after it opens
            if (!component.get('v.disabled') && !component.get('v.menuOpen') && component.get('v.body').length > 0) {             
                component.set('v.menuOpen', true);              
                window.addEventListener('keydown', component.handleKeyDown, { capture: true });
                
                setTimeout($A.getCallback(function() { // Fixes dropdown closing immediately after focusing on the search input                    
                    if (component.isValid() && component.get('v.searchable')) {
                        component.find('searchTerm').getElement().focus();
                    }

                    container.addEventListener('focusout', $A.getCallback(function() {
                        helper.blur(component, event, helper);
                    }), { once: true });
                }), 1);
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
            component.getEvent('onchange').fire();
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
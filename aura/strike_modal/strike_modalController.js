/*
Strike by Appiphony

Version: 1.0.0
Website: http://www.lightningstrike.io
GitHub: https://github.com/appiphony/Strike-Components
License: BSD 3-Clause License
*/
({
    init: function(component, event, helper){
        component._closeModal = $A.getCallback(function(e) {
            var escKey = 27;
            
            if (!component.isValid()) {
                window.removeEventListener('keyup', component._closeModal);
            } else if((e.which === escKey || e.keyCode === escKey) && component.get('v.showingModal') === true) {
                var closeClicked = component.getEvent('strike_evt_modalCloseButtonClicked');
                helper.hide(component, event, helper);
                closeClicked.fire();
            }
        });
        
        var randomId = Math.floor(Math.random() * 100000000);
        
        component.set('v.modalHeaderId', randomId);
        component.set('v.showingModal', component.get('v.showModal'));
        component.set('v.fadeIn', component.get('v.showModal'));
        
        if(component.get('v.showModal')) {
            helper.show(component, event, helper);
        }
        
    },
    show: function(component, event, helper){
        helper.show(component, event, helper);
    },
    hide: function(component, event, helper) {
        var closeClicked = component.getEvent('strike_evt_modalCloseButtonClicked');
        closeClicked.fire();
        helper.hide(component, event, helper);
    },
    determineModalState: function(component, event, helper){
        var showModal = component.get('v.showModal');
        var showingModal = component.get('v.showingModal');
        showModal ? helper.show(component, event, helper) : helper.hide(component, event, helper);
    },
    clickedPrimary: function(component, event, helper) {
        var primaryClicked = component.getEvent('strike_evt_modalPrimaryButtonClicked');
        primaryClicked.fire();
    },
    clickedSecondary: function(component, event, helper) {
        var secondaryClicked = component.getEvent('strike_evt_modalSecondaryButtonClicked');
        secondaryClicked.fire();
        helper.hide(component, event, helper);
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

/*
Strike by Appiphony

Version: 1.0.0
Website: http://www.lightningstrike.io
GitHub: https://github.com/appiphony/Strike-Components
License: BSD 3-Clause License
*/
({
    show: function(component, event, helper){
        window.addEventListener('keyup', component._closeModal);

        var params = {
            preEvent: 'strike_evt_modalShow',
            afterEvent: 'strike_evt_modalShown',
            showModal: true,
            targetEl: 'modal'
        }

        component.set('v.showModal', params.showModal);
        helper.modalTransitioner(component, params);
    },
    hide: function(component, event, helper) {
        window.removeEventListener('keyup', component._closeModal);

        var params = {
            preEvent: 'strike_evt_modalHide',
            afterEvent: 'strike_evt_modalHidden',
            showModal: false,
            targetEl: 'backdrop'
        }

        component.set('v.showModal', params.showModal);
        helper.modalTransitioner(component, params);
    },
    modalTransitioner: function(component, params){
        var targetEl = component.find(params.targetEl).getElement();

        if (targetEl == null) {
            return;
        }

        var preEvent = component.getEvent(params.preEvent);
        var showModal = params.showModal;
        var preEventAttribute = showModal ? 'v.showingModal' : 'v.fadeIn'
        var afterEventAttribute = showModal ? 'v.fadeIn' : 'v.showingModal'

        component.set(preEventAttribute, showModal);
        preEvent.fire();

        if(showModal){
            //need to fadeIn on the next rendering cycle
            setTimeout($A.getCallback(function(){
                component.set(afterEventAttribute, showModal);
            }), 5);
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
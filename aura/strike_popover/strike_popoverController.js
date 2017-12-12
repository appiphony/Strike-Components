/*Strike by Appiphony

Version: 1.0.0
Website: http://www.lightningstrike.io
GitHub: https://github.com/appiphony/Strike-Components
License: BSD 3-Clause License*/
({
    init: function (component, event, helper) {
        helper.calculateNubbinPlacement(component);
        helper.setIconDisplay(component, event, helper);
    },
    handleChangePlacement: function(component, event, helper) {
        helper.calculateNubbinPlacement(component);
        if(component.get('v.withClose') === true && component.get('v.showPopover') === true) {
            helper.showPopover(component, event, helper);
        }
    },
    handleChangeTheme: function(component, event, helper) {
        helper.setIconDisplay(component, event, helper);
    },
    handleChangeWithClose: function(component, event, helper) {
        if (component.get('v.withClose') === false) {
            helper.hidePopover(component, event, helper);
        }
    },
    handleClickClose: function(component, event, helper) {
        helper.forceHide(component, event, helper);        
    },
    handleMouseLeaveElement: function(component, event, helper) {
        helper.hidePopover(component, event, helper);
    },
    handleMouseLeaveOrBlurElement: function (component, event, helper) {
        helper.hidePopover(component, event, helper);
    },
    handleMouseLeavePopover: function(component, event, helper) {
        helper.hidePopover(component, event, helper);
    },
    handleMouseOverOrFocusElement: function (component, event, helper) {
        helper.showPopover(component, event, helper);
    },
    handleMouseOverPopover: function(component, event, helper) {
        component.set('v.preventHide', true);
    }
})
/*Copyright 2017 Appiphony, LLC

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
OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.*/
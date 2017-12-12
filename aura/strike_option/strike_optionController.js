/*
Strike by Appiphony

Version: 1.0.0
Website: http://www.lightningstrike.io
GitHub: https://github.com/appiphony/Strike-Components
License: BSD 3-Clause License
*/
({
    onInit: function(component, event, helper) {
        var icon = component.get('v.iconName');

        if (icon) {
            var iconArr = icon.split(":");
            var standardTypes = ['utility', 'standard', 'doctype', 'custom', 'action'];

            component.set('v.customIcon', standardTypes.indexOf(iconArr[0]) === -1);
        }

        component.set('v.labelHtml', component.get('v.label'));

        component.set('v.hidden', $A.util.isEmpty(component.get('v.label')));
    },
    preventDefault: function(component, event, helper) {
        event.preventDefault();
    },
    filterBy: function(component, event, helper) {
        var optionLabel = component.get('v.label');
        var optionLabelLc = $A.util.isEmpty(optionLabel) ? '' : optionLabel.toLowerCase();
        var searchTerm = event.getParam('arguments');
        
        var searchTermLc = $A.util.isEmpty(searchTerm) ? '' : searchTerm[0].toLowerCase();

        component.set('v.filtered', optionLabelLc.indexOf(searchTermLc) === -1);
        
        component.set('v.labelHtml', optionLabel.replace(new RegExp('(' + searchTerm[0].replace(/(.)/g, function(a) { if (a === '\\') { a = '\\' + a; } return '[' + a + ']' }) + ')', 'i'), '<mark>$1</mark>'));
    }, 
    select: function(component, event, helper) {
        event.stopPropagation();
        var isOnLoad = !event.target;

        if (component.get('v.disabled') && !isOnLoad) {
            return;
        }

        var notifyEvent = component.getEvent("strike_evt_notifyParent");
        
        notifyEvent.setParams({
            "data": {
                "label": component.get('v.label'),
                "value": component.get('v.value'),
                "iconName": component.get('v.iconName'),
                "customIcon": component.get('v.customIcon'),
                "destroyable": component.get('v.destroyable')
            }
        });

        notifyEvent.fire();
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
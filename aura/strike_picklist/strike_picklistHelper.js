/*
Strike by Appiphony

Version: 1.0.0
Website: http://www.lightningstrike.io
GitHub: https://github.com/appiphony/Strike-Components
License: BSD 3-Clause License
*/
({
    blur: function(component, event, helper) {
        var dropdownTrigger = component.find('dropdown-trigger').getElement();
        var searchTerm = component.find('searchTerm').getElement();

        if (!dropdownTrigger || !searchTerm) {
            return;
        }

        dropdownTrigger.blur();

        setTimeout($A.getCallback(function() { // Forces the browser tab-cycle focusing to occur before closing the menu; affects tabindex value
            component.set('v.menuOpen', false);
        }), 1);
    },
    getLabelByValue: function(component, event, helper) {
        helper.findChildOptionFromValue(component, event, helper);
    },
    updateValue: function(component, event, helper) {
        if (component.get('v.iconName') !== event.getParams('params').data.iconName) {
            component.set('v.iconName', event.getParams('params').data.iconName);
        }

        if (component.get('v.valueLabel') !== event.getParams('params').data.label) {
            component.set('v.valueLabel', event.getParams('params').data.label);
        }

        if (component.get('v.value') !== event.getParams('params').data.value) {
            component.set('v.value', event.getParams('params').data.value);
        }

        helper.blur(component, event, helper);
    },
    doSearch: function(component, event, helper, searchTerm) {
        var visibleChildren = false;
        var isCorrectBody;

        var filterChildren = function(passedComponent){ 
            passedComponent.get('v.body').forEach(function(child) {
                if ($A.util.isUndefined(child.filterBy)) {
                    filterChildren(child);
                } else {

                    child.filterBy(searchTerm);

                    if(child.getType() === 'c:strike_optionGroup'){
                        filterChildren(child);
                    } else if (!child.get('v.hidden') && !child.get('v.filtered')) {
                        
                        visibleChildren = true;
                    }
                }
            });
        }
        
        filterChildren(component);
        
        if (visibleChildren){
            component.set('v.searchTerm', null);
            component.set('v.allChildrenFiltered', false);
        } else {
            component.set('v.searchTerm', searchTerm)
            component.set('v.allChildrenFiltered', true);
        }
    },
    findChildOptionFromValue: function(component, event, helper) {
        var options = helper.getChildOptions(component, event, helper);
        options.forEach(function(option, i) {
            if (option.get('v.value') === component.get('v.value')) {
                option.select();
                component.set('v.focusIndex', i);
                
            }
        });
    },
    removeKeyDownListener: function(component, event, helper) {
        window.removeEventListener('keydown', component.handleKeyDown);
    },
    handleKeyDown: function(component, event, helper) {
        var KEYCODE_TAB = 9;
        var KEYCODE_ENTER = 13;
        var KEYCODE_ESC = 27;
        var KEYCODE_UP = 38;
        var KEYCODE_DOWN = 40;

        var keyCode = event.which || event.keyCode || 0;

        if (keyCode === KEYCODE_TAB || keyCode === KEYCODE_ESC) {
            helper.blur(component, event, helper);
        } else if (keyCode === KEYCODE_ENTER) {
            event.preventDefault();
            helper.updateValueByFocusIndex(component, event, helper);
        } else if (keyCode === KEYCODE_UP) {
            event.preventDefault();
            component.set('v.scrollPosition', window.scrollY);
            helper.moveRecordFocusUp(component, event, helper);
        } else if (keyCode === KEYCODE_DOWN) {
            event.preventDefault();
            component.set('v.scrollPosition', window.scrollY);
            helper.moveRecordFocusDown(component, event, helper);
        }
    },
    updateValueByFocusIndex: function(component, event, helper) {
        var focusIndex = component.get('v.focusIndex');
        var options = helper.getChildOptions(component, event, helper);

        if (focusIndex === null) {
            helper.blur(component, event, helper);
        } else {
            options[focusIndex].select();
        }
    },
    moveRecordFocusUp: function(component, event, helper) {
        var focusIndex = component.get('v.focusIndex');
        var options = helper.getChildOptions(component, event, helper);

        if (focusIndex === null) {
            focusIndex = options.length - 1;
        } else {
            focusIndex = (focusIndex + options.length - 1) % options.length;
        }

        component.set('v.focusIndex', focusIndex);

        options.forEach(function(option, i) {
            option.set('v.focused', i === focusIndex);
        });
        //passing null value since we're in the menu and not necessary to set parentCmp
        helper.setFocus(component, event, helper, null, 'up');
    },
    moveRecordFocusDown: function(component, event, helper) {
        var focusIndex = component.get('v.focusIndex');
        var options = helper.getChildOptions(component, event, helper);

        if (focusIndex === null) {
            focusIndex = 0;
        } else {
            focusIndex = (focusIndex + 1) % options.length;
        }

        component.set('v.focusIndex', focusIndex);

        options.forEach(function(option, i) {
            option.set('v.focused', i === focusIndex);
        });
        //passing null value since we're in the menu and not necessary to set parentCmp
        helper.setFocus(component, event, helper, null, 'down');
    },
    getChildOptions: function(component, event, helper) {
        var options = [];

        component.get('v.body').forEach(function(child) {
            if ($A.util.isUndefined(child.select)) {

                var childOptions = helper.getChildOptions(child, event, helper);

                options = options.concat(childOptions);
            } else {
                options.push(child);
            }
        });

        return options;
    },
    setFocus: function(component, event, helper, parentCmp, direction) {
        if ($A.util.isUndefined(component.find)) {
            component = parentCmp;
        };

        var focusIndex = component.get('v.focusIndex');

        var picklistMenu = component.find('picklistMenu');
        
        if (focusIndex === null) {
            return;
        }
        var childCmps = helper.getChildOptions(component, event, helper);

        for (var i = 0; i < childCmps.length; i++) {
            if (i < focusIndex) {
                childCmps[i].set('v.focused', false);
            } else if (i === focusIndex) {
                if (direction === 'down') {
                    childCmps[i].getElement().scrollIntoView({block: "start", behavior: "auto"});
                } else {
                    childCmps[i].getElement().scrollIntoView({block: "end", behavior: "auto"});
                }
                childCmps[i].set('v.focused', true);
            } else {
                childCmps[i].set('v.focused', false);
            }
        }
        
        window.scrollTo(0, component.get('v.scrollPosition'));
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
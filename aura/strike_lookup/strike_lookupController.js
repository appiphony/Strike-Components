/*Strike by Appiphony

Version: 1.0.0
Website: http://www.lightningstrike.io
GitHub: https://github.com/appiphony/Strike-Components
License: BSD 3-Clause License*/
({
    onInit: function(component, event, helper) {
        component.handleClick = $A.getCallback(function() {
            if (!component.isValid()) {
                window.removeEventListener('click', component.handleClick);

                return;
            }

            helper.closeMenu(component, event, helper);
        });

        window.addEventListener('click', component.handleClick);

        component.set('v.initCallsRunning', 3);

        helper.getRecentRecords(component, event, helper);
        helper.getRecordByValue(component, event, helper);
        helper.getRecordLabel(component, event, helper);

        var randomNumber = Math.floor(1000 + Math.random() * 9000);

        component.set('v.idNumber', randomNumber);
        
        component.set('v.isMobile', $A.get('$Browser.formFactor') === 'DESKTOP' ? false : true);
    },
    handleInputClick: function(component, event, helper) {
        event.stopPropagation();
    },
    handleSearchingClick: function(component, event, helper) {
        component.set('v.searching', false);
    },
    handleInputFocus: function(component, event, helper) {
        $A.util.addClass(component.find('lookup'), 'sl-lookup--open');
        
        if (component.get('v.disabled')) {
            return;
        }

        helper.getRecordsBySearchTerm(component, event, helper);
    },
    cancelLookup: function(component, event, helper) {
        helper.closeMobileLookup(component, event, helper);
    },
    handleInputKeyDown: function(component, event, helper) {
        if (component.get('v.disabled')) {
            return;
        }

        var KEYCODE_TAB = 9;

        var keyCode = event.which || event.keyCode || 0;

        if (keyCode === KEYCODE_TAB) {
            helper.closeMenu(component, event, helper);
        }
    },
    handleInputKeyPress: function(component, event, helper) {
        if (component.get('v.disabled')) {
            return;
        }
    },
    handleInputKeyUp: function(component, event, helper) {
        if (component.get('v.disabled')) {
            return;
        }

        var KEYCODE_ENTER = 13;
        var KEYCODE_UP = 38;
        var KEYCODE_DOWN = 40;

        var keyCode = event.which || event.keyCode || 0;

        if (keyCode === KEYCODE_ENTER) {
            helper.updateValueByFocusIndex(component, event, helper);
        } else if (keyCode === KEYCODE_UP) {
            helper.moveRecordFocusUp(component, event, helper);
        } else if (keyCode === KEYCODE_DOWN) {
            helper.moveRecordFocusDown(component, event, helper);
        } else {
            helper.getRecordsBySearchTerm(component, event, helper);
        }
    },

    handleRecordClick: function(component, event, helper) {
        event.preventDefault();
        event.stopPropagation();

        var focusIndex = event.currentTarget.dataset.index;

        component.set('v.focusIndex', focusIndex);

        helper.updateValueByFocusIndex(component, event, helper);
    },
    handleNewRecordClick: function(component, event, helper) {
        event.preventDefault();
        event.stopPropagation();

        helper.addNewRecord(component, event, helper);
    },
    handlePillClick: function(component, event, helper) {
        event.preventDefault();
        event.stopPropagation();

        component.set('v.value', '');

        helper.getRecordsBySearchTerm(component, event, helper);

        window.setTimeout($A.getCallback(function() {
            component.find('lookupInput').getElement().focus();
        }), 1);
    },

    handleFocusIndexChange: function(component, event, helper) {
        var focusIndex = component.get('v.focusIndex');
        var lookupMenu = component.find('lookupMenu').getElement();

        if (!$A.util.isEmpty(lookupMenu)) {
            var options = lookupMenu.getElementsByTagName('li');
            var focusScrollTop = 0;
            var focusScrollBottom = 0;

            for (var i = 0; i < options.length; i++) {
                var optionSpan = options[i].getElementsByTagName('span')[0];

                if (i === focusIndex) {
                    $A.util.addClass(optionSpan, 'slds-has-focus');
                } else {
                    if (i < focusIndex) {
                        focusScrollTop += options[i].scrollHeight;
                    }

                    $A.util.removeClass(optionSpan, 'slds-has-focus');
                }
            }

            if (focusIndex !== null) {
                focusScrollBottom = focusScrollTop + options[focusIndex].scrollHeight;
            }

            if (focusScrollTop < lookupMenu.scrollTop) {
                lookupMenu.scrollTop = focusScrollTop;
            } else if (focusScrollBottom > lookupMenu.scrollTop + lookupMenu.clientHeight) {
                lookupMenu.scrollTop = focusScrollBottom - lookupMenu.clientHeight;
            }
        }
    },
    handleValueChange: function(component, event, helper) {
        var value = component.get('v.value');

        if ($A.util.isEmpty(value)) {
            component.set('v.valueLabel', '');
        } else if ($A.util.isEmpty(component.get('v.valueLabel'))) {
            helper.getRecordByValue(component, event, helper);
        }
    },

    handleFilterChange: function(component, event, helper) {
        component.set('v.initCallsRunning', 2);

        helper.getRecordByValue(component, event, helper);
        helper.getRecentRecords(component, event, helper);

        component.find('lookupInput').getElement().value = '';
        helper.getRecordsBySearchTerm(component, event, helper);
    },
    handleLimitChange: function(component, event, helper) {
        component.find('lookupInput').getElement().value = '';
        helper.getRecordsBySearchTerm(component, event, helper);
    },
    handleObjectChange: function(component, event, helper) {
        component.set('v.initCallsRunning', 3);

        helper.getRecentRecords(component, event, helper);
        helper.getRecordByValue(component, event, helper);
        helper.getRecordLabel(component, event, helper);

        component.find('lookupInput').getElement().value = '';
        helper.getRecordsBySearchTerm(component, event, helper);
    },
    handleOrderChange: function(component, event, helper) {
        component.set('v.initCallsRunning', 1);

        helper.getRecentRecords(component, event, helper);

        component.find('lookupInput').getElement().value = '';
        helper.getRecordsBySearchTerm(component, event, helper);
    },
    handleSearchfieldChange: function(component, event, helper) {
        component.set('v.initCallsRunning', 2);

        helper.getRecentRecords(component, event, helper);
        helper.getRecordByValue(component, event, helper);

        component.find('lookupInput').getElement().value = '';
        helper.getRecordsBySearchTerm(component, event, helper);
    },
    handleSubtitlefieldChange: function(component, event, helper) {
        component.set('v.initCallsRunning', 1);

        helper.getRecentRecords(component, event, helper);

        component.find('lookupInput').getElement().value = '';
        helper.getRecordsBySearchTerm(component, event, helper);
    },

    showError: function(component, event, helper) {
        var errorMessage = event.getParam('arguments').errorMessage;

        component.set('v.errorMessage', errorMessage);
        component.set('v.error', true);
    },
    hideError: function(component, event, helper) {
        component.set('v.errorMessage', null);
        component.set('v.error', false);
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
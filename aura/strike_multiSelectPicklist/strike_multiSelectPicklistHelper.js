/*
Strike by Appiphony

Version: 1.0.0
Website: http://www.lightningstrike.io
GitHub: https://github.com/appiphony/Strike-Components
License: BSD 3-Clause License
*/
({
    addToComponentValue: function(component, event, helper) {
        var selectedOptionValue = event.getParams('params').data.value;
        var componentValue = component.get('v.value');
        var valueArray = !componentValue ? [] : componentValue.split(';');
        
        if (valueArray.indexOf(selectedOptionValue) === -1) {
            valueArray.push(selectedOptionValue);
        }

        var newValue = valueArray.join(';');
        component.set('v.value', newValue);
    },
    removeOptionFromList: function(component, event, helper) {
        var sourceCmp = event.getSource();
        sourceCmp.set('v.hidden', true);
    },
    createOptionPill: function(component, event, helper) {
        var sourceValue, sourceLabel, sourceIconName, destroyable;
        
        if (event.getName() === 'strike_evt_notifyParent') {
            sourceValue = event.getParams('params').data.value;
            sourceLabel = event.getParams('params').data.label;
            sourceIconName = event.getParams('params').data.iconName;
            destroyable = event.getParams('params').data.destroyable;
        } else {
            sourceValue = event.getParams('params').value;
            sourceLabel = null;
            sourceIconName = null;
            destroyable = true;
        }

        var pillAttributes = {
            "value": sourceValue,
            "label": sourceLabel,
            "iconName": sourceIconName,
            "destroyable": destroyable
        }

        var selectedOptionPills = component.get('v.selectedOptionPills');

        if(sourceLabel && selectedOptionPills.map(function(x){return x.value}).indexOf(sourceValue) === -1){
            selectedOptionPills.push(pillAttributes);

            window.setTimeout($A.getCallback(function() {
                component.set('v.selectedOptionPills', Array.prototype.concat.apply([], selectedOptionPills));
            }), 100);
        }

    },
    openMenu: function(component) {
        var childCmps = component.get('v.body');
        var openMenu;

        childCmps.forEach(function(child) {
            if ($A.util.isUndefined(child.filterBy)) {
                var childBody = child.get('v.body');
                childBody.forEach(function(child2){
                    if(!child2.get('v.hidden')){
                        openMenu = true;
                    }
                })
            } else {
                if (!child.get('v.hidden')){
                    openMenu = true;
                }
            }
        })

        if(openMenu){
            component.set('v.menuIsOpen', true);
        }
    },
    closeMenu: function(component) {
        var isMobile = component.get('v.isMobile');

        component.set('v.menuIsOpen', false);
        component.set('v.focusIndex', null);
    },
    clearInputValue: function(component){
        component.find('inputField').getElement().value = '';
        component.set('v.searchTerm', null);
        this.findValidChildCmps(component);
        var validChildCmps = component.get('v.validChildCmps');
        validChildCmps.forEach(function(child){
            child.filterBy('');
        })

    },
    removeOptionPill: function(component, event) {
        var currentOptionPills = component.get('v.selectedOptionPills');
        var destroyedCmp = event.getSource();

        var destroyedCmpIndex = currentOptionPills.map(function(x) {return(x.value)}).indexOf(destroyedCmp.get('v.value'));

        currentOptionPills.splice(destroyedCmpIndex, 1);
        component.set('v.selectedOptionPills', currentOptionPills);

    },
    addOptionToList: function(component, event, helper) {
        var sourceCmpValue = event.getParam('data').value;
        helper.findValidChildCmps(component, event, helper);
        var dropDownOptions = component.get('v.validChildCmps');
        component.set('v.validChildCmps', null);

        dropDownOptions.forEach(function(option) {
            if (option.get('v.value') === sourceCmpValue) {
                option.set('v.hidden', false);
            }
        })
    },
    removeFromComponentValue: function(component, event) {
        var sourceCmpValue = event.getParam('data').value;
        var parentCmpValue = component.get('v.value');

        var valueArray = parentCmpValue.split(';');

        var valueIndex = valueArray.indexOf(sourceCmpValue);

        valueArray.splice(valueIndex, 1);

        var newValue = valueArray.join(';');
        if (newValue === "") {
            component.set('v.value', null);
        } else {

            component.set('v.value', newValue);
        }
    },
    updateValueByFocusIndex: function(component, event, helper) {
        var focusIndex = component.get('v.focusIndex');

        if (focusIndex === null) {
            return
        }
        helper.findValidChildCmps(component, event, helper);

        var childCmps = component.get('v.validChildCmps');

        if (focusIndex < childCmps.length) {
            childCmps[focusIndex].select();
            helper.closeMenu(component);
        }
        component.set('v.validChildCmps', null);
    },
    moveRecordFocusUp: function(component, event, helper) {
        var menuIsOpen = component.get('v.menuIsOpen');

        if (menuIsOpen) {
            var focusIndex = component.get('v.focusIndex');
            helper.findValidChildCmps(component, event, helper);
            var childCmps = component.get('v.validChildCmps');
            var indecesForHidden = [];
            var indecesToShow = [];

            childCmps.forEach(function(child, index) {
                if (child.get('v.hidden') || child.get('v.filtered')) {
                    indecesForHidden.push(index);
                } else {
                    indecesToShow.push(index);
                }
            });

            if (focusIndex === null || focusIndex === indecesToShow[0]) {
                focusIndex = indecesToShow[indecesToShow.length - 1];

            } else {
                --focusIndex;
                indecesForHidden.forEach(function(childIndex) {
                    if (focusIndex === childIndex) {
                        --focusIndex;
                    }
                })
            }

            component.set('v.focusIndex', focusIndex);

            helper.setFocus(component, event, helper, null, 'up');
        }
    },
    moveRecordFocusDown: function(component, event, helper) {
        var menuIsOpen = component.get('v.menuIsOpen');

        if (menuIsOpen) {
            var focusIndex = component.get('v.focusIndex');
            helper.findValidChildCmps(component, event, helper);
            var childCmps = component.get('v.validChildCmps');


            var indecesForHidden = [];
            var indecesToShow = [];

            childCmps.forEach(function(child, index) {
                if (child.get('v.hidden') || child.get('v.filtered')) {
                    indecesForHidden.push(index);
                } else {
                    indecesToShow.push(index);
                }
            });

            if (focusIndex === null || focusIndex === indecesToShow[indecesToShow.length - 1]) {
                focusIndex = indecesToShow[0];
            } else {

                ++focusIndex;
                indecesForHidden.forEach(function(childIndex) {
                    if (focusIndex === childIndex) {
                        ++focusIndex;
                    }
                });
            }

            component.set('v.focusIndex', focusIndex);

            //passsing null value for parentCmp bc we are already in the list and it wont be necessary to pass value

            helper.setFocus(component, event, helper, null, 'down');
        } else {

            helper.openMenu(component,event,helper);
        }
    },
    setFocus: function(component, event, helper, parentCmp, direction) {
        if ($A.util.isUndefined(component.find)) {
            component = parentCmp;
        };

        var focusIndex = component.get('v.focusIndex');

        var multiSelectMenu = component.find('multiSelectMenu');
        if (focusIndex === null) {
            return;
        }
        helper.findValidChildCmps(component, event, helper);
        var childCmps = component.get('v.validChildCmps');
        component.set('v.validChildCmps', null);

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
    },
    doSearch: function(component, event, helper, searchTerm, parentCmp) {
        if (!parentCmp) {
            var menuIsOpen = component.get('v.menuIsOpen');
        }

        if (!parentCmp && !menuIsOpen) {
            component.set('v.menuIsOpen', true);
        }

        if(!searchTerm){searchTerm = '';}

        component.get('v.body').forEach(function(child) {
            if ($A.util.isUndefined(child.filterBy)) {
                helper.doSearch(child, event, helper, searchTerm, component);

            } else {

                child.filterBy(searchTerm);

                helper.updateFocusIndexByFilter(component, event, helper, parentCmp);
                helper.areChildrenFiltered(component, event, helper, searchTerm, parentCmp);
            }
        });
        helper.areChildrenFiltered(component, event, helper, searchTerm, parentCmp);
    },
    areChildrenFiltered: function(component, event, helper, searchTerm, parentCmp) {
        var body = component.get('v.body');
        var filteredCount = 0;
        var isCorrectBody;

        body.forEach(function(child) {
            if (!$A.util.isUndefined(child.filterBy)) {
                isCorrectBody = true;
                if (child.get('v.filtered') || child.get('v.hidden')) {
                    filteredCount++;
                }
            }
        });

        if (isCorrectBody) {
            if (filteredCount === body.length) {
                parentCmp.set('v.searchTerm', searchTerm)
                parentCmp.set('v.allChildrenFiltered', true);
            } else {
                parentCmp.set('v.searchTerm', null);
                parentCmp.set('v.allChildrenFiltered', false);
            }
        }
    },
    updateFocusIndexByFilter: function(component, event, helper, parentCmp) {
        var childCmps = component.get('v.body');
        var indecesForHidden = [];
        var indecesToShow = [];

        childCmps.forEach(function(child, index) {
            if (child.get('v.hidden') || child.get('v.filtered')) {
                indecesForHidden.push(index);
            } else {
                indecesToShow.push(index);
            }
        });
        if (parentCmp) {
            parentCmp.set('v.focusIndex', indecesToShow[0]);
        } else {
            component.set('v.focusIndex', indecesToShow[0]);
        }
        helper.setFocus(component, event, helper, parentCmp);
    },
    findValidChildCmps: function(component) {
        var childCmps = component.get('v.body');

        childCmps.forEach(function(child) {
            if ($A.util.isUndefined(child.filterBy)) {
                component.set('v.validChildCmps', child.get('v.body'));
            } else {
                component.set('v.validChildCmps', childCmps);
            }
        })
    },
    handleValueOnInit: function(component,event,helper){
        var value = component.get('v.value');

        var valueArray = value.split(';');

        var body = component.get('v.body');
        var childCmps;
        body.forEach(function(child){
           if($A.util.isUndefined(child.filterBy)){

                childCmps = child.get('v.body');
           } else {
                childCmps = body;
           }
        });
        childCmps.forEach(function(child){
            var childValue = child.get('v.value');

            if(valueArray.indexOf(childValue) !== -1){
                child.select();
            }
        });

        helper.checkForValidValue(component, value, valueArray, childCmps);
    },
    checkForValidValue: function(component, originalValue, valueArray, childCmps){
        valueArray.forEach(function(thisValue){
            if(childCmps.map(function(child){return child.get('v.value')}).indexOf(thisValue) === -1){
                valueArray.splice(valueArray.indexOf(thisValue));
            }
        });

        var newValue = valueArray.join(';');
        this.checkForPillDeletion(component, valueArray);

        if(newValue !== originalValue){
            component.set('v.value', newValue);
        }
    },
    checkForPillDeletion: function(component, valueArray){
        var selectedOptionPills = component.get('v.selectedOptionPills');
        if(valueArray.length < selectedOptionPills.length){
            var pillContainer = component.find('optionPillContainer');
            var pillContainerBody = pillContainer.get('v.body');
            var pills = pillContainerBody[0].get('v.body');

            pills.forEach(function(pill){
                var pillCmp = pill.get('v.body')[0];
                if(valueArray.indexOf(pillCmp.get('v.value')) === -1){
                    pillCmp.destroyPill();
                }
            });
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

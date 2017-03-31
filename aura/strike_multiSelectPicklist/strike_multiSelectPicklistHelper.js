({
    addToComponentValue: function(component, event, helper) {

        var selectedOptionValue = event.getParams('params').data.value;
        var componentValue = component.get('v.value');

        var valueArray = !componentValue ? [] : componentValue.split(';');
        valueArray.push(selectedOptionValue);
        var newValue = valueArray.join(';');
        component.set('v.value', newValue);

    },
    removeOptionFromList: function(component, event, helper) {

        var sourceCmp = event.getSource();
        sourceCmp.set('v.hidden', true);
    },
    createOptionPill: function(component, event, helper) {
        var sourceValue, sourceLabel, sourceIconName;
        
        if (event.getName() == 'strike_evt_notifyParent') {
            sourceValue = event.getParams('params').data.value;
            sourceLabel = event.getParams('params').data.label;
            sourceIconName = event.getParams('params').data.iconName;
        } else {
            sourceValue = event.getParams('params').value;
            sourceLabel = null;
            sourceIconName = null;
        }

        var attributes = {
            "value": sourceValue,
            "label": sourceLabel,
            "iconName": sourceIconName
        }

        var callback = function(newPill, status, errorMessage) {
            if (status === "SUCCESS") {

                if (sourceLabel) {
                    var selectedOptionPills = component.get('v.selectedOptionPills');

                    selectedOptionPills.push(newPill);
                    component.set('v.selectedOptionPills', [].concat(selectedOptionPills));
                }
            }
        }

        $A.createComponent("c:strike_pill", attributes, callback);
    },
    openMenu: function(component) {
        var childCmps = component.get('v.body');
        var openMenu;

        childCmps.forEach(function(child) {
            if ($A.util.isUndefined(child.strike_filterBy)) {
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
        component.find('inputField').getElement().value = '';
        component.set('v.menuIsOpen', false);
        component.set('v.focusIndex', null);
    },
    removeOptionPill: function(component, event) {
        var currentOptionPills = component.get('v.selectedOptionPills');
        var destroyedCmp = event.getSource();
        var destroyedCmpIndex = currentOptionPills.indexOf(destroyedCmp);

        currentOptionPills.splice(destroyedCmpIndex, 1);
        component.set('v.selectedOptionPills', currentOptionPills);
    },
    addOptionToList: function(component, event, helper) {
        var sourceCmpValue = event.getSource().get('v.value');
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
        var sourceCmpValue = event.getSource().get('v.value');
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

        if (focusIndex == null) {
            return
        }
        helper.findValidChildCmps(component, event, helper);

        var childCmps = component.get('v.validChildCmps');

        if (focusIndex < childCmps.length) {
            childCmps[focusIndex].strike_optionSelected();
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

            if (focusIndex == null || focusIndex == indecesToShow[0]) {
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

            helper.setFocus(component, event, helper);
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

            if (focusIndex == null || focusIndex == indecesToShow[indecesToShow.length - 1]) {
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

            helper.setFocus(component, event, helper);
        } else {

            helper.openMenu(component,event,helper);
        }
    },
    setFocus: function(component, event, helper, parentCmp) {
        if ($A.util.isUndefined(component.find)) {
            component = parentCmp;
        };

        var focusIndex = component.get('v.focusIndex');

        var multiSelectMenu = component.find('multiSelectMenu');
        if (focusIndex == null) {
            return;
        }
        helper.findValidChildCmps(component, event, helper);
        var childCmps = component.get('v.validChildCmps');
        component.set('v.validChildCmps', null);

        var focusScrollTop = 0;
        var focusScrollBottom = 0;

        for (var i = 0; i < childCmps.length; i++) {

            if (i < focusIndex) {
                focusScrollTop += childCmps[i].scrollHeight;

                childCmps[i].set('v.focused', false);

            } else if (i == focusIndex) {

                childCmps[i].set('v.focused', true);
            } else {
                childCmps[i].set('v.focused', false);

            }
        }

        focusScrollBottom = focusScrollTop + childCmps[focusIndex].scrollHeight;

        if (focusScrollTop < multiSelectMenu.scrollTop) {
            multiSelectMenu.scrollTop = focusScrollTop;
        } else if (focusScrollBottom > multiSelectMenu.scrollTop + multiSelectMenu.clientHeight) {
            multiSelectMenu.scrollTop = focusScrollBottom - multiSelectMenu.clientHeight;
        }
    },
    doSearch: function(component, event, helper, searchTerm, parentCmp) {
        if (!parentCmp) {
            var menuIsOpen = component.get('v.menuIsOpen');
        }

        if (!parentCmp && !menuIsOpen) {

            component.set('v.menuIsOpen', true);
        }
        component.get('v.body').forEach(function(child) {
            if ($A.util.isUndefined(child.strike_filterBy)) {
                helper.doSearch(child, event, helper, searchTerm, component);

            } else {
                child.strike_filterBy(searchTerm);

                helper.updateFocusIndexByFilter(component, event, helper, parentCmp);
            }
        });
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
    findValidChildCmps: function(component, event, helper) {
        var childCmps = component.get('v.body');

        childCmps.forEach(function(child) {
            if ($A.util.isUndefined(child.strike_filterBy)) {
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
           if($A.util.isUndefined(child.strike_filterBy)){
                
                childCmps = child.get('v.body');
           } else {
                childCmps = body;
           }
        });

        childCmps.forEach(function(child){
            var childValue = child.get('v.value');

            if(valueArray.indexOf(childValue) != -1){
                child.strike_optionSelected();
            }
        })

    }
})
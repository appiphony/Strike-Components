({
    checkIfInitialized: function(component, event, helper) {
        var initCallsRunning = component.get('v.initCallsRunning');

        if (--initCallsRunning < 0) {
            initCallsRunning = 0;
        }

        component.set('v.initCallsRunning', initCallsRunning);
    },
    closeMenu: function(component, event, helper) {
        component.set('v.focusIndex', null);
        component.set('v.openMenu', false);
    },
    getParams: function(component, event, helper) {
        var filter = component.get('v.filter');
        var limit = component.get('v.limit');
        var object = component.get('v.object');
        var order = component.get('v.order');
        var searchField = component.get('v.searchField');
        var subtitleField = component.get('v.subtitleField');

        return {
            filter: filter,
            limit: limit,
            object: object,
            order: order,
            searchField: searchField,
            subtitleField: subtitleField
        };
    },
    getRecentRecords: function(component, event, helper) {
        var returnedRecords = [];

        var getRecordsAction = component.get('c.getRecentRecords');

        getRecordsAction.setParams({
            jsonString: JSON.stringify(helper.getParams(component, event, helper))
        });

        getRecordsAction.setCallback(this, function(res) {
            if (res.getState() === 'SUCCESS') {
                var returnValue = JSON.parse(res.getReturnValue());

                if (returnValue.isSuccess) {
                    returnValue.results.data.forEach(function(record) {
                        returnedRecords.push({
                            label: record.label,
                            sublabel: record.sublabel,
                            value: record.value
                        });
                    });
                }
            }
            component.set('v.recentRecords', returnedRecords);

            helper.checkIfInitialized(component, event, helper);
        });

        $A.enqueueAction(getRecordsAction);
    },
    getRecordByValue: function(component, event, helper) {
        var value = component.get('v.value');

        if (!value) {
            component.set('v.valueLabel', null);
            component.set('v.valueSublabel', null);
            helper.checkIfInitialized(component, event, helper);

            return;
        }

        var getRecordsAction = component.get('c.getRecords');
        var params = helper.getParams(component, event, helper);

        if ($A.util.isEmpty(params.filter)) {
            params.filter = 'Id = \'' + value + '\'';
        } else {
            params.filter = 'Id = \'' + value + '\' AND (' + params.filter + ')';
        }

        getRecordsAction.setParams({
            jsonString: JSON.stringify(params)
        });

        getRecordsAction.setCallback(this, function(res) {
            if (res.getState() === 'SUCCESS') {
                var returnValue = JSON.parse(res.getReturnValue());

                if (returnValue.isSuccess) {
                    returnValue.results.data.forEach(function(record) {
                        component.set('v.valueLabel', record.label);
                        component.set('v.valueSublabel', record.sublabel);
                    });
                }
            }

            helper.checkIfInitialized(component, event, helper);
        });

        $A.enqueueAction(getRecordsAction);
    },
    getRecordLabel: function(component, event, helper) {
        var getRecordLabelAction = component.get('c.getRecordLabel');

        getRecordLabelAction.setParams({
            jsonString: JSON.stringify({
                object: component.get('v.object')
            })
        });

        getRecordLabelAction.setCallback(this, function(res) {
            if (res.getState() === 'SUCCESS') {
                var returnValue = JSON.parse(res.getReturnValue());

                if (returnValue.isSuccess) {
                    component.set('v.objectLabel', returnValue.results.objectLabel);
                }
            }

            helper.checkIfInitialized(component, event, helper);
        });

        $A.enqueueAction(getRecordLabelAction);
    },
    getRecordsBySearchTerm: function(component, event, helper) {
        var searchTerm = component.find('lookupInput').getElement().value;

        var lastSearchTerm = component.get('v.lastSearchTerm');
        var searchTimeout = component.get('v.searchTimeout');
        var showRecentRecords = component.get('v.showRecentRecords');

        clearTimeout(searchTimeout);

        if ($A.util.isEmpty(searchTerm)) {
            if (showRecentRecords) {
                helper.setRecords(component, event, helper, component.get('v.recentRecords'));
            } else {
                helper.setRecords(component, event, helper, []);
            }

            return;
        } else if (searchTerm == lastSearchTerm) {
            component.set('v.searching', false);
            helper.openMenu(component, event, helper);

            return;
        }
        
        component.set('v.openMenu', true);
        component.set('v.searching', true);

        component.set('v.searchTimeout', setTimeout($A.getCallback(function() {
            if (!component.isValid()) {
                return;
            }

            var getRecordsAction = component.get('c.getRecords');
            var params = helper.getParams(component, event, helper);

            params.searchTerm = component.find('lookupInput').getElement().value;

            getRecordsAction.setParams({
                jsonString: JSON.stringify(params)
            });

            getRecordsAction.setCallback(this, function(res) {
                if (res.getState() === 'SUCCESS') {
                    var returnValue = JSON.parse(res.getReturnValue());

                    if (returnValue.isSuccess && returnValue.results.searchTerm == component.find('lookupInput').getElement().value) {
                        var returnedRecords = [];

                        returnValue.results.data.forEach(function(record) {
                            returnedRecords.push({
                                label: record.label,
                                sublabel: record.sublabel,
                                value: record.value
                            });
                        });

                        helper.setRecords(component, event, helper, returnedRecords);
                    }
                } else {
                    helper.setRecords(component, event, helper, []);
                }
            });

            $A.enqueueAction(getRecordsAction);
        }), 200));
    },
    setRecords: function(component, event, helper, returnedRecords) {
        component.set('v.focusIndex', null);
        component.set('v.lastSearchTerm', component.find('lookupInput').getElement().value);
        component.set('v.records', returnedRecords);
        component.set('v.searching', false);

        helper.openMenu(component, event, helper);
    },
    openMenu: function(component, event, helper) {
        var showRecentRecords = component.get('v.showRecentRecords') && !$A.util.isEmpty(component.get('v.recentRecords'));
        component.set('v.openMenu', !component.get('v.disabled') && (!$A.util.isEmpty(component.get('v.lastSearchTerm')) || showRecentRecords));
    },
    closeMobileLookup: function(component, event, helper) {
        $A.util.removeClass(component.find('lookup'), 'sl-lookup--open');
        component.find('lookupInput').getElement().value = ''
    },
    updateValueByFocusIndex: function(component, event, helper) {
        var focusIndex = component.get('v.focusIndex');

        if (focusIndex == null) {
            focusIndex = 0;
        }

        var records = component.get('v.records');

        if (focusIndex < records.length) {
            component.set('v.value', records[focusIndex].value);
            component.set('v.valueLabel', records[focusIndex].label);
            component.set('v.valueSublabel', records[focusIndex].sublabel);
            component.find('lookupInput').getElement().value = '';

            helper.closeMenu(component, event, helper);
        } else if (focusIndex == records.length) {
            helper.addNewRecord(component, event, helper);
        }

        helper.closeMobileLookup(component, event, helper);
    },
    addNewRecord: function(component, event, helper) {
        if (!component.get('v.allowNewRecords')) {
            return;
        }

        var addRecordEvent;
        var overrideNewEvent = component.get('v.overrideNewEvent');

        if (overrideNewEvent) {
            addRecordEvent = component.getEvent('strike_evt_addNewRecord');
        } else {
            addRecordEvent = $A.get('e.force:createRecord');

            addRecordEvent.setParams({
                entityApiName: component.get('v.object')
            });
        }
        addRecordEvent.fire();

        helper.closeMenu(component, event, helper);
    },
    moveRecordFocusUp: function(component, event, helper) {
        var openMenu = component.get('v.openMenu');

        if (openMenu) {
            var focusIndex = component.get('v.focusIndex');
            var options = component.find('lookupMenu').getElement().getElementsByTagName('li');

            if (focusIndex == null || focusIndex == 0) {
                focusIndex = options.length - 1;
            } else {
                --focusIndex;
            }

            component.set('v.focusIndex', focusIndex);
        }
    },
    moveRecordFocusDown: function(component, event, helper) {
        var openMenu = component.get('v.openMenu');

        if (openMenu) {
            var focusIndex = component.get('v.focusIndex');
            var options = component.find('lookupMenu').getElement().getElementsByTagName('li');

            if (focusIndex == null || focusIndex == options.length - 1) {
                focusIndex = 0;
            } else {
                ++focusIndex;
            }

            component.set('v.focusIndex', focusIndex);
        }
    }
})
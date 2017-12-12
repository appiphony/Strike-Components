/*
Strike by Appiphony

Version: 1.0.0
Website: http://www.lightningstrike.io
GitHub: https://github.com/appiphony/Strike-Components
License: BSD 3-Clause License
*/
({
    init: function (component, event, helper) {
        component.set('v.dateDebouncer', helper.debounceCreator(component, 1, helper.processDateValue));
        helper.createLocaleDatePatternMap(component);
        helper.processDateValue(component);

        component.closeDatepicker = $A.getCallback(function(){
            if (component.isValid()) {
                helper.closeDatepicker(component, event, helper);
            } else {
                window.removeEventListener('click', component.closeDatepicker);
            }
        });

        window.addEventListener('click', $A.getCallback(component.closeDatepicker));
        
        component.set('v.isMobile', $A.get('$Browser.formFactor') === 'DESKTOP' ? false : true);
    },
    valueChanged: function(component, event, helper) {
        var dateDebouncer = component.get('v.dateDebouncer');
        var value = component.get('v.value');
        var clickedValue = component.get('v.clickedValue');

        if (value === clickedValue) {
            return;
        }

        component.set('v.clickedValue', null);
        dateDebouncer(component);
    },
    processNewDate: function(component, event, helper) {
        var currentValue = component.get('v.value');
        var displayDate = component.get('v.displayDate');
        var datePattern = component.get('v.valueFormat');
        var locale = helper.getLocale();
        var localeDatePattern = helper.getLocaleDatePattern(component, locale);
        var selectedDate = $A.localizationService.parseDateTime(displayDate, localeDatePattern, true);

        if (selectedDate === null) {
            component.set('v.value', null);
            component.set('v.timestamp', null);

            helper.closeDatepicker(component, event, helper);
            return;
        }

        var formattedDisplayDate = $A.localizationService.formatDate(selectedDate.toString(), datePattern);

        if (currentValue === formattedDisplayDate) {
            helper.closeDatepicker(component, event, helper);
            return;
        }

        component.set('v.value', formattedDisplayDate);
        helper.closeDatepicker(component, event, helper);
    },
    clickedDateInput: function(component, event, helper) {
        event.preventDefault();
        event.stopPropagation();


        if (event.target.tagName === 'use' || event.target.tagName === 'svg') {
            return;
        }
        
        var notDisabled = !component.get('v.disabled');
        var displayDate = component.get('v.displayDate');
        var dateInput = component.find('date-input');
        var datePickerOpen = component.get('v.datePickerOpen');
        var container = component.find('dp-container').getElement();

        dateInput.focus();
        if(notDisabled && !datePickerOpen) {
            helper.determineReadOnly(component);
            component.set('v.datePickerOpen', true);
            container.addEventListener('focusout', $A.getCallback(function() {
                helper.closeDatepicker(component, event, helper);
            }), { once: true });
        } else if(notDisabled && datePickerOpen) {
            dateInput.focus();
        }
    },
    clickedDateIcon: function (component, event, helper) {
        event.preventDefault();
        event.stopPropagation();
        var notDisabled = !component.get('v.disabled');

        if(notDisabled){
            component.set('v.datePickerOpen', true);
        }
    },
    selectToday: function (component, event, helper) {
        event.preventDefault();
        event.stopPropagation();
        var currentDate = new Date();
        var datePattern = component.get('v.valueFormat');
        var dontCloseMenu = component.get('v.dontCloseMenu');
        var formattedValueDate = $A.localizationService.formatDate(currentDate.toString(), datePattern);

        component.set('v.value', formattedValueDate);

        if(dontCloseMenu) {
            component.set('v.dontCloseMenu', false);
        }
        helper.closeDatepicker(component, event, helper);
    },
    clickNext: function (component, event, helper) {
        event.stopPropagation();
        var currentMonth = Number(component.get('v.selectedMonth'));
        var monthLabels = component.get('v.monthLabels');
        var nextMonth;

        if (currentMonth === 11) {
            nextMonth = 0;
            helper.setSelectedYear(component, Number(component.get('v.selectedYear')) + 1);
        } else {
            nextMonth = currentMonth + 1;
        }

        component.set('v.selectedMonth', nextMonth);
        component.set('v.calendarRows', helper.getCalendarRows(component));
        component.set('v.selectedMonthText', monthLabels[nextMonth].fullName);
    },
    clickPrev: function (component, event, helper) {
        event.stopPropagation();
        var currentMonth = Number(component.get('v.selectedMonth'));
        var monthLabels = component.get('v.monthLabels');
        var prevMonth;

        if (currentMonth === 0) {
            prevMonth = 11;
            helper.setSelectedYear(component, Number(component.get('v.selectedYear')) - 1);
        } else {
            prevMonth = currentMonth - 1;
        }

        component.set('v.selectedMonth', prevMonth);
        component.set('v.calendarRows', helper.getCalendarRows(component));
        component.set('v.selectedMonthText', monthLabels[prevMonth].fullName);
    },
    closeDatepicker: function (component, event, helper) {
        helper.closeDatepicker(component, event, helper);
    },
    yearChanged: function (component, event, helper) {
        component.set('v.calendarRows', helper.getCalendarRows(component));
    },
    preventBlur: function(component, event, helper){
        event.preventDefault();
    },
    clickDate: function (component, event, helper) {
        var dontCloseMenu = component.get('v.dontCloseMenu');
        var selectedRowIndex = component.get('v.selectedDateRowIndex');
        var selectedColIndex = component.get('v.selectedDateColIndex');

        if (!$A.util.isEmpty(selectedRowIndex) && !$A.util.isEmpty(selectedRowIndex)) {
            var selectedDayObj = component.get('v.calendarRows')[selectedRowIndex][selectedColIndex];
            selectedDayObj.isSelected = false;
        }

        var clickedRowIndex = parseInt(event.currentTarget.dataset.row_index,10);
        var clickedColIndex = parseInt(event.currentTarget.dataset.col_index,10);
        var calendarRows = component.get('v.calendarRows');
        var clickedDayObj = component.get('v.calendarRows')[clickedRowIndex][clickedColIndex];

        clickedDayObj.isSelected = true;

        component.set('v.selectedDateRowIndex', clickedRowIndex);
        component.set('v.selectedDateColIndex', clickedColIndex);
        component.set('v.calendarRows', calendarRows);

        var selectedDay = parseInt(event.currentTarget.dataset.day,10);
        var selectedMonth = parseInt(event.currentTarget.dataset.month,10);
        var selectedYear = component.get('v.selectedYear');
        var timeStamp = Date.UTC(selectedYear, selectedMonth, selectedDay);

        var currentDate = new Date(selectedYear, selectedMonth, selectedDay);
        var datePattern = component.get('v.valueFormat');
        var localeDatePattern = component.get('v.datePatternMap')[helper.getLocale()];
        var formattedDisplayDate = $A.localizationService.formatDate(currentDate.toString(), localeDatePattern);
        var value = $A.localizationService.formatDate(currentDate.toString(), datePattern);

        component.set('v.clickedValue', value);
        component.set('v.value', value);
        component.set('v.displayDate', formattedDisplayDate);
        component.set('v.timestamp', timeStamp);
        component.set('v.currentDate', currentDate);

        if(dontCloseMenu) {
            component.set('v.dontCloseMenu', false);
        }
        helper.closeDatepicker(component, event, helper);
        helper.determineReadOnly(component);
    },
    preventDatePickerClose: function (component, event, helper) {
        var container = component.find('dp-container').getElement();
        event.stopPropagation();
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
    openYear: function(component, event, helper) {
        component.set('v.dontCloseMenu', true);
        event.stopPropagation();
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
/*
Strike by Appiphony

Version: 1.0.0
Website: http://www.lightningstrike.io
GitHub: https://github.com/appiphony/Strike-Components
License: BSD 3-Clause License
*/
({
    closeDatepicker: function(component, event, helper) {
        component.set('v.readOnly', false);
        
        var dontCloseMenu = component.get('v.dontCloseMenu');
        component.set('v.datePickerOpen', dontCloseMenu);
        component.set('v.dontCloseMenu', false);
    },
    processDateValue: function (component) {
        var dateString = component.get('v.value');
        var datePattern = component.get('v.valueFormat');
        var currentDate = $A.localizationService.parseDateTime(dateString, datePattern, true);
        var dayLabels = $A.get("$Locale.nameOfWeekdays");
        var monthLabels = $A.get("$Locale.nameOfMonths");

        dayLabels.forEach(function(day, index) {
            dayLabels[index].shortName = day.shortName.toLowerCase();
        });

        if ($A.util.isEmpty(dateString)) {
            //if no intial value build a calendar using today.
            var displayDate = component.get('v.displayDate');
            component.set('v.currentDate', null);
            currentDate = new Date();
        } else if ($A.util.isEmpty(currentDate)) { //invalid date
            component.set('v.currentDate', null);
            return;
        } else { //valid date
            var locale = this.getLocale();
            var localeDatePattern = this.getLocaleDatePattern(component, locale);
            var formattedDisplayDate = $A.localizationService.formatDate(currentDate, localeDatePattern);
            var timestamp = Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());

            component.set('v.currentDate', currentDate);
            component.set('v.timestamp', timestamp);
            component.set('v.displayDate', formattedDisplayDate);
        }

        this.determineReadOnly(component);

        component.set('v.dayLabels', dayLabels);
        component.set('v.monthLabels', monthLabels);

        var year = parseInt(currentDate.getFullYear(),10);

        this.setYearValues(component, year);
        this.buildCalendar(component, currentDate);
    },
    getLocaleDatePattern: function(component, locale) {
        var localeDatePattern;
        
        if (component.get('v.isMobile')) {
            localeDatePattern = 'YYYY-MM-DD'; // iOS and Android format
        } else {
            localeDatePattern = component.get('v.datePatternMap')[locale];
        }
        
        return localeDatePattern;
    },
    buildCalendar: function (component, currentDate) {
        var year = currentDate.getFullYear();
        var month = currentDate.getMonth();
        var monthLabels = component.get('v.monthLabels');
        
        component.set("v.selectedYear", parseInt(year,10));
        component.set("v.selectedMonth", month);
        component.set("v.selectedMonthText", monthLabels[month].fullName);
        component.set('v.calendarRows', this.getCalendarRows(component));
    },
    setYearValues: function (component, year) {
        var selectYears = [];
        var yearsBefore = component.get('v.yearsBefore');
        var yearsAfter = component.get('v.yearsAfter');

        for (var i = year - parseInt(yearsBefore,10); i <= year + parseInt(yearsAfter,10); i++) {
            selectYears.push({
                label: i.toString(),
                value: i,
                selected: i === year
            });
        }

        component.set('v.selectYears', selectYears);
    },
    isLeapYear: function (component) {
        var year = component.get('v.selectedYear');
        return (((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0))
    },
    getNumDaysInMonth: function (component, month) {
        return [31, (this.isLeapYear(component) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
    },
    getCalendarRows: function (component) {
        var previousMonth = this.fillPreviousMonth(component);
        var currentMonth = this.fillCurrentMonth(component);
        var allDays = previousMonth.concat(currentMonth);
        var calendarRows = this.createCalendarRows(component, allDays);

        return calendarRows;

    },
    fillPreviousMonth: function (component) {
        var selectedMonth = component.get('v.selectedMonth');
        var selectedYear = component.get('v.selectedYear');

        var firstDayOfMonth = (new Date(selectedYear, selectedMonth, 1)).getDay();
        var numDaysInPrevMonth = this.getNumDaysInMonth(component, selectedMonth === 0 ? 11 : selectedMonth - 1);
        var prevMonth = [];

        for (var i = numDaysInPrevMonth - (firstDayOfMonth - 1); i <= numDaysInPrevMonth; i++) {
            prevMonth.push({
                value: i,
                isCurrentMonth: false,
                month: selectedMonth - 1,
                year: selectedYear,
                isSelected: false
            });
        }
        return prevMonth;
    },
    fillCurrentMonth: function (component) {
        var selectedMonth = component.get('v.selectedMonth');
        var selectedYear = component.get('v.selectedYear');
        var numDaysInMonth = this.getNumDaysInMonth(component, selectedMonth);
        var thisMonth = [];

        for (var i = 1; i <= numDaysInMonth; i++) {
            thisMonth.push({
                value: i,
                isCurrentMonth: true,
                month: selectedMonth,
                year: selectedYear,
                isSelected: false
            });
        }

        return thisMonth;
    },
    createCalendarRows: function (component, allDays) {
        component.set('v.selectedDateRowIndex', null);
        component.set('v.selectedDateColIndex', null);

        var sDate = component.get('v.currentDate');
        var today = new Date();

        // Split array into rows of 7
        var selectedMonth = component.get('v.selectedMonth');
        var selectedYear = component.get('v.selectedYear');
        var dayLabels = component.get('v.dayLabels');
        var rowsArray = [];

        allDays.forEach(function (day, index) {
            var colIndex = index % 7;

            if (colIndex === 0) {
                rowsArray.push([])
            }

            var rowIndex = rowsArray.length - 1;

            day.colIndex = colIndex;
            day.rowIndex = rowIndex;
            day.headerText = dayLabels[index % 7]['fullName'];
            var isSelected = false;
            var isToday = today.getDate() === day.value && today.getMonth() === day.month && today.getFullYear() === Number(day.year);

            day.isToday = isToday;
            if (!$A.util.isEmpty(sDate)) {
                isSelected = sDate.getDate() === day.value && sDate.getMonth() === day.month && sDate.getFullYear() === Number(day.year);
            }

            if (isSelected === true) {
                day.isSelected = true;
                component.set('v.selectedDateColIndex', day.colIndex);
                component.set('v.selectedDateRowIndex', day.rowIndex);
            }

            rowsArray[rowIndex].push(day);
        });

        // Fill last row
        if (rowsArray[rowsArray.length - 1].length < 7) {
            var numColsToFill = 7 - rowsArray[rowsArray.length - 1].length;
            var dayIndexReference = 7 - numColsToFill - 1; // This calculation figures out the first 'day index' to start with to properlly populate the day header.
            // Subtracting one to compensate for i starting at 1 below.
            for (var i = 1; i <= numColsToFill; i++) {
                var iDate = new Date(selectedYear, selectedMonth + 1, i);
                rowsArray[rowsArray.length - 1].push({
                    value: i,
                    isCurrentMonth: false,
                    month: selectedMonth + 1,
                    headerText: dayLabels[(dayIndexReference + i)]['fullName']
                });
            }
        }

        return rowsArray;
    },
    setSelectedYear: function (component, year) {
        component.set('v.selectedYear', year.toString());
    },
    getLocale: function() {
        var locale = $A.get("$Locale.userLocaleLang");

        if (!$A.util.isEmpty($A.get("$Locale.userLocaleCountry"))) {
            locale += '_' + $A.get("$Locale.userLocaleCountry");
        }

        return locale;
    },
    debounceCreator: function(component, timer, callback) {
        var debounceTimeout;
        var context = this;

        return function() {
            var args = arguments
            var debounceFunc = function() {
                if(component.isValid()){
                    debounceTimeout = null;
                    callback.apply(context, args);
                }
            };

            clearTimeout(debounceTimeout);
            debounceTimeout = setTimeout($A.getCallback(debounceFunc), timer);
        };
    },
    determineReadOnly: function(component){
        var displayDate = component.get('v.displayDate');
        component.set('v.readOnly', $A.util.isEmpty(displayDate));
    },
    createLocaleDatePatternMap: function (component) {
        var datePatternMap = {
            'ar': 'dd/MM/yyyy',
            'ar_AE': 'dd/MM/yyyy',
            'ar_BH': 'dd/MM/yyyy',
            'ar_JO': 'dd/MM/yyyy',
            'ar_KW': 'dd/MM/yyyy',
            'ar_LB': 'dd/MM/yyyy',
            'ar_SA': 'dd/MM/yyyy',
            'bg_BG': 'yyyy-M-d',
            'ca': 'dd/MM/yyyy',
            'ca_ES': 'dd/MM/yyyy',
            'ca_ES_EURO': 'dd/MM/yyyy',
            'cs': 'd.M.yyyy',
            'cs_CZ': 'd.M.yyyy',
            'da': 'dd-MM-yyyy',
            'da_DK': 'dd-MM-yyyy',
            'de': 'dd.MM.yyyy',
            'de_AT': 'dd.MM.yyyy',
            'de_AT_EURO': 'dd.MM.yyyy',
            'de_CH': 'dd.MM.yyyy',
            'de_DE': 'dd.MM.yyyy',
            'de_DE_EURO': 'dd.MM.yyyy',
            'de_LU': 'dd.MM.yyyy',
            'de_LU_EURO': 'dd.MM.yyyy',
            'el_GR': 'd/M/yyyy',
            'en_AU': 'd/MM/yyyy',
            'en_B': 'M/d/yyyy',
            'en_BM': 'M/d/yyyy',
            'en_CA': 'dd/MM/yyyy',
            'en_GB': 'dd/MM/yyyy',
            'en_GH': 'M/d/yyyy',
            'en_ID': 'M/d/yyyy',
            'en_IE': 'dd/MM/yyyy',
            'en_IE_EURO': 'dd/MM/yyyy',
            'en_NZ': 'd/MM/yyyy',
            'en_SG': 'M/d/yyyy',
            'en_US': 'M/d/yyyy',
            'en_ZA': 'yyyy/MM/dd',
            'es': 'd/MM/yyyy',
            'es_AR': 'dd/MM/yyyy',
            'es_BO': 'dd-MM-yyyy',
            'es_CL': 'dd-MM-yyyy',
            'es_CO': 'd/MM/yyyy',
            'es_CR': 'dd/MM/yyyy',
            'es_EC': 'dd/MM/yyyy',
            'es_ES': 'd/MM/yyyy',
            'es_ES_EURO': 'd/MM/yyyy',
            'es_GT': 'd/MM/yyyy',
            'es_HN': 'MM-dd-yyyy',
            'es_MX': 'd/MM/yyyy',
            'es_PE': 'dd/MM/yyyy',
            'es_PR': 'MM-dd-yyyy',
            'es_PY': 'dd/MM/yyyy',
            'es_SV': 'MM-dd-yyyy',
            'es_UY': 'dd/MM/yyyy',
            'es_VE': 'dd/MM/yyyy',
            'et_EE': 'd.MM.yyyy',
            'fi': 'd.M.yyyy',
            'fi_FI': 'd.M.yyyy',
            'fi_FI_EURO': 'd.M.yyyy',
            'fr': 'dd/MM/yyyy',
            'fr_BE': 'd/MM/yyyy',
            'fr_CA': 'yyyy-MM-dd',
            'fr_CH': 'dd.MM.yyyy',
            'fr_FR': 'dd/MM/yyyy',
            'fr_FR_EURO': 'dd/MM/yyyy',
            'fr_LU': 'dd/MM/yyyy',
            'fr_MC': 'dd/MM/yyyy',
            'hr_HR': 'yyyy.MM.dd',
            'hu': 'yyyy.MM.dd.',
            'hy_AM': 'M/d/yyyy',
            'is_IS': 'd.M.yyyy',
            'it': 'dd/MM/yyyy',
            'it_CH': 'dd.MM.yyyy',
            'it_IT': 'dd/MM/yyyy',
            'iw': 'dd/MM/yyyy',
            'iw_IL': 'dd/MM/yyyy',
            'ja': 'yyyy/MM/dd',
            'ja_JP': 'yyyy/MM/dd',
            'kk_KZ': 'M/d/yyyy',
            'km_KH': 'M/d/yyyy',
            'ko': 'yyyy. M. d',
            'ko_KR': 'yyyy. M. d',
            'lt_LT': 'yyyy.M.d',
            'lv_LV': 'yyyy.d.M',
            'ms_MY': 'dd/MM/yyyy',
            'nl': 'd-M-yyyy',
            'nl_BE': 'd/MM/yyyy',
            'nl_NL': 'd-M-yyyy',
            'nl_SR': 'd-M-yyyy',
            'no': 'dd.MM.yyyy',
            'no_NO': 'dd.MM.yyyy',
            'pl': 'yyyy-MM-dd',
            'pt': 'dd-MM-yyyy',
            'pt_AO': 'dd-MM-yyyy',
            'pt_BR': 'dd/MM/yyyy',
            'pt_PT': 'dd-MM-yyyy',
            'ro_RO': 'dd.MM.yyyy',
            'ru': 'dd.MM.yyyy',
            'sk_SK': 'd.M.yyyy',
            'sl_SI': 'd.M.y',
            'sv': 'yyyy-MM-dd',
            'sv_SE': 'yyyy-MM-dd',
            'th': 'M/d/yyyy',
            'th_TH': 'd/M/yyyy,',
            'tr': 'dd.MM.yyyy',
            'ur_PK': 'M/d/yyyy',
            'vi_VN': 'dd/MM/yyyy',
            'zh': 'yyyy-M-d',
            'zh_CN': 'yyyy-M-d',
            'zh_HK': 'yyyy-M-d',
            'zh_TW': 'yyyy/M/d'
        }

        component.set('v.datePatternMap', datePatternMap);
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
/*
Strike by Appiphony

Version: 1.0.0
Website: http://www.lightningstrike.io
GitHub: https://github.com/appiphony/Strike-Components
License: BSD 3-Clause License
*/
({
    onInit: function(component, event, helper) {
        var total = component.get('v.total');
        var completed = component.get('v.completed');
        var trillion = Math.pow(10, 12);

        component.set('v.total', total > trillion ? trillion : total);
        component.set('v.completed', completed > trillion ? trillion : completed);
    },
    handleRender: function (component, event, helper) {
		var color = component.get('v.color');
        var defaultColor = 'steelblue';
        var completed = component.get('v.completed');
        var total = component.get('v.total');

        if (!$A.util.isEmpty(completed) && !$A.util.isEmpty(total)) {
            var svgContainer = component.find('svg-container');
            
            var value = svgContainer.getElement().innerText;
            if (value.replace(/\s/g, '') !== '') {
                color = color || defaultColor;
                var percent = Math.round((completed / total) * 100);
                component.set('v.percent', percent);
                var remainder = 100 - percent;

                value = value.replace('<![CDATA[', '')
                    .replace(']]>', '')
                    .replace('{{color}}', color);
                svgContainer.getElement().innerHTML = value;

                var childNodePosition = component.get('v.variant') === 'ring' ? 5 : 3;
                window.setTimeout($A.getCallback(function () {
                    var valueElement = svgContainer.getElement().childNodes[0].childNodes[childNodePosition];
                    if (typeof valueElement != 'undefined') {
                        valueElement.setAttribute('stroke-dasharray', percent + ' ' + remainder);
                    }
                }), 500);
            }
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
WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF 
THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/
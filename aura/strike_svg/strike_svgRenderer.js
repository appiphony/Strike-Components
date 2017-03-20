({
    render: function(component, helper) {
        //grab attributes from the component markup
        var classname = component.get("v.class");
        var xlinkhref = component.get("v.xlinkHref");
        var ariaHidden = component.get("v.ariaHidden");
        var id = component.get('v.id');

        //return an svg element w/ the attributes
        var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        if (id) {
            svg.setAttribute('id', id);
        }

        if (classname) {
            svg.setAttribute('class', classname);
        }

        if (ariaHidden) {
            svg.setAttribute('aria-hidden', ariaHidden);
        }

        if (xlinkhref) {
            var use = document.createElementNS('http://www.w3.org/2000/svg', 'use');
            use.setAttribute('xmlns:xlink', 'http://www.w3.org/1999/xlink');
            use.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', xlinkhref);
            svg.appendChild(use);
            //svg.innerHTML = '<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="'+xlinkhref+'"/>';
        }

        return svg;
    }
})
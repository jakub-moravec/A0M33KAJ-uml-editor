
export const ActionStereotype = Object.freeze({"synchronous": "synchronous", "asynchronous": "asynchronous"});

export default class Action {


    constructor(beginning, source, target, name, stereotype) {
        this.beginning = beginning;
        this.source = source;
        this.target = target;
        this.name = name;
        this.nameEl = null;
        this.nameForm = null;
        this.stereotype = stereotype;
    }

    render() {
        /**
         * <svg width="300" height="100">

         <defs>
         <marker id="arrow" markerWidth="13" markerHeight="13" refx="2" refy="6" orient="auto">
         <path d="M2,2 L2,11 L10,6 L2,2" style="fill:red;" />
         </marker>
         </defs>

         <path d="M30,150 L100,50"
         style="stroke:red; stroke-width: 1.25px; fill: none; marker-end: url(#arrow);"
         />

         </svg>
         */

        let start = -1;
        let end = -1;

        if(this.source.order < this.target.order) {
            start = this.source.lifeLine.el.offsetLeft + this.source.el.offsetLeft + this.source.el.offsetWidth;
            end = this.target.lifeLine.el.offsetLeft + this.target.el.offsetLeft;
        } else {
            start = this.source.lifeLine.el.offsetLeft + this.source.el.offsetLeft;
            end = this.target.lifeLine.el.offsetLeft + this.target.el.offsetLeft + this.target.el.offsetWidth;
        }

        let width = Math.abs(end - start);
        let height = 20;

        let svg = document.createElement("svg");
        svg.setAttribute("width", width + "px");
        svg.setAttribute("height", height + "px");
        svg.style.width = width + "px";
        svg.style.height = height + "px";
        svg.style.left = Math.min(start, end);

        let defs = document.createElement("defs");
        let marker = document.createElement("marker");
        marker.id = "arrow";
        marker.setAttribute("markerWidth", "13");
        marker.setAttribute("refx", "2");
        marker.setAttribute("refy", "6");
        marker.setAttribute("orient", "auto");
        let markerPath = document.createElement("path");
        if(this.source.order < this.target.order) {
            markerPath.setAttribute("d", "M2,2 L2,11 L10,6 L2,2");
        } else {
            markerPath.setAttribute("d", "M2,2 L2,11 L10,6 L2,2");
        }
        markerPath.setAttribute("style", "fill:black");
        marker.appendChild(markerPath);
        defs.appendChild(marker);
        svg.appendChild(defs);

        let path = document.createElement("path");
        if(this.source.order < this.target.order) {
            path.setAttribute("d", "M30,150 L100,50");
        } else {
            path.setAttribute("d", "M30,150 L100,50");
        }
        path.setAttribute("style", "stroke:red; stroke-width: 1.25px; fill: black; marker-end: url(#arrow);");
        path.setAttribute("width", width + "px");
        path.setAttribute("height", height + "px");
        path.style.width = width + "px";
        path.style.height = height + "px";
        svg.appendChild(path);

        this.source.el.appendChild(svg);

        // switch(this.stereotype) {
        //     case ActionStereotype.synchronous:
        //     case ActionStereotype.asynchronous:
        //     default:
        //         alert("Bad action stereotype!");
        // }

    }
}
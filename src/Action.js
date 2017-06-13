

export default class Action {
    constructor(beginning, source, target, name, stereotype) {
        this.beginning = beginning;
        this.source = source;
        this.target = target;
        this.name = name;
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
         style="stroke:red; stroke-width: 1.25px; fill: none;
         marker-end: url(#arrow);"
         />

         </svg>
         */

        let svg = document.createElement("svg");

        let distance = 0;

        if(this.source.order < this.target.order) {
            distance = (this.target.order - this.source.order) * this.source.maxWidth;
        } else {
            // todo
        }


        svg.setAttribute("width", distance + 10);
        svg.setAttribute("height", 20);

        let arrow = "";
        switch(this.stereotype) {
            case ActionStereotype.synchronous:
                arrow = '' +
                    '<defs>'+
                    '<marker id="arrow" markerWidth="13" markerHeight="13" refx="2" refy="6" orient="auto">'+
                    '<path d="M2,1 L2,10 L10,6 L2,2"  />'+
                    '</marker>'+
                    '</defs>'+
                    '<path d="M0,5 L100,5" style="stroke:black; stroke-width: 1.25px; fill: none; marker-end: url(#arrow);" />';
                break;
            case ActionStereotype.asynchronous:
                //code block
                break;
            default:
                alert("Bad action stereotype!");
        }

    }
}
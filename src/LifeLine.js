import {app} from './App';
import LifeBar from "./LifeBar";

export default class LifeLine {
    constructor(name, innerEl, order, lineHeight = 800) {
        this.name = name;
        this.lineHeight = lineHeight;
        this.innerEl = innerEl;
        this.lineBars = [];
        this.order = order;
        this.maxWidth = 160;
        this.topOffset = 50;
        this.initialBarOffset = 30;
        this.initialBarDuration = 50;
    }

    _getMaxEndBar() {
        let maxBarEnd = 0;
        for(let i = 0; i < this.lineBars.length; i++){
            let barEnd = this.lineBars[i].beginning + this.lineBars[i].duration;
            if(barEnd > maxBarEnd) {
                maxBarEnd = barEnd;
            }
        }
        return maxBarEnd;
    }

    addBar() {
        let beginning = this._getMaxEndBar() + this.initialBarOffset;
        if (beginning + this.initialBarDuration <= this.lineHeight) {
            this.lineBars.push(new LifeBar(this, beginning, this.initialBarDuration));
            app.render();
        } else {
            alert("This line contains already to much bars!");
        }
    }

    removeBar(beginning, duration) {
        for(let i = 0; i < this.lineBars.length; i++){
            if(this.lineBars[i].beginning == beginning && this.lineBars[i].duration == duration) {
                this.lineBars.splice(i, 1);
                app.render();
                return;
            }
        }
    }

    render() {
        let mainPosition = this.innerEl.getBoundingClientRect();

        let lifeLine = document.createElement("div");
        lifeLine.style.left = (mainPosition.left + this.order * this.maxWidth + this.maxWidth / 2) + "px";
        lifeLine.style.top = (mainPosition.top + this.topOffset) + "px";
        lifeLine.classList.add("lifeline");
        this.innerEl.appendChild(lifeLine);
        this.el = lifeLine;

        let lineHead = document.createElement("div");
        lineHead.innerText = ":" + this.name;
        lineHead.classList.add("head");
        lineHead.addEventListener("click", function () {
            app.renderLifeLineForm(this);
        }.bind(this));
        lifeLine.appendChild(lineHead);

        let line = document.createElement("div");
        line.style.left = (lineHead.offsetWidth / 2)  + "px";
        line.style.top = lineHead.offsetHeight + "px";
        line.style.height = this.lineHeight+"px";
        line.classList.add("line");
        lifeLine.appendChild(line);

        let dropper = document.createElement("div");
        dropper.style.top = lineHead.offsetHeight + "px";
        dropper.style.height = this.lineHeight+"px";
        dropper.style.width = lineHead.offsetWidth + "px";
        dropper.classList.add("lineDropper");
        dropper.addEventListener("dragover", function (event) {
            event.preventDefault();
        }.bind(this));
        dropper.addEventListener("drop", function (event) {
            event.preventDefault();
            this.handleDrop(event);
        }.bind(this));
        lifeLine.appendChild(dropper);

        for (let i = 0; i < this.lineBars.length; i++) {
            this.lineBars[i].render(lineHead.offsetWidth/2, lineHead.offsetHeight);
        }

        let addBar = document.createElement("div");
        addBar.classList.add("addBar");
        addBar.addEventListener("click", function () {
            this.addBar();
        }.bind(this));
        lifeLine.appendChild(addBar);
        addBar.style.top = (lineHead.offsetHeight + this.lineHeight + addBar.offsetHeight) + "px" ;
        addBar.style.left = (lineHead.offsetWidth / 2 - addBar.offsetWidth/2)  + "px";

    }

    handleDrop(event) {
        if("undefined" !== typeof this.draggedBar && this.draggedBar !== null && ("undefined" === typeof this.draggedBarResizer || this.draggedBarResizer === null)) {
            console.log("move");
            let dragEnd = event.clientY;
            let newBeginning = this.draggedBar.beginning + dragEnd -this.draggedBar.dragStartY;
            if(newBeginning + this.draggedBar.duration <= this.lineHeight && newBeginning > 0) {
                this.draggedBar.beginning = newBeginning;
                app.render();
            } else {
                alert("Bar moved out of line!");
            }
            this.draggedBar = null;
        }

        if("undefined" !== typeof this.draggedBarResizer && this.draggedBarResizer !== null) {
            console.log("resize");
            let dragEnd = event.clientY;
            let newDuration = this.draggedBarResizer.duration + dragEnd -this.draggedBarResizer.dragStartY;
            if(this.draggedBarResizer.beginning + newDuration <= this.lineHeight && newDuration > 5) {
                this.draggedBarResizer.duration = newDuration;
                app.render();
            } else {
                alert("Bar duration to high or to low!");
            }
            this.draggedBarResizer = null;
        }
    }
}
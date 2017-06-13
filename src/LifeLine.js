import {app} from './App';

export default class LifeLine {
    constructor(name, innerEl, order, lineHeight = 800) {
        this.name = name;
        this.lineHeight = lineHeight;
        this.innerEl = innerEl;
        this.lineBars = [];
        this.order = order;
        this.maxWidth = 160;
        this.topOffset = 50;
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

        for (let i = 0; i < this.lineBars.length; i++) {
            this.lineBars[i].render(lineHead.offsetWidth/2, lineHead.offsetHeight);
        }
    }


}
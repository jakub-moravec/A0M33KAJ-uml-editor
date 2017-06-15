import {app} from './App';

export default class LifeBar {
    constructor(lifeLine, beginning, duration) {
        this.lifeLine = lifeLine;
        this.beginning = beginning;
        this.duration = duration;
        this.width = 16;
        this.actions = [];
    }

    render(initialWidth, initialHeight) {
        let bar = document.createElement("div");
        bar.style.left = (initialWidth - (this.width / 2)) + "px";
        bar.style.top = (initialHeight + this.beginning) + "px";
        bar.style.height = this.duration + "px";
        bar.style.width = this.width + "px";
        bar.setAttribute("draggable", "true");
        bar.classList.add("bar");
        bar.addEventListener("drag", function () {
            this.lifeLine.draggedBar = this;
        }.bind(this));
        bar.addEventListener("dragstart", function (event) {
           this.dragStartY = event.clientY;
        }.bind(this));
        bar.addEventListener("dragover", function (event) {
            event.preventDefault();
        }.bind(this));
        bar.addEventListener("drop", function (event) {
            event.preventDefault();
            this.lifeLine.handleDrop(event);
        }.bind(this));
        // create new action
        bar.addEventListener("click", function () {
            // this is click to second bar
            if("undefined" === typeof app.newActionStart || app.newActionStart === null) {
                app.newActionEnd = this;
            }
            app.newActionStart = this;
        });

        this.lifeLine.el.appendChild(bar);
        this.el = bar;

        let removeBar = document.createElement("div");
        removeBar.classList.add("removeButton");
        removeBar.addEventListener("click", function () {
            this.lifeLine.removeBar(this.beginning, this.duration);
        }.bind(this));
        bar.appendChild(removeBar);
        removeBar.style.top = -(removeBar.offsetHeight / 2) + "px" ;
        removeBar.style.left = (bar.offsetWidth / 2 - removeBar.offsetWidth)  + "px";
        removeBar.title = "Remove bar";

        let resizeBar = document.createElement("div");
        resizeBar.classList.add("resizeButton");
        resizeBar.setAttribute("draggable", "true");
        resizeBar.addEventListener("drag", function () {
            this.lifeLine.draggedBarResizer = this;
        }.bind(this));
        resizeBar.addEventListener("dragstart", function (event) {
            this.dragStartY = event.clientY;
        }.bind(this));
        bar.appendChild(resizeBar);
        resizeBar.style.top = (bar.offsetHeight - resizeBar.offsetHeight) + "px";
        resizeBar.style.left = (bar.offsetWidth /2 - resizeBar.offsetWidth)  + "px";
        resizeBar.title = "Resize bar";


        for (let i = 0; i < this.actions.length; i++) {
            this.actions[i].render();
        }
    }
}
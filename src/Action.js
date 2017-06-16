import {app} from './App';

export const ActionStereotype = Object.freeze({"synchronous": "synchronous", "asynchronous": "asynchronous"});

export default class Action {


    constructor(beginning, source, target, name, stereotype) {
        this.beginning = beginning;
        this.source = source;
        this.target = target;
        this.name = name;
        this.stereotype = stereotype;
        this.arrowSize = 10;
    }

    render() {
        let width = Math.abs(this.source.lifeLine.order - this.target.lifeLine.order) * this.source.lifeLine.maxWidth;
        let action = document.createElement("div");
        action.classList.add("action");
        action.style.top = this.beginning - Math.floor(this.arrowSize / 2) + "px";
        action.setAttribute("draggable", "true");
        action.addEventListener("drag", function () {
            app.draggedAction = this;
        }.bind(this));
        action.addEventListener("dragstart", function (event) {
            this.dragStartY = event.clientY;
        }.bind(this));
        action.addEventListener("click", function () {
            this.source.renderActionForm(this);
        }.bind(this));

        let arrow = document.createElement("div");

        let actionLine = document.createElement("div");
        if(this.stereotype === ActionStereotype.synchronous) {
            actionLine.classList.add("synchronous-line");
        } else {
            actionLine.classList.add("asynchronous-line");
        }
        width -= this.source.el.offsetWidth;
        if(this.source.lifeLine.order < this.target.lifeLine.order) {
            action.style.left = this.source.el.offsetWidth  - 2 + "px";
        } else {
            action.style.left = - width - 3 + "px";
        }
        actionLine.style.width = width - this.arrowSize + "px";
        actionLine.style.top = Math.floor(this.arrowSize / 2) + 2 + "px";

        if(this.source.lifeLine.order < this.target.lifeLine.order) {
            arrow.classList.add("arrow-right");
            action.appendChild(actionLine);
            action.appendChild(arrow);
            arrow.style.left = width - this.arrowSize + "px";
        } else {
            arrow.classList.add("arrow-left");
            action.appendChild(arrow);
            action.appendChild(actionLine);
            actionLine.style.left = this.arrowSize + "px";
        }

        let actionName = document.createElement("div");
        actionName.classList.add("action-name");
        actionName.innerText = this.name;
        action.appendChild(actionName);

        let removeBar = document.createElement("div");
        removeBar.classList.add("removeButton");
        removeBar.addEventListener("click", function () {
            this.source.deleteAction(this);
        }.bind(this));
        action.appendChild(removeBar);
        removeBar.style.top = 2 + "px";
        if(this.source.lifeLine.order < this.target.lifeLine.order) {
            removeBar.style.left = 0  + "px";
        } else {
            removeBar.style.left = width - (20)  + "px";
        }
        // removeBar.style.top = -(removeBar.offsetHeight / 2) + "px" ;
        removeBar.title = "Remove action";
        removeBar.style.height = 12 + "px";
        removeBar.style.width = 12 + "px";

        this.source.el.appendChild(action);
    }

    handleDrop(event) {
        let diff = event.clientY - this.dragStartY;
        let newBeginning = this.beginning + diff;
        if(newBeginning >= 0 && newBeginning <= this.source.duration) {
            this.beginning = newBeginning;
            app.render();
        }
    }
}
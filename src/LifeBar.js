import {app} from './App';
import Action from "./Action";
import {ActionStereotype} from './Action';

export default class LifeBar {
    constructor(lifeLine, beginning, duration) {
        this.lifeLine = lifeLine;
        this.beginning = beginning;
        this.duration = duration;
        this.width = 16;
        this.actions = [];
    }

    createNewAction(){
        if(this === app.newActionEnd) {
            return;
        }
        let action = new Action(this.newActionBeginning, this, app.newActionEnd, null, null);
        action.new = true;
        app.newActionStart = null;
        app.newActionEnd = null;
        this.renderActionForm(action);
    }

    updateAction(action, form) {
        let newName = form.elements["name"].value;
        if(newName == "") {
            alert("Empty name not allowed!");
            return;
        }
        if(newName.length > 8) {
            alert("Name is longer than 8 characters");
            return
        }

        let newStereotype = form.elements["stereotype"].options[form.elements["stereotype"].selectedIndex].value;
        let newStereotypeEl = null;
        if(newStereotype == "synchronous") {
            newStereotypeEl = ActionStereotype.synchronous;
        } else {
            newStereotypeEl = ActionStereotype.asynchronous;
        }

        if(action.new === true){
            action.stereotype = newStereotypeEl;
            action.name = newName;
            action.new = false;
            this.actions.push(action);
        } else {
            let index = this.actions.indexOf(action);
            action.stereotype = newStereotype;
            action.name = newName;
            this.actions.splice(index, 1, action);
        }
        app.render();
    }

    deleteAction(action) {
        this.actions.splice(this.actions.indexOf(action), 1);
        app.render();
    }

    renderActionForm(action) {

        let h = "<h2>Update Action</h2>";
        let form = document.createElement("form");

        let inputNameLabel = document.createElement("label");
        inputNameLabel.innerText = "Acton name:";
        form.appendChild(inputNameLabel);

        let inputName = document.createElement("input");
        inputName.type = "text";
        inputName.name = "name";
        inputName.placeholder = "action name";
        inputName.value = action.name;
        inputName.required = true;
        form.appendChild(inputName);

        let stereotypeLabel = document.createElement("label");
        stereotypeLabel.innerText = "Action stereotype:";
        form.appendChild(stereotypeLabel);

        let stereotype = document.createElement("select");
        stereotype.name = "stereotype";

        let sync = document.createElement("option");
        sync.value = ActionStereotype.synchronous;
        sync.innerText = ActionStereotype.synchronous;
        stereotype.appendChild(sync);

        let async = document.createElement("option");
        async.value = ActionStereotype.asynchronous;
        async.innerText = ActionStereotype.asynchronous;
        stereotype.appendChild(async);

        if (action.stereotype === ActionStereotype.synchronous) {
            sync.selected = true;
        } else if (action.stereotype === ActionStereotype.asynchronous) {
            async.selected = true;
        } else {
            sync.selected = true;
        }
        form.appendChild(stereotype);

        let saveButtonWrapper = document.createElement("div");
        let saveButton = document.createElement("input");
        saveButton.type = "submit";
        saveButton.value = "Save";
        saveButton.addEventListener("click", function (event) {
            this.updateAction(action, form);
            event.preventDefault();
        }.bind(this));
        saveButtonWrapper.appendChild(saveButton);
        form.appendChild(saveButtonWrapper);

        let cancelButtonWrapper = document.createElement("div");
        let cancelButton = document.createElement("input");
        cancelButton.type = "submit";
        cancelButton.value = "Cancel";
        cancelButton.addEventListener("click", function (event) {
            while (app.contextEl.firstChild) {
                app.contextEl.removeChild(app.contextEl.firstChild);
            }
            event.preventDefault();
        }.bind(this));
        cancelButtonWrapper.appendChild(cancelButton);
        form.appendChild(cancelButtonWrapper);

        app.contextEl.innerHTML = h;
        app.contextEl.appendChild(form);
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
        bar.addEventListener("click", function (event) {
            if(event.target.classList.contains("bar")) {
                // this is click to second bar
                if("undefined" == typeof app.newActionStart || app.newActionStart === null) {
                    app.newActionStart = this;
                    let approxY = event.clientY - this.el.getBoundingClientRect.top;
                    approxY = Math.max(0, approxY);
                    approxY = Math.min(this.duration, approxY);
                    this.newActionBeginning = approxY;
                } else {
                    app.newActionEnd = this;
                    app.newActionStart.createNewAction();
                }
            }
        }.bind(this));

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
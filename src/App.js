import LifeLine from "./LifeLine";

export default class App {
    constructor() {
        this.mainEl = document.getElementById("main");
        this.navigatorEl = document.getElementById("navigator");
        this.contextEl =  document.getElementById("context-menu");
        this.maxLifeLines = 5; // fixme
        this.lifeLines = [];
        this.newActionStart = null;
        this.newActionEnd = null;
    }

    addLifeLine(lifeLine) {
        if("undefined" === typeof lifeLine.order || lifeLine.order === null) {
            lifeLine.order = this.lifeLines.length;
        }
        if(lifeLine.order < this.maxLifeLines) {
            // move order
            if(lifeLine.order < this.lifeLines.length) {
                for(let i = lifeLine.order; i < this.lifeLines.length; i ++) {
                    this.lifeLines[i].order++;
                }
            }
            this.lifeLines.splice(lifeLine.order, 0, lifeLine);
            this.render();
        } else {
            alert("Maximum number of life lines reached! " + this.maxLifeLines);
        }
    }

    updateLifeLine(lifeLine, form) {
        let newName = form.elements["name"].value;
        if(newName == "") {
            alert("Empty name not allowed!");
            return;
        }
        if(newName.length > 8) {
            alert("Name is longer than 8 characters");
            return
        }

        if(lifeLine.new !== true) {
            let newOrder = form.elements["order"].options[form.elements["order"].selectedIndex].value - 1;
            this.deleteLifeLine(lifeLine);
            lifeLine.order = newOrder;
        } else {
            lifeLine.new = undefined;
        }

        lifeLine.name = newName;
        this.addLifeLine(lifeLine);
    }

    deleteLifeLine(lifeLine) {
        let index = this.lifeLines.indexOf(lifeLine);

        // move order
        if(index != this.lifeLines.length - 1) {
            for(let i = index; i < this.lifeLines.length; i ++) {
                this.lifeLines[i].order--;
            }
        }

        this.lifeLines.splice(index, 1);
        this.render();
    }

    render() {
        while (this.mainEl.firstChild) {
            this.mainEl.removeChild(this.mainEl.firstChild);
        }

        let navigator = document.createElement("ol");
        for (let i = 0; i < this.lifeLines.length; i++) {
            let lifeLine = this.lifeLines[i];
            lifeLine.render();

            let navigatorItem = document.createElement("li");
            navigatorItem.innerText = lifeLine.name;
            navigator.appendChild(navigatorItem);
            navigatorItem.addEventListener("click", function () {
                this.renderLifeLineForm(lifeLine);
            }.bind(this));
        }

        let addLifeLine = document.createElement("button");
        addLifeLine.innerText = "Add new LifeLine";
        addLifeLine.addEventListener("click", function (event) {
            let newLifeLine = new LifeLine();
            newLifeLine.name = "";
            newLifeLine.new = true;
            newLifeLine.innerEl = this.mainEl;
            this.renderLifeLineForm(newLifeLine);
            event.preventDefault();
        }.bind(this));

        while (this.navigatorEl.firstChild) {
            this.navigatorEl.removeChild(this.navigatorEl.firstChild);
        }
        this.navigatorEl.appendChild(navigator);
        this.navigatorEl.appendChild(addLifeLine);

        while (this.contextEl.firstChild) {
            this.contextEl.removeChild(this.contextEl.firstChild);
        }
    }

    renderLifeLineForm(lifeLine) {

        let h = "<h2>Update LifeLine</h2>";
        let form = document.createElement("form");

        let inputNameLabel = document.createElement("label");
        inputNameLabel.innerText = "LifeLine name:";
        form.appendChild(inputNameLabel);

        let inputName = document.createElement("input");
        inputName.type = "text";
        inputName.name = "name";
        inputName.placeholder = "lifeline name";
        inputName.value = lifeLine.name;
        inputName.required = true;
        form.appendChild(inputName);

        if(lifeLine.new !== true) {
            let orderLabel = document.createElement("label");
            orderLabel.innerText = "LifeLine order:";
            form.appendChild(orderLabel);

            let order = document.createElement("select");
            order.name = "order";
            let endIndex = lifeLine.new === true ? this.lifeLines.length + 1 : this.lifeLines.length;
            for (let i = 1; i <= endIndex; i++) {
                let option = document.createElement("option");
                option.value = i;
                option.innerText = i;
                order.appendChild(option);
                if (i - 1 == lifeLine.order) {
                    option.selected = true;
                }
                option.addEventListener("click", function () {
                    option.selected = true;
                });
            }
            form.appendChild(order);
        }

        let saveButtonWrapper = document.createElement("div");
        let saveButton = document.createElement("input");
        saveButton.type = "submit";
        saveButton.value = "Save";
        saveButton.addEventListener("click", function (event) {
            this.updateLifeLine(lifeLine, form);
            event.preventDefault();
        }.bind(this));
        saveButtonWrapper.appendChild(saveButton);
        form.appendChild(saveButtonWrapper);

        if(lifeLine.new !== true) {
            let deleteButtonWrapper = document.createElement("div");
            let deleteButton = document.createElement("input");
            deleteButton.type = "submit";
            deleteButton.value = "Delete";
            deleteButton.addEventListener("click", function (event) {

                event.preventDefault();
            }.bind(this));
            deleteButtonWrapper.appendChild(deleteButton);
            form.appendChild(deleteButtonWrapper);
        }

        this.contextEl.innerHTML = h;
        this.contextEl.appendChild(form);
    }
}

export let app = new App();
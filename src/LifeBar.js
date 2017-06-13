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
        this.lifeLine.el.appendChild(bar);

        for (let i = 0; i < this.actions.length; i++) {
            this.actions[i].render();
        }
    }
}
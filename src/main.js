import 'babel-polyfill';
import {app} from './App';
import LifeLine from './LifeLine';
import LifeBar from './LifeBar';
import Action from './Action';

// Enum for action stereotypes.
const ActionStereotype = Object.freeze({"synchronous":1, "asynchronous":2});

// function allowDrop(event) {
//     event.preventDefault();
// }
//
// function drag(event) {
//     let bar = event.target.classList.contains("bar");
//     if(bar === true) {
//         event.dataTransfer.setData("class", "bar");
//     }
//     event.dataTransfer.setData("source", event.target);
// }
//
// function drop(event) {
//     event.preventDefault();
//     let clazz = event.dataTransfer.getData("class");
//     let target = event.target;
//     let source = event.dataTransfer.getData("source");
//
//
//
//     event.target.appendChild(document.getElementById(clazz));
// }



let lifeLine1 = new LifeLine("test1", app.mainEl, 0);
let bars = [new LifeBar(lifeLine1, 10, 50), new LifeBar(lifeLine1, 70, 100)];
lifeLine1.lineBars = bars;

let lifeLine2 = new LifeLine("test2", app.mainEl, 1);
let bars2 = [new LifeBar(lifeLine2, 15, 45)];
lifeLine2.lineBars = bars2;

let lifeLine3 = new LifeLine("test3", app.mainEl, 2);

let lifeLine4 = new LifeLine("test4", app.mainEl, 3);

let lifeLine5 = new LifeLine("test5", app.mainEl, 4);

app.addLifeLine(lifeLine1);
app.addLifeLine(lifeLine2);
app.addLifeLine(lifeLine3);
app.addLifeLine(lifeLine4);
app.addLifeLine(lifeLine5);

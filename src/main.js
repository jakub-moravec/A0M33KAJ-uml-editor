import 'babel-polyfill';
import App from './App';
import LifeLine from './LifeLine';
import LifeBar from './LifeBar';
import Action from './Action';

const maxLifeLines = 5; // fixme

const mainEl = document.getElementById("main");
const navigatorEl = document.getElementById("navigator");
const contextEl = document.getElementById("context-menu");

// Enum for action stereotypes.
const ActionStereotype = Object.freeze({"synchronous":1, "asynchronous":2});
let app = new App(mainEl, navigatorEl, contextEl, maxLifeLines);


let lifeLine1 = new LifeLine("test1", mainEl, 0);
let bars = [new LifeBar(lifeLine1, 10, 50), new LifeBar(lifeLine1, 70, 100)];
lifeLine1.lineBars = bars;

let lifeLine2 = new LifeLine("test2", mainEl, 1);
let bars2 = [new LifeBar(lifeLine2, 15, 45)];
lifeLine2.lineBars = bars2;

let lifeLine3 = new LifeLine("test3", mainEl, 2);

let lifeLine4 = new LifeLine("test4", mainEl, 3);

let lifeLine5 = new LifeLine("test5", mainEl, 4);

app.addLifeLine(lifeLine1);
app.addLifeLine(lifeLine2);
app.addLifeLine(lifeLine3);
app.addLifeLine(lifeLine4);
app.addLifeLine(lifeLine5);

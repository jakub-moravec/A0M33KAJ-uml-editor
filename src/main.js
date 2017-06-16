import 'babel-polyfill';
import {app} from './App';
import LifeLine from './LifeLine';
import LifeBar from './LifeBar';
import Action from './Action';
import {ActionStereotype} from './Action';

let lifeLine1 = new LifeLine("test1", app.mainEl, 0);
let lifeLine2 = new LifeLine("test2", app.mainEl, 1);
let lifeLine3 = new LifeLine("test3", app.mainEl, 2);

app.addLifeLine(lifeLine1);
app.addLifeLine(lifeLine2);
app.addLifeLine(lifeLine3);

let bar1 = new LifeBar(lifeLine1, 10, 60);
lifeLine1.lineBars = [bar1];
let bar2 = new LifeBar(lifeLine2, 30, 35);
lifeLine2.lineBars = [bar2];
let bar3 = new LifeBar(lifeLine3, 15, 20);
lifeLine3.lineBars = [bar3];
app.render();

let action1 = new Action(10, bar1, bar3, "async", ActionStereotype.asynchronous);
let action2 = new Action(25, bar1, bar2, "sync", ActionStereotype.synchronous);
bar1.actions = [action1, action2];

let action3 = new Action(30, bar2, bar1, "reply", ActionStereotype.synchronous);
bar2.actions = [action3];
app.render();


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


let bar1 = new LifeBar(lifeLine1, 10, 50);
lifeLine1.lineBars = [bar1];
let bar2 = new LifeBar(lifeLine2, 15, 45);
lifeLine2.lineBars = [bar2];
app.render();


let action11 = new Action(5, bar1, bar2, "x", ActionStereotype.synchronous);
bar1.actions = [action11];
app.render();


import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';

import { todoItem } from './components/todoitem';
import { todoProject } from './components/todoproject'
import todoBook from './components/todobook';

const item1 = todoItem('first', 'fisrt task', '2/08/2020', 'high');
const p1 = todoProject('project1');
console.log(p1.getName());
p1.changeName('new name');
console.log(p1.getName());

const book = todoBook('user');
book.initialize();
console.log(book.getProjects()[0].getName());
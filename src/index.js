import './style.css';

import { todoItem } from './components/todoitem.js'
//import { todoProject } from './components/todoproject.js'

var item1 = todoItem('first', 'fisrt task', '2/08/2020', 'high');
console.log(item1.getTitle());
console.log(item1.getDescription());

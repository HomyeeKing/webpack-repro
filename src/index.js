import styles from './style.less';
import * as lodash from 'lodash-es';
import { a } from 'virtual:test';
console.log('a', a);

console.log('lodash', lodash);
const element = document.createElement('div');
element.className = styles['skill-card-group-homepage']; // 使用 CSS Modules 中的类名
element.textContent = 'Hello, Webpack with LESS and CSS Modules!';
document.body.appendChild(element);

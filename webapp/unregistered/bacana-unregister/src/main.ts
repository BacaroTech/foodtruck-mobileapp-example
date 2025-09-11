import './style.css';

import Alpine from 'alpinejs';

import LoginComponent from './Login';
import Store from './Store';

window.Alpine = Alpine;
 
Alpine.store('state', Store);

Alpine.data('loginComponent', LoginComponent);

Alpine.start()
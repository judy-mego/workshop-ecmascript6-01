import { Main, Login } from 'components';

const main = new Main();
const login = new Login();

window.actions = {
    loginHandler: function() {
        login.init();
    }
}

window.onload = function() {
    main.init('Hello World', 'Ecmascript6');
}

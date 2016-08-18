import $ from 'jquery';

export default class Main {
    constructor() {

    }
    init (title = 'Title', txt = 'Template') {
        $('.content').html(`
            <h1>${title}</h1>
            <p>${txt}</p>
            <a onClick="actions.loginHandler()">Login</a>
        `);
    }

}

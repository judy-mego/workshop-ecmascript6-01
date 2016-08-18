import $ from 'jquery';

export default class Login {
    constructor() {
    }
    init() {

        $('.content').html(`
            <form>
                <input type="email" placeholder="Enter your email">
                <input type="password" placeholder="Enter your password">
                <button>Send</button>
            </form>
        `);
    }
}

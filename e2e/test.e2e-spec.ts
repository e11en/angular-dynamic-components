import { browser, by, element } from 'protractor';

describe('dashboard', () => {
    it('should display welcome message', () => {
        browser.get('/');
        const title = element(by.css('app-root h1')).getText();
        expect(title).toEqual('Welcome to app!');
    });

    it('should be able to add a new todo', () => {
        browser.get('/');
        const newTodoInput = element(by.css('.add-todo input[type=text]'));
        newTodoInput.sendKeys('Todo 4');

        const newTodoSubmitButton = element(by.css('.add-todo input[type=submit]'));
        newTodoSubmitButton.click();

        const todos = element.all(by.css('.todos .todo'));
        expect(todos.count()).toEqual(4);
    });
});

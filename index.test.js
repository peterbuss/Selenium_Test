const { By, until } = require('selenium-webdriver');
const { init, 
        die, 
        getUrl,
        testTitle,
        setDelay,
        registerUser,
        loginUser,
        addBook, 
        editBook,
        addAuthor,
        editAuthor 
    } = require('./helpers/initialization');

describe("", () => {
    let driver, firstName;

    beforeAll(() => {
        driver = init();
    });

    afterAll(() => {
        die();
    });

    it('As a user I want to open the home page', async () => {
        await getUrl();
        await testTitle('Home');
        await setDelay();
    }, 10000);

    it("As a user I want to render the register page", async() => {
        let registerElement = await driver.findElement(By.name('register'));
        await registerElement.click();
        await driver.wait(until.titleContains('Register'), 2000);
        await testTitle('Register');
        await setDelay();
    }, 30000);

    it("As a user I want to register on the site", async() => {
        firstName = await registerUser();
        await driver.wait(until.titleContains('Login'), 2000);
        await testTitle('Login');
        const message = await driver.findElement(By.name('message')).getText();
        await expect(message).toEqual('Registration Successful');
        await setDelay();
    }, 60000);

    it("As a user I want to Login", async () => {
        await loginUser();
        await driver.wait(until.titleContains('Home'), 2000);
        await testTitle('Home');
        const message = await driver.findElement(By.name('message')).getText();
        await expect(message).toEqual("Welcome " + firstName);
        await setDelay();
    }, 10000);

    it("As a user I want to go to the books page", async() => {
        let bookElement = await driver.findElement(By.name('books'));
        await bookElement.click();
        await driver.wait(until.titleContains('Books'), 3000);
        await testTitle('Books');
        await setDelay();
    });

    it("As a user I want to go to the add book page", async() => {
        let addBookElement = await driver.findElement(By.name('addBook'));
        await addBookElement.click();
        await driver.wait(until.titleContains('Add a book'), 30000);
        await testTitle('Add a book');
        const h2 = await driver.findElement(By.name('h2-title')).getText();
        await expect(h2).toEqual('Add a book');
        await setDelay();
    }, 30000);

    it("As a user I want to save a book", async() => {
        await addBook();
        await driver.wait(until.titleContains('Book'), 80000);
        await testTitle('Book');
        const message = await driver.findElement(By.name('message')).getText();
        await expect(message).toEqual("Book saved");
    }, 90000);

    it("As a user I want to go to the edit book page", async() => {
        let editBookElement = await driver.findElement(By.name('editBook'));
        await editBookElement.click();
        await driver.wait(until.titleContains('Edit a book'), 30000);
        await testTitle('Edit a book');
        const h2 = await driver.findElement(By.name('h2-title')).getText();
        await expect(h2).toEqual('Edit a book');
        await setDelay();
    }, 30000);

    it("As a user I want to update a book", async() => {
        await editBook();
        await driver.wait(until.titleContains('Books'), 80000);
        await testTitle('Books');
        const message = await driver.findElement(By.name('message')).getText();
        await expect(message).toEqual("Book updated");
    }, 90000);

    it("As a user I want to go to the authors page", async() => {
        let authorsElement = await driver.findElement(By.name('authors'));
        await authorsElement.click();
        await driver.wait(until.titleContains('Authors'), 30000);
        await testTitle('Authors');
        await setDelay();
    }, 30000);

    it("As a user I want to go to the add authors page", async() => {
        let addAuthorElement = await driver.findElement(By.name('addAuthor'));
        await addAuthorElement.click();
        await driver.wait(until.titleContains('Add an Author'), 30000);
        await testTitle('Add an Author');
        const h2 = await driver.findElement(By.name('h2-title')).getText();
        await expect(h2).toEqual('Add an Author');
        await setDelay();
    }, 30000);
 
    it("As a user I want to save an Author", async() => {
        await addAuthor();
        await driver.wait(until.titleContains('Authors'), 80000);
        await testTitle('Authors');
        const message = await driver.findElement(By.name('message')).getText();
        await expect(message).toEqual("Author saved");
    }, 30000);    
    
    it("As a user I want to go to the edit author page", async () => {
        let editAuthorElement = await driver.findElement(By.name('editAuthor'));
        await editAuthorElement.click();
        await driver.wait(until.titleContains("Edit an Author"), 10000);
        await testTitle("Edit an Author");
        const h2 = await driver.findElement(By.name('h2-title')).getText();
        await expect(h2).toEqual("Edit an Author");
        await setDelay();
    }, 30000);

    it("As a user I want to edit an Author", async() => {
        await editAuthor();
        await setDelay();
        await driver.wait(until.titleContains("Authors"), 3000);
        await testTitle("Authors");
        const message = await driver.findElement(By.name('message')).getText();
        await expect(message).toEqual("Author updated");
        await setDelay();
    }, 30000); 

    it("As a user I want to delete an author", async() =>  {
        let deleteElement = await driver.findElement(By.name('deleteAuthor'));
        await deleteElement.click();
        await driver.wait(until.titleContains("Authors"), 5000);
        await testTitle("Authors");
        const message = await driver.findElement(By.name('message')).getText();
        await expect(message).toEqual('Author deleted');
        await setDelay();
    }, 30000);

    it("As a user I want to delete a book", async () => {
        const bookElement = await driver.findElement(By.name("books"));
        await bookElement.click();
        await driver.wait(until.titleContains("Books"), 5000);
        await testTitle("Books");
        await setDelay();
        let deleteElement = await driver.findElement(By.name("deleteBook"));
        await deleteElement.click();
        await driver.wait(until.titleContains("Books"), 5000);
        await testTitle("Books");
        const message = await driver.findElement(By.name("message")).getText();
        await expect(message).toEqual("Book deleted");
        await setDelay();
    }, 30000);

    it("As a user I want to render the about page", async () => {
        let aboutElement = await driver.findElement(By.id('about'));
        await aboutElement.click();
        await driver.wait(until.titleContains("About"), 5000);
        await testTitle("About");
        await setDelay();
    }, 20000);

    it("As a user I want to logout", async () => {
        let logOutElement = await driver.findElement(By.id("logout"));
        await logOutElement.click();
        await driver.wait(until.titleContains("Home"), 5000);
        await testTitle("Home");
        await setDelay();
    }, 15000);
});


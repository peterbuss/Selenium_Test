const { Builder, Key, By, until } = require('selenium-webdriver');
require('dotenv').config();

let driver, firstName, email, password ;

const init = () => {
    driver = new Builder().forBrowser('chrome').build();
    driver.manage().window().maximize();
    return driver;
};

const die = () => {
    driver.quit();
};

const getUrl = async () => {
    await driver.get(process.env.url);
};

const setDelay = async() => {
    await driver.sleep(2000);
};

const testTitle = async(theTitle) => {
    await driver.getTitle().then((title) => {
        expect(title).toEqual(theTitle);
    });
};

const randNum = () => {
    return Math.ceil(Math.random() * 1000000);
};

const registerUser = async() => {
    let firstNameElement = await driver.findElement(By.name('firstName'));
    firstName = 'Peter' ;
    await firstNameElement.sendKeys(firstName, Key.TAB);

    let lastNameElement = await driver.findElement(By.name('lastName'));
    await lastNameElement.sendKeys('BUSS', Key.TAB);

    let addressElement = await driver.findElement(By.name('address'));
    await addressElement.sendKeys('123 Bord St.', Key.TAB);

    let cityElement = await driver.findElement(By.name('city'));
    await cityElement.sendKeys('Bellach', Key.TAB);

    let stateElement = await driver.findElement(By.name('state'));
    await stateElement.sendKeys('CA', Key.TAB);

    let zipCodeElement = await driver.findElement(By.name('zipCode'));
    await zipCodeElement.sendKeys('12345', Key.TAB);

    email = 'peter' + randNum() + '@gmail.com';
    let emailElement = await driver.findElement(By.name('email'));
    await emailElement.sendKeys(email, Key.TAB);

    password = 'Ab345678';
    let passwordElement = await driver.findElement(By.name('password'));
    await passwordElement.sendKeys(password, Key.TAB);

    let confirmPasswordElement = await driver.findElement(By.name('confirmPassword'));
    await confirmPasswordElement.sendKeys(password, Key.TAB);

    let buttonElement = await driver.findElement(By.name('register-btn'));
    buttonElement.sendKeys(Key.ENTER);

    return firstName;
};

const loginUser = async() => {
    let loginElement = await driver.findElement(By.name('login'));
    await loginElement.click();
    await driver.wait(until.titleContains('Login'), 2000);
    let emailElement = await driver.findElement(By.name('email'));
    await emailElement.sendKeys(email, Key.TAB);
    let passwordElement = await driver.findElement(By.name('password'));
    await passwordElement.sendKeys(password, Key.TAB);
    let loginBtn = await driver.findElement(By.name('login-btn'));
    loginBtn.sendKeys(Key.ENTER);
    await setDelay();
};

const addBook = async() => {
    await driver.wait(until.titleContains("Add a book"), 30000);
    let titleElement = await driver.findElement(By.name('title'));
    await titleElement.sendKeys('Down Under', Key.TAB);
    let authorElement = await driver.findElement(By.id('author'));
    await authorElement.sendKeys('Steve Irwin', Key.TAB);
    let ISBNElement = await driver.findElement(By.name('ISBN'));
    await ISBNElement.sendKeys('127-980-457-5', Key.TAB);
    let numberOfPageseElement = await driver.findElement(By.name('numberOfPages'));
    await numberOfPageseElement.sendKeys('412', Key.TAB);
    let priceElement = await driver.findElement(By.name('price'));
    await priceElement.sendKeys('17.66', Key.TAB);
    let yearPublishedElement = await driver.findElement(By.name('yearPublished'));
    await yearPublishedElement.sendKeys('2004', Key.TAB);

    let addBookBtn = await driver.findElement(By.name('addBook-btn'));
    addBookBtn.sendKeys(Key.ENTER);
    await setDelay();
};

const editBook = async() => {
    await driver.wait(until.titleContains("Edit a book"), 30000);

    let authorElement = await driver.findElement(By.id('author'));
    await authorElement.clear();
    await authorElement.sendKeys('Steve-o Irwin', Key.TAB);
    let ISBNElement = await driver.findElement(By.name('ISBN'));
    await ISBNElement.clear();
    await ISBNElement.sendKeys('127-980-457-5', Key.TAB);
    let numberOfPageseElement = await driver.findElement(By.name('numberOfPages'));
    await numberOfPageseElement.clear();
    await numberOfPageseElement.sendKeys('444', Key.TAB);
    let priceElement = await driver.findElement(By.name('price'));
    await priceElement.clear();
    await priceElement.sendKeys('17.99', Key.TAB);
 
    let addBookBtn = await driver.findElement(By.name('editBook-btn'));
    addBookBtn.sendKeys(Key.ENTER);
    await setDelay();
};

const addAuthor = async() => {
    await driver.wait(until.titleContains("Add an Author"), 30000);
    sendPayload('name', 'Steve Irwin');
    sendPayload('publisher', 'Aussie Publishing');
    sendPayload('website', 'www.australiozoo.au');
    sendPayload('twitter', '@crochunter');
    sendPayload('about', 'My name is Steve-o and my game is crocs');
/* 
    let yearPublishedElement = await driver.findElement(By.name('yearPublished'));
    await yearPublishedElement.sendKeys('2004', Key.TAB);
 */
    let addAuthorBtn = await driver.findElement(By.name('add-author-btn'));
    addAuthorBtn.sendKeys(Key.ENTER);
    await setDelay();
};

const sendPayload = async (element, payload) => {
    let newElement = await driver.findElement(By.name(element));
    await newElement.sendKeys(payload, Key.TAB);
};


const clearAndSendPayload = async (element, payload) => {
    let newElement = await driver.findElement(By.name(element));
    newElement.clear();
    await newElement.sendKeys(payload, Key.TAB);
}; 

const editAuthor = async () => {
    await driver.wait(until.titleContains("Edit an Author"), 5000);
    clearAndSendPayload("name", "Steve-o Irwin");
    clearAndSendPayload("publisher", "Down Under Publishing");
    clearAndSendPayload("twitter", "@crikey");
    let editAuthorBtn = await driver.findElement(By.name("edit-author-btn"));
    editAuthorBtn.sendKeys(Key.ENTER);
};

module.exports = {  init, 
                    die, 
                    getUrl, 
                    setDelay, 
                    testTitle,
                    registerUser, 
                    loginUser,
                    addBook,
                    editBook,
                    addAuthor,
                    editAuthor
                };


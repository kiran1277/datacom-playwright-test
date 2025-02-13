import {test, expect} from "playwright/test";
import {Page} from "playwright";
const elements = {

  firstName: "#firstName",
  lastName: "#lastName",
  email: "#emailAddress",
  password: "#password",
  phone: "#phone",
  countryDropDown: "#countries_dropdown_menu",
  registerButton: "button[type=submit]",
  termsCheckBox: "#exampleCheck1",
  message:"#message"

}

test.describe('Bugs Form Test', ()=>{
  test("Check all required fields enabled", async ({page}) =>{
    expect(await page.locator(elements.firstName).isEditable()).toBeTruthy();
    expect(await page.locator(elements.lastName).isEditable()).toBeTruthy();
    expect(await page.locator(elements.phone).isEditable()).toBeTruthy();
    expect(await page.locator(elements.email).isEditable()).toBeTruthy();
    expect(await page.locator(elements.password).isEditable()).toBeTruthy();
    expect(await page.locator(elements.countryDropDown).isEditable()).toBeTruthy();
    expect(await page.locator(elements.registerButton).isEnabled()).toBeTruthy();
    expect(await page.locator(elements.termsCheckBox).isEnabled()).toBeTruthy();

  });
  test('Register user with valid data', async ({page})=>{
    //Register user and validate response displayed
    await page.fill(elements.firstName, "Kiran");
    await page.fill(elements.lastName, "kallepu");
    await page.fill(elements.phone, "1234567891");
    await page.fill(elements.email, "test@test.com");
    await page.fill(elements.password, "test@test.com");
    await page.selectOption(elements.countryDropDown, "New Zealand");
    // await page.check(elements.termsCheckBox)
    await page.click(elements.registerButton);
    expect(await page.isVisible(elements.message)).toBeTruthy();
    await expect( page.locator(elements.message)).toContainText("Successfully registered the following information");
    const firstName = await page.locator("#resultFn").textContent();
    const lastName = await page.locator("#resultLn").textContent();
    const phone = await page.locator("#resultPhone").textContent();
    const country = await page.locator("#country").textContent();
    const email = await page.locator("#resultEmail").textContent();
    expect(getTextValue(firstName, ":")).toEqual("Kiran");
    expect(getTextValue(lastName, ":")).toEqual("kallepu");
    expect(getTextValue(phone, ":")).toEqual("1234567891")
    expect(getTextValue(country, ":")).toEqual("New Zealand")
    expect(getTextValue(email, ":")).toEqual("test@test.com")
  });

  test('Label validation', async ({page}) =>{
    //validating label displayed on the page
    await expect(page.locator("label[for='firstName']")).toContainText("First Name");
    await expect(page.locator("label[for='lastName']").first()).toContainText("Last Name");
    await expect(page.locator("label[for='exampleInputEmail1']")).toContainText("Email address");
    await expect(page.locator("label[for='exampleInputPassword1']")).toContainText("Password");
    await expect(page.locator("label[for='exampleCheck1']")).toContainText("I agree with the terms and conditions");
    await expect(page.locator("//select[@id='countries_dropdown_menu']/../label")).toContainText("Country");
    await expect(page.locator("//input[@id='phone']/../label")).toContainText("Phone Number");
  });



  const getTextValue = (fullText: null | string, label: string): string => {
    return fullText?.split(label)[1]?.trim() || '';
  };


});
//test data for negative test cases
const userData=[
  {test:"numericFirstName",firstName : "1234", lastName : "kiran", phone: "1234567891", emailAddress: "test@test.com", password: "test@test.com", country : "New Zealand", message:"First Name should not be numeric"},
  {test:"emptyFirstName",firstName : "", lastName : "kiran", phone: "1234567891", emailAddress: "test@test.com", password: "test@test.com", country : "New Zealand", message:"First Name should not be empty"},
  {test:"specialCharacterFirstName",firstName : "@$%%", lastName : "kiran", phone: "1234567891", emailAddress: "test@test.com", password: "test@test.com", country : "New Zealand", message:"First Name should not contain special character"},
  {test:"emptyLastName",firstName : "kiran", lastName : "", phone: "1234567891", emailAddress: "test@test.com", password: "test@test.com", country : "New Zealand", message:"Last Name should not be empty"},
  {test:"numericLastName",firstName : "kiran", lastName : "1234", phone: "1234567891", emailAddress: "test@test.com", password: "test@test.com", country : "New Zealand", message:"Last Name should not be numeric"},
  {test:"specialCharacterLastName",firstName : "kiran", lastName : "@!#$", phone: "1234567891", emailAddress: "test@test.com", password: "test@test.com", country : "New Zealand", message:"Last Name should not contain special character"},
  {test:"emptyPhoneNumber",firstName : "kiran", lastName : "kiran", phone: "", emailAddress: "test@test.com", password: "test@test.com", country : "New Zealand", message:"The phone number should contain at least 10 characters!"},
  {test:"shortPhoneNumber",firstName : "kiran", lastName : "kiran", phone: "123456789", emailAddress: "test@test.com", password: "test@test.com", country : "New Zealand", message:"The phone number should contain at least 10 characters!"},
  {test:"alphaCharacterPhoneNumber",firstName : "kiran", lastName : "kiran", phone: "abcdefghst", emailAddress: "test@test.com", password: "test@test.com", country : "New Zealand", message:"The phone number should be numeric!"},
  {test:"emptyEmail",firstName : "kiran", lastName : "kiran", phone: "1234567891", emailAddress: "", password: "test@test.com", country : "New Zealand", message:"Email address should not be empty"},
  {test:"wrongEmailFormat",firstName : "kiran", lastName : "kiran", phone: "1234567891", emailAddress: "testabcc", password: "test@test.com", country : "New Zealand", message:"Invalid Email address address format"},
  {test:"specialCharacterEmail",firstName : "kiran", lastName : "kiran", phone: "1234567891", emailAddress: "!&2@test.com", password: "test@test.com", country : "New Zealand", message:"Invalid Email address address format"},
  {test:"emptyPassword",firstName : "kiran", lastName : "kiran", phone: "1234567891", emailAddress: "test@test.com", password: "", country : "New Zealand", message:"The password should contain between [6,20] characters!"},
  {test:"shortPassword",firstName : "kiran", lastName : "kiran", phone: "1234567891", emailAddress: "test@test.com", password: "test@", country : "New Zealand", message:"The password should contain between [6,20] characters!"},
  {test:"maxLengthPassword",firstName : "kiran", lastName : "kiran", phone: "1234567891", emailAddress: "test@test.com", password: "test@test.com1234567", country : "New Zealand", message:"Successfully registered the following information"},
  {test:"overLengthPassword",firstName : "kiran", lastName : "kiran", phone: "1234567891", emailAddress: "test@test.com", password: "abcdefghijklmnopqrstuv", country : "New Zealand", message:"The password should contain between [6,20] characters!"},
];
//test initialisation
test.beforeEach( async ({page}) =>{
  await page.goto('https://qa-practice.netlify.app/bugs-form');
  await expect(page.locator('#content h2')).toContainText('CHALLENGE - Spot the BUGS!')
});

test.afterEach( async ({page}: {page: Page}, testInfo) => {
  if(testInfo.status!== 'passed') await page.screenshot({path:`screenshots/${testInfo.title}.png`, fullPage: true});
  await page.close();
});
test.describe('Register user with invalid data ', ()=>{

  for (const user of userData) {
    test(`Register user with  ${user.test}`, async ({page}) => {
        await page.fill(elements.firstName, user.firstName);
        await page.fill(elements.lastName, user.lastName);
        await page.fill(elements.phone, user.phone);
        await page.fill(elements.email, user.emailAddress);
        await page.fill(elements.password, user.password);
        await page.selectOption(elements.countryDropDown, user.country);
        await page.click(elements.registerButton);
        expect(await page.isVisible(elements.message)).toBeTruthy();
        const message = await page.locator(elements.message).textContent();
        expect(message).toEqual(user.message);
    });
  }
})

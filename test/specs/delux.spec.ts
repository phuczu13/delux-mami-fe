import { $, browser } from "@wdio/globals";

describe("Login and create income transaction success", () => {
  before(async () => {
    await (browser as any).startActivity(
      "com.diepvanthanh.curxormobile",
      "com.diepvanthanh.curxormobile.MainActivity"
    );
  });

  test("Đăng nhập và tạo thành công income", async () => {
    const emailInput = await $(
      'android=new UiSelector().resourceId("email-input")'
    );
    await emailInput.waitForDisplayed({ timeout: 5000 });
    await emailInput.setValue("dvt41557@gmail.com");

    const passwordInput = await $(
      'android=new UiSelector().resourceId("password-input")'
    );
    await passwordInput.waitForDisplayed({ timeout: 5000 });
    await passwordInput.setValue("Diepvanthanh1@");

    await $("~Login").click();
    const homeScreen = await $(
      'android=new UiSelector().className("android.widget.FrameLayout").instance(0)'
    );
    await homeScreen.waitForDisplayed({ timeout: 10000 });
    expect(await homeScreen.isDisplayed()).toBe(true);
    const btnok = await $(
      'android=new UiSelector().resourceId("android:id/button1")'
    );
    await btnok.click();
    const btnAdd = await $('android=new UiSelector().description("ADD")');
    await btnAdd.click();
    const btnAddTransaction = await $(
      'android=new UiSelector().description("Add new income")'
    );
    await btnAddTransaction.click();
    const cateInput = await $(
      'android=//android.widget.EditText[@text="Category"]'
    );
    await cateInput.waitForDisplayed({ timeout: 5000 });
    await cateInput.setValue("Food");
    const totalMoney = await $('android=new UiSelector().text("Total Money")');
    await totalMoney.waitForDisplayed({ timeout: 5000 });
    await totalMoney.setValue("1000000");
    const desInput = await $('android=new UiSelector().text("Description")');
    await desInput.waitForDisplayed({ timeout: 5000 });
    await desInput.setValue("Food for me");
    const btnContinue = await $(
      'android=new UiSelector().description("Continue")'
    );
    await btnContinue.click();
  });
});

describe("Login and create expense transaction success", () => {
  before(async () => {
    await (browser as any).startActivity(
      "com.diepvanthanh.curxormobile",
      "com.diepvanthanh.curxormobile.MainActivity"
    );
  });

  test("Đăng nhập và tạo thành công chi tiêu", async () => {
    const emailInput = await $(
      'android=new UiSelector().resourceId("email-input")'
    );
    await emailInput.waitForDisplayed({ timeout: 5000 });
    await emailInput.setValue("dvt41557@gmail.com");

    const passwordInput = await $(
      'android=new UiSelector().resourceId("password-input")'
    );
    await passwordInput.waitForDisplayed({ timeout: 5000 });
    await passwordInput.setValue("Diepvanthanh1@");

    await $("~Login").click();
    const homeScreen = await $(
      'android=new UiSelector().className("android.widget.FrameLayout").instance(0)'
    );
    await homeScreen.waitForDisplayed({ timeout: 10000 });
    expect(await homeScreen.isDisplayed()).toBe(true);
    const btnok = await $(
      'android=new UiSelector().resourceId("android:id/button1")'
    );
    await btnok.click();
    const btnAdd = await $('android=new UiSelector().description("ADD")');
    await btnAdd.click();
    const btnAddTransaction = await $(
      'android=new UiSelector().description("Add new expense")'
    );
    await btnAddTransaction.click();
    const cateInput = await $(
      'android=new UiSelector().resourceId("category-input")'
    );
    await cateInput.waitForDisplayed({ timeout: 5000 });
    await cateInput.setValue("Food");
    const totalMoney = await $(
      'android=new UiSelector().resourceId("total-money-input")'
    );
    await totalMoney.waitForDisplayed({ timeout: 5000 });
    await totalMoney.setValue("1000000");
    const desInput = await $(
      'android=new UiSelector().resourceId("description-input")'
    );
    await desInput.waitForDisplayed({ timeout: 5000 });
    await desInput.setValue("Food for me");
    const btnContinue = await $(
      'android=new UiSelector().resourceId("submit-button")'
    );
    await btnContinue.click();
  });
});

describe("SignUp Success", () => {
  test("Đăng ký thành công", async () => {
    const emailInput = await $(
      'android=new UiSelector().resourceId("email-input")'
    );
    await emailInput.waitForDisplayed({ timeout: 5000 });
    await emailInput.setValue("diepvanthanh@gmail.com");
    const passwordInput = await $(
      'android=new UiSelector().resourceId("password-input")'
    );
    await passwordInput.waitForDisplayed({ timeout: 5000 });
    await passwordInput.setValue("Diepvanthanh1@");
    const confirmPasswordInput = await $(
      'android=new UiSelector().resourceId("confirm-password-input")'
    );
    await confirmPasswordInput.waitForDisplayed({ timeout: 5000 });
    await confirmPasswordInput.setValue("Diepvanthanh1@");
    const btnSignUp = await $(
      'android=new UiSelector().resourceId("register-button")'
    );
    await btnSignUp.waitForDisplayed({ timeout: 5000 });
    await btnSignUp.click();
    const homeScreen = await $(
      'android=new UiSelector().className("android.widget.FrameLayout").instance(0)'
    );
    await homeScreen.waitForDisplayed({ timeout: 10000 });
  });
});

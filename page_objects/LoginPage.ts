import { BasePage } from '@core/ui/basePage';
import { expect } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

export class LoginPage extends BasePage{
    loginForm = this.page.locator('.loginForm__login-form--UYW8B');
    loginField = this.page.locator('input[name=login]');
    passwordField = this.page.locator('input[name=password]');
    loginButton = this.page.locator('xpath=.//button[text()="Login"]');

    async login() {
        if (!process.env.LOGIN || !process.env.PASSWORD) {
            throw new Error('Environment variable LOGIN and PASSWORD is not set');
        }
        await expect(this.loginForm).toBeVisible();
        await this.loginField.fill(process.env.LOGIN);
        await this.passwordField.fill(process.env.PASSWORD);
        await this.loginButton.click();
        await expect(this.loginForm).toBeHidden();
    } 
    }
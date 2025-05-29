import { BasePage } from '@pages/baseInterface/basePage';
import { LocatorAdapter } from '@core/configuration/LocatorAdapter';
import { expect } from '@playwright/test';
import { logger } from '@core/utils/logger';
import dotenv from 'dotenv';
import { browser } from '@wdio/globals';

dotenv.config();

export class LoginPage extends BasePage {
    locatorAdapter: LocatorAdapter;

    constructor(page: any, locatorAdapter: LocatorAdapter) {
        super(page, locatorAdapter);
        this.locatorAdapter = locatorAdapter;
    }

    get loginForm() {
        return this.locatorAdapter.getLocator('.loginForm__login-form--UYW8B');
    }
    get loginField() {
        return this.locatorAdapter.getLocator('input[name=login]');
    }
    get passwordField() {
        return this.locatorAdapter.getLocator('input[name=password]');
    }
    get loginButton() {
        return this.locatorAdapter.getLocator('button[type=submit]');
    }

    async login() {
        if (!process.env.LOGIN || !process.env.PASSWORD) {
            throw new Error('Environment variable LOGIN and PASSWORD is not set');
        }
        await expect(this.loginForm).toBeVisible();
        await this.loginField.fill(process.env.LOGIN);
        await this.passwordField.fill(process.env.PASSWORD);
        await this.loginButton.click();
        await expect(this.loginForm).toBeHidden();
        logger.info(`User ${process.env.LOGIN} is logged in`);
    }

    async loginWdio() {
        if (!process.env.LOGIN || !process.env.PASSWORD) {
            throw new Error('Environment variable LOGIN and PASSWORD is not set');
        }

        logger.info('зашли в функцию');

        await this.loginForm.waitForDisplayed({ timeout: 30000 });
        logger.info('дождались пока загрузится видимость');
        await this.loginField.waitForEnabled({ timeout: 15000 });
        logger.info('дождались пока можно взаиможействовать');
        logger.info('Attempting to input login');
        await this.loginField.setValue(process.env.LOGIN);
        logger.info('Login entered');
        await this.loginField.waitForEnabled({ timeout: 15000 });
        logger.info('Attempting to input password');
        await this.passwordField.setValue(process.env.PASSWORD);
        logger.info('Password entered');
        await this.loginButton.click();
        await this.loginForm.waitForDisplayed({ reverse: true, timeout: 15000 });

        logger.info(`User ${process.env.LOGIN} is logged in (WDIO)`);
    }
}
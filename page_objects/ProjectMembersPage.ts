import { BasePage } from '@core/basePage';

export class ProjectMembersPage extends BasePage{
    title = this.page.locator(`span[title="[object Object]"]`);
    }

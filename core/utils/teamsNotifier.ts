// @ts-ignore
import fetch from 'node-fetch';
import * as dotenv from 'dotenv';

dotenv.config();

export class TeamsNotifier {
  private webhookUrl: string;

  constructor(webhookUrl: string) {
    const url = process.env.TEAMS_WEBHOOK_URL;
    if (!url) {
      throw new Error("TEAMS_WEBHOOK_URL is not defined in .env file");
    }
    this.webhookUrl = url;
  }

  async sendMessage(message: string) {
    const payload = {
      text: message,
    };

    const response = await fetch(this.webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      console.error(`Failed to send message to Teams: ${response.statusText}`);
    }
  }
}

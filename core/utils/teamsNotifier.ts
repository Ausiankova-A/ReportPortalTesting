import fetch from 'node-fetch';

export class TeamsNotifier {
  private webhookUrl: string;

  constructor(webhookUrl: string) {
    this.webhookUrl = "https://epam.webhook.office.com/webhookb2/6054b5ab-7442-41ad-801a-bae0a7401b7c@b41b72d0-4e9f-4c26-8a69-f949f367c91d/IncomingWebhook/11d379815de0499c8031317ac44e4b20/cb518534-b3b6-455a-a5b5-d1899076c9aa/V2yl5a_5DMLkployo97BirkV6lGF_V2DdKyw_lwkZyfLo1";
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

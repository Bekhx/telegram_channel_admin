import { Context, Telegraf } from "telegraf";
import { Update } from 'typegram';
import { IMessage } from "./models/message.models";

export class BotModule {
    private static bot: Telegraf<Context<Update>> = new Telegraf(process.env.BOT_TOKEN as string);

    static start() {
        this.bot.start((ctx) => ctx.reply(`Hi ${ctx.from.first_name!}`));
        this.bot.launch();
    }

    static async send(messageOptions: IMessage) {
        try {

            await this.bot.telegram.sendMessage(messageOptions.channelUsername, messageOptions.message);

        } catch (error: any) {
            return new Error(error);
        }
    }
}
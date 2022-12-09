import { cron } from 'denoCron'
import { Bot } from 'grammy'

import { checkAndPostNewItems } from './checkNewItem.ts'

// Environment variables passed to Deno
const botToken: string = Deno.env.get('BOT_TOKEN')!
const rssURL: string = Deno.env.get('RSS_URL')!
const chatID = Number(Deno.env.get('CHAT_ID'))
const interval: string = Deno.env.get('INTERVAL')!

const bot = new Bot(botToken)

cron(interval, () => {
	checkAndPostNewItems(rssURL, chatID, bot)
})

bot.start()

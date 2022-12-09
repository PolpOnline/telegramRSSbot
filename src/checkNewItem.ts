import { Api, Bot, Context, RawApi } from 'grammy'
// deno-lint-ignore no-unused-vars
import { type Chat } from 'grammy/types'
import Parser from 'rss-parser'
const parser = new Parser()

export async function checkAndPostNewItems(rssURL: string, chatID: number, bot: Bot<Context, Api<RawApi>>) {
	try {
		let foundNewItems = false
		const items = []
		const currentDate = new Date()
		const feed = await parser.parseURL(rssURL)

		const lastCheckedDate = new Date(Deno.env.get('LAST_CHECKED')!)

		// Checking if there are any new items we can send and put them in items
		for (const item of feed.items) {
			const itemDate = new Date(item.isoDate!)

			if (itemDate.getTime() > lastCheckedDate.getTime()) {
				foundNewItems = true

				items.push(item)
			}
		}

		if (foundNewItems) {
			// Writing all new items found in the feed
			items.reverse()
			console.log(items)

			for (const item of items) {
				console.log('[CRON JOB] New item found: ' + item.title)

				const messageToSend = `<a href="${item.link}">${item.title!}</a>\n\n${item.content}`

				bot.api.sendMessage(chatID, messageToSend, {
					parse_mode: 'HTML',
					disable_web_page_preview: true
				})
			}
		}

		Deno.env.set('LAST_CHECKED', JSON.stringify(currentDate.toJSON()))
		console.log('[CRON JOB] Check done on ' + currentDate)
	} catch (err) {
		console.error(err)
	}
}

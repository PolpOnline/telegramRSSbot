import { DenonConfig } from 'https://deno.land/x/denon@2.5.0/mod.ts'
import { config as env } from "https://deno.land/x/dotenv@v3.2.0/mod.ts"

const config: DenonConfig = {
	scripts: {
		start: {
			cmd: 'deno run src/scheduler.ts',
			desc: 'start app',
			allow: ['net', 'read', 'env'],
			lock: 'deno.lock',
			env: env({safe: true})
		}
	}
}

export default config

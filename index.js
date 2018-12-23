#!/usr/bin/env node

const searchEngine = require("./engines/default")
const program = require('commander')
const fetch = require("fetch")
const clear = require("clear")
const fs = require("fs")

const dictionaryUrls = [
	["riot-champs", "http://ddragon.leagueoflegends.com/cdn/6.24.1/data/en_US/champion.json"],
	["riot-items", "http://ddragon.leagueoflegends.com/cdn/6.24.1/data/en_US/item.json"],
	["riot-summs", "http://ddragon.leagueoflegends.com/cdn/6.24.1/data/en_US/summoner.json"],
	["riot-champs-br", "http://ddragon.leagueoflegends.com/cdn/6.24.1/data/pt_BR/champion.json"],
	["riot-items-br", "http://ddragon.leagueoflegends.com/cdn/6.24.1/data/pt_BR/item.json"],
	["riot-summs-br", "http://ddragon.leagueoflegends.com/cdn/6.24.1/data/pt_BR/summoner.json"],
]

const fetcher = (url, opts) => {

}

program
	.command("fetch <dictionaries...>")
	.description("Fetch one or more dictionaries")
	.action(dicts => {
		for (const [key, url] of dictionaryUrls) {
			if (dicts.contains(key)) {
				fetch.fetchUrl(url, (err, meta, body) => {
					if (err) {
						throw err
					}

					const filename = key + '-' + new Date().toISOString().replace(/T.*/, '')
					fs.writeFile(`./dicts/${filename}.json`, body.toString(), err => {
						if (err) {
							throw err
						}

						// Success
					})
				})
			}
		}
	})

program
	.command("query <criteria>")
	.description("Search for a pun using the fetched dictionaries")
	.action(q => {
	})
	
program.parse(process.argv)
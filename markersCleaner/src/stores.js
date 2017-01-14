import fs from 'fs'
import {DIR_LOCATION} from './config'
const regex = /( (DELE)\w.* | (C.P.) | (C.P) | (CP.) | (CP) | (ENTRE) | (ESQ)\W.* ).*/gi
const regex2 = /(c.p.).*/gi

export default function loadJsonFile() {
	const json = JSON.parse(fs.readFileSync(DIR_LOCATION + 'store_directory.json', 'utf8'))
		.reduce((prev = [], val, index) => {
			prev.push({
				address: val.Address.replace(regex, '').replace(regex2, ''),
				name: val.Name,
				index: index,
				pristine: true
			})
			return prev
		}, [])
	return json

}
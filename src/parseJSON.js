// this is what you would do if you were one to do things the easy way:
// var parseJSON = JSON.parse;

// but you're not, so you'll write it from scratch:
var parseJSON = function(json) {
  // your code goes here
  if (json[0] === ' ') json = json.slice(1);
  if (json[json.length - 1] === ' ') json = json.slice(0, json.length - 1);
  if (json[0] === '"') return json.slice(1, json.length - 1);
  if (json === '') return json;
  if (json === 'null') return null;
  if (json === 'true') return true;
  if (json === 'false') return false;
  if (Number(json) == json) return Number(json);
  if (json[0] === '['){
  	let parsed = [];
  	let unwrapped = json.slice(1, json.length - 1);
  	if (unwrapped.length === 0) return parsed;
  	for (let substring of unwrapped.split(',')){
  		parsed.push(parseJSON(substring));
  	}
  	return parsed;
  }
  if (json[0] === '{') {
  	let parsed = {};
  	let unwrapped = json.slice(1, json.length - 1);
  	if (unwrapped.length === 0) return parsed;
  	console.log('unwrapped: ', unwrapped);
  	for (let substring of unwrapped.split(',')){
  		console.log('substring: ', substring);
  		let pair = substring.split(':');
  		console.log('pair: ', pair);
  		let key = parseJSON(pair[0]);
  		let value = parseJSON(pair[1]);
  		parsed[key] = value;
  	}
  	return parsed;
  }
};

function chunker(string){
	let chunks = [];
	let voids = [' ', '\t', '\n', '\r'];
	let delimiters = ['{', '}', ':', '[', ']', '\\', ','];
	let characters = string.split('');
	let stringOpen = false;
	let substring = '';
	while (characters.length){
		if (stringOpen){
			if (characters[0] === '"'){
				stringOpen = false;
				chunks.push(substring);
				substring = '';
				chunks.push(characters.shift());
			}else if (characters[0] === '\\'){
				substring += characters.splice(0,2).join('');
			}else {
				substring += characters.shift();
			}
		}else {
			if (characters[0] === '"'){
				stringOpen = true;
				chunks.push(characters.shift());
			}else if (!voids.contains(characters[0])){
				chunks.push(characters.shift());
			}else {
				characters.shift();
			}
		}
	}
	return chunks;
}

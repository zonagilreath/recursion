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
  let chunks = chunker(json);

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
			}else if (!voids.includes(characters[0])){
				if (delimiters.includes(characters[0])){
					chunks.push(characters.shift());
				}else{
					let nonString = '';
					while (!delimiters.includes(characters[0])){
						nonString += characters.shift();
					}
					chunks.push(nonString);
				}
			}else {
				characters.shift();
			}
		}
	}
	return chunks;
}

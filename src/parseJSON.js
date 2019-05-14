// this is what you would do if you were one to do things the easy way:
// var parseJSON = JSON.parse;

// but you're not, so you'll write it from scratch:
var parseJSON = function(json) {
  // your code goes here
  // if (json[0] === ' ') json = json.slice(1);
  if (json[json.length - 1] === ' ') json = json.slice(0, json.length - 1);
  if (json[0] === '"') return json.slice(1, json.length - 1);
  if (json === '') return json;
  if (json === 'null') return null;
  if (json === 'true') return true;
  if (json === 'false') return false;
  if (Number(json) == json) return Number(json);
  let chunks = chunker(json);
  let openChars = ['[', '{'];
  if (chunks[0] === '['){
  	if (chunks[chunks.length - 1] !== ']') return undefined;
  	let parsed = [];
  	chunks = chunks.slice(1, chunks.length - 1);
  	while (chunks.length){
  		if (chunks[0] === ','){
  			chunks.shift();
  		}else{
	  		let chunk = chunks.shift();
	  		if (chunk === '"'){
	  			chunk += chunks.splice(0,2).join('');
	  		}else if (openChars.includes(chunk)){
	  			let objEnd = objEndFinder(chunk, chunks);
	  			chunk += chunks.splice(0, objEnd + 1).join('');
	  		}
	  		let parsedChunk = parseJSON(chunk);
	  		if (parsedChunk === undefined) return undefined;
	  		parsed.push(parsedChunk);
  		}
  	}
  	return parsed;
  }else if (chunks[0] === '{'){
  	if (chunks[chunks.length - 1] !== '}') return undefined;
  	let parsed = {};
  	chunks = chunks.slice(1, chunks.length - 1);
  	while (chunks.length){
  		let key = chunks.shift();
  		if (key === '"'){
  			key += chunks.splice(0,2).join('');
  		}
  		let objSyntaxCheck = chunks.shift();
  		if (objSyntaxCheck !== ':') return undefined; 
  		let value = chunks.shift();
  		if (value === '"'){
  			value += chunks.splice(0,2).join('');
  		}else if (openChars.includes(value)){
  			let objEnd = objEndFinder(value, chunks);
  			value += chunks.splice(0, objEnd + 1).join('');
	  	}
	  	key = parseJSON(key);
	  	value = parseJSON(value);
  		if (chunks.length){
	  		objSyntaxCheck = chunks.shift();
	  		if (objSyntaxCheck !== ',') return undefined;
  		}
  		parsed[key] = value;
  	}
  	return parsed;
  }else return json;
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
				// characters.shift();
			}else if (characters[0] === '\\'){
				substring += characters.splice(0,2)[1];
			}else {
				substring += characters.shift();
			}
		}else {
			if (characters[0] === '"'){
				stringOpen = true;
				chunks.push(characters.shift());
				// characters.shift();
			}else if (!voids.includes(characters[0])){
				if (delimiters.includes(characters[0])){
					chunks.push(characters.shift());
				}else{
					let nonString = '';
					while (!delimiters.includes(characters[0]) && characters.length){
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

function objEndFinder(openChar, charArray){
	let stack = 1;
	if (openChar === '{') closeChar = '}';
	if (openChar === '[') closeChar = ']';
	for (let i = 0; i < charArray.length; i++){
		if (charArray[i] === openChar) stack += 1;
		if (charArray[i] === closeChar) stack -=1;
		if (stack === 0) return i;
	}
}

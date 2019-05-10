// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:

var stringifyJSON = function(obj) {
	if (obj === undefined || typeof obj === 'function') return undefined;
  if (typeof obj !== 'object' || obj === null) {
  	if (typeof obj === 'string'){
  		return `\"${obj}\"`;
  	}
  	return String(obj);
  }
  let string = '';
  if (obj instanceof Array){
  	let maxIndex = obj.length - 1;
  	string += '[';
  	for (let i = 0; i <= maxIndex; i++){
  		string += stringifyJSON(obj[i]);
  		if (i < maxIndex){
  			string += ',';
  		}
  	}
  	string += ']';
  }else{
  	string += '}';
  	let keys = Object.keys(obj);
	  while (keys.length){
	  	let key = keys.pop();
	  	if (typeof obj[key] !== "function" && obj[key] !== undefined){
		  	let substring = `"${key}":${stringifyJSON(obj[key])}`;
		  	if (keys.length) {
		  		substring = ',' + substring;
		  	}
		  	string = substring + string;
	  	}
	  }
	  string = '{' + string;
  }
  return string;
};

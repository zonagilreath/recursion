// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But instead we're going to implement it from scratch:
var getElementsByClassName = function(className) {
  // your code here
  if (this === window) return getElementsByClassName.call(document, className);
  if (!this.hasChildNodes()) return [];
  let elementsWithClass = [];
  let nodes = this.childNodes;
  for (let node of nodes){
  	if (node.classList !== undefined) {
	  	if (node.classList.contains(className)) {
	  		elementsWithClass.push(node);
	  	}
  	}
  	elementsWithClass = elementsWithClass.concat(getElementsByClassName.call(node, className));
  }
  return elementsWithClass;
};

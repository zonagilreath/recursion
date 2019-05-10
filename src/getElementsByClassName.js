// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But instead we're going to implement it from scratch:
var getElementsByClassName = function(className) {
  // your code here
  if (this === window) return getElementsByClassName.call(document.body, className);
  let elementsWithClass = [];
	if (this.classList){
		if (this.classList.contains(className)) {
			elementsWithClass.push(this);
		}
	}
	if (this.hasChildNodes()){
	  let nodes = this.childNodes;
	  for (let node of nodes){
	  	elementsWithClass = elementsWithClass.concat(getElementsByClassName.call(node, className));
	  }
	}
  return elementsWithClass;
};

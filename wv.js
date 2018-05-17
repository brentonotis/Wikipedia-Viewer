let result = document.getElementById("result");
let searchItem = document.getElementById("searchItem");
let searchInput = document.getElementById("searchInput");

let wikiUrl = "https://en.wikipedia.org/w/api.php?action=query&generator=search&format=json&formatversion=2&utf8=1&origin=*&gsrnamespace=0&gsrlimit=10&prop=extracts&exsentences=1&exlimit=10&explaintext=1&exintro=1&gsrsearch="
let linkUrl = "https://en.wikipedia.org/?curid=";

searchInput.addEventListener("keyup", function(event) {
	console.log("enter listerner");
	event.preventDefault();	
	if (event.keyCode === 13) {
		console.log("enter key triggered");
		document.getElementById("btn").click();
	}
});

function getArticle() {	
	result.innerHTML = "";
	let text = searchItem.elements[0].value;
  let searchTerm = text.replace(/\s+/g,'%20');	
	let searchUrl = wikiUrl + searchTerm;
  	
	let article = new XMLHttpRequest();
	article.open('GET', searchUrl);	
	article.onload = function() {
	  let articleData = JSON.parse(article.responseText);
		wikiInfo(articleData);
    };
	article.send();	
}
  
function wikiInfo(data) {	
	for (let i = 0; i < data.query.pages.length; i++) {
		let url = linkUrl + data.query.pages[i].pageid;    
		let wrapper = document.createElement("a");		
		let div = document.createElement("div");    
		div.setAttribute("class", "outputItem");
		wrapper.setAttribute("href", url);
		wrapper.setAttribute("target", "_blank");		
		let divString = '<h3>' + data.query.pages[i].title + '</h3>' + '<p>' + data.query.pages[i].extract + '</p>';
		div.innerHTML = divString;
    wrapper.appendChild(div);
		result.appendChild(wrapper);
  }
}

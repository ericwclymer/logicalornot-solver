// taken from stackoverflow, decodes &amp;s and the like.
function decode(str) {
  var d = document.createElement("div");
  d.innerHTML = str; 
  return typeof d.innerText !== 'undefined' ? d.innerText : d.textContent;
}

// run the javascript and return the answer
function evalExpression(){
	var codeElement = document.getElementsByTagName('code')[0];
	var encodedJavascriptCode = codeElement.innerHTML;
	var decodedJavascriptCode = decode(encodedJavascriptCode);
	var answer = eval(decodedJavascriptCode);
	return answer;
}

function getStringAnswer(answer){
	var sanswer = '';
	if(typeof(answer) == "boolean"){
		sanswer = ''+answer;
	}
	if(typeof(answer) == "string"){
		sanswer = answer;	
	}
	if(answer === null){
		sanswer = "null";
	}
	if(Array.isArray(answer)){
		sanswer = "[]";
	}
	if(typeof(answer) == "number"){
		sanswer = ''+answer;
	}
	return sanswer;
}

// The spans that have the answer text options
var leftEl = document.getElementById('bind-answer-left-label');
var upEl = document.getElementById('bind-answer-up-label');
var rightEl = document.getElementById('bind-answer-right-label');
	
// counter
var i = 0;
var times = prompt('How many times do you want to simulate?');
function answerQuestion(){
	i++;
	// stop execution after we've hit the limit
	if(i > times){
		return;
	}
	
	var expressionResult = evalExpression();
	
	var leftVal = leftEl.innerHTML.replace(/\'/g,'');
	var upVal = upEl.innerHTML.replace(/\'/g,'');
	var rightVal = rightEl.innerHTML.replace(/\'/g,'');
	var sanswer = getStringAnswer(expressionResult);
	
	if(sanswer === leftVal){
		leftEl.parentNode.click();
	}else if(sanswer === upVal){
		upEl.parentNode.click();
	}else if(sanswer === rightVal){
		rightEl.parentNode.click();
	}else{
		alert('error');
	}
	setTimeout(function(){
		answerQuestion();
	}, 5);
}
answerQuestion();

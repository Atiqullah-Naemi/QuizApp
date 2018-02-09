var output = document.getElementById('output'),
 	dataObj = '',
 	page = 0,
 	bAnswer = document.getElementsByClassName('btnAnswer'),
 	correctAnswer = 0,
 	myQueRep = [],
 	btnNext = document.getElementById('btnNext'),
 	holderHTML = '',
	score = 0,
	finalScore = 0,
	icon = '',
	message = '',
	percentageContainer = '',
	questionNumber = 1;
	startQuiz = document.getElementById('startQuiz');

	loadQuestions();


// start the quiz
startQuiz.onclick = function() {
	$('.questionsContainer').show();
	$('.preStart').hide();
}


// load next question by clicking btnNext
btnNext.onclick = function() {
	buildQuiz(page + 1);
}

// loading questions from json file which is located in:
function loadQuestions()
{
	$.ajax({
		url: 'https://gist.githubusercontent.com/Atiqullah-Naemi/ce60df40f18418da9846c4a4cd52c9c6/raw/15262a0af3fe052c76015d26f1a46f1eb72efd60/quizapp',
		method: 'get',
		dataType: 'json',
		success: function(data) {
			dataObj = data;
			
			buildQuiz(0);
		}
	});
}

// building questions 
function buildQuiz(pg)
{
	page = pg;

	if (page >= 0) {
		if (dataObj.length < (page + 1)) {
			page = dataObj.length;

			for (var item in dataObj) {
				if (dataObj[item].correct == myQueRep[item]) {
					score++;

					icon = '<i class="fa fa-check-circle"></i>';
				} else {
					icon = '<i class="fa fa-times-circle"></i>';
				}
				holderHTML += '<div class="questionResult">' + dataObj[item].question + 
				dataObj[item].answers[myQueRep[item]] + icon  + '</div>';

				btnNext.style.display = 'none';
			}

			finalScore = score * 100 / dataObj.length;

			if (finalScore / 2 > 20) {
				message = 'Congratulations';
				percentageContainer = 'successBorder';
			} else {
				message = 'Failed';
				percentageContainer = 'failBorder';
			}

			output.innerHTML = '<div><h1>' + message + '. You got: ' + 
		    '<div class="'+percentageContainer+'">' + finalScore + '% </div></h1></div><div class="questionsResutl">' + holderHTML + '</div>';


		} else {
			var currentQuestion = dataObj[page].question;
			var currentAnswer = dataObj[page].correct;
		 	correctAnswer = dataObj[page].answers[currentAnswer];
			var questionHolder = '';
			for (var i in dataObj[page].answers) {
				questionHolder += '<div class="option"><dvi class="btnAnswer" data-id="'+parseInt(i)+'"><input type="radio" name="option" />' + 
				'<span>' + dataObj[page].answers[i] + '</span>' + '</div></div>';
			}

			output.innerHTML = '<div class="question">' + (page + 1) + '. ' + currentQuestion + '</div>';
			output.innerHTML +=  questionHolder;

			for (var x = 0; x < bAnswer.length; x++) {
				bAnswer[x].addEventListener('click', myAnswer, false);
			}
		}

	}
}

function myAnswer()
{
	var result = '';
	var iId = this.getAttribute('data-id');
	myQueRep[page] = iId;
}

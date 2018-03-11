function createDiv(className, content) {
		var temp = document.createElement('div');
		temp.className = className;
		temp.append(content);
		return temp;
	}
	function createButton(url, className, icon, text) {
		var innerDiv = document.createElement('div');
		innerDiv.className = className;
		innerDiv.innerHTML += '<b class="icon-'+icon+'"></b> '+text;
		
		var button = document.createElement('a');
		button.setAttribute('href', url);
		
		button.append(innerDiv);
		return button;
	}
	function createJokeUnit(jokeText, jokeID) {
		var jokeTextDiv = createDiv('joke-text', "");
		jokeTextDiv.innerHTML += jokeText;
		
		var jokeButtonShareDiv = createButton("", 'joke-share', 'share', 'Share');
		var jokeButtonLinkDiv = createButton(jokeID, 'joke-link', 'link', 'Permalink');
		var jokeButtonRefreshDiv = createButton("javascript:location.reload();", 'joke-refresh', 'refresh', 'Refresh')
		
		var jokeButtonsDiv = createDiv('joke-buttons', jokeButtonShareDiv);
		jokeButtonsDiv.append(jokeButtonLinkDiv);
		jokeButtonsDiv.append(jokeButtonRefreshDiv);
		
		var jokeUnitDiv = createDiv('joke-unit', jokeTextDiv);
		jokeUnitDiv.append(jokeButtonsDiv);
		jokeUnitDiv.innerHTML += '<hr>';
		
		return jokeUnitDiv;		
	}
	function generateRandomJokes(numberOfJokes, type) {
	  $.getJSON("/compile-jokes.json", function(data) {
		var jokes;
		switch(type) {
			case -1:
				HTMLCollection.prototype.concat = Array.prototype.concat;
				jokes = data[0].concat(data[1]);
				break;
			case 0:
				jokes = data[type];
				break;
			case 1:
				jokes = data[type];
				break;
		}
		var	jokesLength = jokes.length;
		
		var divRandomJokes = $(".joke-lockup");
		while (numberOfJokes > 0) {
			var randomIndex = Math.floor(Math.random() * jokesLength);
			divRandomJokes.append(createJokeUnit(jokes[randomIndex].text, randomIndex));
			jokes.splice(randomIndex, 1);
			numberOfJokes--;
			jokesLength--;
		}
	  });
	}
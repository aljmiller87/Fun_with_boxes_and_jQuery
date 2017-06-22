// State
let state = {
	count: 0,
	quotes: [
		{ 
			id: 0,
			quote: 'Don\'t you think that if I were wrong, i\'d know it?',
			name: 'Sheldon Cooper',
			likes: 7,
			didUserLike: false
		},
		{ 
			id: 1,
			quote: 'Chuck Norris has a diary. It\'s called the Guinness Book of World Records.',
			name: 'Chuck Norris',
			likes: 4,
			didUserLike: false
		},
		{ 
			id: 2,
			quote: 'Chuck Norris doesn\'t worry about high gas prices. His vehicles run on fear.',
			name: 'Chuck Norris',
			likes: 2,
			didUserLike: false
		}

	],
	images: ['http://vignette2.wikia.nocookie.net/uncyclopedia/images/d/dc/Chuck-norris-002.jpg', 'http://vignette2.wikia.nocookie.net/uncyclopedia/images/d/dc/Chuck-norris-002.jpg', 'http://www.amirmosadegh.com/wp-content/uploads/2008/09/chuck_norris.jpg', 'http://www.thefamouspeople.com/profiles/images/chuck-norris-4.jpg']
}

// State Modification Functions
function addLike(state, id) {
	state.quotes[id].likes++;
	state.quotes[id].didUserLike = true;
	renderLikes(state, id);
}

function removeLike(state, id) {
	console.log('removeLike successfully called');
	state.quotes[id].likes--;
	state.quotes[id].didUserLike = false;
	renderLikes(state, id);
}

function nextQuote(state) {
	if (state.count < state.quotes.length - 1) {
		state.count++;
	} else {
		state.count = 0;
	}
	renderQuoteInfo(state);
}

function previousQuote(state) {
	if (state.count > 0) {
		state.count--;
	} else {
		state.count = state.quotes.length - 1;
	}
	renderQuoteInfo(state);
}

function addQuote(state, string) {
	let newQuoteData = {
		id: state.quotes.length,
		quote: string,
		name: 'Chuck Norris',
		likes: 0,
		didUserLike: false
	}
	state.quotes.push(newQuoteData);
}

//Render Functions
function renderQuoteInfo(state) {
	console.log(state);
	let quoteID = state.count;
	renderLikes(state, quoteID);
	renderQuote(state, quoteID);
	renderName(state, quoteID);
	renderImage(state);
}

function renderLikes(state, ID) {
	let id = ID || state.count;
	$('#likesNumber').html('<span>' + state.quotes[id].likes + '</span>');
}

function renderQuote(state, ID) {
	let id = ID || state.count;
	$('.quote').html('<h1>' + state.quotes[id].quote + '</h1>');
}

function renderName(state, ID) {
	let id = ID || state.count;
	$('.name-wrapper').html('<h5>' + '- ' + state.quotes[id].name + '</h5>');
}

function renderImage(state) {
	let num = Math.floor(Math.random() * state.images.length);
	$('.imageHolder').html(`<img src="${state.images[num]}">`)
}

let hideForm = function() {
	$('.formGroup').fadeOut("slow");
};


// Event Listeners
document.onload = renderQuoteInfo(state);

$('#prev').on('click', function(event) {
	event.preventDefault();
	previousQuote(state);
});

$('#next').on('click', function(event) {
	event.preventDefault();
	nextQuote(state);
});

$('#addLike').on('click', function(event) {
	event.preventDefault();
	let id = state.count;
	if (state.quotes[id].didUserLike === false) {
		addLike(state, id);
		$('.likes-wrapper').addClass("orange");
	} else {
		removeLike(state, id);
		$('.likes-wrapper').removeClass("orange");
	}
	
});

$('.addQuote').on('click', function(event) {
	event.preventDefault();
	$('.formGroup').html('<i class="fa fa-times-circle-o fa-2x exit" aria-hidden="true" onclick="hideForm()"></i><form><h3>Add a new Chuck Norris quote!</h3><label>Quote: </label><input type="text" name="inputQuote"><br><input type="submit" value="Submit"></form>');
	$('.formGroup').fadeIn("slow");
	

});

$('.formGroup').submit(function(event) {
	event.preventDefault();
	let newQuote = $('input[name=inputQuote').val();
	console.log(newQuote);
	addQuote(state, newQuote);
	$('.formGroup').addClass("hidden");
});


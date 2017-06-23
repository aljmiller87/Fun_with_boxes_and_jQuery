// State
let state = {
	count: 0,
	quotes: [
		{ 
			id: 0,
			quote: 'Once a cobra bit Chuck Norris\' leg. After five days of excruciating pain, the cobra died.',
			name: 'Chuck Norris',
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
		},
		{ 
			id: 3,
			quote: 'Chuck Norris\' tears cure cancer. Too bad he has never cried.',
			name: 'Chuck Norris',
			likes: 5,
			didUserLike: false
		},
		{ 
			id: 4,
			quote: 'Chuck Norris is the only man to ever defeat a brick wall in a game of tennis.',
			name: 'Chuck Norris',
			likes: 1,
			didUserLike: false
		}

	],
	images: ['http://www.page2images.com/tmp/20170623/page2images_6HteFEgix1fP9V5X1.png', 'http://www.page2images.com/tmp/20170623/page2images_CwbVk0gNbg4BCBtJ1.png', 'http://www.page2images.com/tmp/20170623/page2images_C9qZFvcrKvNpNnQl1.png']
}

// State Modification Functions
function addLike(state, id) {
	state.quotes[id].likes++;
	state.quotes[id].didUserLike = true;
	renderLikes(state, id);
}

function removeLike(state, id) {
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
	let quoteID = state.count;
	renderBackgroundColor();
	renderLikes(state, quoteID);
	renderQuote(state, quoteID);
	renderName(state, quoteID);
	renderImage(state);
}

function renderBackgroundColor(state) {
	let num = Math.floor(Math.random() * 6);
	if (num == 0) {
		$('main').removeClass("yellow red purple green turquoise").addClass("blue");
	} else if (num == 1) {
		$('main').removeClass("blue red purple green turquoise").addClass("yellow");
	} else if (num == 2) {
		$('main').removeClass("blue yellow purple green turquoise").addClass("red");
	} else if (num == 3) {
		$('main').removeClass("blue yellow red green turquoise").addClass("purple");
	} else if (num == 4) {
		$('main').removeClass("blue yellow red purple turquoise").addClass("green");
	} else if (num == 5) {
		$('main').removeClass("blue yellow red purple green").addClass("turquoise");
	}
}

function renderLikes(state, ID) {
	let id = ID || state.count;
	if (state.quotes[id].didUserLike === true) {
		$('.likes-wrapper').addClass("activeLike");
	} else {
		$('.likes-wrapper').removeClass("activeLike");
	}
	$('#likesNumber').html(`<span>${state.quotes[id].likes}</span>`);
}

function renderQuote(state, ID) {
	let id = ID || state.count;
	$('.quote').html(`<span>${state.quotes[id].quote}</span>`);
}

function renderName(state, ID) {
	let id = ID || state.count;
	$('.name-wrapper').html(`<h5>-  ${state.quotes[id].name} </h5>`);
}

function renderImage(state) {
	let num = Math.floor(Math.random() * state.images.length);
	$('.imageHolder').html(`<img src="${state.images[num]}">`)
}


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

$('.likes-wrapper').on('click', function(event) {
	event.preventDefault();
	let id = state.count;
	if (state.quotes[id].didUserLike === false) {
		addLike(state, id);
		$('.likes-wrapper').addClass("activeLike");
	} else {
		removeLike(state, id);
		$('.likes-wrapper').removeClass("activeLike");
	}
	
});

$('.addQuote').on('click', function(event) {
	event.preventDefault();
	$('.formGroup').html('<i class="fa fa-times-circle-o fa-2x exit" aria-hidden="true" onclick="hideForm()"></i><form><h3>Add a new Chuck Norris quote!</h3><label>Quote: </label><br><input type="text" name="inputQuote" maxlength="100" class="resizedTextbox" required><br><input type="submit" value="Submit" class="btn"></form>');
	$('.formGroup').fadeIn("slow");
});

$('.formGroup').submit(function(event) {
	event.preventDefault();
	let newQuote = $('input[name=inputQuote').val();
	addQuote(state, newQuote);
	$('.formGroup').hide();
});


// Two ways to hide form
// On blur
$(document).on('blur','.formGroup', function() {
    $(this).fadeOut(1000);
});

// When exit button is clicked
let hideForm = function() {
	$('.formGroup').fadeOut("slow");
};




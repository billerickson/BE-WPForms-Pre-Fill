// @codekit-prepend "js.cookie.js"

jQuery(function($){

	// Get liked content
	var cookieName = 'be_wpforms_prefill';
	var likedContent = Cookies.get( cookieName );
	if( likedContent ) {
		likedContent = JSON.parse( likedContent );
	} else {
		likedContent = [];
	}

});

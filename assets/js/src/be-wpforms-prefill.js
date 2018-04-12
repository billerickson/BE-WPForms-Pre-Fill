// @codekit-prepend "js.cookie.js"

jQuery(function($){

	// Get prefilled form data
	var cookieName = 'be_wpforms_prefill';
	var formData = Cookies.get( cookieName );
	if( formData ) {
		formData = JSON.parse( formData );
	} else {
		formData = [];
	}

	console.log( formData );
	if( formData.length ) {
		formData.each( function( index, value ) {
			if( $('.' + index ).length ) {
				$('.' + index).val( value );
			}
		});
	}

	// Save form data
	$('.wpforms-container input, .wpforms-container textarea').focusout(function(){
		var fieldId = $(this).attr('id');
		var fieldValue = $(this).val();
		var formId = $(this).closest('.wpforms-form').attr('id').replace(/\D/g,'');
		if( $.inArray( formId, prefill.forms ) ) {
			formData[fieldId] = fieldValue;
			console.log( formData );
			console.log( JSON.stringify( formData ) );
			Cookies.set( cookieName, JSON.stringify( formData ), { expires: 365 } );
		}
	});


});

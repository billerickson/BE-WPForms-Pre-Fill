// @codekit-prepend "js.cookie.js"

jQuery(function($){

	// Get prefilled form data
	var cookieName = 'be_wpforms_prefill';
	var formData = Cookies.get( cookieName );
	if( ! formData.length )
		formData = {};

	// Save form data
	$('.wpforms-container input, .wpforms-container textarea').focusout(function(){
		var fieldId = $(this).attr('id');
		var fieldValue = $(this).val();
		var formId = $(this).closest('.wpforms-form').attr('id').replace(/\D/g,'');
		if( $.inArray( formId, prefill.forms ) ) {
			formData[ fieldId ] = fieldValue;
			console.log( formData );
			Cookies.set( cookieName, formData, { expires: 365 } );
		}
	});


});

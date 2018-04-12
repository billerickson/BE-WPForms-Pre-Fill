// @codekit-prepend "js.cookie.js"

jQuery(function($){

	// Get prefilled form data
	var cookieName = 'be_wpforms_prefill',
		prefillForms = Cookies.get( cookieName );

	if ( ! prefillForms ) {
		prefillForms = {};
	} else {
		prefillForms = JSON.parse( prefillForms );

		console.log( prefillForms );

		$.each( prefillForms, function( form ) {
			$.each( form, function( id, value ) {
				$('#' + id).val( value );
			});
		});
	}


	// Save form data
	$( '.wpforms-container input, .wpforms-container textarea' ).focusout( function(){

		var $this      = $(this),
			$form      = $this.closest( '.wpforms-form' ),
			formId     = $form.data('formid'),
			fieldId    = $this.attr('id'),
			fieldValue = $this.val();

		if ( ! $form.hasClass( 'be-prefill' ) ) {
			return;
		}

		if ( ! prefillForms[ formId ] ) {
			prefillForms[ formId ] = {};
		}

		prefillForms[ formId ][ fieldId ] = fieldValue;

		console.log( prefillForms );

		Cookies.set( cookieName, prefillForms, { expires: 365 } );
	});
});

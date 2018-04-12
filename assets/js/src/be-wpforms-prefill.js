// @codekit-prepend "js.cookie.js"

jQuery(function($){

	// Get prefilled form data
	var cookieName = 'be_wpforms_prefill',
		prefillForms = Cookies.get( cookieName );

	if ( ! prefillForms ) {
		prefillForms = {};
	} else {
		prefillForms = JSON.parse( prefillForms );

		for ( var formId in prefillForms ) {
			if ( $( '#wpforms-form-' + formId).length ) {
				prefill( formId );
			}
		}
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

		Cookies.set( cookieName, prefillForms, { expires: 365 } );
	});

	// Pre-fill a form.
	function prefill( formId ) {

		if ( ! prefillForms[ formId ] ) {
			return;
		}

		var formFields = prefillForms[ formId ];

		for ( var fieldId in formFields ) {

			var $fieldElement = $('#' + fieldId );

			if ( $fieldElement.length ) {
				if ( 'radio' === $fieldElement.attr('type') || 'checkbox' === $fieldElement.attr('type')  ) {
					// special shit for these fields.
				} else {
					$fieldElement.val( formFields[ fieldId ] );
				}
			}
		}
	}
});

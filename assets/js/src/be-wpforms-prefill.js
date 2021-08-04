// @codekit-prepend "js.cookie.js"

jQuery(function($){

	// Get prefilled form data
	var cookieName    = 'be_wpforms_prefill',
		prefillForms  = Cookies.get( cookieName ),
		allowedFields = [
			'wpforms-field-name',
			'wpforms-field-email',
			'wpforms-field-number',
			'wpforms-field-text',
			'wpforms-field-textarea',
			'wpforms-field-checkbox',
			'wpforms-field-radio',
			'wpforms-field-likert_scale',
		];

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
	$( '.wpforms-container input, .wpforms-container textarea, .wpforms-container select' ).focusout( function(){

		var $this      = $(this),
			$form      = $this.closest( '.wpforms-form' ),
			$field     = $this.closest( '.wpforms-field' ),
			formId     = $form.data('formid'),
			fieldId    = $this.attr('id'),
			fieldValue = $this.val(),
			allowed    = false;

		if ( ! $form.hasClass( 'be-prefill' ) ) {
			return;
		}

		for ( var key in allowedFields ) {
			if ( $field.hasClass( allowedFields[key] ) ) {
				allowed = true;
			}
		}

		if ( ! allowed ) {
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
					if ( $fieldElement.val() == formFields[ fieldId ] ) {
						$fieldElement.prop('checked', true );
					}
				} else {
					$fieldElement.val( formFields[ fieldId ] );
				}
			}
		}
	}
});

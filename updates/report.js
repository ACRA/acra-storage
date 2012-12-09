/**
 * Inserts a reception timestamp and transforms some multiple values fields into arrays.
 **/
function(doc,req) {
	var data = JSON.parse(req.body);
	data.timestamp = new Date();
	data.user_ip = req.peer;
	data["_id"] = data.REPORT_ID;
	if(data.STACK_TRACE) {
		data.STACK_TRACE = data.STACK_TRACE.split('\n');
	}

	if(data.LOGCAT) {
		data.LOGCAT = data.LOGCAT.split('\n');
	}
	if(data.RADIOLOG) {
		data.RADIOLOG = data.RADIOLOG.split('\n');
	}
	if(data.EVENTSLOG) {
		data.EVENTSLOG = data.EVENTSLOG.split('\n');
	}
	if(data.SETTINGS_SECURE.ENABLED_INPUT_METHODS) {
		data.SETTINGS_SECURE.ENABLED_INPUT_METHODS = data.SETTINGS_SECURE.ENABLED_INPUT_METHODS.split(':');
	}
	if(data.SETTINGS_SYSTEM.AIRPLANE_MODE_RADIOS) {
		data.SETTINGS_SYSTEM.AIRPLANE_MODE_RADIOS = data.SETTINGS_SYSTEM.AIRPLANE_MODE_RADIOS.split(',');
	}
	if(data.SETTINGS_GLOBAL.AIRPLANE_MODE_RADIOS) {
		data.SETTINGS_GLOBAL.AIRPLANE_MODE_RADIOS = data.SETTINGS_GLOBAL.AIRPLANE_MODE_RADIOS.split(',');
	}
	if(data.SETTINGS_GLOBAL.AIRPLANE_MODE_TOGGLEABLE_RADIOS) {
		data.SETTINGS_GLOBAL.AIRPLANE_MODE_TOGGLEABLE_RADIOS = data.SETTINGS_GLOBAL.AIRPLANE_MODE_TOGGLEABLE_RADIOS.split(',');
	}
	if(data.INITIAL_CONFIGURATION.screenLayout) {
		data.INITIAL_CONFIGURATION.screenLayout = data.INITIAL_CONFIGURATION.screenLayout.split('+');
	}
	if(data.INITIAL_CONFIGURATION.uiMode) {
		data.INITIAL_CONFIGURATION.uiMode = data.INITIAL_CONFIGURATION.uiMode.split('+');
	}
	if(data.CRASH_CONFIGURATION.screenLayout) {
		data.CRASH_CONFIGURATION.screenLayout = data.CRASH_CONFIGURATION.screenLayout.split('+');
	}
	if(data.CRASH_CONFIGURATION.uiMode) {
		data.CRASH_CONFIGURATION.uiMode = data.CRASH_CONFIGURATION.uiMode.split('+');
	}
// This causes Error 500...
/*	if(data.DISPLAY) {
		data.DISPLAY.forEach( function(d) {
			if(d.flags){
				d.flags = d.flags.split('+');
			}
		});
	}
*/

	data.requestHeaders = req.headers;
	message = "OK";
	return [ data, message];
}
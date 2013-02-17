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

    addReportSignature(data);
    if(data.USER_CRASH_DATE && data.USER_APP_START_DATE) {
        data.uptime = (new Date(data.USER_CRASH_DATE).getTime() - new Date(data.USER_APP_START_DATE).getTime())  / 1000;
    }

    data.requestHeaders = req.headers;
	message = "OK";
	return [ data, message];
}

var addReportSignature = function(report) {
    if(report.STACK_TRACE && report.PACKAGE_NAME) {
        var result = { full: "", digest: ""};
        var stack = report.STACK_TRACE;
        if(stack.length > 1) {
            var exceptionName =  stack[0];
            var faultyLine = stack[1];
            var applicationPackage = report.PACKAGE_NAME;
            for(var line in stack) {
                if(stack[line].indexOf('at ' + applicationPackage) >= 0) {
                    faultyLine = stack[line];
                    break;
                }
            }
            result.full = exceptionName + " : " + trim(faultyLine);

            var captureRegEx = /\((.*)\)/g;
            var capturedFaultyLine = captureRegEx.exec(faultyLine);
            var faultyLineDigest = "unknown";
            if(capturedFaultyLine) {
                faultyLineDigest =  capturedFaultyLine[1];
            }
            result.digest = exceptionName + " : " + faultyLineDigest;
            report.SIGNATURE = result;
        }
    }
};

var trim = function(myString)
{
    return myString.replace(/^\s+/g,'').replace(/\s+$/g,'')
}
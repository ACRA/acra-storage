function(newDoc, oldDoc, userCtx) {
	if(userCtx.roles.indexOf("reporter") < 0) {
		throw({"forbidden": "You may only post reports with reporter role "});
	}
}
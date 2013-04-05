function(newDoc, oldDoc, userCtx) {
	if(userCtx.roles.indexOf("_admin") < 0 && userCtx.roles.indexOf("reporter") < 0 && userCtx.roles.indexOf("_writer") < 0) {
		throw({"forbidden": "You may only post reports with reporter role "});
	}
}

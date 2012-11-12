function(newDoc, oldDoc, userCtx) {
	if(userCtx.roles.indexOf("reporter") < 0) {
		throw({"forbidden": "You may only update documents with reporter role "});
	}
}
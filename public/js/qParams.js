function getQVar(argv) {
	var q = window.location.search.substring(1);
	var string = q.split('&');
	for (var idx = 0; idx < string.length; idx++) {
		var kv = string[idx].split('=');
		if (decodeURIComponent(kv[0]) == argv) {
			return decodeURIComponent(kv[1].replace(/\+/g, ' '));
		}
	}

	return undefined;
}
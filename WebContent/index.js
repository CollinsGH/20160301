window.onload = function() {
	console.log("Ready.");
	window.addEventListener('online', function(event) {
		console.log('online');
	});
	window.addEventListener('offline', function(event) {
		console.log('offline');
	});
	window.addEventListener('cached', function(event) {
		console.log('cached');
	});
	window.addEventListener('checking', function(event) {
		console.log('checking');
	});
	window.addEventListener('downloading', function(event) {
		console.log('downloading');
	});
	window.addEventListener('updateReady', function(event) {
		console.log('updateReady');
	});
	window.addEventListener('obsolete', function(event) {
		console.log('obsolete');
	});
};
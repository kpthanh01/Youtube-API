function getResults(input){
	let youtube_search_url = 'https://www.googleapis.com/youtube/v3/search';
	let params = {
		part: 'snippet',
		key: 'AIzaSyBOxnryUt-VRa_1sUmWIeC9-Gjf1JTLcaw',
		q: input,
		maxResults: 10
	};
	let success = function(apiData){
		let result = '<p>First ' + apiData.pageInfo.resultsPerPage + ' results </p>';
		$("#youtubeResults").append(result);
		for(item in apiData.items ){
			let videoTitle = apiData.items[item].snippet.title;
			let videoURL = apiData.items[item].id.videoId;
			let videoThumbnail = apiData.items[item].snippet.thumbnails.medium.url;
			let page = '<a href="https://www.youtube.com/watch?v=' + videoURL + '" target="_blank">' +
			  	'<p>' + videoTitle + '</p>' +
				'<img role="presentation" src="' + videoThumbnail + '" alt="' + videoTitle + '" aria-live="polite">' +
				'</a> <hr>';
			$("#youtubeResults").append(page);		
		}
	};
	$.getJSON(youtube_search_url, params, success);
}

$(function(){
	$('#submitForm').submit(function(event){
		event.preventDefault();
		$("#youtubeResults").html("");	
		let userInput = $('input[name="search"]').val();
		console.log(userInput);
		getResults(userInput);
	})
});

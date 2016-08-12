chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
	  console.log(request.action);
	var video = $('video').get(0);
    if (request.action == "pause"){
		reduceVolume(video);
	}
	else{
		video.play();
		video.mute = false;
		increaseVolume(video);
	}
});

function reduceVolume(video){
	setTimeout(function(){
		console.log(video.volume);
		if(video.volume - 0.1 > 0.0){
			video.volume = video.volume - 0.1;
			reduceVolume(video)
		}else{
			video.mute = true;
			video.pause();
		}
	}, 400);
}

function increaseVolume(video){
	setTimeout(function(){
		console.log(video.volume);
		if(video.volume + 0.1 <= 1.0){
			video.volume = video.volume + 0.1;
			increaseVolume(video);
		}
	}, 200);
}
var party_vj_you_tube_url = "www.youtube.com";

function handleTabs(callback) {
	chrome.tabs.query({currentWindow: true, active : true},function(tabArray){
		var currentWindow = tabArray[0];
		chrome.tabs.query({}, function(tabs) {
			document.getElementById('status').textContent = tabs.length;
			for(var i=0; i < tabs.length; i++){
				var tab = tabs[i];
				var url = getDomainName(tab.url);
				console.assert(typeof url == 'string', 'tab.url should be a string');
				if(url == party_vj_you_tube_url){
					pausePlay(tab, currentWindow);
				}
				//callback(tab.url);
			}
			window.close();
		});
		}
	);
}

function pausePlay(tab, currentWindow){
	var action = "pause";
	console.log(currentWindow.id);
	console.log(tab.id)
	if(tab.active && currentWindow.id == tab.id)
		action = "play";
	chrome.tabs.sendMessage(tab.id,{"action":action}, function(response){
		//console.log(response.status);
	});
}


function getDomainName(url){
	var a = document.createElement('a');
	a.href = url;
	return a.hostname;
}

function renderStatus(statusText) {
  var div = document.getElementById('status');
  div.innerHTML	= div.innerHTML +'<p>' +statusText +'</p>';
}

document.addEventListener('DOMContentLoaded', function() {
  handleTabs(function(url) {
    // Put the image URL in Google search.
    //renderStatus(url);   
  });
});

var auto_repeat = false;
var isPolling = false;

function watchPage(){
  var html5 = document.querySelector('video.video-stream');
  var flash = document.getElementById("movie_player");
  return html5 || flash;
}


function checkCompletion(){ //this is the key part
  var html5 = document.querySelector('video.video-stream');
  var flash = document.getElementById("movie_player");
  if(html5){  
    if(html5.currentTime == html5.duration) html5.play();
  }else if(flash){
    if(flash.getCurrentTime() == flash.getDuration()) flash.playVideo();
  }
}


function startPolling(){
  if(!isPolling) doPoll();
}

function doPoll(){ //feels needlessly complex
  isPolling = true;
  if(auto_repeat){
    checkCompletion();
    setTimeout(doPoll, 420);
  }else isPolling = false;
}

function createUI(){
  var label = document.createElement('label');
  label.setAttribute('for', 'x-yt-repeat');
  label.innerHTML = 'Repeat';
  var checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.onchange = function(){
    if(auto_repeat = checkbox.checked){
      startPolling();
    }
  }
  checkbox.id = 'x-yt-repeat';
  var container = document.createElement('div');
  container.appendChild(label);
  container.appendChild(checkbox);
  return container
}


function appendUI(){
  var sidebar = document.querySelector('#watch-description-extra-info');
  var ui = createUI();
  if(sidebar){ //insert before sidebar
    ui.className = 'watch-module';
    sidebar.insertBefore(ui, sidebar.firstChild);
  }else{ //PlanB
    ui.style.position = 'absolute';
    ui.style.top = '50px';
    ui.style.left = '10px';
    document.body.appendChild(ui);
  }
}

setTimeout(function(){
  if(watchPage()) appendUI();
},100);

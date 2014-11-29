window.onload = function(){
  initiallyCreateDivs();
  setInterval(createAndDestroy,1000)//time interval will be based on video runtime
  }

function createAndDestroy(){
  var playerArea = document.getElementById('player-area');
  divAppend(playerArea);
  divRemove(playerArea);
}

function divRemove(area){
  var divToBeDeleted = area.firstChild
  console.log(area)
  console.log("These are the divs to be deleted: " + divToBeDeleted)
  divToBeDeleted.remove();
  // area.removeChild(area.getElementsByTag('div')[0])
}

//----------------------------------------------
var functionCounter = 1
function initiallyCreateDivs(){
  var playerArea = document.getElementById('player-area');
  if (functionCounter < 5){
        divAppend(playerArea);
        functionCounter++
    }
}

//----------------------------------------------
var divCounter = 1;
function divAppend(area){
    var ele = document.createElement("div");
    ele.setAttribute("id","new_player" + divCounter);
    ele.setAttribute("class","inner");
    ele.innerHTML="fuck you "; //YTplayer instead of "fuck you"

    area.appendChild(ele);
    console.log(ele)
    divCounter ++

  }




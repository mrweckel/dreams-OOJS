var DivPlayer = {
  counter: 1
};

  DivPlayer.Controller = {
    createAndDestroy: function(){
      var player_area = document.getElementById('player-area');
      DivPlayer.View.divAppend(player_area,"div","new_player_","inner");
      DivPlayer.View.divRemove(player_area);
    }
  }

  DivPlayer.View = {
    initiallyPlaceDivs: function(num){
      var player_area = document.getElementById('player-area');
      for (var i=0; i<num; i++){
        DivPlayer.View.divAppend(player_area,"div","new_player_","inner");
      }
    },

    divRemove: function(area){
      var div_to_be_deleted = area.firstChild
      div_to_be_deleted.remove();
    },

    divAppend: function(area,eleToCreate,id_name,class_name){
      var ele = document.createElement(eleToCreate);
      ele.setAttribute("id", id_name + DivPlayer.counter);
      ele.setAttribute("class",class_name);
      ele.innerHTML="!!!!REPLACE ME!!!!"; //PLACE YT PLAYER HERE

      area.appendChild(ele);
      DivPlayer.counter ++
    }
  }

//-------------------------------------------------------//
window.onload = function(){
  DivPlayer.View.initiallyPlaceDivs(3);
  setInterval(DivPlayer.Controller.createAndDestroy,1000)//time interval will be based on video runtime
  }

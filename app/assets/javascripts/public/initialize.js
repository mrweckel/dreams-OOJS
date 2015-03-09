$(document).ready(function(){
    window.bv_ctrl = new Dreams.BigVideoCtrl;
    window.bv_ctrl.initialize();

    window.background = new Dreams.BackGround;
    window.ga_keys = new Dreams.GoogleAuthKeys;
    window.data_ctrl = new Dreams.YTDataAcctCtrl(new Dreams.YTDataView);
    window.controller = new Dreams.Controller;
    window.ga_ctrl = new Dreams.GoogleAuthCtrl(window.ga_keys, window.data_ctrl);

    window.controller.initialize(window.ga_ctrl.checkAuth);

    window.volumeSet = new Dreams.AudioCtrl($(".audio_player"));
    window.volumeSet.audioSet();

    window.yt_search = new Dreams.YouTubeSearch(window.ga_keys.apiKey, window.background);

    window.yt_search_ctrl = new Dreams.YouTubeCtrl(window.yt_search.main());
    window.yt_search_ctrl.initialize();



});

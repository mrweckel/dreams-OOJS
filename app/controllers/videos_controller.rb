class VideosController < ApplicationController

  def new
<<<<<<< HEAD
    @video = Video.new(video_params)
  end

  def create
    @video = Video.new(video_params)
    @video.save
=======
    @sleep = Sleep.new(sleeps_params)
  end

  def create
    @sleep = Sleep.new(sleeps_params)
    @sleep.save
>>>>>>> Sets up videos controller
  end

end

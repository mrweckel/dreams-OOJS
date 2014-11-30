class VideosController < ApplicationController

  def new
    @video = Video.new(video_params)
  end

  def create
    @video = Video.new(video_params)
    @video.save
  end

end

class DreamsController < ApplicationController
  # respond_to :json

  def index
    render 'index'
  end

  def new
    @dream = Dream.new
  end

  def create
    @user = User.find_by(user_id: session[:user_id])
    video_properties = params.to_json
    @dream = @user.dreams.create(video_properties: video_properties)
  end

  def show
    @dream = Dream.find()

    respond_to do |format|
      format.json { render json: @dream.video_properties }
    end
  end

  # private
  # def dream_params
  #   params.require(:dream).permit(:YT_video_id, :duration, :start_time, :end_time)
  # end

end

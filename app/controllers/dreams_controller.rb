class DreamsController < ApplicationController
  # respond_to :json

  def index
    render 'index'
  end

  def new
    @dream = Dream.new
  end

  def create

    respond_to do |format|
      format.json { render json: @dream }
    end

    @user = User.find_by(user_id: session[:user_id])
    properties = params.to_json
    @dream = @user.dreams.create(properties: properties)
    p "*"*100
    params.each do |param|
      param.each do |video|
        # video.each do |video_attr|
        #   p "*"*200
        #     p video_attr
        #   p "*"*200
        # end
      end
    end
    p "*"*100

  end

  def show
    @dreams = Dream.find(sessions[:user_id])
  end

  private
  def dream_params
    params.require(:dream).permit(:YT_video_id, :duration, :start_time, :end_time)
  end

end

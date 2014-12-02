class DreamsController < ApplicationController
  respond_to :json

  def index
    render 'index'
  end

  def new
    # steven sez: i don't think you need dream_params here do you?
    @dream = Dream.new(dream_params)
  end

  def create
    @user = User.find_by(user_id: session[:user_id])
    p dream_params
    @dream = @user.dreams.create(dream_params)

    respond_to do |format|
      format.json { render json: @dream }
    end
  end

  def show
    @dreams = Dream.find(sessions[:user_id])
  end

  private
  def dream_params
    params.require(:dream).permit(:YT_video_id, :duration, :start_time, :end_time)
  end

end

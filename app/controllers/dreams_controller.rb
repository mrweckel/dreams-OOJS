class DreamsController < ApplicationController
  respond_to :json

  def index
    render 'index'
  end

  def new
    @dream = Dream.new(dream_params)
  end

  def create
    p "*"*200
    p params
    p params[:dream]

      p "inside the create if session conditional"
      @user = User.find_by(user_id: session[:user_id])
      @dream = @user.dreams.create!(dream_params)
      p "successfully created dream"

  end

  def show
    @dreams = Dream.find(sessions[:user_id])
  end

  private
  def dream_params
    p "starting dream_params method"
    p params
    params.require(:dream).permit(:YT_video_id, :duration, :start_time, :end_time)
    p "dream_params successful"
  end

end

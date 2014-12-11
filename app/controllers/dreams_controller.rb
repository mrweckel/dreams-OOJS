class DreamsController < ApplicationController

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
    #is saving the dream with the params passed in. need to test with click implemented
  end

# Find the dream by the dream_id provided/clicked by user
  def show
    @dream = Dream.find()

    respond_to do |format|
      format.json { render json: @dream.video_properties }
    end
  end

end

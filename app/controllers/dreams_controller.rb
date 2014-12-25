class DreamsController < ApplicationController

  def index
    if current_user
      user = current_user
      @dreams = user.dreams
    end
    render 'index'
  end

  def create
    user = User.find_by(user_id: session[:user_id])
    video_properties = params.to_json
    dream = user.dreams.create(video_properties: video_properties)
    #is saving the dream with the params passed in. need to test with click implemented
  end

# If discard was clicked at the end of the dream, it will destroy that dream sequence
  def destroy
    user = User.find_by(user_id: session[:user_id])
    user.dreams.last.destroy
  end

# Fix this method to be able to find the dream by the dream_id provided/clicked by user
  def show
    dream = Dream.find()

    respond_to do |format|
      format.json { render json: dream.video_properties }
    end
  end

  def client
    client_id = ENV['CLIENT_ID']
    respond_to do |format|
      format.json {render json: client_id}
    end
  end

  def api
    api = ENV['API_KEY']
    respond_to do |format|
      format.json {render json: api}
    end
  end

end

class SessionsController < ApplicationController

  def create
    @user = User.find_by(username: params[:YT_uid])#.try(:authenticate, params[:password])#youtube api authentication
    if @user
      session[:YT_uid] = @user.id #this will be @user.YT_uid from the API call
      redirect_to root_path #path with random+personalized choices
    else
      redirect_to root_path #path with only keyword searchbar
    end
  end

  def destroy
    session[:YT_uid] = nil
    redirect_to root_path
  end

end

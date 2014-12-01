class SessionsController < ApplicationController

  def create
    p "in sessions create"
    @user = User.find_by(username: params[:user_id])
    if @user
      p "in sessions create user exists"
      session[:user_id] = @user.user_id #this will be @user.YT_uid from the API call
      redirect_to root_path #path with random+personalized choices
    else
      p "in sessions create user doesnt exist"
      redirect_to root_path #path with only keyword searchbar
    end
  end

  def destroy
    session[:user_id] = nil
    redirect_to root_path
  end

end

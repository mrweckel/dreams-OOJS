class UsersController < ApplicationController

  def create
    if !User.exists?(user_id: params[:userId])
      @user = User.create(user_id: params[:userId])
      if @user
        session[:user_id] = @user.id
      else 
        redirect_to(root_path)
      end 
      # need to figure out how we want to handle this as it's atypical implemenation -- is it because of UX
      # in earlier version?
    else
       @user = User.find_by(user_id: params[:userId])
       session[:user_id] = @user.user_id
       current_user = session[:user_id]
       redirect_to(root_path)
    end
  end

  def logout
    session[:user_id] = nil
  end

  def user_params
    params.require(:user).permit!
  end
  
end

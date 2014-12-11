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

  # def index
  #   p "*"*200
  #   p params[:userId]
  #   p "*"*200
  #   p session[:user_id]
  #   user = User.where(user_id: session[:user_id])
  #   p "*"*200
  #   p user
  #   p "*"*200
  #   @dreams = user.dreams
  #   p @dreams
  # end

  def logout
    session[:user_id] = nil
  end

  def user_params
    params.require(:user).permit!
  end
  
end

class UsersController < ApplicationController

  def create
    p "*"*200
    p params[:userId]
    p "*"*200
    if !User.exists?(user_id: params[:userId])
        p "*"*200
        p @user = User.create(user_id: params[:userId])
        p "*"*200
        p session[:user_id] = @user.id
    else
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

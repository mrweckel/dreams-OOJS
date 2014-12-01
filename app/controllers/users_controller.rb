class UsersController < ApplicationController

  def create
<<<<<<< HEAD
=======
    p "printing sessions[:user_id] before checking user exists: #{session[:user_id]}"
>>>>>>> Sets up sessions for users
    if !User.exists?(user_id: params[:userId])
      @user = User.new(user_id: params[:userId])
      if @user.save
        session[:user_id] = @user.user_id
<<<<<<< HEAD
      else
        redirect_to(root_path)
      end
    else
      @user = User.find_by(user_id: params[:userId])
      session[:user_id] = @user.user_id
=======
        p "printing sessions[:user_id] after user save: #{session[:user_id]}"
      else
        redirect_to(root_path)
      end
    elsif User.exists?(user_id: params[:userId])
      session[:user_id] = @user.user_id
      p "*"*200
      p "printing sessions[:user_id] because user exists: #{session[:user_id]}"
>>>>>>> Sets up sessions for users
    end
  end

  # def show
  #   @user = User.find(@user.user_id)
  #   # redirect_to "/users/#{@user.user_id}", layout: false
  # end

  def logout
    session[:user_id] = nil
  end

  def user_params
    params.require(:user).permit!
  end

end

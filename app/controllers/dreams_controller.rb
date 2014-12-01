class DreamsController < ApplicationController

  def index
    render 'index'
  end

  def create
    # dreams params should potentially have a dream_name user inputs
    # this should create a dream that will be populated with the video objects
    @dream = Dream.create(dreams_params)
    redirect_to
  end

end

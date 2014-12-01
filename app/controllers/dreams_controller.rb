class DreamsController < ApplicationController

  def index
    render 'index'
  end

  def new
    @dream = Dream.new(dream_params)
  end

  def create
    # dreams params should potentially have a dream_name user inputs
    # this should create a dream that will be populated with the video objects
    @dream = Dream.create(dream_params)
  end

  def show
    @dreams = Dream.find(sessions[:YT_uid])
  end

end

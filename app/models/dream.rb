class Dream < ActiveRecord::Base
  serialize :video_properties, JSON
  belongs_to :user
end

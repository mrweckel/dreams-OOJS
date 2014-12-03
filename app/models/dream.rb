class Dream < ActiveRecord::Base
  serialize :video_properties, JSON
  has_many :videos
  belongs_to :user
end

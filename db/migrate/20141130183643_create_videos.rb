class CreateVideos < ActiveRecord::Migration
  def change
    create_table :videos do |t|
      t.references :dream
      t.references :user
      t.string :YT_video_id
      t.string :start_time
      t.string :end_time

      t.timestamps
    end
  end
end

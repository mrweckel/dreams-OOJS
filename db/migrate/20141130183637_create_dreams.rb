class CreateDreams < ActiveRecord::Migration
  def change
    create_table :dreams do |t|
      t.references :user
      t.string :dream_name
      t.string :YT_video_id
      t.string :duration
      t.string :start_time
      t.string :end_time
      t.text :properties

      t.timestamps
    end
  end
end

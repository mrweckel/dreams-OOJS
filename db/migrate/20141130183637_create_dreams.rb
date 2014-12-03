class CreateDreams < ActiveRecord::Migration
  def change
    create_table :dreams do |t|
      t.references :user
      t.string :dream_name
      t.text :video_properties
      t.timestamps
    end
  end
end

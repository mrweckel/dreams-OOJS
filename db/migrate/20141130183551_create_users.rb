class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :google_username
      t.string :googlePlusUserId

      t.timestamps
    end
  end
end

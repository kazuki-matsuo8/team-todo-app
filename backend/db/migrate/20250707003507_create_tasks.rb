class CreateTasks < ActiveRecord::Migration[8.0]
  def change
    create_table :tasks do |t|
      t.string :title
      t.text :content
      t.references :creator, null: false, foreign_key: { to_table: :users }
      
      t.timestamps
    end
  end
end

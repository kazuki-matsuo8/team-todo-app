class AddTypeToTasks < ActiveRecord::Migration[8.0]
  def change
    add_column :tasks, :category, :integer, default: 0, null: false
  end
end

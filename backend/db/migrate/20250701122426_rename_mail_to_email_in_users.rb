class RenameMailToEmailInUsers < ActiveRecord::Migration[8.0]
  def change
    rename_column :users, :mail, :email
  end
end

class Task < ApplicationRecord
  belongs_to :creator, class_name: 'User'
  validates :title, presence: true
  # 特定の値しか取らないように状態を定義し、管理する
  enum category: { work: 0, study: 1, private: 2 }
  enum status: { todo: 0, inprogress: 1, done: 2 }
end

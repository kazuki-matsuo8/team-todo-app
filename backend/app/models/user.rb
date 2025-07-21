class User < ApplicationRecord
  before_save { self.email = email.downcase }
  has_secure_password
  validates :name, presence: true
  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i
  validates :email, presence: true,
                   uniqueness: true,
                   format: { with: VALID_EMAIL_REGEX }
  validates :password, allow_nil: true,
                       length: { minimum: 8 }
  has_many :created_tasks, class_name: 'Task', foreign_key: 'creator_id', dependent: :destroy
end
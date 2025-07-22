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

  # パスワードリセット用のトークンを生成
  def generate_password_reset_token
    self.reset_password_token = SecureRandom.urlsafe_base64
    self.reset_password_sent_at = Time.zone.now
    return reset_password_token
  end
  # パスワードリセットトークンの有効期限を確認
  def password_reset_period_valid?
    reset_password_sent_at.present? && Time.zone.now <= reset_password_sent_at + 1.hours
  end
  # 使用済みのパスワードリセットトークンを無効化
  def clear_password_reset_token
    self.reset_password_token = nil
    self.reset_password_sent_at = nil
    self.save!
  end
end
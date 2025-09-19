class Team < ApplicationRecord
  # アソシエーション
  belongs_to :creator, class_name: "User"
  has_many :team_members, dependent: :destroy
  has_many :users, through: :team_members

  # バリデーション
  validates :name, presence: true, uniqueness: true
  validates :description, length: { maximum: 1000 }
end

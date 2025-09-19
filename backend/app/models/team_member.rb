class TeamMember < ApplicationRecord
  belongs_to :user
  belongs_to :team

  # バリデーション
  validates :user_id, uniqueness: { scope: :team_id }
  validates :role, presence: true, inclusion: { in: %w[leader member] }
end

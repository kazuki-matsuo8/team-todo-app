class Api::V1::TeamMembersController < ApplicationController
  # 認証とチーム関連の前処理
  before_action :authenticate
  before_action :set_team
  before_action :set_member, only: [ :update, :destroy ]
  before_action :ensure_team_leader, except: [ :index ]

  # チームメンバー一覧を取得
  def index
    @members = @team.team_members.includes(:user)
    render json: @members.as_json(include: :user)
  end

  # メンバーをチームに追加
  # メアドでユーザーを探して、見つかったらチームに追加する
  # TODO: 見つからない場合は招待の仕組みがあったほうがいいかも
  def create
    @user = User.find_by(email: member_params[:email])

    unless @user
      render json: { error: "ユーザーが見つかりません" }, status: :not_found
      return
    end

    # 権限指定がなければとりあえずmemberで追加
    # 必要に応じてあとでleaderに変更できる
    @member = @team.team_members.new(
      user: @user,
      role: member_params[:role] || "member"
    )

    if @member.save
      render json: @member.as_json(include: :user), status: :created
    else
      render json: @member.errors, status: :unprocessable_entity
    end
  end

  # メンバーの権限を更新
  def update
    if @member.role == "owner" && member_params[:role] != "owner"
      render json: { error: "オーナーの役割は変更できません" }, status: :forbidden
      return
    end

    if @member.update(role: member_params[:role])
      render json: @member.as_json(include: :user)
    else
      render json: @member.errors, status: :unprocessable_entity
    end
  end

  # メンバーをチームから削除
  def destroy
    # leaderが削除されるとチームが崩壊するので防止
    if @member.role == "leader"
      render json: { error: "リーダーは削除できません" }, status: :forbidden
      return
    end

    @member.destroy
    head :no_content
  end

  private

  # チームを特定
  def set_team
    @team = Team.find(params[:team_id])
  end

  # 更新・削除対象のメンバーを特定
  def set_member
    @member = @team.team_members.find(params[:id])
  end

  # 許可するパラメータ
  def member_params
    params.require(:member).permit(:email, :role)
  end

  # リーダー権限チェック
  # 基本的な操作にはleader権限が必要
  def ensure_team_leader
    unless @team.team_members.exists?(user: current_user, role: "leader")
      render json: { error: "チームのリーダー権限が必要です" }, status: :forbidden
    end
  end
end

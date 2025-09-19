class Api::V1::TeamsController < ApplicationController
  # 共通の前処理
  before_action :authenticate
  before_action :set_team, only: [ :show, :update, :destroy ]
  before_action :ensure_team_member, only: [ :show ]
  before_action :ensure_team_leader, only: [ :update, :destroy ]

  # ログインユーザーが所属している全てのチームを返す
  def index
    @teams = current_user.teams
    render json: @teams
  end

  # チームの詳細情報を返す
  # メンバー一覧も一緒に返すので、ユーザー情報もincludeしておく
  def show
    render json: @team.as_json(include: { team_members: { include: :user } })
  end

  # 新しいチームを作成
  # 作成者は自動的にオーナー権限になる
  def create
    @team = Team.new(team_params)
    @team.creator = current_user

    if @team.save
      # チーム作成者を自動的にleaderとして追加
      @team.team_members.create(user: current_user, role: "leader")
      render json: @team, status: :created
    else
      render json: @team.errors, status: :unprocessable_entity
    end
  end

  # チーム情報を更新
  # チーム名とか説明文の変更。オーナーしかできない
  def update
    if @team.update(team_params)
      render json: @team
    else
      render json: @team.errors, status: :unprocessable_entity
    end
  end

  # チームを削除
  # これもオーナーしかできない重要な操作
  def destroy
    @team.destroy
    head :no_content
  end

  private

  # 指定されたチームを取得
  def set_team
    @team = Team.find(params[:id])
  end

  # 許可するパラメータ
  # nameは必須、descriptionは任意
  def team_params
    params.require(:team).permit(:name, :description)
  end

  # チームメンバーかどうかチェック
  # 他人のチーム情報は見れない仕様
  def ensure_team_member
    unless current_user.team_members.exists?(team: @team)
      render json: { error: "チームに所属していません" }, status: :forbidden
    end
  end

  # リーダー権限チェック
  # 重要な操作はリーダーのみに制限
  def ensure_team_leader
    unless current_user.team_members.exists?(team: @team, role: "leader")
      render json: { error: "チームのリーダーではありません" }, status: :forbidden
    end
  end
end

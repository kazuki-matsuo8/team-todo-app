class Api::V1::UsersController < ApplicationController
  before_action :authenticate, only: %i[update show destroy]

  def create
    @user = User.new(user_params)
    if @user.save
      render json: { status: 'SUCCESS', message: 'ユーザー登録が完了しました', data: @user }, status: :created
    else
      render json: { status: 'ERROR', message: 'ユーザー登録に失敗しました', data: @user.errors }, status: :unprocessable_entity
    end
  end


  def show
    @user = User.find(params[:id])
    render json: { status: 'SUCSESS', message: 'ユーザー情報を取得しました', data: @user }
  end

  def destroy
    @current_user.destroy
  end

  def update
    if @current_user.update(update_user_params)
      render json: { status: 'SUCCESS', message: 'ユーザー更新に成功しました', data: @current_user }
    else
      render json: { status: 'ERROR', message: 'ユーザー更新に失敗しました', data: @current_user.errors }, status: :unprocessable_entity
    end
  end

  private
  def user_params
    params.require(:user).permit(:name, :email, :password, :password_confirmation)
  end

  def update_user_params
    params.require(:user).permit(:name, :email)
  end

end
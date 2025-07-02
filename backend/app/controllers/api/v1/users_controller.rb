class Api::V1::UsersController < ApplicationController
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

  private
  def user_params
    params.require(:user).permit(:name, :email, :password, :password_confirmation)
  end
end

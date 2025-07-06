class Api::V1::AuthenticationsController < ApplicationController
  include ActionController::Cookies
  # ログイン
  def create
    user = User.find_by(email: params[:user][:email].downcase)
    if user && user.authenticate(params[:user][:password])
      token = create_token(user.id)
      render json: {user: {email: user.email, token: token, username: user.name}}
    else
      render status: :unauthorized
    end
  end
  # ログアウト
  def destroy
    session.delete(:user_id)
    render json: { status: 200, logged_out: true, message: 'ログアウトしました' }
  end
end

class Api::V1::SessionsController < ApplicationController
  include ActionController::Cookies
  #ログイン
  def create
    user = User.find_by(email: params[:session][:email].downcase)
    if user && user.authenticate(params[:session][:password])
      session[:user_id] = user.id
      render json: { status: 'SUCCESS', logged_in: true, user: user}
    else
      render json: { status: 401, errors: 'メールアドレスまたはパスワードが正しくありません' }
    end
  end
  #ログアウト
  def destroy
    session.delete(:user_id)
    render json: { status: 200, logged_out: true, message: 'ログアウトしました' }
  end
end

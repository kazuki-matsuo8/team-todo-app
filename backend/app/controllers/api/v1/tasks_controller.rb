class Api::V1::TasksController < ApplicationController
  before_action :authenticate

  def index
    tasks = @current_user.created_tasks
    render json: { tasks: tasks }
  end

  def create
    task = @current_user.created_tasks.build(task_params)

    if task.save
      render json: { status: 'SUCCESS', data: task }, status: :created
    else
      render json: { status: 'ERROR', data: task.errors }, status: :unprocessable_entity
    end
  end

  def update
    @task = @current_user.created_tasks.find(params[:id])
    if @task.update
      render json: { status: 'SUCCESS', data: @task }, status: :ok
    else
      render json: { status: 'ERROR', data: @task.errors }, status: :unprocessable_entity
    end
  end

  def destroy
    @task = @current_user.created_tasks.find(params[:id])
    @task.destroy
  end

  def show
    @task = @current_user.created_tasks.find(params[:id])
    render json: { status: 'SUCCESS',data: @task }, status: :ok
  end

  private

  def task_params
    params.require(:task).permit(:title, :content, :category, :status)
  end
end

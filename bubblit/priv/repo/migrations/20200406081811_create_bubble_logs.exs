defmodule Bubblit.Repo.Migrations.CreateBubbleLogs do
  use Ecto.Migration

  def change do
    create table(:bubble_logs) do
      add :room_id, references(:rooms, on_delete: :delete_all)
      add :user_id, :integer
      add :content, :string

      timestamps()
    end
  end
end

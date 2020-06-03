defmodule Bubblit.Repo.Migrations.CreateRoomPasswordRoomTable do
  use Ecto.Migration

  def change do
    alter table("rooms") do
      add :room_password, :string
    end
  end
end

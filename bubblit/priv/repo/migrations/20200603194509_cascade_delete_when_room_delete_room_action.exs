defmodule Bubblit.Repo.Migrations.CascadeDeleteWhenRoomDeleteRoomAction do
  use Ecto.Migration

  def change do
    # execute "ALTER TABLE bubble_logs DROP CONSTRAINT bubble_logs_room_id_fkey"

    alter table("bubble_logs") do
      remove :room_id
    end

    alter table("bubble_logs") do
      add :room_id, references(:rooms, on_delete: :delete_all)
    end

    execute "ALTER TABLE room_actions DROP CONSTRAINT room_actions_room_id_fkey"

    alter table("room_actions") do
      remove :room_id
    end

    alter table("room_actions") do
      add :room_id, references(:rooms, on_delete: :delete_all)
    end
  end

  # def up do
  #   drop constraint(:videos, "videos_user_id_fkey")

  #   alter table("room_actions") do
  #     modify :room_id, references(:rooms, on_delete: :delete_all)
  #   end
  # end

  # def down do
  #   drop constraint(:videos, "bubble_logs_room_id_fkey")

  #   alter table("room_actions") do
  #     modify :room_id, references(:rooms, on_delete: :restrict)
  #   end
  # end
end

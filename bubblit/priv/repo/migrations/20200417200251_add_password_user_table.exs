defmodule Bubblit.Repo.Migrations.AddPasswordUserTable do
  use Ecto.Migration

  def change do
    alter table("users") do
      add :encrypted_password, :string
    end
  end
end

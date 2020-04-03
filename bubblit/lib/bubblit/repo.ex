defmodule Bubblit.Repo do
  use Ecto.Repo,
    otp_app: :bubblit,
    adapter: Ecto.Adapters.MyXQL
end

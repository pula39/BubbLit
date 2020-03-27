defmodule Bubbleling.Repo do
  use Ecto.Repo,
    otp_app: :bubbleling,
    adapter: Ecto.Adapters.MyXQL
end

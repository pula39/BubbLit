defmodule Ets do
  require Logger

  def init() do
    Util.log("Room ets init")
    # 우선 전부 public
    _table = :ets.new(:room_info, [:set, :public, :named_table])
  end

  def set_room_control_restricted(room_id) do
    Util.log("Room #{room_id} set room control restricted.")
    # true는 의미 없음
    :ets.insert(:room_info, {room_id, true})
  end

  def unset_room_control_restricted(room_id) do
    Util.log("Room #{room_id} unset room control restricted.")
    :ets.delete(:room_info, room_id)
  end

  def room_control_restricted?(room_id) do
    case :ets.lookup(:room_info, room_id) do
      [_room] -> true
      [] -> false
    end
  end
end

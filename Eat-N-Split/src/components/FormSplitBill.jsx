import { useState } from "react";
import { Button } from "./Button";

//FormSplit
export function FormSplitBill({ selectedFriend, onSplitBill }) {
  const [bill, setBill] = useState("");
  const [paiByUser, setPaidByUser] = useState("");
  const [whoIsPaying, setWhoisPaying] = useState("user");
  const paidByFriend = bill ? bill - paiByUser : "";
  function handleSubmit(e) {
    e.preventDefault();
    if (!bill || !paiByUser) return;
    onSplitBill(whoIsPaying === "user" ? paidByFriend : -paiByUser);
  }
  return (
    <form className="form-split-bill" onSubmit={handleSubmit}>
      <h2>Split the bill with {selectedFriend.name}</h2>
      <label>💰Bill Value</label>
      <input
        type="text"
        value={bill}
        onChange={(e) => setBill(Number(e.target.value))}
      />
      <label>🙆‍♂️Your expense</label>
      <input
        type="text"
        value={paiByUser}
        onChange={(e) =>
          setPaidByUser(
            Number(e.target.value) > bill ? paiByUser : Number(e.target.value)
          )
        }
      />
      <label>👬 {selectedFriend.name} expense</label>
      <input type="text" disabled value={paidByFriend} />
      <label>🤑Who is paying the bill?</label>
      <select
        value={whoIsPaying}
        onChange={(e) => setWhoisPaying(e.target.value)}
      >
        <option value="user">You</option>
        <option value="friend">{selectedFriend.name}</option>
      </select>
      <Button>Split bill</Button>
    </form>
  );
}

import { Dispatch, SetStateAction, useState } from "react";
import { ItemAddPayload, Item as ItemType } from "../../common/types";
import Item from "./components/item";
import getHandleFormSubmit from "../../utils/form-submit";
import getHandleFormDataChange from "../../utils/form-date-change";

import "./styles.css";

interface Props {
  activeItemId: string;
  items: ItemType[];
  handleItemDelete: (id: string) => void;
  handleItemAdd: (item: ItemAddPayload) => void;
  handleSetActive: (id: string) => void;
}

function getHandleResetNewItem(
  setNewItem: Dispatch<SetStateAction<ItemAddPayload>>,
) {
  return () => setNewItem((prev) => ({ ...prev, text: "" }));
}

function Items({
  activeItemId,
  items,
  handleItemDelete,
  handleSetActive,
  handleItemAdd,
}: Props) {
  const [newItem, setNewItem] = useState<ItemAddPayload>({ text: "" });

  const onNewItemTextInputChange = getHandleFormDataChange(setNewItem);
  const handleNewItemReset = getHandleResetNewItem(setNewItem);
  const handleSubmit = getHandleFormSubmit<ItemAddPayload>(
    newItem,
    handleItemAdd,
    handleNewItemReset,
  );

  return (
    <div className="items">
      <h1 className="items__heading">Items</h1>
      <form className="items__new-item-form" onSubmit={handleSubmit}>
        <input
          className="new-item-form__input form-control"
          required
          placeholder="Type name here..."
          name="text"
          value={newItem.text}
          onChange={onNewItemTextInputChange}
        />
        <button className="btn btn-info" type="submit">
          add new
        </button>
      </form>
      <ul className="list-group">
        {items.map(({ id, commentCount, text }) => (
          <Item
            id={id}
            text={text}
            key={id}
            handleSetActive={handleSetActive}
            isActive={String(id) === String(activeItemId)}
            handleDelete={handleItemDelete}
            commentCount={commentCount}
          />
        ))}
      </ul>
    </div>
  );
}

export default Items;

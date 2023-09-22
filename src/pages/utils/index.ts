import { Dispatch, SetStateAction } from "react";
import {
  ItemAddPayload,
  Item,
  Comment,
  AddCommentPayload,
} from "../../common/types";
import { commentService, itemsService } from "../../services";
import arrayDeleteObjectById from "../../utils/array-delete-object-by-id";

function getHandleAddItem(
  setItems: Dispatch<SetStateAction<Item[]>>,
  setActiveItemId: Dispatch<SetStateAction<string>>,
) {
  const handleActiveItemChange = getHandleChangeActiveItem(setActiveItemId);

  return (payload: ItemAddPayload) => {
    const { newItem, updatedActiveId } = itemsService.addItem(payload);
    setItems((prev) => [...prev, newItem]);

    updatedActiveId && handleActiveItemChange(updatedActiveId);
  };
}

function getHandleDeleteItem(
  setItems: Dispatch<SetStateAction<Item[]>>,
  setActiveItemId: Dispatch<SetStateAction<string>>,
) {
  const handleUpdateActiveItemId = getHandleChangeActiveItem(setActiveItemId);

  return (id: string) => {
    const deleteRes = itemsService.deleteItem(id);

    typeof deleteRes?.newActiveItemId === "string" &&
      handleUpdateActiveItemId(deleteRes.newActiveItemId);

    setItems((prev) => arrayDeleteObjectById<Item>(prev, id));
  };
}

function getHandleChangeActiveItem(
  setActiveItemId: Dispatch<SetStateAction<string>>,
) {
  return (id: string) => {
    itemsService.changeActiveItemId(id);
    setActiveItemId(id);
  };
}

interface GetHandleAddCommentArg {
  setActiveItemComments: Dispatch<SetStateAction<Comment[]>>;
  setItems: Dispatch<SetStateAction<Item[]>>;
  itemId: string;
}

function getHandleAddComment({
  setActiveItemComments,
  setItems,
  itemId,
}: GetHandleAddCommentArg) {
  return (newComment: AddCommentPayload) => {
    const isItemExist = !!itemsService.getItemById(itemId);

    if (!isItemExist) {
      return;
    }

    const { newComment: createdComment, updatedAllItems } =
      commentService.addComment(newComment, itemId);

    setActiveItemComments((prev) => [...prev, createdComment]);
    setItems(updatedAllItems);
  };
}

export {
  getHandleAddComment,
  getHandleChangeActiveItem,
  getHandleDeleteItem,
  getHandleAddItem,
};

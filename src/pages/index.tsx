import { useEffect, useState } from "react";
import Aside from "../components/aside/Aside";
import Items from "../components/items/Items";
import { commentService, itemsService } from "../services";
import { Comment } from "../common/types";
import Comments from "../components/comments/Comments";
import {
  getHandleAddComment,
  getHandleAddItem,
  getHandleChangeActiveItem,
  getHandleDeleteItem,
} from "./utils";

import "./styles.css";

function MainPage() {
  const [activeItemId, setActiveItemId] = useState(
    itemsService.getActiveItemId(),
  );

  const [items, setItems] = useState(itemsService.getAllItems());

  const [activeItemComments, setActiveItemComments] = useState<Comment[]>([]);

  const handleAddItem = getHandleAddItem(setItems, setActiveItemId);
  const handleDeleteItem = getHandleDeleteItem(setItems, setActiveItemId);
  const handleSetActive = getHandleChangeActiveItem(setActiveItemId);
  const handleAddComment = getHandleAddComment({
    setActiveItemComments,
    itemId: activeItemId,
    setItems,
  });

  useEffect(() => {
    setActiveItemComments(commentService.getItemComments(activeItemId));
  }, [activeItemId]);

  return (
    <div className="main-page">
      <div className="main-page__aside">
        <Aside />
      </div>
      <div className="main-page__items-container">
        <Items
          handleItemAdd={handleAddItem}
          activeItemId={activeItemId ?? ""}
          items={items}
          handleItemDelete={handleDeleteItem}
          handleSetActive={handleSetActive}
        />
      </div>
      <div className="main-page__items-container">
        <Comments
          comments={activeItemComments}
          itemId={activeItemId}
          handleAddComment={handleAddComment}
        />
      </div>
    </div>
  );
}

export default MainPage;

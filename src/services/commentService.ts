import { StorageKey } from "../common/enums";
import { AddCommentPayload, Comment, Item } from "../common/types";
import generateId from "../utils/generateId";
import LocalStorageService from "./localStorageService";

class CommentService {
  storage: LocalStorageService;

  constructor(storage: LocalStorageService) {
    this.storage = storage;

    this.addComment = this.addComment.bind(this);
    this.getItemComments = this.getItemComments.bind(this);
    this.countItemComments = this.countItemComments.bind(this);
  }

  getAllComments() {
    const allComments = this.storage.retrieve<Comment[]>(StorageKey.Comments);

    if (!allComments) {
      this.storage.add(StorageKey.Comments, []);
      return [];
    }

    return allComments;
  }

  addComment(comment: AddCommentPayload, itemId: string) {
    const allComments = this.getAllComments();

    const newComment = {
      ...comment,
      id: generateId(),
      itemId,
    };

    allComments.push(newComment);

    this.storage.add(StorageKey.Comments, allComments);

    const allItems = this.storage.retrieve<Item[]>(StorageKey.Items);

    const updatedAllItems =
      allItems?.map((item) => {
        const itemCopy = { ...item };

        if (item.id === itemId) {
          itemCopy.commentCount += 1;
        }

        return itemCopy;
      }) ?? [];

    this.storage.add(StorageKey.Items, updatedAllItems);

    return { newComment, updatedAllItems };
  }

  getItemComments(itemId: string) {
    const allComments = this.getAllComments();

    return allComments.filter((comment) => comment.itemId === itemId);
  }

  countItemComments(itemId: string) {
    return this.getItemComments(itemId).length;
  }
}

export default CommentService;

interface Item {
  id: string;
  text: string;
  commentCount: number;
}

interface ItemAddPayload extends Record<string, string> {
  text: string;
}

interface Comment extends Omit<Item, "commentCount"> {
  itemId: string;
  color: string;
}

type AddCommentPayload = Omit<Comment, "itemId" | "id">;

export { type Item, type ItemAddPayload, type Comment, type AddCommentPayload };

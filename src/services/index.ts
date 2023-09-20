import CommentService from "./commentService";
import ItemsService from "./itemsService";
import LocalStorageService from "./localStorageService";

const storage = new LocalStorageService();
const itemsService = new ItemsService(storage);
const commentService = new CommentService(storage);

export { itemsService, commentService };

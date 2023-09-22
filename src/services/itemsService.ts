import { StorageKey } from "../common/enums";
import { Item, ItemAddPayload, Comment } from "../common/types";
import arrayDeleteObjectById from "../utils/array-delete-object-by-id";
import generateId from "../utils/generateId";
import LocalStorageService from "./localStorageService";

class ItemsService {
  storage: LocalStorageService;

  constructor(storage: LocalStorageService) {
    this.storage = storage;

    this.getAllItems = this.getAllItems.bind(this);
    this.addItem = this.addItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.getActiveItemId = this.getActiveItemId.bind(this);
    this.changeActiveItemId = this.changeActiveItemId.bind(this);
  }

  addItem({ text }: ItemAddPayload) {
    const id = generateId();

    const items: Item[] = this.getAllItems();
    let activeItemId: null | string = null;

    if (!items.length) {
      this.storage.add(StorageKey.ActiveItemId, id);
      activeItemId = id;
    }

    const newItem = { text, id, commentCount: 0 };

    items.push(newItem);

    this.storage.add(StorageKey.Items, items);

    return { newItem, updatedActiveId: activeItemId };
  }

  getAllItems() {
    const items = this.storage.retrieve<Item[]>(StorageKey.Items);

    if (!items) {
      this.storage.add(StorageKey.Items, []);
      return [];
    }

    return items;
  }

  getItemById(id: string) {
    const allItems = this.storage.retrieve<Item[]>(StorageKey.Items);

    return allItems?.find(({ id: itemId }) => itemId === id);
  }

  private deleteItemComments(id: string) {
    const allComments = this.storage.retrieve<Comment[]>(StorageKey.Comments);

    const updatedComments =
      allComments?.filter(({ itemId }) => itemId !== id) ?? [];

    this.storage.add(StorageKey.Comments, updatedComments);
  }

  deleteItem(id: string) {
    const items: Item[] = this.storage.retrieve<Item[]>(StorageKey.Items) ?? [];

    const filteredItems = arrayDeleteObjectById(items, id);

    this.storage.add(StorageKey.Items, filteredItems);

    this.deleteItemComments(id);

    const activeItemId = this.storage.retrieve<string>(StorageKey.ActiveItemId);

    const isDeleteActiveItem = !!items.find(
      ({ id: currentItemId }) => currentItemId === activeItemId
    );

    if (!filteredItems.length) {
      return { newActiveItemId: "" };
    }

    if (!isDeleteActiveItem) {
      const newActiveItemId = filteredItems[0]?.id ?? "";
      this.storage.add(StorageKey.ActiveItemId, filteredItems[0]?.id ?? "");

      return { newActiveItemId };
    }
  }

  getActiveItemId() {
    const activeItemId = this.storage.retrieve<string>(StorageKey.ActiveItemId);
    const items = this.getAllItems();

    if (!activeItemId && items.length) {
      const firstItemId = items[0].id;
      this.storage.add(StorageKey.ActiveItemId, firstItemId);
      return firstItemId;
    } else if (!activeItemId) {
      this.storage.add(StorageKey.ActiveItemId, "");
      return "";
    }

    return activeItemId;
  }

  changeActiveItemId(activeItemId: string) {
    this.storage.add(StorageKey.ActiveItemId, activeItemId);
  }
}

export default ItemsService;

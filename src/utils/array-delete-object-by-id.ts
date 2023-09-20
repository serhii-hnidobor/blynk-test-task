function arrayDeleteObjectById<T extends object & { id: string }>(
  data: T[],
  id: string,
): T[] {
  if (!data[0]?.id) {
    return data;
  }

  return data.filter(({ id: curDataId }) => curDataId !== id);
}

export default arrayDeleteObjectById;

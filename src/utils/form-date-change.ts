import { ChangeEvent, Dispatch, SetStateAction } from "react";

function getHandleFormDataChange<T extends Record<string, unknown>>(
  setFormData: Dispatch<SetStateAction<T>>,
) {
  return (
    event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };
}

export default getHandleFormDataChange;

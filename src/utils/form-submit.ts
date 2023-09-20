import { FormEvent } from "react";

function getHandleFormSubmit<T extends Record<string, unknown>>(
  formData: T,
  processFormData: (data: typeof formData) => void,
  callBack?: VoidFunction,
) {
  return (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    processFormData(formData);
    callBack?.();
  };
}

export default getHandleFormSubmit;

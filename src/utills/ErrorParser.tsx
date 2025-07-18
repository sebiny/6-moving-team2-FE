export const parseBackendError = (status: number, responseText: string): string => {
  if (responseText) {
    try {
      const errorData = JSON.parse(responseText);

      if (errorData && typeof errorData.message === "string" && errorData.message.trim()) {
        return errorData.message;
      }
    } catch (e) {}
  }

  return `${responseText ? `${responseText.substring(0, 100)}` : ""}`;
};

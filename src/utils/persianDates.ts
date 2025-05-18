export const makeDatePersian = (time: string) => {
    const date = new Date(time).toLocaleDateString("fa-IR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
    return date;
  };
import { format } from "date-fns";
import { enAU } from "date-fns/locale";

export const displayDate = (date: Date) => {
  return format(new Date(date), "d/M/yyyy", {
    locale: enAU,
  });
};

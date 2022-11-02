import _ from "underscore";
import { Transaction } from "types";
import { format } from "date-fns";
import { enAU } from "date-fns/locale";

type GroupedTransactions = {
  [key: string]: Array<Transaction>;
};

export const groupByDate = (
  transactions: Array<Transaction>
): GroupedTransactions => {
  const sortedTransactions = transactions.sort((a, b) => {
    if (a.date > b.date) return -1;
    if (a.date < b.date) return 1;
    return 0;
  });

  const groupedTransactions = _.groupBy(sortedTransactions, (transaction) => {
    const date = new Date(transaction.date);
    return format(date, "LLLL", { locale: enAU });
    // return moment(date.getTime()).startOf("month").format("DD MMMM YYYY");
  });

  return groupedTransactions;
};

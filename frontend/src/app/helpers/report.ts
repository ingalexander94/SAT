import { Canvas, Item, Line, Ul, Txt } from 'pdfmake-wrapper';
import { normalizeRoles, parseDate } from './ui';

const createReportBinnacle = (data: any[]) => {
  const binnacle = createUIBinnacle(data);
  binnacle.pop();
  return new Ul([...binnacle]).markerColor('#bb0b20').end;
};

const createUIBinnacle = (data: any[]) =>
  data
    .map(
      (x) =>
        new Item(
          new Txt(
            `${normalizeRoles(x.role)}: ${x.text}.\n ${parseDate(
              new Date(x.date)
            )}`
          )
            .bold()
            .margin([20, 20]).end
        ).end
    )
    .reduce(
      (acc, cur) =>
        (acc = [
          ...acc,
          cur,
          new Canvas([new Line([10, 0], [500, 0]).lineColor('#bb0b20').end])
            .end,
        ]),
      []
    );

export { createReportBinnacle };

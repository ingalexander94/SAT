import { Canvas, Item, Line, Ul, Txt } from 'pdfmake-wrapper';
import { normalizeRoles } from './ui';

const createReportBinnacle = (data: any[]) => {
  return new Ul([
    ...createUIBinnacle(data),
    // new Canvas([new Line([10, 0], [500, 0]).end]).end
  ]).end;
};

const createUIBinnacle = (data: any[]) =>
  data.map(
    (x) =>
      new Item(
        new Txt(`${normalizeRoles(x.role)}: ${x.text}.\n ${x.date}`)
          .bold()
          .margin([20, 20]).end
      ).end
  );

export { createReportBinnacle };

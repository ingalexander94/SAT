import { Img, ITable, PdfMakeWrapper, Table, Txt } from 'pdfmake-wrapper';
import { User } from '../model/auth';

type TableRow = [Number, String, String, String, String, String];

const generatePDF = async (data: User[], text: String) => {
  const pdf = new PdfMakeWrapper();
  const date = new Date();
  const dateString = date.toLocaleDateString('es-ES', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
  pdf.header(
    new Txt(dateString)
      .fontSize(10)
      .color('gray')
      .margin([20, 20])
      .alignment('right').end
  );

  pdf.footer(
    (currentPage) =>
      new Txt(`UFPS Cúcuta, Norte de Santander - Página ${currentPage}`)
        .fontSize(10)
        .color('black')
        .bold()
        .margin([20, 0])
        .alignment('right').end
  );

  pdf.add(
    await new Img('http://localhost:4200/assets/image/Logo_SAT.svg')
      .alignment('center')
      .build()
  );

  pdf.add(
    new Txt('SAT').fontSize(20).color('#353343').bold().alignment('center').end
  );

  pdf.add(
    new Txt(text.toString()).margin([0, 20]).fontSize(12).color('black').bold()
      .end
  );

  pdf.add(createTable(data));
  pdf.create().open({});
};

const createTable = (data: User[]): ITable =>
  new Table([
    //Header
    [
      new Txt('#').fontSize(14).bold().end,
      new Txt('Código').fontSize(14).bold().end,
      new Txt('Nombre').fontSize(14).bold().end,
      new Txt('Correo').fontSize(14).bold().end,
      new Txt('Riesgo').fontSize(14).bold().end,
      new Txt('Estado').fontSize(14).bold().end,
    ],
    //Data
    ...extractDate(data),
  ])
    .alignment('center')
    .heights(() => 50)
    .widths(['2%', '16%', 'auto', 'auto', '16%', 'auto'])
    .layout({
      defaultBorder: false,
      fillColor: () => '#f3f0ee',
    }).end;

const extractDate = (data: User[]): TableRow[] =>
  data.map((student, i) => [
    i + 1,
    student.codigo,
    `${student.nombre} ${student.apellido}`,
    student.correo,
    'CRÍTICO',
    student.estado.toUpperCase(),
  ]);

export { generatePDF };

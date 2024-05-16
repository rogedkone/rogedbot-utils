import { MajorOrder } from '@integrations/helldivers2/types';

export default (order: MajorOrder) => {
  const done = order.progress.filter((isDone) => isDone === 1).length;
  const percent = Math.round((done / order.progress.length) * 100);

  return `<b>Главный приказ выполнен на ${percent}%</b>`;
};

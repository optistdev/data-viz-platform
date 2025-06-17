import { faker } from '@faker-js/faker';

export function generateChartData(count: number = 10): { date: string; value: number }[] {
  const data: { date: string; value: number }[] = [];

  for (let i = 0; i < count; i++) {
    const date = faker.date.between({
      from: new Date('2025-01-01'),
      to: new Date('2025-12-31'),
    });

    data.push({
      date: date.toISOString().split('T')[0], // YYYY-MM-DD
      value: faker.number.int({ min: 0, max: 100000 }),
    });
  }

  data.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  return data;
}

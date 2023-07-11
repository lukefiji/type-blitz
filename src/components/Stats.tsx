import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';

interface Props {
  wordsPerMinute: number;
  accuracy: number;
  numErrors: number;
}

interface StatCardProps {
  title: string;
  value: string | number;
}

const StatCard = ({ title, value }: StatCardProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
      </CardContent>
    </Card>
  );
};

const Stats = ({ wordsPerMinute, accuracy, numErrors }: Props) => {
  return (
    <div className="columns-2 gap-4 space-y-4 md:columns-4">
      <StatCard title="WPM" value={Math.max(0, wordsPerMinute)} />
      <StatCard title="Accuracy" value={`${accuracy}%`} />
      <StatCard title="Errors" value={numErrors} />
      <StatCard title="Errors/min" value={0} />
    </div>
  );
};

export default Stats;

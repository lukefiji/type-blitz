import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';

interface Props {
  numErrors: number;
}

interface StatCardProps {
  title: string;
  value: string | number;
}

const StatCard = ({ title, value }: StatCardProps) => {
  return (
    <Card className="grow">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
      </CardContent>
    </Card>
  );
};

const Stats = ({ numErrors }: Props) => {
  return (
    <div className="flex justify-between gap-4">
      <StatCard title="Errors" value={numErrors} />
      <StatCard title="WPM" value={0} />
      <StatCard title="Speed" value={0} />
      <StatCard title="Errors/min" value={0} />
    </div>
  );
};

export default Stats;

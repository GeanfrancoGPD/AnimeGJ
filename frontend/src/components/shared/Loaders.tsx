import { Center, Loader, Skeleton, Stack } from '@mantine/core';

interface LoadersProps {
  type?: 'loader' | 'skeleton';
  lines?: number;
  height?: number;
}

function Loaders({ type = 'loader', lines = 3, height = 20 }: LoadersProps) {
  if (type === 'loader') {
    return (
      <Center py="xl">
        <Loader size="lg" />
      </Center>
    );
  }

  return (
    <Stack py="md">
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton key={i} height={height} radius="sm" />
      ))}
    </Stack>
  );
}

export default Loaders;

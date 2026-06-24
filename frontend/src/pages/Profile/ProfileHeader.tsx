import { Avatar, Group, Stack, Title, Text } from '@mantine/core';
import { formatDate } from '../../utils/formateDate';
import type { User } from '../../types/index';

export default function ProfileHeader({ user }: { user: User }) {
  return (
    <Group align="flex-start" gap="lg" mb="xl">
      <Avatar size={80} name={user.name} color="initials" />
      <Stack gap={4}>
        <Title order={2}>{user.name}</Title>
        <Text size="sm" c="dimmed">
          {user.email}
        </Text>
        <Text size="xs" c="dimmed">
          Miembro desde: {formatDate(user.createdAt)}
        </Text>
      </Stack>
    </Group>
  );
}

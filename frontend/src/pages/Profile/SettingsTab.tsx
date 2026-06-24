import {
  Badge,
  Card,
  Group,
  Stack,
  Tabs,
  Text,
  TextInput,
} from '@mantine/core';
import type { User } from '../../types';

interface SettingProps {
  user: User;
}

export default function SettingsTab({ user }: SettingProps) {
  return (
    <Tabs.Panel value="settings">
      <Card withBorder shadow="sm" radius="md" p="lg" maw={480}>
        <Stack gap="md">
          <Group gap="xs">
            <Text fw={500}>Account Settings</Text>
            <Badge
              size="sm"
              variant="light"
              color={user.role === 'admin' ? 'yellow' : 'blue'}
            >
              {user.role}
            </Badge>
          </Group>
          <TextInput label="Nombre" value={user.name} readOnly />
          <TextInput label="Email" value={user.email} readOnly />
          <Text size="xs" c="dimmed">
            Los cambios de perfil estarán disponibles cuando el backend
            implemente el endpoint de actualización.
          </Text>
        </Stack>
      </Card>
    </Tabs.Panel>
  );
}

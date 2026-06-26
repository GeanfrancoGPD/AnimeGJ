import {
  Container,
  Paper,
  Title,
  Text,
  TextInput,
  PasswordInput,
  Button,
  Group,
  Anchor,
  Checkbox,
  Stack,
  Box,
  Alert,
} from '@mantine/core';
import { IconMail, IconLock, IconAlertCircle } from '@tabler/icons-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { animeService } from '../services/animeService';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [apiError, setApiError] = useState('');

  function validate(): boolean {
    const newErrors: { email?: string; password?: string } = {};
    if (!email.trim()) {
      newErrors.email = 'El correo electrónico es obligatorio.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Ingresa un correo electrónico válido.';
    }
    if (!password) {
      newErrors.password = 'La contraseña es obligatoria.';
    } else if (password.length < 4) {
      newErrors.password = 'La contraseña debe tener al menos 4 caracteres.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setApiError('');

    try {
      await animeService.login(email, password);
      navigate('/profile');
    } catch (err: any) {
      setApiError(err.message || 'Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  }

  return (
    <Box className="auth-wrapper">
      <Container size={420} w="100%">
        <Stack align="center" mb="lg">
          <Title order={2} ta="center">¡Bienvenido de nuevo!</Title>
          <Text c="dimmed" size="sm" ta="center" maw={320}>
            Inicia sesión en tu cuenta de AnimeVerse para acceder a tu lista y favoritos.
          </Text>
        </Stack>

        <Paper radius="md" p="xl" withBorder>
          <form onSubmit={handleSubmit}>
            <Stack gap="md">
              {apiError && (
                <Alert icon={<IconAlertCircle size={16} />} color="red" variant="light">
                  {apiError}
                </Alert>
              )}
              <TextInput
                label="Correo electrónico"
                placeholder="tu@correo.com"
                required
                value={email}
                onChange={(e) => setEmail(e.currentTarget.value)}
                error={errors.email}
                leftSection={<IconMail size={16} stroke={1.5} />}
                autoComplete="email"
              />
              <PasswordInput
                label="Contraseña"
                placeholder="Tu contraseña"
                required
                value={password}
                onChange={(e) => setPassword(e.currentTarget.value)}
                error={errors.password}
                leftSection={<IconLock size={16} stroke={1.5} />}
                autoComplete="current-password"
              />
              <Group justify="space-between">
                <Checkbox
                  label="Recordarme"
                  checked={remember}
                  onChange={(e) => setRemember(e.currentTarget.checked)}
                  color="violet"
                  size="sm"
                />
              </Group>
              <Button type="submit" fullWidth loading={loading} color="violet" size="md" mt="xs">
                Iniciar Sesión
              </Button>
            </Stack>
          </form>

          <Text ta="center" mt="lg" size="sm">
            ¿Aún no tienes cuenta?{' '}
            <Anchor size="sm" c="violet" style={{ cursor: 'pointer' }}
              onClick={() => navigate('/register')}>
              Regístrate aquí
            </Anchor>
          </Text>
        </Paper>
      </Container>
    </Box>
  );
}

export default Login;

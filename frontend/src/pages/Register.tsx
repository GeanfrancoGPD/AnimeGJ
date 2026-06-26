import {
  Container,
  Paper,
  Title,
  Text,
  TextInput,
  PasswordInput,
  Button,
  Anchor,
  Stack,
  Box,
  Alert,
} from '@mantine/core';
import { IconMail, IconLock, IconUser, IconAlertCircle } from '@tabler/icons-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { animeService } from '../services/animeService';

function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; email?: string; password?: string; confirmPassword?: string }>({});
  const [apiError, setApiError] = useState('');
  const [success, setSuccess] = useState('');

  function validate(): boolean {
    const newErrors: typeof errors = {};
    if (!name.trim()) newErrors.name = 'El nombre es obligatorio.';
    else if (name.trim().length < 3) newErrors.name = 'El nombre debe tener al menos 3 caracteres.';
    if (!email.trim()) newErrors.email = 'El correo electrónico es obligatorio.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = 'Ingresa un correo electrónico válido.';
    if (!password) newErrors.password = 'La contraseña es obligatoria.';
    else if (password.length < 8) newErrors.password = 'La contraseña debe tener al menos 8 caracteres.';
    if (!confirmPassword) newErrors.confirmPassword = 'Confirma tu contraseña.';
    else if (password !== confirmPassword) newErrors.confirmPassword = 'Las contraseñas no coinciden.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setApiError('');
    setSuccess('');

    try {
      const result = await animeService.register(name, email, password);
      setSuccess(result.message || 'Usuario registrado correctamente');
      setTimeout(() => navigate('/login'), 1500);
    } catch (err: any) {
      setApiError(err.message || 'Error al registrarse');
    } finally {
      setLoading(false);
    }
  }

  return (
    <Box className="auth-wrapper">
      <Container size={420} w="100%">
        <Stack align="center" mb="lg">
          <Title order={2} ta="center">Crear cuenta</Title>
          <Text c="dimmed" size="sm" ta="center" maw={320}>
            Únete a la comunidad de AnimeVerse y haz seguimiento de tus series favoritas.
          </Text>
        </Stack>

        <Paper radius="md" p="xl" withBorder>
          <form onSubmit={handleSubmit}>
            <Stack gap="md">
              {apiError && (
                <Alert icon={<IconAlertCircle size={16} />} color="red" variant="light">{apiError}</Alert>
              )}
              {success && (
                <Alert icon={<IconAlertCircle size={16} />} color="green" variant="light">{success}</Alert>
              )}
              <TextInput
                label="Nombre completo"
                placeholder="Tu nombre"
                required
                value={name}
                onChange={(e) => setName(e.currentTarget.value)}
                error={errors.name}
                leftSection={<IconUser size={16} stroke={1.5} />}
                autoComplete="name"
              />
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
                placeholder="Mínimo 8 caracteres"
                required
                value={password}
                onChange={(e) => setPassword(e.currentTarget.value)}
                error={errors.password}
                leftSection={<IconLock size={16} stroke={1.5} />}
                autoComplete="new-password"
              />
              <PasswordInput
                label="Confirmar contraseña"
                placeholder="Repite tu contraseña"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.currentTarget.value)}
                error={errors.confirmPassword}
                leftSection={<IconLock size={16} stroke={1.5} />}
                autoComplete="new-password"
              />
              <Button type="submit" fullWidth loading={loading} color="violet" size="md" mt="xs">
                Registrarse
              </Button>
            </Stack>
          </form>

          <Text ta="center" mt="lg" size="sm">
            ¿Ya tienes cuenta?{' '}
            <Anchor size="sm" c="violet" style={{ cursor: 'pointer' }}
              onClick={() => navigate('/login')}>
              Inicia sesión aquí
            </Anchor>
          </Text>
        </Paper>
      </Container>
    </Box>
  );
}

export default Register;

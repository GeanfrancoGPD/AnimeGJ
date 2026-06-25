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
} from '@mantine/core';
import { IconMail, IconLock, IconUser } from '@tabler/icons-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * Página de Registro de Usuario.
 *
 * Formulario con:
 * - TextInput para nombre completo
 * - TextInput para email (con validación de formato)
 * - PasswordInput para contraseña
 * - PasswordInput para confirmar contraseña (deben coincidir)
 * - Botón de envío
 * - Link a la página de Login
 *
 * La validación es del lado del cliente (básica). El registro real
 * se conectará al backend (POST /api/auth/register) cuando esté listo.
 */
function Register() {
  const navigate = useNavigate();

  /* ─── Estado del formulario ─── */
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  /* ─── Estado de errores por campo ─── */
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  }>({});

  /* ─── Validación ─── */
  function validate(): boolean {
    const newErrors: typeof errors = {};

    if (!name.trim()) {
      newErrors.name = 'El nombre es obligatorio.';
    } else if (name.trim().length < 3) {
      newErrors.name = 'El nombre debe tener al menos 3 caracteres.';
    }

    if (!email.trim()) {
      newErrors.email = 'El correo electrónico es obligatorio.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Ingresa un correo electrónico válido.';
    }

    if (!password) {
      newErrors.password = 'La contraseña es obligatoria.';
    } else if (password.length < 8) {
      newErrors.password = 'La contraseña debe tener al menos 8 caracteres.';
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = 'Confirma tu contraseña.';
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  /* ─── Submit ─── */
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);

    // Simular llamada al backend
    await new Promise((resolve) => setTimeout(resolve, 800));

    console.log('Register:', { name, email, password });

    setLoading(false);
    navigate('/login');
  }

  return (
    <Box className="auth-wrapper">
      <Container size={420} w="100%">
        <Stack align="center" mb="lg">
          <Title order={2} ta="center">
            Crear cuenta
          </Title>
          <Text c="dimmed" size="sm" ta="center" maw={320}>
            Únete a la comunidad de AnimeVerse y haz seguimiento de tus series
            favoritas.
          </Text>
        </Stack>

        <Paper radius="md" p="xl" withBorder>
          <form onSubmit={handleSubmit}>
            <Stack gap="md">
              <TextInput
                id="register-name"
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
                id="register-email"
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
                id="register-password"
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
                id="register-confirm-password"
                label="Confirmar contraseña"
                placeholder="Repite tu contraseña"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.currentTarget.value)}
                error={errors.confirmPassword}
                leftSection={<IconLock size={16} stroke={1.5} />}
                autoComplete="new-password"
              />

              <Button
                id="register-submit"
                type="submit"
                fullWidth
                loading={loading}
                color="violet"
                size="md"
                mt="xs"
              >
                Registrarse
              </Button>
            </Stack>
          </form>

          <Text ta="center" mt="lg" size="sm">
            ¿Ya tienes cuenta?{' '}
            <Anchor
              size="sm"
              c="violet"
              style={{ cursor: 'pointer' }}
              onClick={() => navigate('/login')}
            >
              Inicia sesión aquí
            </Anchor>
          </Text>
        </Paper>
      </Container>
    </Box>
  );
}

export default Register;

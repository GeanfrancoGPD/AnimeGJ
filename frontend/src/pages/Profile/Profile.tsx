import { Container, Text, Tabs } from '@mantine/core';
import Loaders from '../../components/shared/Loaders';
import ConfirmModal from '../../components/shared/ConfirmModal';
import useProfileReducer from '../../hooks/useProfile';
import ProfileHeader from './ProfileHeader';
import WatchingHistoryTab from './WatchingHistoryTab';
import FavoritesTab from './FavoritesTab';
import SettingsTab from './SettingsTab';

function Profile() {
  const {
    user,
    history,
    favorites,
    loading,
    removingId,
    confirmAnimeId,
    opened,
    closeConfirm,
    handleRemoveFavorite,
    openRemoveConfirm,
  } = useProfileReducer();

  if (loading) {
    return (
      <Container size="md" py="xl">
        <Loaders type="skeleton" lines={6} height={24} />
      </Container>
    );
  }

  if (!user) {
    return (
      <Container size="md" py="xl">
        <Text c="dimmed">No se pudo cargar el perfil.</Text>
      </Container>
    );
  }

  return (
    <Container size="md" py="xl">
      <ProfileHeader user={user} />

      <Tabs defaultValue="history">
        <Tabs.List mb="md">
          <Tabs.Tab value="history">Watching History</Tabs.Tab>
          <Tabs.Tab value="favorites">My List / Favorites</Tabs.Tab>
          <Tabs.Tab value="settings">Account Settings</Tabs.Tab>
        </Tabs.List>

        <WatchingHistoryTab entries={history} />
        <FavoritesTab
          favorites={favorites}
          onRemove={openRemoveConfirm}
        />
        <SettingsTab user={user} />
      </Tabs>

      <ConfirmModal
        opened={opened}
        onClose={closeConfirm}
        onConfirm={() => confirmAnimeId && handleRemoveFavorite(confirmAnimeId)}
        title="Quitar favorito"
        message="¿Estás seguro de que deseas eliminar este anime de tu lista de favoritos?"
        confirmLabel="Eliminar"
        color="red"
        loading={removingId !== null}
      />
    </Container>
  );
}

export default Profile;

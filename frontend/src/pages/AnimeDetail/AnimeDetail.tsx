import { useParams } from 'react-router-dom';
import { Container, Text, Divider } from '@mantine/core';
import useAnimeDetail from '../../hooks/useAnimeDetail';
import Loaders from '../../components/shared/Loaders';
import AnimeInfo from './AnimeInfo';
import EpisodeList from './EpisodeList';
import CommentSection from './CommentSection';

function AnimeDetail() {
  const { id } = useParams<{ id: string }>();
  const numId = Number(id);

  const {
    anime,
    episodes,
    comments,
    loading,
    error,
    isFavorited,
    togglingFavorite,
    newComment,
    submittingComment,
    setNewComment,
    handleToggleFavorite,
    handleSubmitComment,
  } = useAnimeDetail(numId);

  if (loading) {
    return (
      <Container size="md" py="xl">
        <Loaders type="skeleton" lines={8} height={24} />
      </Container>
    );
  }

  if (error || !anime) {
    return (
      <Container size="md" py="xl">
        <Text c="dimmed">{error ?? 'Anime no encontrado.'}</Text>
      </Container>
    );
  }

  return (
    <Container size="md" py="xl">
      <AnimeInfo
        anime={anime}
        isFavorited={isFavorited}
        togglingFavorite={togglingFavorite}
        onToggleFavorite={handleToggleFavorite}
      />

      <Divider my="xl" />

      <EpisodeList episodes={episodes} />

      <Divider my="xl" />

      <CommentSection
        comments={comments}
        newComment={newComment}
        onCommentChange={setNewComment}
        onSubmit={handleSubmitComment}
        submitting={submittingComment}
      />
    </Container>
  );
}

export default AnimeDetail;

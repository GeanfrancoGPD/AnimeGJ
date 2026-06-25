import {
  Title,
  Text,
  Stack,
  Group,
  Avatar,
  Textarea,
  Button,
  Card,
} from '@mantine/core';
import { IconSend } from '@tabler/icons-react';
import type { Comment } from '../../types';
import { formatDate } from '../../utils/formateDate';

interface CommentSectionProps {
  comments: Comment[];
  newComment: string;
  onCommentChange: (value: string) => void;
  onSubmit: () => void;
  submitting: boolean;
}

function CommentSection({
  comments,
  newComment,
  onCommentChange,
  onSubmit,
  submitting,
}: CommentSectionProps) {
  return (
    <>
      <Title order={3} mb="md">
        Comentarios ({comments.length})
      </Title>

      <Card withBorder shadow="sm" radius="md" p="md" mb="lg">
        <Group align="flex-end" gap="sm">
          <Textarea
            placeholder="Escribe un comentario..."
            value={newComment}
            onChange={(e) => onCommentChange(e.currentTarget.value)}
            minRows={2}
            style={{ flex: 1 }}
            disabled={submitting}
          />
          <Button
            onClick={onSubmit}
            loading={submitting}
            disabled={!newComment.trim()}
            rightSection={<IconSend size={16} />}
          >
            Enviar
          </Button>
        </Group>
      </Card>

      {comments.length === 0 ? (
        <Text c="dimmed" py="xl">
          No hay comentarios aún. ¡Sé el primero en comentar!
        </Text>
      ) : (
        <Stack gap="md">
          {comments
            .slice()
            .sort(
              (a, b) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime(),
            )
            .map((comment) => (
              <Card key={comment.id} withBorder shadow="sm" radius="md" p="sm">
                <Group gap="sm" align="flex-start">
                  <Avatar name={comment.user.name} color="initials" size="md" />
                  <div style={{ flex: 1 }}>
                    <Group gap="xs" mb={2}>
                      <Text size="sm" fw={500}>
                        {comment.user.name}
                      </Text>
                      <Text size="xs" c="dimmed">
                        {formatDate(comment.createdAt)}
                      </Text>
                    </Group>
                    <Text size="sm">{comment.content}</Text>
                  </div>
                </Group>
              </Card>
            ))}
        </Stack>
      )}
    </>
  );
}

export default CommentSection;

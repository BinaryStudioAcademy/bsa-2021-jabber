import { Comment as TComment, CommentCreatePayload } from '~/common/types/types';
import {
  comment as commentRep,
  user as userRep,
} from '~/data/repositories/repositories';

type Constructor = {
  commentRepository: typeof commentRep;
  userRepository: typeof userRep;
};

class Comment {
  #commentRepository: typeof commentRep;
  #userRepository: typeof userRep;

  constructor({ commentRepository, userRepository }: Constructor) {
    this.#commentRepository = commentRepository;
    this.#userRepository = userRepository;
  }

  public getAll(): Promise<TComment[]> {
    return this.#commentRepository.getAll();
  }

  public async create(payload: CommentCreatePayload): Promise<TComment> {
    const user = await this.#userRepository.getById(payload.userId);
    const newComment = { ...payload, user };

    return this.#commentRepository.create(newComment);
  }

  public getAllByEpisodeId(id: number): Promise<TComment[]> {
    return this.#commentRepository.getAllByEpisodeId(id);
  }
}

export { Comment };

import H5AudioPlayer from 'react-h5-audio-player';
import { Comment as TComment } from 'common/types/types';
import TimelineItem from '../timeline-item/timeline-item';

type Props = {
  comments: TComment[];
  player: H5AudioPlayer;
};

const CommentsTimeline: React.FC<Props> = ({ comments, player }) => {
  // eslint-disable-next-line no-console
  console.log(player);

  return (
    <div>
      {comments.map((item) => (
        <TimelineItem key={item.id} comment={item} />
      ))}
    </div>
  );
};

export default CommentsTimeline;

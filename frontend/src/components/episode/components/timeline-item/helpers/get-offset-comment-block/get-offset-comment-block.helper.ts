const getOffsetCommentBlock = (commentOffset: number, containerWidth: number, commentBlockWidth: number): number => {
  return ((((commentOffset / 100) * containerWidth) + commentBlockWidth) > containerWidth)
    ? -commentBlockWidth
    : 0;
};

export { getOffsetCommentBlock };

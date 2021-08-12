type DefaultImageProps = {
  width?: string;
  height?: string;
};

const getDefaultImageStyle = ({
  width,
  height,
}: DefaultImageProps): React.CSSProperties => ({
  width: width && `${width}px`,
  height: height && `${height}px`,
});

export { getDefaultImageStyle };


const BackgroundImage = ({ imageUrl, size = 'cover', position = 'center', children, className = '', props = {} }) => {
  const backgroundStyle = {
    backgroundImage: `url(${imageUrl})`,
    backgroundSize: size,
    backgroundPosition: position,
    ...props, // Allow additional inline styles to be applied
  };

  return (
    <div className={className} style={backgroundStyle}>
      {children}
    </div>
  );
};

export default BackgroundImage;


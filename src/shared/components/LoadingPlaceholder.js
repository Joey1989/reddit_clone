import Placeholder from 'react-bootstrap/Placeholder';

function LoadingPlaceholder() {
  return (
    <div className='PlaceHolder' style={{width: '100%'}}>
      <Placeholder as="p" animation="glow">
        <Placeholder xs={12} />
      </Placeholder>
      <Placeholder as="p" animation="wave">
        <Placeholder xs={12} />
      </Placeholder>
      <Placeholder as="p" animation="wave">
        <Placeholder xs={12} />
      </Placeholder>
      <Placeholder as="p" animation="wave">
        <Placeholder xs={12} />
      </Placeholder>
      <Placeholder as="p" animation="wave">
        <Placeholder xs={12} />
      </Placeholder>
      <Placeholder as="p" animation="wave">
        <Placeholder xs={12} />
      </Placeholder>
      <Placeholder as="p" animation="wave">
        <Placeholder xs={12} />
      </Placeholder>
    </div>
  );
}

export default LoadingPlaceholder;

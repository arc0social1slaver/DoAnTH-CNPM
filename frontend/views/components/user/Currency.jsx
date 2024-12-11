import PropTypes from 'prop-types';

const Currency = ({ amount }) => {
  const formattedPrice = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(amount);

  return <span>{formattedPrice}</span>;
};

Currency.propTypes = {
  amount: PropTypes.number.isRequired,
};

export default Currency;

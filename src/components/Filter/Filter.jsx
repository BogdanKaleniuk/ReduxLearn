import { PropTypes } from 'prop-types';

import { FindWrapper, FindTitle, Input } from './Filter.styled';
import { useDispatch, useSelector } from 'react-redux';
// import { getFilter } from 'redux/selectors';
import { setStatusFilter } from 'redux/filterSlice';

export default function Filter() {
  const dispatch = useDispatch();
  const filter = useSelector(state => state.filter);
  console.log(filter);
  const onFilterChange = e => {
    dispatch(setStatusFilter(e.currentTarget.value));
  };

  return (
    <FindWrapper>
      <FindTitle>Find contacts by name</FindTitle>
      <Input
        type="text"
        placeholder="Enter search name"
        value={filter.value}
        onChange={onFilterChange}
      />
    </FindWrapper>
  );
}

Filter.propTypes = {
  title: PropTypes.string.isRequired,
};

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.div`
  padding: 0 8px;
  width: calc(100% / 3);
`;

const Select = styled.select`
  width: 100%;
`;

export default function SelectGroup({
  name,
  label,
  onOptionSelect,
  isLoading,
  value,
  options,
}) {
  const defaultLabel = isLoading ? 'Идет загрузка...' : 'Не выбрано...';

  return (
    <Container>
      <label htmlFor={name}>{label}</label>
      <Select
        name={name}
        onChange={onOptionSelect}
        disabled={isLoading}
        value={value}
      >
        <option hidden value="">
          {defaultLabel}
        </option>

        {options &&
          options.map(it => (
            <option key={it.id} value={it.slug}>
              {it.label}
            </option>
          ))}
      </Select>
    </Container>
  );
}

SelectGroup.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired,
  value: PropTypes.string,
  onOptionSelect: PropTypes.func.isRequired,
  options: PropTypes.oneOfType([
    PropTypes.oneOf([null]),
    PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        label: PropTypes.string,
        slug: PropTypes.string,
      }),
    ),
  ]),
};

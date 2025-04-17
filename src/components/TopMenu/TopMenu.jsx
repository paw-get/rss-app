import React from 'react';

export default function TopMenu({ onChange }) {
  return (
    <>
      <div className='ui pointing menu inverted fixed'>
        <a href='#' className='header item'>
          RSS App
        </a>

        <div className='right menu inverted'>
          <div className='item'>
            <div className='ui icon input'>
              <input
                type='text'
                onChange={onChange}
                placeholder='Search for article...'
              />
              <i className='search link icon'></i>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

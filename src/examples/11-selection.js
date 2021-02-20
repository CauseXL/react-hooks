import React from 'react';
import { Checkbox, Col, Row } from 'antd';
import useSelect from './lib/useSelect';

export default () => {
  const list = [1,2,3,4];
  const { toggle, selected, isSelected, toggleAll, allSelected } = useSelect(list)

  return (
    <div>
      <div>Selected : {selected.join(',')}</div>
      <div style={{ borderBottom: '1px solid #E9E9E9', padding: '10px 0' }}>
        <Checkbox checked={allSelected} onClick={toggleAll}>
          Check all
        </Checkbox>
      </div>
      <Row style={{ padding: '10px 0' }}>
        {list.map(o => (
          <Col span={12} key={o}>
            <Checkbox checked={isSelected(o)} onClick={() => {toggle(o)}}>
              {o}
            </Checkbox>
          </Col>
        ))}
      </Row>
    </div>
  );
}


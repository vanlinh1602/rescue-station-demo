import { Spin } from 'antd';

const Waiting = () => (
  <div
    style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(16, 16, 16, 0.2)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999999,
    }}
  >
    <Spin />
  </div>
);

export default Waiting;

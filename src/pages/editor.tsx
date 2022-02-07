import React from 'react';
import Header from '../components/header';
import Modal from '../components/Modal';

export default function Editor() {
  return (
    <div className="h-screen min-h-fit w-screen bg-background-main">
      <div className="grid h-full w-full" style={{ gridTemplateRows: 'min-content max-content' }}>
        <Header />
        <div className="row-span-4 mx-auto h-auto w-11/12 rounded-t-xl bg-gray-300 px-3 pt-4">
          <Modal>
            Step 3,
            <br /> Edit and that kinda thing
            <br /> just like it said in the mockup
          </Modal>
        </div>
      </div>
    </div>
  );
}

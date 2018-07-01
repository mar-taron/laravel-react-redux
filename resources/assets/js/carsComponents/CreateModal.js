import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { CREATE } from '../config';

import ModalWrapper from '../sharedComponents/ModalWrapper';
import CUForm from './CUForm';

const CreateModal = props => {
    return (
		<ModalWrapper
			{...props}
			title={"Create car"}
			width={400}
			showOk={false}
		>
			<CUForm mode={CREATE}/>
		</ModalWrapper>
	);
}

export default CreateModal;

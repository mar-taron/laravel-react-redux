import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import ModalWrapper from '../sharedComponents/ModalWrapper';
import CUForm from './CUForm';
import { UPDATE } from '../config';

const CreateModal = props => {
    return (
		<ModalWrapper
			{...props}
			title={"Update car"}
			width={400}
			showOk={false}
		>
			<CUForm mode={UPDATE}/>
		</ModalWrapper>
	);
}

export default CreateModal;

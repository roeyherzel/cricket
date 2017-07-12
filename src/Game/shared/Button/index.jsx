import React from 'react';

const Button = ({ children, ...rest }) => (
	<button
		className="Button"
		{...rest}
	>
		{children}
	</button>
);

export default Button;
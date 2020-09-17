import React from 'react';

function useSeratusVeha(): number {
	const [height, setHeight] = React.useState<number>(window.innerHeight);
	const getheight = () => {
		setHeight(window.innerHeight);
	};
	React.useEffect(() => {
		window.addEventListener('resize', getheight);
		return () => window.removeEventListener('resize', getheight);
	}, [height, setHeight]);

	return height;
}

export default useSeratusVeha;

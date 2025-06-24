import React from 'react';

const Container = ({ children }: { children: React.ReactNode }) => {
	return <div className="max-w-7xl mx-auto  h-full">{children}</div>;
};

export default Container;

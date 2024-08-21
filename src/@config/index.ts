const config = {
	baseUrl: import.meta.env.VITE_SHW_BASE_URL,
	httpTimeout: 1000 * 60 * 2,
	idleTimeout: 1000 * 60 * 15,
	promptBeforeIdleTimeOut: 1000 * 60 * 3,
};

export default config;

import { Dashboard } from './dashboard.js';

class Report {
	id;

	constructor(id) {
		this.id = id;
	}

	init = async (dashboard) => {};

	onParameterChange = async (event) => {};

	render = async (rdiv,value) => {
		Dashboard.sqlframes.View.render(rdiv,value);
	}
}

export { Report }
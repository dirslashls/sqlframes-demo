import { Report } from './report.js';

class Dashboard {
	reports = [];
	params = [];
	paramValues = new Map();
	dsconfigs = new Map();
	datasets = new Map();
	sqlframes;
	dashboardDiv;

	constructor(div) {
		this.sqlframes = Dashboard.sqlframes;
		this.dashboardDiv = div;
	}

	setDSConfigs(dsconfigs) {
		for(const dsconfig of dsconfigs) {
			this.dsconfigs.set(dsconfig.id,dsconfig);
		}
	}

	// handlers created via code generation from configuration
	init = async () => {};
	createSharedDatasets = async () => {};
	onParameterChange = async (evt) => {};

	// utility functions
	createParam(name,ds) {
		if(ds instanceof Dashboard.sqlframes.DataFrame) {
			const field = ds.resolve(name);
			const values = field.values;
			const param = document.createElement('select');
			param.name = name;
			param.onchange = (evt) => this.setParameter(name,param.value);
			const allOption = document.createElement('option');
			allOption.value = Dashboard.AllOption;
			allOption.innerHTML = 'All';
			param.appendChild(allOption);
			for(const value of values) {
				const option = document.createElement('option');
				option.value = value.value;
				option.innerHTML = value.value;
				param.appendChild(option);
			}
			this.params.push(param);
		}
	}

	setParamOnchange(param) {

		param.onchange = (evt) => this.setParameter(param.name,param.value)
	}

	static AllOption = '**ALL**';

	async initParameter(name,value) {
		this.paramValues[name] = value;
		const result = document.evaluate(`//div[@data-id="${name}"]/*[1]`,this.dashboardDiv,null,XPathResult.FIRST_ORDERED_NODE_TYPE);
		const pdiv = result?.singleNodeValue;
		if(pdiv) this.setParamOnchange(pdiv);
	}

	async setParameter(name,value) {
		const oldValue = this.paramValues[name];
		this.paramValues[name] = value;
		const event = new CustomEvent('param.change',{ detail: { param: name, value: value, oldValue: oldValue, dashboard: this } });
		// handle changes required for shared datasets
		await this.onParameterChange(event);
		// handle changes required for individual reports (if they manage their own datasets)
		for(const report of this.reports) report.onParameterChange(event);
	}

	getParameter(name) {
		return this.paramValues[name];
	}

	async getDataset(config) {
		if(config.id) {
			const ds = this.datasets.get(config.id);
			if(ds) return ds;
		}
		return this.createDataset(config);
	}

	async createDataset(config) {
		const dsconfig = this.dsconfigs.get(config.id);
		if(dsconfig) config = dsconfig;
		let ds;
		let url = config.url;
		if(config.urlProvider) url = config.urlProvider(config);
		if(url) {
			ds = this.datasets.get(config.id);
			if(ds) ds.ds = Dashboard.sqlframes.DataFrame.DataSource.fromURL(url);
			else ds = Dashboard.sqlframes.DataFrame.fromURL(url);
		}
		if(config.id) this.datasets.set(config.id,ds);
		return ds;
	}

	setDataset(id,ds) {
		this.datasets.set(id,ds);
	}

	createReport(id) {
		const r = new Report(id);
		this.reports.push(r);
		return r;
	}

	// dashboard lifecycle event handlers
	initParams() {
		for(const param of this.params) param.remove();
		this.params = [];
	}

	async renderParameters() {
		for(const param of this.params) {
			const result = document.evaluate(`//div[@data-id="${param.name}"]`,this.dashboardDiv,null,XPathResult.FIRST_ORDERED_NODE_TYPE);
			const pdiv = result?.singleNodeValue;
			if(pdiv) pdiv.appendChild(param);
		}
	}

	async renderReports() {
		await this.init();
		for(const report of this.reports) {
			report.init(this).then((value) => {
				const result = document.evaluate(`//div[@data-id="${report.id}"]`,this.dashboardDiv,null,XPathResult.FIRST_ORDERED_NODE_TYPE);
				const rdiv = result?.singleNodeValue;
				if(rdiv) report.render(rdiv,value);
			});
		}
	}

	static sqlframes;
}

export { Dashboard }
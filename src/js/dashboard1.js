// this is a static js file
// howerver, it can be thought of as dynamically created


// Step 1: create parameters, they may or may not require a dataset
async function createParameters(dashboard) {
	const { DataFrame, SQL, Time } = dashboard.sqlframes;
	{
		const dsconfigs = [];
		// dynamic code snippet from dashboard config begins
		dsconfigs.push({
			id: 'earthquakes',
			url: 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary',
			urlProvider: (config) => {
				const dsType = dashboard.getParameter('dsType') ?? 'all_week';
				return `${config.url}/${dsType}.csv`;
			}
		});
		// dynamic code snippet from dashboard config begins

		dashboard.setDSConfigs(dsconfigs);

		// dynamic code snippet from dashboard config begins {
		dashboard.init = async () => {
			dashboard.initParameter('dsType','all_week');
			const df = await dashboard.getDataset({ id: 'earthquakes' });
			df.on(df.handler((msg) => {
				if(df.needsComputing) return;
				dashboard.initParams();
				dashboard.createParam('status',df);
				dashboard.renderParameters();
			}));
			dashboard.setDataset('fdf',df.fdf());
		}
		// dynamic code snippet from dashboard config ends }

		// dynamic code snippet from dashboard config ends }
		dashboard.onParameterChange = async (evt) => {
			const { param, value } = evt.detail;
			if(param === 'dsType') {
				dashboard.createDataset({ id : 'earthquakes' });
				return;
			}
			const { where: { eq } } = SQL;
			const fdf = await dashboard.getDataset({id: 'fdf'});
			const status = dashboard.getParameter('status');
			fdf.where = eq('status',status);
		}
		// dynamic code snippet from dashboard config ends }
	}
}

// Step 2: create additional shared datasets if required
async function createDatasets(dashboard) {
	const { DataFrame, SQL, Time } = dashboard.sqlframes;
	{
		// dynamic code snippet from dashboard config begins {
		dashboard.createSharedDatasets = async() => {
		}
		// dynamic code snippet from dashboard config begins }
	}
}

async function createReports(dashboard) {
	const { DataFrame, SQL, Time } = dashboard.sqlframes;

	{
		const r = dashboard.createReport('r1');
		// dynamic code snippet from config begins {
		r.init = async (dashboard) => {
			const df = await dashboard.getDataset({ id: 'fdf' });
			return df;
		}
		// dynamic code snippet from config ends }
	}

	{
		const r = dashboard.createReport('r2');
		// dynamic code snippet from config begins {
		r.init = async (dashboard) => {
			const df = await dashboard.getDataset({ id: 'earthquakes' });
			const { groupBy, cube } = SQL;
			return df.gdf(groupBy(cube('type','status'))).vdf(['type'],['status']);
		}
		// dynamic code snippet from config ends }
	}

	{
		const r = dashboard.createReport('r3');
		// dynamic code snippet from config begins {
		r.init = async (dashboard) => {
			const df = await dashboard.getDataset({ id: 'fdf' });
			const { groupBy } = SQL;
			const chart = df.gdf(groupBy('type')).chart.bar('Count','type');
			return chart;
		}
		// dynamic code snippet from config ends }
	}

	{
		const r = dashboard.createReport('r4');
		// dynamic code snippet from config begins {
		r.init = async (dashboard) => {
			const df = await dashboard.getDataset({ id: 'fdf' });
			const { groupBy } = SQL;
			const chart = df.gdf(groupBy('magType')).chart.donut('magType','Count');
			return chart;
		}
		// dynamic code snippet from config ends }
	}
}

async function main(dashboard) {
	await createParameters(dashboard);
	await createDatasets(dashboard);
	await dashboard.renderParameters();
	await createReports(dashboard);
	await dashboard.renderReports();
}

export { main };
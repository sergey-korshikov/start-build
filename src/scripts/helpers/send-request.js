const getUrlPairs = function(obj) {
	let getType = obj => obj === undefined ? 'undefined' : (obj === null ? 'null' : obj.constructor.name),
			simple = (path, val) => path + '=' + val,
			simpleEnc = (path, val) => simple(path, encodeURIComponent(val)),
			typeFunc = {
				null: simple,
				undefined: (path, val) => simple(path, ''),
				Number: simple,
				Boolean: simple,
				String: simpleEnc,
				RegExp: simpleEnc,
				Date: (path, val) => simpleEnc(path, val.toJSON()),
				Object: (path, val, dot = '.') => iterate(val, path + dot, name => name),
				Array: (path, val) => iterate(val, path, name => '[' + name + ']')
			},
			pairs = [],
			type = getType(obj);

	function iterate(obj, prefix, wrap) {
		for (const[name, val] of Object.entries(obj)) {
			const call = typeFunc[getType(val)];
			const tmp = call && call(prefix + wrap(name), val);
			call && tmp && pairs.push(tmp);
		}
	}

	typeFunc[type] && typeFunc[type]('', obj, '');

	return pairs;
}

const sendRequest = function (params) {
	const controller = new AbortController();
	const method = (params.method || 'get').toLowerCase().trim();
	const options = {
		method: method,
		signal: controller.signal
	}

	if (method === 'get') {
		params.url += '?' + getUrlPairs(params.data).join('&');
	} else if (params.formData) {
		options.body = params.formData;
	} else {
		options.headers = params.headers || {'Content-Type': 'application/json;charset=utf-8'},
		options.body = JSON.stringify(params.data || null);
	}

	return {
		fetch: fetch(params.url, options).then(response => {
			if (response.ok) {
				return response.text();
			}

			return response.text().then(error => {
				const e = new Error('Error sending data');
				e.data = error;
				throw e;
			})
		}),
		controller: controller
	};
}
module.exports = {
	/**
	* Test for range(0, 100, -1)
	*/
	range: function* rangeGenerator(start, end, step) {
		if (typeof start === "undefined") {
			throw new Error("Can't be called without arguments!")
		}
		if (typeof end === "undefined") {
			end = start
			start = 0
		}
		if (typeof step === "undefined") {
			if (start < end) step = 1
			else step = -1
		}
		if (typeof start !== "number" || typeof end !== "number") {
			throw new Error("Must be called only passing numbers!")
		}

		let iter = start
		while (iter != end) {
			yield iter
			iter += step
		}
	},
	crange: function* crangeGenerator(start, end) {
		if (typeof start !== "string" || typeof end !== "string") {
			throw new Error("Must be called only passing strings!")
		}

		const startCharCode = start.charCodeAt(0)
		// Regarding character ranges, they must be INCLUSIVE
		const endCharCode = end.charCodeAt(0)+1

		for (const iter of this.range(startCharCode, endCharCode)) {
			yield String.fromCharCode(iter)
		}
	}
}
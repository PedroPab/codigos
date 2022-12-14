function success(req, res, message, status, type) {
    res.status(status || 200).json({
        body: message,
    })
}

function error(req, res, errorMessage, status, details) {
	res.status(status || 500).json({
		error: errorMessage,
        message: details,
	})
	console.error(`[ details error ] ${details}`)
}

module.exports = {
    success,
    error,
}

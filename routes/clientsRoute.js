
const router = require('express').Router();

// router.post('/client_registration', function (req, res) {
// });

router.get('/healthCheck', function (req, res) {
    return res.send({
        "status": "success",
        "statusCode": 200,
        "data": true,
        "message": "Health check successful"
    });
});

// router.post('/auth', function (req, res) {
// });

module.exports = router;
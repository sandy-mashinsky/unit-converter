const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const {findConversion, addConversion, generateGraph} = require("./services/conversionManager");

const conversionsFileName = 'conversion_input.txt';

const app = express();
const router = express.Router();
const port = process.env.SERVER_PORT;

app.use(express.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

router.post('/convert', (req, res) => {
    const {servingAmount, servingUnit, convertTo} = req.body;
    const converterValue = findConversion(servingUnit, convertTo);

    if (converterValue < 0) {
        return res.status(404).json({error: 'conversion cannot be done'})
    }
    return res.json({
        servingAmount: converterValue * servingAmount,
        servingUnit: convertTo
    });
});

router.post('/conversion', (req,res) => {
    const {srcUnit, destinationUnit, conversionValue} = req.body;
    try {
        addConversion(conversionsFileName, srcUnit, destinationUnit, conversionValue);
        return res.sendStatus(200);
    } catch (e) {
        console.error(e);
        return res.status(500).json({error: 'something went wrong on our end'});
    }
});

app.use('/', router);

app.listen(port, () => {
    try {
        console.log('server started listening');
        generateGraph(conversionsFileName);
    } catch (e) {
        console.error(e);
    }
});

module.exports = app;

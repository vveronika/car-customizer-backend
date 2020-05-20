import express from 'express';
import cors from 'cors';
import fs from 'fs';
import { Dataset } from './types';

const bodyParser = require('body-parser');
const data = JSON.parse(fs.readFileSync('./data.json', 'utf-8')) as Dataset;

const app = express();
app.use(cors());

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded());

app.use((req, res, next) => {
  res.header('content-type', 'application/json');
  next();
});

app.get('/models', (req, res) => {
  setTimeout(() => {
    res.send({ response: data.models });
  }, 1800);
});

app.get('/models/:id', (req, res) => {
  res.send({
    response: data.models.find((m) => m.id === parseInt(req.params.id)),
  });
});

app.get('/models/:id/engines', (req, res) => {
  const model = data.models.find((m) => m.id === parseInt(req.params.id))!;
  res.send({
    response: {
      ...model,
      compatibleEngines: data.engines.filter(
        (e) => e.displacement <= model.maxDisplacement,
      ),
    },
  });
});

app.get('/engines', (req, res) => {
  res.send({ response: data.engines });
});

app.get('/colors', (req, res) => {
  res.send({ response: data.colors });
});

app.post('/calculation-summary', function (req, res) {
  const { modelId, engineId, gearboxId } = req.body;

  const model = data.models.find((m) => m.id === modelId );
  const engine = data.engines.find((e) => e.id === engineId);
  const gearbox = engine ? engine.gearbox.find((g) => g.id === gearboxId) : null;

  const modelPrice = model ? model.price : 0;
  const enginePrice = engine ? engine.price : 0;
  const gearboxPrice = gearbox ? gearbox.price : 0;

  const calculatedPrice = modelPrice + enginePrice + gearboxPrice;

  res.send({ response: calculatedPrice });
});

app.listen(3001);

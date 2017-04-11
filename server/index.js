import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';

import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackConfig from '../webpack.config.dev';
import webpackHotMiddleware from 'webpack-hot-middleware';

import users from './routes/users';
import auth from './routes/auth';
import workouts from './routes/workouts';
import muscles from './routes/muscles';
import exercises from './routes/exercises';
import set from './routes/set';

let app = express();

	app.use(bodyParser.json());

app.use('/api/users', users);
app.use('/api/auth', auth);
app.use('/api/workouts', workouts);
app.use('/api/muscles', muscles);
app.use('/api/exercises', exercises);
app.use('/api/set', set);


const compiler = webpack(webpackConfig);

app.use(webpackMiddleware(compiler, {
	hot : true,
	publicPath: webpackConfig.output.publicPath,
	noInfo: true
}));


app.use(webpackHotMiddleware(compiler));
app.get('/*', (req,res) => {
	res.sendFile(path.join(__dirname,'./index.html'));

});

app.listen(3000, () => console.log('Running on localhost:3000'));
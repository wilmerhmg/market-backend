import consign from 'consign';
import express from 'express';

const app = express();

consign({cwd: __dirname})
	.include('config/init.js')
	.then('config/db.js')
	.then('core/middlewares.js')
	.then('controllers')
	.then('routes')
	.then('core/boot.js')
	.into(app);
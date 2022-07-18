const express = require('express');
const router = express.Router();
const User = require('./models/user.model');

router.get('/', (req, res) => {
	return res.json({
		status: 1,
		message: 'Hello World',
	});
});

router.get('/users', (req, res) => {
	User.findAll()
		.then((users) => {
			return res.json({
				status: 1,
				message: 'Users fetched successfully',
				users: users,
			});
		})
		.catch((err) => {
			return res.json({
				status: 0,
				message: 'Error fetching users',
				error: err,
			});
		});
});

router.post('/user', (req, res) => {
	User.create(req.body)
		.then(() => {
			return res.status(200).json({
				status: 1,
				message: 'User created successfully',
			});
		})
		.catch((err) => {
			return res.status(500).json({
				status: 0,
				message: 'Error while creating user:' + err,
			});
		});
});

router.put('/update-user', (req, res) => {
	User.update(req.body, {
		where: {
			id: req.body.id,
		},
	})
		.then(() => {
			return res.status(200).json({
				status: 1,
				message: 'User updated successfully',
			});
		})
		.catch((err) => {
			return res.status(500).json({
				status: 0,
				message: 'Error while updating user:' + err,
			});
		});
});

module.exports = router;

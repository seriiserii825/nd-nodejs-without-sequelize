const express = require('express');
const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');
const router = express.Router();
const User = require('../models/user.model');

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

//create
router.post('/user', (req, res) => {
	User.create({
		name: req.body.name,
		email: req.body.email,
		password: bcrypt.hashSync(req.body.password, 10),
		status: req.body.status,
	})
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

router.post('/login', (req, res) => {
	User.findOne({
		where: {
			email: req.body.email,
		},
	})
		.then((user) => {
			if (!user) {
				return res.status(404).json({
					status: 0,
					message: 'User not found',
				});
			}
			if (bcrypt.compareSync(req.body.password, user.password)) {
				let token = JWT.sign(
					{
						id: user.id,
						email: user.email,
					},
					'secret',
					{
						expiresIn: '1h',
						notBefore: '1s',
					}
				);
				return res.status(200).json({
					status: 1,
					message: 'User logged in successfully',
					user,
					token,
				});
			}
			return res.status(401).json({
				status: 0,
				message: 'Password is incorrect',
			});
		})
		.catch((err) => {
			return res.status(500).json({
				status: 0,
				message: 'Error while logging in user',
				error: err,
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

router.delete('/user/:id', (req, res) => {
	User.destroy({
		where: {
			id: req.params.id,
		},
	})
		.then(() => {
			return res.status(200).json({
				status: 1,
				message: 'User deleted successfully',
			});
		})
		.catch((err) => {
			return res.status(500).json({
				status: 0,
				message: 'Error while deleting user:' + err,
			});
		});
});

module.exports = router;

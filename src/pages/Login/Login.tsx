import React, { useState, FocusEvent, useRef, useEffect, useCallback } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import useStyles from './styles';
import animationData from '../../assets/login__image.json';
import lottie from 'lottie-web';
import { useHistory } from 'react-router-dom';
import useSeratusVeha from '../../helper/useSeratusVeha';

interface LoginForm {
	[key: string]: string;
}

function Login() {
	const classes = useStyles();
	const animRef = useRef() as React.MutableRefObject<HTMLDivElement>;
	const [loginForm, setLoginForm] = useState<LoginForm>({ username: '', roomname: '' });
	const history = useHistory();
	const height = useSeratusVeha();

	useEffect(() => {
		lottie.loadAnimation({
			container: animRef.current,
			renderer: 'svg',
			loop: true,
			autoplay: true,
			animationData,
		});
	}, [animRef]);
	const handleInputChange = useCallback((e: FocusEvent<HTMLInputElement>) => {
		e.persist();
		setLoginForm((prev) => {
			if (prev[e.target.name][prev[e.target.name].length - 1] === '-' && e.target.value[e.target.value.length - 1] === ' ') {
				return prev;
			} else {
				return { ...prev, [e.target.name]: e.target.value.replace(/ +/g, '-') };
			}
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	const handleJoinRoom = () => {
		if (loginForm.roomname.length <= 4 && loginForm.username.length <= 4) return;
		history.push(`/room/${loginForm.roomname}/${loginForm.username}`);
	};

	return (
		<div className={classes.root} style={{ height }}>
			<div className={classes.loginBox}>
				<div ref={animRef}></div>
				<div>
					<TextField
						helperText="minimum 4 char "
						name="username"
						onChange={handleInputChange}
						value={loginForm.username}
						fullWidth
						label="Username"
					/>
				</div>
				<div>
					<TextField
						helperText="minimum 4 char"
						name="roomname"
						onChange={handleInputChange}
						value={loginForm.roomname}
						fullWidth
						label="Room name"
					/>
				</div>
				<div>
					<Button onClick={handleJoinRoom} variant="contained" color="primary" fullWidth>
						Join{loginForm.roomname ? ' ' + loginForm.roomname : ''}
					</Button>
				</div>
			</div>
		</div>
	);
}

export default Login;

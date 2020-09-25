import React, { FormEvent, useState, ChangeEvent, useEffect, useRef, useLayoutEffect, useCallback, MouseEvent } from 'react';
import useStyles from './styles';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import SendIcon from '@material-ui/icons/Send';
import Message, { MessageType } from '../../components/Message';
import useSeratusVeha from '../../helper/useSeratusVeha';
import Tooltip from '@material-ui/core/Tooltip';

interface ParamsType {
	room: string;
	username: string;
}

interface MessagePayload {
	type: MessageType;
	sender: string;
	time: number;
	message: string;
}

function ChatBox() {
	const classes = useStyles();
	const wsconn = useRef() as React.MutableRefObject<WebSocket>;
	const chatWrapperRef = useRef() as React.MutableRefObject<HTMLDivElement>;
	const { room, username } = useParams<ParamsType>();
	const [connection, setConnection] = useState(false);
	const [message, setMessage] = useState<string>('');
	const [messages, setMessages] = useState<Array<MessagePayload>>([]);
	const height = useSeratusVeha();

	useEffect(() => {
		if (!window.WebSocket) {
			alert("Upss, your browser doesn't support WebSocket");
			return;
		}
		connect();
		return () => {
			if (wsconn.current) wsconn.current.close();
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useLayoutEffect(() => {
		chatWrapperRef.current.scroll({
			top: chatWrapperRef.current.scrollHeight,
			left: 0,
		});
	}, [chatWrapperRef, messages]);

	const handleInputMessageChange = (e: ChangeEvent<HTMLInputElement>) => {
		setMessage(e.target.value);
	};

	const connect = () => {
		let ws = new WebSocket(`wss://rancot.herokuapp.com/api/ws?room=${room}&username=${username}`);
		ws.onopen = () => {
			wsconn.current = ws;
			setConnection(true);
		};
		ws.onclose = () => {
			setConnection(false);
			setTimeout(connect, 5000);
		};
		ws.onmessage = (event: MessageEvent) => {
			let res: MessagePayload = JSON.parse(event.data);
			res.time = Math.round(Date.now() / 1000);
			setMessages((prevMsgs) => [...prevMsgs, res]);
		};
	};

	const handleSendMessage = useCallback(
		(e: FormEvent<HTMLFormElement> | MouseEvent<HTMLButtonElement>) => {
			e.preventDefault();
			if (!connection) return;
			if (!wsconn.current || !message) return;
			wsconn.current.send(JSON.stringify({ message }));
			setMessages((prev) => [...prev, { sender: username, message, time: Math.round(Date.now() / 1000), type: MessageType.TYPE_NEW_MESSAGE }]);
			setMessage('');
		},
		[connection, message, username, wsconn]
	);

	return (
		<div className={classes.root} style={{ height: height }}>
			<Helmet>
				<title>{room.replace(/-/g, ' ')} | RanCot</title>
			</Helmet>
			<div className={classes.chatBox}>
				<div className={classes.chatHeader}>
					<Typography variant="h6">{room.replace(/-/g, ' ')}</Typography>
					<div className={classes.userInfo}>
						<Typography variant="body1">{username.replace(/-/g, ' ')}</Typography>
						<Tooltip title="Connecting..." open={!connection} arrow>
							<span className={`${classes.connection} ${connection && classes.on}`} />
						</Tooltip>
					</div>
				</div>
				<div ref={chatWrapperRef} className={classes.chatWrapper}>
					<div>
						{messages.map((mp, i) => (
							<Message key={i} username={mp.sender} currentUser={username} time={mp.time} type={mp.type} text={mp.message} />
						))}
					</div>
				</div>
				<form onSubmit={handleSendMessage} className={classes.chatInput}>
					<input
						autoComplete="off"
						placeholder={connection ? 'Message...' : "Can't connect to server"}
						value={message}
						onChange={handleInputMessageChange}
						name="message"
						type="text"
					/>
					<IconButton onClick={handleSendMessage} type="submit">
						<SendIcon />
					</IconButton>
				</form>
			</div>
		</div>
	);
}

export default ChatBox;

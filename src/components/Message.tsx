import Typography from '@material-ui/core/Typography';
import moment from 'moment';
import React from 'react';
import useStyles from './styles';

export enum MessageType {
	TYPE_NEW_USER = 0,
	TYPE_NEW_MESSAGE,
	TYPE_USER_LEAVE_CHAT,
}

interface propTypes {
	username: string;
	time: number;
	text: string;
	type: MessageType;
	currentUser: string;
}

function Message({ username, time, text, type, currentUser }: propTypes) {
	const classes = useStyles();
	switch (type) {
		case MessageType.TYPE_NEW_MESSAGE:
			return (
				<div className={`${classes.message} ${currentUser === username ? classes['sender'] : classes['receiver']}`}>
					<div className={classes.header}>
						<Typography variant="caption">{username.replace(/-/g, ' ')}</Typography>
						<Typography variant="caption">{moment.unix(time).format('hh:mma')}</Typography>
					</div>
					<div>
						<Typography variant="body2">{text}</Typography>
					</div>
				</div>
			);
		case MessageType.TYPE_NEW_USER:
		case MessageType.TYPE_USER_LEAVE_CHAT:
			return (
				<div className={classes.info}>
					<Typography variant="caption"> {text.replace(/-/g, ' ')}</Typography>
				</div>
			);
		default:
			return <div />;
	}
}

export default React.memo(Message);

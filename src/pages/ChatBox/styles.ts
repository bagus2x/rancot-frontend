import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Pattern from '../../assets/pattern.svg';

export default makeStyles((theme: Theme) =>
	createStyles({
		root: {
			display: 'flex',
			justifyContent: 'center',
			flexDirection: 'column',
			alignItems: 'center',
			background: theme.palette.grey[900],
		},
		chatBox: {
			width: '100%',
			maxWidth: 600,
			minWidth: 300,
			height: '90%',
			boxShadow: '0px 10px 15px 0px rgba(0,0,0,0.5)',
			display: 'flex',
			flexDirection: 'column',
			justifyContent: 'center',
			borderRadius: theme.spacing(1),
			background: '#fff',
			backgroundImage: `url(${Pattern})`,
			[theme.breakpoints.down('xs')]: {
				height: '100%',
			},
		},
		chatHeader: {
			background: theme.palette.primary.main,
			color: '#fff',
			padding: theme.spacing(2),
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'space-between',
			[theme.breakpoints.up('sm')]: {
				borderTopLeftRadius: theme.spacing(1),
				borderTopRightRadius: theme.spacing(1),
			},
		},
		chatWrapper: {
			flexGrow: 1,
			display: 'flex',
			flexDirection: 'column',
			padding: theme.spacing(2),
			overflowY: 'auto',
			'& > div': {
				display: 'flex',
				flexDirection: 'column',
			},
		},
		chatInput: {
			display: 'flex',
			boxShadow: '0px -9px 9px -1px rgba(0,0,0,0.22)',
			background: '#fff',
			'& > input': {
				flexGrow: 1,
				border: 'none',
				padding: `0 ${theme.spacing(2)}px`,
				borderBottomLeftRadius: theme.spacing(2),
				borderBottomTightRadius: theme.spacing(2),
			},
		},
		userInfo: {
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
		},
		connection: {
			display: 'block',
			width: 15,
			height: 15,
			borderRadius: '50%',
			margin: theme.spacing(1),
			background: theme.palette.error.main,
		},
		on: {
			background: theme.palette.success.main,
		},
	})
);

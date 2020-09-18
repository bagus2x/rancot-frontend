import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export default makeStyles((theme: Theme) =>
	createStyles({
		message: {
			width: 'auto',
			maxWidth:'100%',
			minWidth: 'auto',
			marginBottom: theme.spacing(2),
			padding: theme.spacing(1),
			borderRadius: theme.spacing(1),
			textAlign: 'justify',
			'& > *:nth-child(2)': {
				marginTop: theme.spacing(1),
			},
			'& *':{
				wordWrap: 'break-word',
			}
		},
		sender: {
			background: theme.palette.primary.dark,
			color: '#fff',
			alignSelf: 'flex-end',
		},
		receiver: {
			background: '#fff',
			color: theme.palette.text.primary,
			alignSelf: 'flex-start',
		},
		header: {
			display: 'flex',
			justifyContent: 'space-between',
			'& > span': {
				fontSize: '.7rem',
			},
			'& > span:nth-child(1)': {
				marginRight: theme.spacing(1),
			},
		},
		info: {
			textAlign: 'center',
			fontStyle: 'italic',
			color: theme.palette.grey[600],
		}
	})
);
